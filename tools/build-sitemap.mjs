import { readFileSync } from 'node:fs';

const site = JSON.parse(readFileSync(new URL('../site-config.json', import.meta.url), 'utf8'));
const origin = new URL(site.site.seo.canonicalOrigin);
const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const excludedPaths = new Set(site.sitemap?.excludePaths ?? []);
const locations = site.routes
  .filter(route => !route.auth?.required && !excludedPaths.has(route.path) && route.pageId !== site.notFoundPageId)
  .map(route => new URL(route.path, origin))
  .map(url => {
    if (url.origin !== origin.origin || url.search || url.hash) {
      throw new Error('Invalid sitemap URL: ' + url.href);
    }
    return '  <url><loc>' + escapeXml(url.href) + '</loc></url>';
  });

process.stdout.write([
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...locations,
  '</urlset>',
  ''
].join('\n'));
