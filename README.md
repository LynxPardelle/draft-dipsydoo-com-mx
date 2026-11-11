# Dipsy Doo!

A Spanish-language catalog for in-person dance classes in Mexico City.

| Page | Content |
| --- | --- |
| `/` | School introduction and links to the catalog |
| `/clases` | Lindy Hop, Rockabilly Jive, Charleston, and the class format |
| `/horarios-y-sedes` | November–December 2026 class schedule, four venue areas, and monthly tuition |
| `/comunidad` | Social dance, school videos, event photographs, student testimonials, and the supplied code of conduct |
| `/contacto` | WhatsApp contact and frequently asked questions |

## Authoring and preview

From this draft root, run `node tools/build-site.mjs` to regenerate the native route and component payloads. Run `node tools/check-site.mjs` to validate routes, anchors, component references, headings, canonical URLs, SEO metadata, and link structure.

The homepage uses a 1200 × 900 WebP with eager loading and high fetch priority. Keep the original photo outside the public asset bucket and upload a versioned web rendition through the grant-protected uploader.

The school-supplied photos and four H.264/AAC MP4 videos use public Zoolanding CDN URLs. Web copies are compressed and video metadata is placed before the media payload for streaming. Keep original client materials outside the repository.

Run `npm start` from the hub and open the [local preview](http://127.0.0.1:4200/?draftDomain=dipsydoo.com.mx). Use the [shared test preview](https://test.zoolandingpage.com.mx/?draftDomain=dipsydoo.com.mx) after promoting through the protected `dev → test` workflow.

## Content maintenance

- The business WhatsApp destination was confirmed by the client during this update. Keep all contextual contact links on that same destination.
- Update the published schedule after December 2026. The class pages derive their visible timetables from the same group data. The supplied schedule poster takes precedence over the older price range in the introductory questionnaire.
- The testimonials are anonymous excerpts from the school form that invited public testimonials.
- Publish exact studio addresses, workshop dates, rules and the gender-violence prevention protocol after receiving verified publishable information.
- The supplied social-dance code is available as readable text and links to its original posters. Obtain the separately requested formal prevention protocol before adding it.
- Route links open the destination from the top. Section shortcuts use same-page fragments so scrolling runs after the target content is present.
- Production pages allow indexing. The draft deploy tool applies `noindex,nofollow` to page metadata when it builds the test package. Follow the hub's [draft lifecycle](https://github.com/LynxPardelle/zoolandingpage/blob/main/docs/11-draft-lifecycle.md) for release.

## Sitemap

Run `node tools/build-sitemap.mjs` to print the production sitemap from the configured public routes. When routes change, regenerate it for the dedicated production CloudFront function and check that the live sitemap matches.
