import { mkdirSync, writeFileSync } from 'node:fs';

const domain = 'dipsydoo.com.mx';
const root = new URL('../', import.meta.url);
const assets = 'https://assets.zoolandingpage.com.mx/dipsydoo.com.mx/shared/images/';
const blue = '#004d9d';
const pink = '#d61983';
const ink = '#251938';
const paper = '#fff9f3';
const blush = '#f2deef';
const border = '#decddd';
const title = 'Dipsy Doo! | Clases de swing y Rockabilly Jive en CDMX';
const description = 'Clases presenciales de Lindy Hop, Rockabilly Jive y Charleston en la Ciudad de México.';
const period = 'Noviembre–diciembre de 2026';
const paths = {home: '/', classes: '/clases', schedule: '/horarios-y-sedes', community: '/comunidad', contact: '/contacto'};
const navigation = [[paths.home, 'Inicio'], [paths.classes, 'Clases'], [paths.schedule, 'Horarios y sedes'], [paths.community, 'Comunidad'], [paths.contact, 'Contacto']];
const width = {width: 'min(100%, 1160px)', margin: '0 auto', boxSizing: 'border-box', paddingInline: 'clamp(20px, 6vw, 76px)'};
const section = {...width, paddingBlock: 'clamp(40px, 6vw, 76px)'};
const headline = {fontFamily: 'Georgia, serif', fontWeight: '700', fontSize: 'clamp(33px, 5vw, 64px)', lineHeight: '1.06', letterSpacing: '-.045em'};
const subheading = {...headline, fontSize: 'clamp(27px, 4vw, 42px)'};
const eyebrow = {fontSize: '13px', letterSpacing: '.13em', fontWeight: '800', textTransform: 'uppercase'};
const flex = {display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px 22px'};
const grid = {display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 265px), 1fr))', gap: '25px'};
const tap = {display: 'inline-flex', alignItems: 'center', minHeight: '44px', boxSizing: 'border-box'};
const action = {...tap, padding: '12px 20px', borderRadius: '28px', background: blue, color: 'white', textDecoration: 'none'};
const heroBackground = 'linear-gradient(115deg, #ffdfc7, #f6d9ef 54%, #deb6d7)';
const logo = assets + 'dipsy-doo.webp';
const dancePhoto = assets + 'pareja-baile.webp';
const communityPhoto = assets + 'comunidad-baile.webp';
const whatsapp = (message) => 'https://wa.me/525585657947?text=' + encodeURIComponent(message);
const groups = [
  ['Lunes', '17:00', 'Rockabilly Jive', 'Nueva Santa María', false],
  ['Lunes', '20:00', 'Lindy Hop', 'Guerrero', false],
  ['Jueves', '19:00', 'Charleston', 'Guerrero', false],
  ['Jueves', '20:00', 'Lindy Hop', 'Guerrero', false],
  ['Viernes', '17:00', 'Lindy Hop', 'Nueva Santa María', false],
  ['Sábado', '11:30', 'Rockabilly Jive', 'Jardín Pushkin', true],
  ['Domingo', '11:30', 'Lindy Hop', 'Parque Hundido', true]
];
const styles = [
  ['Lindy Hop', 'Jazz swing', 'El pulso sincopado del jazz deja espacio para improvisar. En clase practicas las bases, el ritmo y la conexión con tu pareja de baile.'],
  ['Rockabilly Jive', 'Rock and roll y rhythm and blues', 'Aprende a enlazar los pasos básicos y a bailar en pareja con la energía del rock and roll.'],
  ['Charleston', 'Ritmo y juego de pies', 'Explora el juego de pies y las variaciones rítmicas del Charleston. El grupo de los jueves se reúne en Guerrero.']
];
const prices = [
  ['Entre semana', [['1 hora por semana', '$350'], ['2 horas por semana', '$650'], ['3 horas o más', '$750']]],
  ['Fin de semana', [['1 hora y media por semana', '$450'], ['3 horas o más', '$750']]]
];
const faq = [
  {id: 'partner', title: '¿Puedo ir sin pareja?', content: 'Sí. En clase se hace rotación de pareja.'},
  {id: 'experience', title: '¿Puedo empezar si nunca he bailado?', content: 'Sí. Puedes incorporarte desde nivel principiante.'},
  {id: 'observe', title: '¿Puedo observar una clase?', content: 'Sí. Escribe por WhatsApp para preguntar por el grupo y el punto de encuentro.'},
  {id: 'single', title: '¿Puedo pagar una sola clase?', content: 'Las clases se manejan por mensualidad.'}
];

let components = [];
const add = (id, type, config) => {
  components.push({id, type, config});
  return id;
};
const text = (id, value, tag = 'p', css = {}) =>
  add(id, 'text', {tag, text: value, styles: {margin: '0', fontWeight: tag === 'strong' ? '700' : '400', ...css}});
const box = (id, children, css = {}, tag = 'div', attributes = {}) =>
  add(id, 'container', {tag, components: children, styles: css, ...attributes});
const link = (id, label, href, css = {}, attributes = {}) =>
  add(id, 'link', {text: label, href, styles: {...tap, color: blue, fontWeight: '700', ...css}, ...attributes});
const image = (id, src, alt, w, h, options = {}) =>
  add(id, 'media', {tag: 'image', src, alt, width: w, height: h, loading: 'lazy', decoding: 'async', ...options});
const sectionId = (id) => ({id, tabindex: -1});
const heading = (id, label) => text(id, label, 'h2', subheading);
const accordion = (id, items) => add(id, 'accordion', {
  mode: 'multiple',
  items,
  defaultItemContainerClasses: 'ank-borderBottom-1px__solid__HASHdecddd',
  defaultItemButtonConfig: {classes: 'ank-display-flex ank-width-100per ank-padding-14px ank-bg-transparent ank-color-HASH004d9d ank-border-0 ank-textAlign-left ank-fontWeight-700'},
  defaultItemPanelClasses: 'ank-padding-14px'
});

function pageIntro(kicker, headingText, body) {
  return box('pageIntro', [box('pageIntroLayout', [
    text('introKicker', kicker, 'p', {...eyebrow, color: blue}),
    text('pageHeading', headingText, 'h1', {...headline, marginBlock: '10px 16px'}),
    text('introDescription', body, 'p', {fontSize: 'clamp(17px, 2vw, 21px)', maxWidth: '57ch'})
  ], section)], {background: heroBackground, borderBlock: '1px solid ' + border}, 'section');
}

function renderHome() {
  const hero = box('hero', [box('heroLayout', [
    box('heroCopy', [
      text('heroKicker', 'Escuela de baile · Ciudad de México', 'p', {...eyebrow, color: blue}),
      text('pageHeading', '¡Clases Swingcreíbles!', 'h1', {...headline, marginBlock: '14px 18px', fontSize: 'clamp(36px, 4.6vw, 64px)'}),
      text('heroDescription', 'Aprende Lindy Hop, Rockabilly Jive y Charleston. Puedes empezar desde cero y venir sin pareja.', 'p', {fontSize: 'clamp(17px, 2.2vw, 22px)', maxWidth: '35ch'}),
      box('heroLinks', [link('heroSchedule', 'Ver horarios y sedes', paths.schedule, action), link('heroClasses', 'Explorar las clases', paths.classes)], {...flex, marginTop: '22px'})
    ]),
    image('heroPhoto', dancePhoto, 'Pareja de la comunidad Dipsy Doo! en una pose de baile frente a un mural.', 787, 1050, {
      loading: 'eager', fetchPriority: 'high',
      styles: {display: 'block', width: '100%', height: 'clamp(280px, 40vw, 490px)', objectFit: 'cover', objectPosition: '50% 55%', borderRadius: '48% 48% 12px 12px'}
    })
  ], {...section, ...grid, alignItems: 'center', gap: 'clamp(26px, 5vw, 66px)'})], {background: heroBackground, borderBlock: '1px solid ' + border}, 'section');
  const destinations = [
    ['estilos', '01 · Las clases', 'Del swing al rock and roll', 'Conoce los tres estilos y qué practicarás en cada uno.', 'Ver estilos de baile', paths.classes],
    ['horarios', '02 · La semana', 'Encuentra un grupo', 'Consulta el horario y el punto de referencia de las cuatro zonas.', 'Consultar horarios y sedes', paths.schedule],
    ['costos', '03 · Colegiaturas', 'Elige tu frecuencia', 'Compara las mensualidades entre semana y en fin de semana.', 'Ver las colegiaturas', paths.schedule + '#colegiaturas'],
    ['contacto', '04 · Primera visita', 'Resuelve tus dudas', 'Pregunta por cupo, qué llevar o cómo observar una clase.', 'Ir a contacto y preguntas frecuentes', paths.contact]
  ];
  const overview = box('overview', [
    heading('overviewHeading', 'Tu primer paso'),
    box('overviewItems', destinations.map(([anchor, kicker, label, detail, cta, href]) => box(anchor + 'Overview', [
      text(anchor + 'Index', kicker, 'p', {...eyebrow, color: blue}),
      text(anchor + 'Heading', label, 'h3', {...subheading, fontSize: '27px', marginBlock: '6px 8px'}),
      text(anchor + 'Text', detail),
      link(anchor + 'Link', cta, href)
    ], {borderTop: '2px solid ' + border, paddingTop: '15px'}, 'article', sectionId(anchor))), {...grid, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))', marginTop: '24px'})
  ], section, 'section');
  return [hero, overview];
}

function renderClasses() {
  return [
    pageIntro('Clases presenciales · CDMX', 'Tres formas de bailar', 'Del jazz swing al rock and roll, cada estilo tiene su propia manera de marcar el ritmo y jugar con la música.'),
    box('classList', [
      ...styles.map(([label, kicker, detail], index) => box('class-' + index, [
        text('classKicker-' + index, kicker, 'p', {...eyebrow, color: blue}),
        heading('classHeading-' + index, label),
        text('classDetail-' + index, detail, 'p', {maxWidth: '57ch', marginTop: '10px'})
      ], {borderTop: '3px solid ' + [pink, blue, '#e95c0c'][index], paddingBlock: '18px 22px'}, 'article')),
      link('classSchedule', 'Buscar un grupo y horario', paths.schedule, action)
    ], section, 'section'),
    box('firstVisit', [box('firstVisitLayout', [
      heading('firstVisitHeading', 'Así es una clase'),
      text('firstVisitDetails', 'Empezamos con calentamiento, trabajamos las bases y cerramos con práctica en pareja. La rotación te permite practicar con distintas personas y recibir retroalimentación.', 'p', {maxWidth: '61ch', marginBlock: '12px 10px'}),
      link('classFaq', 'Ver preguntas para tu primera clase', paths.contact + '#preguntas')
    ], section)], {background: blush}, 'section')
  ];
}

function renderSchedule() {
  return [
    pageIntro(period + ' · CDMX', 'Horarios y sedes', 'Abre el horario que te interesa para ver su sede y la colegiatura de referencia. Confirma con la escuela el cupo y el punto de encuentro.'),
    box('schedule', [
      heading('scheduleHeading', 'Encuentra tu clase'),
      box('scheduleItems', [accordion('groups', groups.map(([day, time, style, venue, weekend], index) => ({
        id: 'group-' + index,
        title: day + ' · ' + time + ' · ' + style,
        content: 'Sede: ' + venue + '. Mensualidad desde ' + (weekend ? '$450 MXN por hora y media semanal.' : '$350 MXN por una hora semanal.')
      })))], {marginTop: '16px'}),
      box('scheduleLinks', [
        link('schedulePricing', 'Ver todas las colegiaturas', '#colegiaturas'),
        link('askSchedule', 'Confirmar sede y cupo por WhatsApp', whatsapp('Hola, Dipsy Doo! Me gustaría confirmar el cupo y el punto de encuentro de una clase.'))
      ], {...flex, marginTop: '12px'})
    ], section, 'section'),
    box('prices', [box('priceLayout', [
      text('pricesKicker', period + ' · MXN', 'p', {...eyebrow, color: blue}),
      heading('pricesHeading', 'Colegiaturas mensuales'),
      box('priceColumns', prices.map(([label, plans], index) => box('price-' + index, [
        text('priceLabel-' + index, label, 'h3', {fontSize: '21px', fontWeight: '700', marginBottom: '8px'}),
        ...plans.map(([frequency, amount], plan) => {
          const id = 'plan-' + index + '-' + plan;
          return box(id, [text(id + '-label', frequency, 'span'), text(id + '-value', amount, 'strong', {color: blue})], {...flex, justifyContent: 'space-between', paddingBlock: '10px', borderTop: '1px solid ' + border});
        })
      ], {}, 'article')), {...grid, marginBlock: '22px 14px'}),
      text('priceNote', 'Las clases se manejan por mensualidad. Confirma con la escuela qué plan corresponde al grupo que elegiste.'),
      link('priceContact', 'Ver opciones de contacto', paths.contact, {marginTop: '10px'})
    ], section)], {background: blush}, 'section', sectionId('colegiaturas'))
  ];
}

function renderCommunity() {
  return [
    pageIntro('Dipsy Doo! · Comunidad', 'El swing también se baila en comunidad', 'Entre clases y bailes sociales hay espacio para probar lo aprendido, escuchar música y conocer a otras personas que disfrutan bailar.'),
    box('social', [
      box('communityCopy', [
        heading('socialHeading', 'Baile social'),
        text('socialDetails', 'El calendario de la escuela anuncia un baile social gratuito cada mes. Pregunta por la próxima fecha y por talleres especiales.', 'p', {marginBlock: '12px 18px'}),
        link('socialContact', 'Preguntar por el próximo baile', whatsapp('Hola, Dipsy Doo! ¿Cuándo será su próximo baile social?'), action)
      ]),
      box('communityFigure', [
        image('communityPhoto', communityPhoto, 'Grupo de Dipsy Doo! reunido en un quiosco al aire libre.', 1050, 1050, {styles: {display: 'block', width: '100%', height: 'auto', borderRadius: '16px'}})
      ], {margin: '0'}, 'figure')
    ], {...section, ...grid, alignItems: 'center'}, 'section')
  ];
}

function renderContact() {
  return [
    pageIntro('Dudas, cupos y primera visita', '¿Qué te gustaría bailar?', 'Cuéntanos qué estilo, horario o sede te interesa. Te ayudamos a encontrar un grupo.'),
    box('contactOptions', [
      heading('contactHeading', 'Escríbenos por WhatsApp'),
      text('contactDetails', 'Indícanos el grupo que te interesa. Te podemos confirmar el cupo y el punto de encuentro.', 'p', {marginBlock: '10px 18px'}),
      box('contactLinks', [
        link('whatsapp', 'Abrir WhatsApp ↗', whatsapp('Hola, Dipsy Doo! Me gustaría saber qué grupos tienen disponibles.'), action),
        link('contactSchedule', 'Consultar horarios y sedes', paths.schedule)
      ], flex)
    ], section, 'section'),
    box('faq', [box('faqLayout', [
      heading('faqHeading', 'Antes de tu primera clase'),
      box('faqItems', [accordion('questions', faq)], {marginTop: '16px'})
    ], section)], {background: blush}, 'section', sectionId('preguntas'))
  ];
}

const pages = [
  ['default', paths.home, 'Inicio', title, description, renderHome],
  ['clases', paths.classes, 'Clases', 'Clases de swing, Jive y Charleston | Dipsy Doo!', 'Conoce los estilos que puedes aprender y qué esperar de tu primera clase.', renderClasses],
  ['horarios-y-sedes', paths.schedule, 'Horarios y sedes', 'Horarios, sedes y colegiaturas | Dipsy Doo!', 'Consulta los horarios de clases y las colegiaturas de noviembre–diciembre de 2026.', renderSchedule],
  ['comunidad', paths.community, 'Comunidad', 'Comunidad y baile social | Dipsy Doo!', 'Descubre los bailes sociales de Dipsy Doo! en la Ciudad de México.', renderCommunity],
  ['contacto', paths.contact, 'Contacto', 'Contacto y preguntas frecuentes | Dipsy Doo!', 'Contacta con Dipsy Doo! por WhatsApp y resuelve tus dudas antes de clase.', renderContact]
];

function shell(path, children) {
  const header = box('header', [
    link('brandHome', 'Dipsy Doo!', '/', {fontFamily: 'Georgia, serif', fontSize: '25px', color: ink, textDecoration: 'none'}),
    box('menu', navigation.map(([href, label], index) =>
      link('nav-' + index, label, href, {fontSize: '15px', textUnderlineOffset: '4px', textDecoration: path === href ? 'underline' : 'none'}, path === href ? {ariaCurrent: 'page'} : {})
    ), {...flex, columnGap: '18px', rowGap: '0'}, 'nav', {ariaLabel: 'Principal'})
  ], {...width, ...flex, justifyContent: 'space-between', paddingBlock: '9px'}, 'header');
  const footer = box('footer', [box('footerLayout', [
    image('footerLogo', logo, 'Dipsy Doo!', 500, 500, {styles: {display: 'block', width: '76px', height: 'auto', borderRadius: '50%'}}),
    text('footerText', 'Clases presenciales de baile en Ciudad de México.', 'p', {fontSize: '14px'}),
    link('footerContact', 'Contacto y preguntas frecuentes', paths.contact)
  ], {...width, ...flex, paddingBlock: '18px'})], {borderTop: '1px solid ' + border}, 'footer');
  return box('page', [
    link('skip', 'Saltar al contenido', '#contenido', {...tap, display: 'flex', justifyContent: 'center', fontSize: '13px', background: blush}),
    header,
    box('content', children, {}, 'main', sectionId('contenido')),
    footer
  ], {minHeight: '100vh', fontFamily: 'Arial, sans-serif', color: ink, background: paper, lineHeight: '1.55'});
}

const palette = {
  bgColor: paper, textColor: ink, titleColor: ink, linkColor: blue, accentColor: blue,
  secondaryBgColor: blush, secondaryTextColor: ink, secondaryTitleColor: ink,
  secondaryLinkColor: blue, secondaryAccentColor: pink,
  successColor: '#296346', onSuccessColor: '#ffffff',
  errorColor: '#a52121', onErrorColor: '#ffffff',
  warningColor: '#7a4700', onWarningColor: '#ffffff',
  infoColor: blue, onInfoColor: '#ffffff'
};
const write = (name, data) => writeFileSync(new URL(name, root), JSON.stringify(data, null, 2) + '\n');
function writeDefaults(prefix, pageId) {
  write(prefix + 'variables.json', {version: 1, domain, pageId, variables: {}});
  write(prefix + 'angora-combos.json', {version: 1, domain, pageId, combos: {}});
  mkdirSync(new URL(prefix + 'i18n/', root), {recursive: true});
  write(prefix + 'i18n/es.json', {version: 1, domain, pageId, lang: 'es', dictionary: {}});
}
write('site-config.json', {
  version: 1, domain, aliases: ['www.dipsydoo.com.mx'], defaultPageId: 'default',
  routes: pages.map(([pageId, path, label]) => ({path, pageId, label})),
  runtime: {analytics: {enabled: false, consentUI: 'none', track: []}, features: {debugMode: false}},
  environments: {test: {aliases: []}},
  site: {
    appIdentity: {identifier: 'dipsydoo', name: 'Dipsy Doo!', version: '0.2.0', description},
    theme: {defaultMode: 'light', palettes: {light: palette, dark: palette}},
    i18n: {defaultLanguage: 'es', supportedLanguages: [{code: 'es', label: 'Español'}]},
    seo: {siteName: 'Dipsy Doo!', title, description, canonicalOrigin: 'https://' + domain}
  }
});
write('components.json', {version: 1, domain, pageId: 'allPages', components: []});
writeDefaults('', 'allPages');
for (const [pageId, path, , pageTitle, pageDescription, render] of pages) {
  components = [];
  const page = shell(path, render());
  const prefix = pageId + '/';
  mkdirSync(new URL(prefix, root), {recursive: true});
  write(prefix + 'page-config.json', {
    version: 1, domain, pageId, rootIds: [page], modalRootIds: [],
    seo: {title: {es: pageTitle}, description: {es: pageDescription}, canonical: 'https://' + domain + path, robots: 'noindex,nofollow'}
  });
  write(prefix + 'components.json', {version: 1, domain, pageId, components});
  writeDefaults(prefix, pageId);
}
