
import { mkdirSync, writeFileSync } from 'node:fs';

const domain = 'dipsydoo.com.mx';
const root = new URL('../', import.meta.url);
const blue = '#004d9d';
const pink = '#d61983';
const ink = '#251938';
const paper = '#fff9f3';
const purple = '#deb6d7';
const components = [];
const add = (id, type, config) => {
  components.push({id, type, config});
  return id;
};
const text = (id, value, tag = 'p', styles = {}) =>
  add(id, 'text', {tag, text: value, styles: {margin: '0', ...styles}});
const box = (id, children, styles = {}, tag = 'div', attributes = {}) =>
  add(id, 'container', {tag, components: children, styles, ...attributes});
const link = (id, label, href, styles = {}) =>
  add(id, 'link', {text: label, href, styles: {color: blue, fontWeight: '700', ...styles}});
const width = {width: 'min(100%, 1160px)', margin: '0 auto', boxSizing: 'border-box', paddingInline: 'clamp(20px, 6vw, 76px)'};
const section = {...width, paddingBlock: 'clamp(45px, 7vw, 90px)'};
const headline = {fontFamily: 'Georgia, serif', fontWeight: '700', fontSize: 'clamp(35px, 6vw, 68px)', lineHeight: '1.04', letterSpacing: '-.05em'};
const eyebrow = {fontSize: '13px', letterSpacing: '.13em', fontWeight: '800', textTransform: 'uppercase'};
const flex = {display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 24px'};
const grid = {display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 265px), 1fr))', gap: '25px'};
const action = {display: 'inline-flex', alignItems: 'center', padding: '12px 20px', minHeight: '24px', borderRadius: '30px', background: blue, color: 'white', textDecoration: 'none'};
const heading = (id, label) => text(id, label, 'h2', headline);
const logoUrl = process.env.DIPSYDOO_LOGO_URL;
if (logoUrl) {
  const url = new URL(logoUrl);
  if (url.origin !== 'https://assets.zoolandingpage.com.mx'
    || !url.pathname.startsWith('/dipsydoo.com.mx/')
    || url.search || url.hash || url.username || url.password) {
    throw new Error('The release logo must be a public Dipsy Doo! CDN asset.');
  }
}
const logo = add('logo', 'media', {
  tag: 'image',
  src: logoUrl || '/drafts/dipsydoo.com.mx/assets/dipsy-doo.webp',
  alt: 'Dipsy Doo!',
  width: 500,
  height: 500,
  loading: 'eager',
  styles: {display: 'block', width: 'min(100%, 390px)', height: 'auto', margin: '0 auto', mixBlendMode: 'multiply'}
});

const nav = box('menu', [
  link('navSchedule', 'Horarios', '#horarios'),
  link('navStyles', 'Estilos', '#estilos'),
  link('navPrices', 'Costos', '#costos'),
  link('navContact', 'Contacto', '#contacto')
], {...flex, gap: '8px 18px'}, 'nav', {ariaLabel: 'Principal'});
const header = box('header', [
  text('wordmark', 'Dipsy Doo!', 'p', {fontFamily: 'Georgia, serif', fontWeight: '700', fontSize: '25px'}),
  nav
], {...width, ...flex, justifyContent: 'space-between', paddingBlock: '18px'}, 'header');

const hero = box('hero', [box('heroLayout', [
  box('heroCopy', [
    text('heroTag', 'Escuela de baile · Ciudad de México', 'p', {...eyebrow, color: blue}),
    text('heroTitle', '¡Clases Swingcreíbles!', 'h1', {...headline, fontSize: 'clamp(36px, 4.6vw, 67px)', marginBlock: '14px 20px', overflowWrap: 'anywhere'}),
    text('heroDescription', 'Aprende Lindy Hop, Rockabilly Jive y Charleston. Puedes empezar desde cero y venir sin pareja.', 'p', {fontSize: 'clamp(17px, 2.2vw, 22px)', maxWidth: '33ch'}),
    box('heroLinks', [link('heroSchedule', 'Ver horarios y sedes ↓', '#horarios', action)], {marginTop: '24px'})
  ]),
  logo
], {...section, ...grid, alignItems: 'center', gap: '35px'})], {
  background: 'linear-gradient(115deg, #ffdfc7 2%, #f6d9ef 54%, #deb6d7 100%)',
  borderBlock: '1px solid #cfa9cd'
}, 'section');

const groups = [
  ['Lunes', '17:00', 'Rockabilly Jive', 'Nueva Santa María', false],
  ['Lunes', '20:00', 'Lindy Hop', 'Guerrero', false],
  ['Jueves', '19:00', 'Charleston', 'Guerrero', false],
  ['Jueves', '20:00', 'Lindy Hop', 'Guerrero', false],
  ['Viernes', '17:00', 'Lindy Hop', 'Nueva Santa María', false],
  ['Sábado', '11:30', 'Rockabilly Jive', 'Jardín Pushkin', true],
  ['Domingo', '11:30', 'Lindy Hop', 'Parque Hundido', true]
];
const week = 'Entre semana, la mensualidad parte de $350 MXN por una hora semanal.';
const weekend = 'En fin de semana, la mensualidad parte de $450 MXN por hora y media semanal.';
const accordion = (id, items) => add(id, 'accordion', {
  mode: 'multiple',
  items,
  defaultItemContainerClasses: 'ank-borderBottom-1px-solid-HASHdecddd',
  defaultItemButtonConfig: {classes: 'ank-display-flex ank-width-100per ank-padding-14px ank-bg-transparent ank-color-HASH004d9d ank-border-0 ank-textAlign-left ank-fontWeight-700'},
  defaultItemPanelClasses: 'ank-padding-14px'
});
const timetable = box('schedule', [
  text('schedulePeriod', 'Noviembre–diciembre de 2026', 'p', {...eyebrow, color: blue}),
  heading('scheduleHeading', 'Encuentra tu clase'),
  text('scheduleIntro', 'Elige un horario para ver el estilo, la zona y la mensualidad de referencia.', 'p', {marginBlock: '12px 20px'}),
  accordion('groups', groups.map(([day, time, style, venue, isWeekend], index) => ({
    id: 'group-' + index,
    title: day + ' · ' + time + ' · ' + style,
    content: 'Sede: ' + venue + '. ' + (isWeekend ? weekend : week) + ' Confirma el cupo y el punto de encuentro por WhatsApp.'
  }))),
  link('schedulePricing', 'Ver todas las mensualidades ↓', '#costos', {display: 'inline-block', marginTop: '18px'})
], section, 'section', {id: 'horarios'});

const descriptions = [
  ['Lindy Hop', 'Baila al ritmo del jazz swing. En clase practicas las bases, la conexión en pareja y maneras de improvisar con la música.'],
  ['Rockabilly Jive', 'Baila rock and roll y rhythm and blues. Aprende los pasos básicos y practica cómo enlazarlos en pareja.'],
  ['Charleston', 'Trabaja el ritmo y el juego de pies con este estilo de baile swing. Consulta el grupo de los jueves en Guerrero.']
];
const styles = box('styles', [box('stylesLayout', [
  text('stylesKicker', 'Catálogo de clases', 'p', {...eyebrow, color: blue}),
  heading('stylesHeading', 'Tres formas de bailar'),
  box('styleList', descriptions.map(([title, description], index) => box('style-' + index, [
    text('styleNumber-' + index, '0' + (index + 1), 'p', {...eyebrow, color: blue}),
    text('styleTitle-' + index, title, 'h3', {fontFamily: 'Georgia, serif', fontSize: '28px', lineHeight: '1.15', marginBlock: '8px 10px'}),
    text('styleBody-' + index, description)
  ], {borderTop: '3px solid ' + [pink, blue, '#e95c0c'][index], paddingTop: '16px'}, 'article')), {...grid, marginTop: '27px'}),
  text('socialHeading', 'Baile social', 'h3', {fontFamily: 'Georgia, serif', fontSize: '28px', marginTop: '30px'}),
  text('socialDescription', 'Dipsy Doo! anuncia un baile social gratuito cada mes. Pregunta por la próxima fecha y por talleres especiales.')
], section)], {background: '#f2deef'}, 'section', {id: 'estilos'});

const prices = [
  ['Entre semana', [['1 hora por semana', '$350'], ['2 horas por semana', '$650'], ['3 horas o más', '$750']]],
  ['Fin de semana', [['1 hora y media por semana', '$450'], ['3 horas o más', '$750']]]
];
const costs = box('prices', [
  text('pricesKicker', 'Noviembre–diciembre de 2026 · MXN', 'p', {...eyebrow, color: blue}),
  heading('pricesHeading', 'Colegiaturas mensuales'),
  box('priceColumns', prices.map(([label, plans], index) => box('price-' + index, [
    text('priceLabel-' + index, label, 'h3', {fontSize: '21px', marginBottom: '8px'}),
    box('plans-' + index, plans.map(([frequency, amount], plan) => {
      const id = 'plan-' + index + '-' + plan;
      return box(id, [text(id + '-label', frequency, 'span'), text(id + '-value', amount, 'strong', {color: blue})], {...flex, justifyContent: 'space-between', paddingBlock: '10px', borderTop: '1px solid #decddd'});
    }))
  ], {}, 'article')), {...grid, marginBlock: '25px 14px'}),
  text('priceNote', 'Las clases se manejan por mensualidad. Confirma con la escuela el plan que corresponde a tu grupo.')
], section, 'section', {id: 'costos'});

const faq = box('faq', [
  heading('faqHeading', 'Antes de tu primera clase'),
  box('faqItems', [accordion('questions', [
    {id: 'partner', title: '¿Puedo ir sin pareja?', content: 'Sí. En clase se hace rotación de pareja.'},
    {id: 'experience', title: '¿Puedo empezar si nunca he bailado?', content: 'Sí. Puedes incorporarte desde nivel principiante.'},
    {id: 'observe', title: '¿Puedo conocer la clase antes de incorporarme?', content: 'Puedes ir a observar una clase. Pregunta al equipo por el grupo que te interesa.'},
    {id: 'single', title: '¿Puedo pagar una sola clase?', content: 'Las clases se manejan por mensualidad.'}
  ])], {marginTop: '20px'})
], {...section, paddingTop: '10px'}, 'section');

const whatsapp = 'https://wa.me/525585657947?text=' + encodeURIComponent('Hola, Dipsy Doo! Me gustaría saber qué grupos tienen disponibles.');
const contact = box('contact', [box('contactLayout', [
  text('contactKicker', 'Dipsy Doo! · Ciudad de México', 'p', eyebrow),
  heading('contactHeading', '¿Qué te gustaría bailar?'),
  text('contactBody', 'Cuéntanos qué estilo, horario o sede te interesa. Te ayudamos a encontrar un grupo.', 'p', {marginBlock: '12px 22px', maxWidth: '51ch'}),
  link('whatsapp', 'Escribir por WhatsApp ↗', whatsapp, {...action, background: 'white', color: blue})
], section)], {background: blue, color: 'white'}, 'section', {id: 'contacto'});

box('page', [
  link('skip', 'Saltar a horarios', '#horarios', {display: 'block', textAlign: 'center', paddingBlock: '6px', fontSize: '13px', background: '#f2deef'}),
  header,
  box('content', [hero, timetable, styles, costs, faq, contact], {}, 'main'),
  box('footer', [text('footerText', 'Dipsy Doo! · Clases presenciales de baile en CDMX')], {...width, paddingBlock: '22px', fontSize: '14px'}, 'footer')
], {minHeight: '100vh', fontFamily: 'Arial, sans-serif', color: ink, background: paper, lineHeight: '1.55'});

const palette = {
  bgColor: paper, textColor: ink, titleColor: ink, linkColor: blue, accentColor: blue,
  secondaryBgColor: '#f2deef', secondaryTextColor: ink, secondaryTitleColor: ink,
  secondaryLinkColor: blue, secondaryAccentColor: pink,
  successColor: '#296346', onSuccessColor: '#ffffff',
  errorColor: '#a52121', onErrorColor: '#ffffff',
  warningColor: '#7a4700', onWarningColor: '#ffffff',
  infoColor: blue, onInfoColor: '#ffffff'
};
const title = 'Dipsy Doo! | Clases de swing y Rockabilly Jive en CDMX';
const description = 'Clases presenciales de Lindy Hop, Rockabilly Jive y Charleston en la Ciudad de México. Consulta horarios, sedes y colegiaturas.';
const write = (name, data) => writeFileSync(new URL(name, root), JSON.stringify(data, null, 2) + '\n');
mkdirSync(new URL('default/', root), {recursive: true});
write('site-config.json', {
  version: 1, domain, aliases: ['www.dipsydoo.com.mx'], defaultPageId: 'default',
  routes: [{path: '/', pageId: 'default', label: 'Inicio'}],
  runtime: {analytics: {enabled: false, consentUI: 'none', track: []}, features: {debugMode: false}},
  environments: {test: {aliases: []}},
  site: {
    appIdentity: {identifier: 'dipsydoo', name: 'Dipsy Doo!', version: '0.1.0', description},
    theme: {defaultMode: 'light', palettes: {light: palette, dark: palette}},
    i18n: {defaultLanguage: 'es', supportedLanguages: [{code: 'es', label: 'Español'}]},
    seo: {siteName: 'Dipsy Doo!', title, description, canonicalOrigin: 'https://' + domain}
  }
});
write('default/page-config.json', {
  version: 1, domain, pageId: 'default', rootIds: ['page'], modalRootIds: [],
  seo: {title: {es: title}, description: {es: description}, canonical: 'https://' + domain + '/', robots: 'noindex,nofollow'}
});
write('default/components.json', {version: 1, domain, pageId: 'default', components});
write('components.json', {version: 1, domain, pageId: 'allPages', components: []});
for (const [prefix, pageId] of [['', 'allPages'], ['default/', 'default']]) {
  write(prefix + 'variables.json', {version: 1, domain, pageId, variables: {}});
  write(prefix + 'angora-combos.json', {version: 1, domain, pageId, combos: {}});
  mkdirSync(new URL(prefix + 'i18n/', root), {recursive: true});
  write(prefix + 'i18n/es.json', {version: 1, domain, pageId, lang: 'es', dictionary: {}});
}
