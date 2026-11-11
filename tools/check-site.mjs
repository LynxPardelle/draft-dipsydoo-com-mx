import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (name) => JSON.parse(readFileSync(new URL(name, root), 'utf8'));
const site = read('site-config.json');
const pages = new Map();
const media = new Set();

for (const route of site.routes) {
  assert(!pages.has(route.path), 'Duplicate route ' + route.path);
  const page = read(route.pageId + '/page-config.json');
  const definitions = read(route.pageId + '/components.json').components;
  const components = new Map(definitions.map(component => [component.id, component]));
  assert.equal(components.size, definitions.length, 'Duplicate component IDs on ' + route.path);
  assert.equal(page.seo.robots, 'noindex,nofollow');
  assert.equal(definitions.filter(component => component.config.tag === 'h1').length, 1);
  for (const id of page.rootIds) assert(components.has(id), 'Missing page root ' + id);
  const anchors = new Set(definitions.map(component => component.config.id).filter(Boolean));
  for (const component of definitions) {
    for (const id of component.config.components ?? []) {
      assert.equal(typeof id, 'string', 'Unexpected component reference');
      assert(components.has(id), 'Missing component ' + id);
    }
    if (component.type === 'media') {
      assert.match(component.config.src, /^https:\/\/assets\.zoolandingpage\.com\.mx\/dipsydoo\.com\.mx\//);
      if (component.config.tag === 'image') assert.equal(typeof component.config.alt, 'string');
      media.add(component.config.src);
    }
  }
  pages.set(route.path, {definitions, anchors});
}

for (const [path, page] of pages) {
  for (const component of page.definitions.filter(component => component.type === 'link')) {
    const url = new URL(component.config.href, 'https://dipsydoo.com.mx' + path);
    if (url.origin === 'https://dipsydoo.com.mx') {
      assert(pages.has(url.pathname), 'Unknown route ' + component.config.href);
      if (url.hash) assert(pages.get(url.pathname).anchors.has(decodeURIComponent(url.hash.slice(1))), 'Unknown anchor ' + component.config.href);
      assert(!component.config.href.startsWith('/') || !url.hash, 'Cross-page anchor can run before the destination is rendered');
      assert.equal(component.config.scrollRestoration?.mode, 'top', 'Route navigation must start at the top');
      assert(!url.search, 'Preview parameters in authored links');
    } else {
      assert.equal(url.protocol, 'https:');
      assert(['wa.me', 'assets.zoolandingpage.com.mx'].includes(url.hostname), 'Unexpected external destination');
      if (url.hostname === 'wa.me') {
        assert.equal(url.pathname, '/525540312687', 'Incorrect business WhatsApp destination');
        assert(url.searchParams.get('text'), 'Missing WhatsApp message');
      }
      if (component.config.target === '_blank') assert.match(component.config.rel, /noopener/);
    }
  }
}

console.log(JSON.stringify({ok: true, pages: pages.size, media: media.size, checks: ['routes', 'anchors', 'component references', 'headings', 'test indexing', 'contact URL structure', 'public media URLs']}, null, 2));
