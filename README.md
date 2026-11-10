# Dipsy Doo!

A Spanish-language catalog for in-person dance classes in Mexico City.

| Page | Content |
| --- | --- |
| `/` | School introduction and links to the catalog |
| `/clases` | Lindy Hop, Rockabilly Jive, Charleston, and the class format |
| `/horarios-y-sedes` | November–December 2026 class schedule, four venue areas, and monthly tuition |
| `/comunidad` | Monthly social dance and a school-supplied photograph |
| `/contacto` | WhatsApp contact and frequently asked questions |

## Authoring and preview

From this draft root, run `node tools/build-site.mjs` to regenerate the native route and component payloads. The logo and the two school-supplied photos use verified public Zoolanding CDN URLs. Keep original client materials outside the repository.

Run `npm start` from the hub and open the [local preview](http://127.0.0.1:4200/?draftDomain=dipsydoo.com.mx). Use the [shared test preview](https://test.zoolandingpage.com.mx/?draftDomain=dipsydoo.com.mx) after promoting through the protected `dev → test` workflow.

## Content maintenance

- Confirm the business WhatsApp destination before production and update the published schedule after December 2026.
- Publish exact studio addresses, workshop dates, testimonials, rules and the gender-violence prevention protocol after receiving verified publishable information.
- Add school video only after obtaining a playable copy for the test site's visitors.
- Keep the draft out of search results while reviewing it in test. Follow the hub's [draft lifecycle](https://github.com/LynxPardelle/zoolandingpage/blob/main/docs/11-draft-lifecycle.md) for release.
