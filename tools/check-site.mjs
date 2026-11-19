import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (name) => JSON.parse(readFileSync(new URL(name, root), 'utf8'));
const site = read('site-config.json');
const pages = new Map();
const media = new Set();
const titles = new Set();
const descriptions = new Set();
const socialProfiles = new Map([
  ['www.instagram.com', 'https://www.instagram.com/dipsydoo/'],
  ['www.facebook.com', 'https://www.facebook.com/profile.php?id=61562416997881'],
  ['www.tiktok.com', 'https://www.tiktok.com/@dipsy_doo']
]);

for (const route of site.routes) {
  assert(!pages.has(route.path), 'Duplicate route ' + route.path);
  const page = read(route.pageId + '/page-config.json');
  const definitions = read(route.pageId + '/components.json').components;
  const components = new Map(definitions.map(component => [component.id, component]));
  assert.equal(components.size, definitions.length, 'Duplicate component IDs on ' + route.path);
  assert.equal(page.seo.robots, 'index,follow');
  assert.equal(page.seo.canonical, new URL(route.path, site.site.seo.canonicalOrigin).href);
  assert(page.seo.title.es?.trim() && !titles.has(page.seo.title.es), 'Missing or duplicate title on ' + route.path);
  assert(page.seo.description.es?.trim() && !descriptions.has(page.seo.description.es), 'Missing or duplicate description on ' + route.path);
  titles.add(page.seo.title.es);
  descriptions.add(page.seo.description.es);
  assert.equal(definitions.filter(component => component.config.tag === 'h1').length, 1);
  for (const [hostname, href] of socialProfiles) {
    const id = hostname.split('.')[1];
    const socialLink = components.get('footerSocialLinks-' + id)?.config;
    assert.equal(socialLink?.href, href, 'Missing social profile in the footer on ' + route.path);
    assert.equal(socialLink.target, '_blank');
    assert.match(socialLink.ariaLabel, /Dipsy Doo!/);
    const icon = components.get('footerSocialLinks-' + id + '-icon')?.config;
    assert.equal(icon?.tag, 'image');
    assert(icon.src.endsWith('-' + id + '-simple-icons-16-14-0.svg'), 'Missing SVG brand logo');
    assert.equal(icon.width, 24);
    assert.equal(icon.height, 24);
  }
  if (route.path === '/comunidad') {
    for (const part of [1, 2]) {
      const poster = components.get('conductPosterImage' + part)?.config;
      assert(poster?.src.endsWith('codigo-de-conducta-' + part + '.webp'), 'Missing complete code-of-conduct poster');
      assert.equal(poster.width, 1080);
      assert.equal(poster.height, 1350);
      assert.equal(poster.styles.height, 'auto');
      assert.equal(poster.styles.objectFit, undefined, 'Code-of-conduct posters must retain their full composition');
    }
  }
  if (route.path === '/') {
    const hero = components.get('heroPhoto')?.config;
    assert.equal(hero?.tag, 'image', 'Homepage hero must be discoverable as an image in the initial document');
    assert.equal(hero.loading, 'eager');
    assert.equal(hero.fetchPriority, 'high');
    assert.equal(hero.src, site.site.seo.defaultImage);
  }

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
      assert(['wa.me', 'assets.zoolandingpage.com.mx', 'www.google.com', ...socialProfiles.keys()].includes(url.hostname), 'Unexpected external destination');
      if (socialProfiles.has(url.hostname)) assert.equal(url.href, socialProfiles.get(url.hostname), 'Incorrect social profile');
      if (url.hostname === 'www.google.com') {
        assert.equal(url.pathname, '/maps/search/', 'Unexpected Google Maps action');
        assert.equal(url.searchParams.get('api'), '1');
        assert(url.searchParams.get('query')?.trim(), 'Missing Google Maps location');
      }
      if (url.hostname === 'wa.me') {
        assert.equal(url.pathname, '/525540312687', 'Incorrect business WhatsApp destination');
        assert(url.searchParams.get('text'), 'Missing WhatsApp message');
      }
      if (component.config.target === '_blank') assert.match(component.config.rel, /noopener/);
    }
  }
}

console.log(JSON.stringify({ok: true, pages: pages.size, media: media.size, checks: ['routes', 'anchors', 'component references', 'headings', 'canonical URLs and unique SEO metadata', 'contact URL structure', 'public media URLs']}, null, 2));
