# Dipsy Doo!

An informational, Spanish-language site for in-person dance classes in Mexico City. The single page covers Lindy Hop, Rockabilly Jive, Charleston, the published November–December 2026 schedule, monthly tuition, FAQs, and WhatsApp contact.

## Local preview

From the Zoolandingpage hub, run `npm start` and open [the local preview](http://127.0.0.1:4200/?draftDomain=dipsydoo.com.mx). The source of the native site and page payloads is [tools/build-site.mjs](tools/build-site.mjs). Run `node tools/build-site.mjs` from this draft root after changing copy, dates, or prices.

## Release checks

- Confirm the WhatsApp destination with Dipsy Doo! The draft uses the publicly advertised business number.
- Replace the seasonal schedule after December 2026. Confirm exact studio addresses, event dates, and availability before adding them.
- Add media, testimonials, rules, and the gender-violence prevention protocol after approval of the respective assets and copy. The preview uses the brand mark and colors from the provided design materials.
- Before remote deployment, upload the logo through the hub's authorized asset flow and set `DIPSYDOO_LOGO_URL` to the verified public URL when regenerating the draft. Validate the asset in both environments. The local build uses the bundled logo.
- Follow the hub's [draft lifecycle](https://github.com/LynxPardelle/zoolandingpage/blob/main/docs/11-draft-lifecycle.md) for registry and repository setup, followed by protected promotions through `dev`, `test`, and `main`. Keep the preview out of search results until production is approved.
