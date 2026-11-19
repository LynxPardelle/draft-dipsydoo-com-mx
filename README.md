# Dipsy Doo!

A Spanish-language catalog for in-person dance classes in Mexico City.

| Page | Content |
| --- | --- |
| `/` | School introduction and links to the catalog |
| `/clases` | Lindy Hop, Rockabilly Jive, Charleston, and the class format |
| `/horarios-y-sedes` | Weekly class schedule, four venue areas, and reference monthly tuition |
| `/comunidad` | Social dance, school videos, event photographs, student testimonials, etiquette posters, and the five gender-violence protocol posters |
| `/contacto` | WhatsApp contact and frequently asked questions |

## Authoring and preview

From this draft root, run `node tools/build-site.mjs` to regenerate the native route and component payloads. Run `node tools/check-site.mjs` to validate routes, anchors, component references, headings, canonical URLs, SEO metadata, and link structure. Run `node --test tools/check-calendar.test.mjs` to verify calendar downloads on both class pages.

The homepage uses a 1200 × 900 WebP with eager loading and high fetch priority. Keep the original photo outside the public asset bucket and upload a versioned web rendition through the grant-protected uploader.

The school-supplied photos and four H.264/AAC MP4 videos use public Zoolanding CDN URLs. Web copies are compressed and video metadata is placed before the media payload for streaming. Keep original client materials outside the repository.

The footer and Contact page link to the school's Instagram, Facebook, and TikTok profiles. Their SVG logos come from [Simple Icons 16.14.0](https://github.com/simple-icons/simple-icons/tree/16.14.0/icons) and are served by the public asset CDN.

Run `npm start` from the hub and open the [local preview](http://127.0.0.1:4200/?draftDomain=dipsydoo.com.mx). Use the [shared test preview](https://test.zoolandingpage.com.mx/?draftDomain=dipsydoo.com.mx) after promoting through the protected `dev → test` workflow.

## Content maintenance

- The business WhatsApp destination was confirmed by the client during this update. Keep all contextual contact links on that same destination.
- Update the shared group data in [tools/build-site.mjs](tools/build-site.mjs) and the expected timetable in [tools/check-calendar.test.mjs](tools/check-calendar.test.mjs) when the school changes its weekly schedule. Both class pages calculate the next session in Mexico City time and offer a separate weekly event. Calendar apps control whether they keep the imported reminders and imported events do not follow later site changes.
- The monthly tuition is a reference from the school’s November–December 2026 poster. Confirm revised prices with the school before editing them.
- The testimonials are anonymous excerpts from the school form that invited public testimonials.
- Maintain venue descriptions, map links and arrival references in [tools/venues.mjs](tools/venues.mjs). When the school provides verified meeting points and publishable photos, update the venue details and add a `photos` array with a public CDN `src`, descriptive `alt`, `width` and `height` for each image.
- Publish exact studio addresses, workshop dates and rules after receiving verified publishable information.
- The supplied social-dance code is displayed as two complete posters, with readable text and links to open each image. Keep the five protocol posters in the school's supplied order, preserve their complete composition and provide access to the full-size images.
- Route links open the destination from the top. Section shortcuts use same-page fragments so scrolling runs after the target content is present.
- Production pages allow indexing. The draft deploy tool applies `noindex,nofollow` to page metadata when it builds the test package. Follow the hub's [draft lifecycle](https://github.com/LynxPardelle/zoolandingpage/blob/main/docs/11-draft-lifecycle.md) for release.

## Sitemap

Run `node tools/build-sitemap.mjs` to print the production sitemap from the configured public routes. When routes change, regenerate it for the dedicated production CloudFront function and check that the live sitemap matches.
