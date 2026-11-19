import { mkdirSync, writeFileSync } from 'node:fs';
import { venues } from './venues.mjs';

const domain = 'dipsydoo.com.mx';
const origin = 'https://' + domain;
const phone = '+525540312687';
const root = new URL('../', import.meta.url);
const assets = 'https://assets.zoolandingpage.com.mx/dipsydoo.com.mx/shared/images/';
const blue = '#004d9d';
const pink = '#d61983';
const ink = '#251938';
const paper = '#fff9f3';
const blush = '#f2deef';
const border = '#decddd';
const title = 'Clases de Swing Lindy Hop y Rockabilly Jive en CDMX | Dipsy Doo!';
const description = 'Aprende Lindy Hop, Rockabilly Jive y Charleston en Ciudad de México. Puedes empezar sin experiencia y venir sin pareja. Consulta horarios y sedes.';
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
const heroPhoto = 'https://assets.zoolandingpage.com.mx/dipsydoo.com.mx/shared/hero-images/portada-web-1200-20261111.webp';
const photo = (name) => assets + '20261110-' + name + '.webp';
const socialProfiles = [
  {id: 'instagram', name: 'Instagram', href: 'https://www.instagram.com/dipsydoo/'},
  {id: 'facebook', name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61562416997881'},
  {id: 'tiktok', name: 'TikTok', href: 'https://www.tiktok.com/@dipsy_doo'}
];
const protocolPosters = [3780, 3296, 3780, 3313, 3436].map((height, index) => ({
  src: assets + '20261118-protocolo-' + (index + 1) + '.webp', width: 1890, height
}));
const videoUrl = (name) => 'https://assets.zoolandingpage.com.mx/dipsydoo.com.mx/shared/videos/20261110-' + name + '.mp4';
const whatsapp = (message) => 'https://wa.me/' + phone.slice(1) + '?text=' + encodeURIComponent(message);
const weekdays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
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
  ['Lindy Hop', 'Jazz swing', 'El Lindy Hop se baila con jazz swing. Su cadencia sincopada deja espacio para improvisar, jugar con la música y crear tus propias variaciones. En clase trabajamos las bases técnicas, el ritmo y la conexión en pareja.', photo('lindy-hop')],
  ['Rockabilly Jive', 'Rock and roll y rhythm and blues', 'La energía del rock and roll y el rhythm and blues se encuentra con el baile en pareja. Aprende a enlazar los pasos básicos y a reconocer el pulso de la música con acompañamiento y retroalimentación.', dancePhoto],
  ['Charleston', 'Ritmo y juego de pies', 'Explora el juego de pies y las variaciones rítmicas del Charleston. Un espacio para descubrir otra manera de disfrutar el swing. El grupo de los jueves se reúne en Guerrero.', photo('charleston')]
];
const prices = [
  ['Entre semana', [['1 hora por semana', '$350'], ['2 horas por semana', '$650'], ['3 horas o más', '$750']]],
  ['Fin de semana', [['1 hora y media por semana', '$450'], ['3 horas o más', '$750']]]
];
const faq = [
  {id: 'partner', title: '¿Necesito llevar pareja?', content: 'No. Puedes venir sin pareja. Durante la clase rotamos para practicar con distintas personas.'},
  {id: 'experience', title: '¿Puedo aprender si nunca he bailado?', content: 'Sí. Puedes empezar desde nivel principiante en Lindy Hop, Rockabilly Jive o Charleston.'},
  {id: 'observe', title: '¿Puedo observar una clase?', content: 'Sí. Puedes venir a observar una clase para ver si te gusta. Escríbenos por WhatsApp antes de ir para confirmar el horario y el punto de encuentro.'},
  {id: 'join', title: '¿Cómo confirmo cupo para mi primera clase?', content: 'Elige un estilo y horario. Escríbenos por WhatsApp con el grupo que te interesa para confirmar cupo y el punto de encuentro.'},
  {id: 'single', title: '¿Puedo pagar una sola clase?', content: 'Las clases se manejan por mensualidad. Consulta las opciones de acuerdo con tu frecuencia semanal.'},
  {id: 'format', title: '¿Cómo se desarrolla una clase?', content: 'Comenzamos con calentamiento, trabajamos las bases técnicas y practicamos en pareja. Recibirás retroalimentación durante la clase.'},
  {id: 'social', title: '¿También organizan bailes sociales?', content: 'Sí. La escuela anuncia un baile social gratuito cada mes. Escríbenos para confirmar la próxima fecha y el lugar.'}
];
const testimonials = [
  {
    quote: 'Me encanta la paciencia y la tolerancia de los profesores, fomentan un excelente ambiente de aprendizaje.',
    photo: {src: assets + '20261118-testimonio-1.webp', width: 480, height: 640, alt: 'Persona de la comunidad bailando frente a un mural.'}
  },
  {
    quote: 'Los compañeros de las clases son buena onda y me he sentido en un buen ambiente incluyendo a los maestros.',
    photo: {src: assets + '20261118-testimonio-2.webp', width: 480, height: 640, alt: 'Persona de la comunidad con camisa clara y lentes, en una fotografía frente al espejo.'}
  },
  {
    quote: '… he adquirido confianza y fluidez para disfrutar del swing',
    photo: {src: assets + '20261118-testimonio-3.webp', width: 504, height: 640, alt: 'Alumnado de Dipsy Doo! practicando baile en pareja durante una clase.'}
  },
  {
    quote: 'La forma de enseñanza usada por los maestros me parece adecuada con un buen trato para cada alumno.',
    photo: {src: assets + '20261118-testimonio-4.webp', width: 480, height: 640, alt: 'Retrato compartido por una persona de la comunidad de Dipsy Doo!.'}
  },
  {
    quote: 'Saber que puedo día a día aprender algo más, me hace muy feliz y entender que en el baile siempre hay algo nuevo que aprender.',
    photo: {src: assets + '20261118-testimonio-5.webp', width: 377, height: 640, alt: 'Integrantes de la comunidad con vestidos azules durante una presentación.'}
  },
  {quote: '… es agradable aprender con algo que me gusta hacer'}
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
  add(id, 'link', {text: label, href, scrollRestoration: {mode: 'top', behavior: 'instant'}, styles: {...tap, color: blue, fontWeight: '700', ...css}, ...attributes});
const image = (id, src, alt, w, h, options = {}) =>
  add(id, 'media', {tag: 'image', src, alt, width: w, height: h, loading: 'lazy', decoding: 'async', ...options});
const photograph = (id, src, alt, w = 1440, h = 1440) => image(id, src, alt, w, h, {
  styles: {display: 'block', width: '100%', height: 'auto', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: '8px'}
});
function socialLinks(id, css = {}) {
  return box(id, socialProfiles.map(profile => link(id + '-' + profile.id, '', profile.href, {
    gap: '10px', padding: '9px 15px', borderRadius: '24px', border: '1px solid ' + border,
    background: '#ffffff', color: ink, textDecoration: 'none', fontSize: '15px'
  }, {
    target: '_blank', rel: 'noopener noreferrer',
    ariaLabel: profile.name + ' de Dipsy Doo! (abre en una pestaña nueva)',
    components: [
      image(id + '-' + profile.id + '-icon', 'https://assets.zoolandingpage.com.mx/dipsydoo.com.mx/shared/logos/20261118-' + profile.id + '-simple-icons-16-14-0.svg', '', 24, 24, {
        styles: {display: 'block', width: '24px', height: '24px', flexShrink: '0'}
      }),
      text(id + '-' + profile.id + '-label', profile.name, 'span')
    ]
  })), {...flex, gap: '10px', ...css}, 'nav', {ariaLabel: 'Redes sociales de Dipsy Doo!'});
}
function videoFigure(id, name, label, detail, portrait = false) {
  return box(id, [
    add(id + 'Player', 'media', {tag: 'video', src: videoUrl(name), styles: {
      display: 'block', width: '100%', aspectRatio: portrait ? '9 / 16' : '16 / 9',
      maxHeight: portrait ? '480px' : 'none', objectFit: 'contain', background: ink, borderRadius: '8px'
    }}),
    text(id + 'Caption', label, 'figcaption', {fontWeight: '700', marginTop: '12px', fontSize: '20px'}),
    text(id + 'Description', detail, 'p', {marginTop: '5px', maxWidth: '55ch'}),
    link(id + 'Direct', 'Abrir video de ' + label.toLowerCase() + ' ↗', videoUrl(name), {fontSize: '14px'}, {target: '_blank', rel: 'noopener noreferrer'})
  ], {margin: '0', minWidth: '0'}, 'figure', {ariaLabel: label});
}
const sectionId = (id) => ({id, tabindex: -1});
const heading = (id, label) => text(id, label, 'h2', subheading);
const accordion = (id, items) => add(id, 'accordion', {
  mode: 'multiple',
  items,
  defaultItemContainerClasses: 'ank-borderBottom-1px__solid__HASHdecddd',
  defaultItemButtonConfig: {classes: 'ank-display-flex ank-width-100per ank-padding-14px ank-bg-transparent ank-color-HASH004d9d ank-border-0 ank-textAlign-left ank-fontWeight-700'},
  defaultItemPanelClasses: 'ank-padding-14px'
});

const calendarHint = (id) => text(id, 'Abre «Agregar al calendario» para guardar la próxima clase o repetirla cada semana. Al importar el archivo .ics, revisa que tu calendario conserve los avisos de un día antes y una hora antes. Confirma posibles cambios con la escuela.', 'p', {maxWidth: '66ch', marginBlock: '12px 18px'});

function classCalendar(id, [day, time, style, venue, weekend]) {
  const place = venues[venue];
  const groupSlug = [style, day, time, place.id].join('-')
    .normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return add(id, 'weekly-calendar', {
    weekday: weekdays.indexOf(day),
    localTime: time,
    durationMinutes: weekend ? 90 : 60,
    timeZone: 'America/Mexico_City',
    summary: 'Dipsy Doo! · ' + style,
    location: place.location,
    description: 'Confirma el cupo y el punto de encuentro con Dipsy Doo! antes de ir, especialmente en días festivos.\nMapa de referencia: ' + place.mapUrl,
    url: origin + paths.schedule + '#' + place.id,
    uid: 'dipsy-doo-' + groupSlug,
    ariaLabel: `Agregar al calendario: ${style}, ${day.toLowerCase()} a las ${time} en ${venue}`
  });
}

function pageIntro(kicker, headingText, body) {
  return box('pageIntro', [box('pageIntroLayout', [
    text('introKicker', kicker, 'p', {...eyebrow, color: blue}),
    text('pageHeading', headingText, 'h1', {...headline, marginBlock: '10px 16px'}),
    text('introDescription', body, 'p', {fontSize: 'clamp(17px, 2vw, 21px)', maxWidth: '57ch'})
  ], section)], {background: heroBackground, borderBlock: '1px solid ' + border}, 'section');
}

function renderHome() {
  const hero = box('hero', [
    image('heroPhoto', heroPhoto, '', 1200, 900, {
      loading: 'eager', fetchPriority: 'high',
      styles: {display: 'block', position: 'absolute', inset: '0', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 55%'}
    }),
    box('heroShade', [], {
      position: 'absolute', inset: '0', pointerEvents: 'none',
      backgroundImage: 'linear-gradient(90deg, rgba(18, 17, 42, .94), rgba(18, 17, 42, .62) 56%, rgba(18, 17, 42, .28))'
    }),
    box('heroLayout', [
      box('heroCopy', [
        text('heroKicker', 'Escuela de baile · Ciudad de México', 'p', {...eyebrow, color: '#ffffff'}),
        text('pageHeading', 'Dipsy Doo!', 'h1', {...headline, marginBlock: '10px 12px', fontSize: 'clamp(58px, 9vw, 108px)', color: '#ffffff'}),
        text('heroTagline', '¡Clases Swingcreíbles!', 'p', {fontFamily: 'Georgia, serif', fontSize: 'clamp(25px, 3.5vw, 38px)', fontWeight: '700', marginBottom: '14px'}),
        text('heroDescription', 'Aprende Lindy Hop, Rockabilly Jive y Charleston. Puedes empezar desde cero y venir sin pareja.', 'p', {fontSize: 'clamp(17px, 2.2vw, 22px)', maxWidth: '35ch'}),
        box('heroLinks', [link('heroSchedule', 'Ver horarios y sedes', paths.schedule, {...action, background: '#ffffff', color: blue}), link('heroClasses', 'Explorar las clases', paths.classes, {color: '#ffffff'})], {...flex, marginTop: '22px'})
      ], {maxWidth: '640px'})
    ], {
      ...section, position: 'relative', display: 'flex', alignItems: 'center',
      minHeight: 'min(660px, calc(100svh - 140px))', paddingBlock: 'clamp(44px, 7vw, 90px)'
    })
  ], {position: 'relative', overflow: 'hidden', color: '#ffffff', backgroundColor: ink}, 'section');
  const destinations = [
    ['estilos', '01 · Las clases', 'Del swing al rock and roll', 'Conoce los tres estilos y qué practicarás en cada uno.', 'Ver estilos de baile', paths.classes],
    ['horarios', '02 · La semana', 'Encuentra un grupo', 'Consulta el horario y el punto de referencia de las cuatro zonas.', 'Consultar horarios y sedes', paths.schedule],
    ['costos', '03 · Colegiaturas', 'Elige tu frecuencia', 'Compara las mensualidades entre semana y en fin de semana.', 'Ver horarios y colegiaturas', paths.schedule],
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
  const invitation = box('homeInvitation', [
    photograph('homeCommunityPhoto', photo('comunidad'), 'La comunidad de Dipsy Doo! reunida en un quiosco al aire libre.', 1800, 1800),
    box('homeInvitationCopy', [
      text('homeInvitationKicker', 'Un paso a la vez', 'p', {...eyebrow, color: blue}),
      heading('homeInvitationHeading', 'Aprende las bases. Encuentra tu comunidad.'),
      text('homeInvitationText', 'Calentamiento, técnica y práctica en pareja, con retroalimentación constante. En Dipsy Doo! hay lugar para empezar desde cero y seguir descubriendo el baile.', 'p', {marginBlock: '16px'}),
      link('homeCommunityLink', 'Conoce la comunidad y los bailes sociales', paths.community)
    ])
  ], {...section, ...grid, alignItems: 'center', gap: 'clamp(24px, 5vw, 60px)'}, 'section');
  return [hero, overview, invitation];
}

function renderClasses() {
  return [
    pageIntro('Clases presenciales · CDMX', 'Clases para bailar música swing y rock and roll en CDMX', 'Elige entre Lindy Hop, Rockabilly Jive y Charleston. Puedes empezar desde cero y venir sin pareja. También puedes venir a observar una clase para ver si te gusta. Escríbenos por WhatsApp para confirmar el grupo y el punto de encuentro.'),
    box('classList', [
      calendarHint('classCalendarHint'),
      ...styles.map(([label, kicker, detail, src], index) => box('class-' + index, [
        photograph('classPhoto-' + index, src, index === 1 ? 'Una pareja de la comunidad Dipsy Doo! en una pose de baile frente a un mural.' : 'Una pareja de Dipsy Doo! bailando ' + label + '.'),
        box('classCopy-' + index, [
        text('classKicker-' + index, kicker, 'p', {...eyebrow, color: blue}),
        heading('classHeading-' + index, label),
        text('classDetail-' + index, detail, 'p', {maxWidth: '57ch', marginTop: '10px'}),
        text('classScheduleLabel-' + index, 'Horarios semanales', 'h3', {fontSize: '16px', fontWeight: '700', marginTop: '14px'}),
        box('classScheduleList-' + index, groups
          .filter(([, , style]) => style === label)
          .map((group, row) => box('classTime-' + index + '-' + row, [
            text('classTimeText-' + index + '-' + row, group[0] + ' a las ' + group[1] + ' en ' + group[3], 'span'),
            classCalendar('classCalendar-' + index + '-' + row, group)
          ], {borderTop: '1px solid ' + border, paddingTop: '8px'})), {marginBlock: '8px 0'}),
        link('classAsk-' + index, 'Preguntar por ' + label, whatsapp('Hola, Dipsy Doo! Me interesan sus clases de ' + label + '. ¿Qué grupo me recomiendan?'), {marginTop: '12px'})
        ])
      ], {...grid, alignItems: 'center', gap: 'clamp(24px, 5vw, 50px)', borderTop: '1px solid ' + border, paddingBlock: '28px 34px'}, 'article', sectionId(['lindy-hop', 'rockabilly-jive', 'charleston'][index]))),
      link('classSchedule', 'Buscar un grupo y horario', paths.schedule, action)
    ], section, 'section'),
    box('classVideos', [
      heading('classVideosHeading', 'Asómate a la pista'),
      text('classVideosIntro', 'Conoce el ambiente y el movimiento con estos videos de la escuela.', 'p', {marginBlock: '12px 24px'}),
      box('classVideoGrid', [
        videoFigure('classPractice', 'clase', 'Práctica en clase', 'Una mirada a la práctica y al baile en pareja dentro de la escuela.', true),
        videoFigure('charlestonPractice', 'charleston', 'Charleston en movimiento', 'Ritmo y juego de pies en un video compartido por la escuela.', true)
      ], grid)
    ], section, 'section'),
    box('firstVisit', [box('firstVisitLayout', [
      heading('firstVisitHeading', 'Así es una clase'),
      text('firstVisitDetails', 'Empezamos con calentamiento, trabajamos las bases y cerramos con práctica en pareja. La rotación te permite practicar con distintas personas y recibir retroalimentación.', 'p', {maxWidth: '61ch', marginBlock: '12px 10px'}),
      link('classFaq', 'Ir a contacto y preguntas frecuentes', paths.contact)
    ], section)], {background: blush}, 'section')
  ];
}

function renderSchedule() {
  return [
    pageIntro('Clases semanales · CDMX', 'Horarios y sedes', 'Consulta las clases en Guerrero, Nueva Santa María, Jardín Pushkin y Parque Hundido. Las mensualidades de referencia empiezan en $350 MXN. Confirma el cupo y el punto de encuentro por WhatsApp.'),
    box('schedule', [
      heading('scheduleHeading', 'Encuentra tu clase'),
      calendarHint('scheduleCalendarHint'),
      box('scheduleItems', groups.map((group, index) => {
        const [day, time, style, venue, weekend] = group;
        const id = 'group-' + index;
        return box(id, [
          text(id + '-time', day + ' · ' + time, 'p', {...eyebrow, color: blue}),
          text(id + '-style', style, 'h3', {fontSize: '21px', fontWeight: '700', marginBlock: '4px 0'}),
          link(id + '-venue', venue, '#' + venues[venue].id, {}, {ariaLabel: 'Cómo llegar a ' + venue}),
          text(id + '-price', weekend ? 'Desde $450 MXN al mes · 90 min por clase' : 'Desde $350 MXN al mes · 60 min por clase', 'p', {fontSize: '15px'}),
          classCalendar(id + '-calendar', group)
        ], {minWidth: '0', border: '1px solid ' + border, borderRadius: '12px', padding: '16px', background: '#ffffff'}, 'article');
      }), {...grid, marginTop: '16px', alignItems: 'start'}),
      box('scheduleLinks', [
        link('schedulePricing', 'Ver todas las colegiaturas', '#colegiaturas'),
        link('askSchedule', 'Confirmar sede y cupo por WhatsApp', whatsapp('Hola, Dipsy Doo! Me gustaría confirmar el cupo y el punto de encuentro de una clase.'))
      ], {...flex, marginTop: '12px'})
    ], section, 'section'),
    box('venues', [
      heading('venuesHeading', 'Cómo llegar a cada sede'),
      box('venueList', Object.entries(venues).map(([venue, {id, description, mapUrl, mapLabel, photos = []}]) => box('venue-' + id, [
        text('venueName-' + id, venue, 'h3', {fontSize: '21px', fontWeight: '700'}),
        text('venueDetails-' + id, groups.filter(group => group[3] === venue).map(group => group[0] + ' ' + group[1] + ' · ' + group[2]).join(' / '), 'p', {marginBlock: '8px'}),
        text('venueDescription-' + id, description),
        ...photos.map(({src, alt, width, height}, index) => image('venuePhoto-' + id + '-' + index, src, alt, width, height, {
          styles: {display: 'block', width: '100%', height: 'auto', marginTop: '12px', borderRadius: '8px'}
        })),
        box('venueActions-' + id, [
          link('venueMap-' + id, mapLabel + ' ↗', mapUrl, {}, {target: '_blank', rel: 'noopener noreferrer', ariaLabel: mapLabel + ' · ' + venue}),
          link('venueContact-' + id, 'Pedir el punto por WhatsApp', whatsapp('Hola, Dipsy Doo! ¿Me comparten el punto de encuentro de la sede ' + venue + '?'), {}, {ariaLabel: 'Pedir el punto por WhatsApp · ' + venue})
        ], {...flex, gap: '0 18px', marginTop: '8px'})
      ], {borderTop: '1px solid ' + border, paddingTop: '18px', scrollMarginTop: '24px'}, 'article', sectionId(id))), {
        ...grid, marginTop: '22px', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))'
      })
    ], {...section, paddingTop: '0'}, 'section', sectionId('sedes')),
    box('prices', [box('priceLayout', [
      text('pricesKicker', 'Precios de referencia · MXN', 'p', {...eyebrow, color: blue}),
      heading('pricesHeading', 'Colegiaturas mensuales'),
      box('priceColumns', prices.map(([label, plans], index) => box('price-' + index, [
        text('priceLabel-' + index, label, 'h3', {fontSize: '21px', fontWeight: '700', marginBottom: '8px'}),
        ...plans.map(([frequency, amount], plan) => {
          const id = 'plan-' + index + '-' + plan;
          return box(id, [text(id + '-label', frequency, 'span'), text(id + '-value', amount, 'strong', {color: blue})], {...flex, justifyContent: 'space-between', paddingBlock: '10px', borderTop: '1px solid ' + border});
        })
      ], {}, 'article')), {...grid, marginBlock: '22px 14px'}),
      text('priceNote', 'Los importes de referencia se tomaron del cartel de noviembre y diciembre de 2026. Confirma con la escuela el plan y la mensualidad vigente para tu grupo.'),
      link('priceContact', 'Ver opciones de contacto', paths.contact, {marginTop: '10px'}),
      link('scheduleOriginal', 'Consultar el cartel de noviembre y diciembre de 2026 ↗', photo('horarios'), {display: 'flex', fontSize: '14px'}, {target: '_blank', rel: 'noopener noreferrer'})
    ], section)], {background: blush}, 'section', sectionId('colegiaturas'))
  ];
}

function renderCommunity() {
  return [
    pageIntro('Dipsy Doo! · Comunidad', 'El swing también se baila en comunidad', 'Entre clases y bailes sociales hay espacio para probar lo aprendido, escuchar música y conocer a otras personas que disfrutan bailar.'),
    box('communityShortcuts', [
      link('communityVideosShortcut', 'Videos de la comunidad', '#momentos'),
      link('communityGalleryShortcut', 'Galería de encuentros', '#galeria'),
      link('communityTestimonialsShortcut', 'Testimonios', '#testimonios'),
      link('communityConductShortcut', 'Código de conducta', '#convivencia'),
      link('communityProtocolShortcut', 'Protocolo Violencia de Género', '#protocolo-violencia-de-genero')
    ], {...width, ...flex, paddingBlock: '18px'}, 'nav', {ariaLabel: 'En esta página'}),
    box('social', [
      box('communityCopy', [
        heading('socialHeading', 'Baile social'),
        text('socialDetails', 'El calendario de la escuela anuncia un baile social gratuito cada mes. Pregunta por la próxima fecha y por talleres especiales.', 'p', {marginBlock: '12px 18px'}),
        link('socialContact', 'Preguntar por el próximo baile', whatsapp('Hola, Dipsy Doo! ¿Cuándo será su próximo baile social?'), action)
      ]),
      box('communityFigure', [
        photograph('communityPhoto', photo('comunidad'), 'Grupo de Dipsy Doo! reunido en un quiosco al aire libre.', 1800, 1800)
      ], {margin: '0'}, 'figure')
    ], {...section, ...grid, alignItems: 'center'}, 'section'),
    box('communityVideos', [
      heading('communityVideosHeading', 'Momentos que se bailan juntos'),
      text('communityVideosIntro', 'El baile continúa fuera de clase, entre encuentros, música y presentaciones de la comunidad.', 'p', {marginBlock: '12px 24px'}),
      box('communityVideoGrid', [
        videoFigure('communityDance', 'comunidad', 'Nuestra comunidad', 'Un encuentro de baile compartido por Dipsy Doo!'),
        videoFigure('communityPerformance', 'dia-de-muertos', 'Día de Muertos', 'Una coreografía de la comunidad durante su presentación de Día de Muertos.')
      ], grid)
    ], section, 'section', sectionId('momentos')),
    box('communityGallery', [
      heading('communityGalleryHeading', 'De la clase a los encuentros'),
      box('communityGalleryGrid', [
        box('anniversaryFigure', [
          photograph('anniversaryPhoto', photo('aniversario'), 'Foto grupal durante el primer aniversario de Dipsy Doo!.', 1800, 1800),
          text('anniversaryCaption', 'Nuestro primer aniversario', 'figcaption', {fontWeight: '700', marginTop: '12px'})
        ], {margin: '0'}, 'figure'),
        box('performanceFigure', [
          photograph('performancePhoto', photo('dia-de-muertos'), 'Integrantes de Dipsy Doo! al finalizar una presentación de Día de Muertos.'),
          text('performanceCaption', 'Día de Muertos en la pista', 'figcaption', {fontWeight: '700', marginTop: '12px'})
        ], {margin: '0'}, 'figure'),
        box('teamFigure', [
          photograph('teamPhoto', photo('equipo'), 'Integrantes de la comunidad reunidos para una foto de grupo.', 860, 591),
          text('teamCaption', 'Compartir también es parte del baile', 'figcaption', {fontWeight: '700', marginTop: '12px'})
        ], {margin: '0'}, 'figure')
      ], {...grid, marginTop: '24px'})
    ], section, 'section', sectionId('galeria')),
    box('testimonials', [
      heading('testimonialsHeading', 'Testimonios'),
      text('testimonialsIntro', 'Respuestas del alumnado al formulario de la escuela.', 'p', {marginBlock: '12px 26px'}),
      box('testimonialsGrid', testimonials.map(({quote, photo: portrait}, index) => box('testimonial-' + index, [
        ...(portrait ? [image('testimonialPhoto-' + index, portrait.src, portrait.alt, portrait.width, portrait.height, {
          styles: {display: 'block', width: '100%', height: '220px', objectFit: 'contain', borderRadius: '6px', background: paper, marginBottom: '18px'}
        })] : []),
        text('testimonialQuote-' + index, '«' + quote + '»', 'p', {
          fontFamily: 'Georgia, serif', fontSize: 'clamp(18px, 2vw, 22px)', lineHeight: '1.5'
        })
      ], {margin: '0', padding: '16px 18px', borderInlineStart: '3px solid ' + pink, background: '#ffffff'}, 'figure')), grid)
    ], section, 'section', sectionId('testimonios')),
    box('conduct', [box('conductLayout', [
      text('conductKicker', 'Cuidemos la pista', 'p', {...eyebrow, color: blue}),
      heading('conductHeading', 'Código de etiqueta para bailes sociales'),
      text('conductIntro', 'El código de etiqueta y conducta de Dipsy Doo! nos invita a cuidarnos y disfrutar los bailes sociales.', 'p', {marginBlock: '14px 22px', maxWidth: '63ch'}),
      box('conductPosters', [1, 2].map(part => box('conductFigure' + part, [
        image('conductPosterImage' + part, photo('codigo-de-conducta-' + part), 'Código de etiqueta y conducta para bailes sociales de Dipsy Doo!, parte ' + part + ' de 2.', 1080, 1350, {
          styles: {display: 'block', width: '100%', height: 'auto'}
        }),
        link('conductPoster' + part, 'Abrir código de etiqueta · parte ' + part + ' ↗', photo('codigo-de-conducta-' + part), {marginTop: '10px'}, {target: '_blank', rel: 'noopener noreferrer'})
      ], {margin: '0', minWidth: '0'}, 'figure')), {
        ...grid, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', alignItems: 'start', marginBottom: '24px'
      }),
      box('conductList', [
        'Respeta cuando alguien no quiere bailar y acepta su respuesta sin insistir.',
        'Ajusta tus movimientos a tu pareja y baila con suavidad.',
        'Cuida el espacio de baile y recoge tu basura.',
        'Cuida tu higiene y lleva cambios de ropa cuando los necesites.',
        'Evita los impactos y el contacto inapropiado. Si ocurre, discúlpate y procura que no se repita.',
        'Comparte observaciones sobre la forma de bailar solo cuando tu pareja te las pida.',
        'Reserva los aéreos para exhibiciones y círculos de jam, con personas con quienes los hayas practicado y acordado.'
      ].map((rule, index) => box('conductRule-' + index, [text('conductText-' + index, rule)], {paddingBlock: '8px'}, 'li')), {paddingLeft: '22px', margin: '0', maxWidth: '75ch'}, 'ul'),
      text('conductSupport', 'Si percibes una situación incómoda, avisa a las personas organizadoras para que puedan apoyarte.', 'p', {fontWeight: '700', marginBlock: '20px 12px'})
    ], section)], {background: blush}, 'section', sectionId('convivencia')),
    box('protocol', [
      heading('protocolHeading', 'Protocolo Violencia de Género'),
      text('protocolIntro', 'Protocolo de acción compartido por Dipsy Doo! para atender denuncias de violencia de género. Consulta las cinco láminas en orden o abre cada una en tamaño completo.', 'p', {marginBlock: '14px 22px', maxWidth: '66ch'}),
      box('protocolNavigation', protocolPosters.map((poster, index) =>
        link('protocolShortcut' + (index + 1), 'Lámina ' + (index + 1), '#protocolo-lamina-' + (index + 1))
      ), {...flex, marginBottom: '24px'}, 'nav', {ariaLabel: 'Láminas del protocolo'}),
      box('protocolPosters', protocolPosters.map((poster, index) => {
        const part = index + 1;
        return box('protocolFigure' + part, [
          image('protocolImage' + part, poster.src, 'Protocolo de acción ante denuncias de violencia de género de Dipsy Doo!, lámina ' + part + ' de 5.', poster.width, poster.height, {
            styles: {display: 'block', width: '100%', height: 'auto', background: '#000000'}
          }),
          link('protocolOriginal' + part, 'Abrir lámina ' + part + ' de 5 en tamaño completo ↗', poster.src, {marginTop: '12px'}, {target: '_blank', rel: 'noopener noreferrer'})
        ], {margin: '0'}, 'figure', sectionId('protocolo-lamina-' + part));
      }), {display: 'grid', gap: '30px', maxWidth: '860px', marginInline: 'auto'})
    ], section, 'section', sectionId('protocolo-violencia-de-genero')),
    box('communityNext', [
      heading('communityNextHeading', 'Encuentra tu siguiente baile'),
      text('communityNextDetails', 'Pregunta por el próximo social, las clases regulares y los talleres especiales disponibles.', 'p', {marginBlock: '12px 18px'}),
      link('communityNextContact', 'Consultar próximas actividades', whatsapp('Hola, Dipsy Doo! Me gustaría conocer sus próximos bailes sociales y talleres.'), action)
    ], section, 'section')
  ];
}

function renderContact() {
  return [
    pageIntro('Dudas, cupos y primera visita', '¿Qué te gustaría bailar?', 'Cuéntanos qué estilo, horario o sede te interesa. Te ayudamos a encontrar un grupo.'),
    box('contactOptions', [
      heading('contactHeading', 'Escríbenos por WhatsApp'),
      text('contactDetails', 'Indícanos el grupo que te interesa. Te podemos confirmar el cupo y el punto de encuentro.', 'p', {marginBlock: '10px 18px'}),
      box('contactLinks', [
        link('whatsapp', 'WhatsApp +52 55 4031 2687 ↗', whatsapp('Hola, Dipsy Doo! Me gustaría saber qué grupos tienen disponibles.'), action),
        link('contactSchedule', 'Consultar horarios y sedes', paths.schedule),
        link('contactQuestions', 'Ver preguntas frecuentes', '#preguntas')
      ], flex)
    ], section, 'section'),
    box('contactSocial', [
      heading('contactSocialHeading', 'Síguenos en redes'),
      socialLinks('contactSocialLinks', {marginTop: '18px'})
    ], section, 'section'),
    box('faq', [box('faqLayout', [
      heading('faqHeading', 'Preguntas frecuentes antes de tu primera clase'),
      box('faqItems', faq.map(({id, title, content}) => box('faq-' + id, [
        text('faq-question-' + id, title, 'h3', {fontSize: '20px', fontWeight: '700', lineHeight: '1.25'}),
        text('faq-answer-' + id, content, 'p', {marginTop: '8px'})
      ], {paddingBlock: '16px', borderTop: '1px solid ' + border}, 'article')), {...grid, gap: '8px 26px', marginTop: '22px'})
    ], section)], {background: blush}, 'section', sectionId('preguntas')),
    box('contactCommunity', [
      photograph('contactTeamPhoto', photo('equipo'), 'La comunidad de Dipsy Doo! en una foto de grupo.', 860, 591),
      box('contactCommunityCopy', [
        heading('contactCommunityHeading', 'Te esperamos en la pista'),
        text('contactCommunityDetails', 'Puedes empezar sin experiencia y venir sin pareja. Antes de tu visita, confirma con la escuela el grupo y el punto de encuentro.', 'p', {marginBlock: '14px'}),
        link('contactCommunityLink', 'Conoce la comunidad y sus bailes sociales', paths.community)
      ])
    ], {...section, ...grid, alignItems: 'center', gap: 'clamp(24px, 5vw, 50px)'}, 'section')
  ];
}

const pages = [
  ['default', paths.home, 'Inicio', title, description, renderHome],
  ['clases', paths.classes, 'Clases', 'Lindy Hop, Rockabilly Jive y Charleston en CDMX | Dipsy Doo!', 'Compara los tres estilos de baile, mira videos de clase y conoce qué practicarás en tu primera visita, aunque empieces desde cero.', renderClasses],
  ['horarios-y-sedes', paths.schedule, 'Horarios y sedes', 'Horarios, sedes y precios de clases en CDMX | Dipsy Doo!', 'Consulta los horarios semanales de baile en Guerrero, Nueva Santa María, Jardín Pushkin y Parque Hundido, y las mensualidades de referencia.', renderSchedule],
  ['comunidad', paths.community, 'Comunidad', 'Bailes sociales de swing en CDMX | Dipsy Doo!', 'Conoce la comunidad de Dipsy Doo! en Ciudad de México con videos, fotos de los bailes sociales y testimonios del alumnado.', renderCommunity],
  ['contacto', paths.contact, 'Contacto', 'WhatsApp y primera clase de baile | Dipsy Doo!', 'Pregunta por cupos y sedes por WhatsApp. Descubre si necesitas pareja o experiencia, cómo se desarrolla una clase y si puedes observarla.', renderContact]
];

const organizationId = origin + '/#organizacion';
const mexicoCity = {'@type': 'City', name: 'Ciudad de México'};
const structuredData = {
  default: [
    {
      '@context': 'https://schema.org', '@type': 'Organization', '@id': organizationId,
      name: 'Dipsy Doo!', url: origin + '/', logo,
      description: 'Escuela de Lindy Hop, Rockabilly Jive y Charleston en Ciudad de México.',
      telephone: phone, areaServed: mexicoCity, sameAs: socialProfiles.map(profile => profile.href)
    },
    {
      '@context': 'https://schema.org', '@type': 'WebSite', '@id': origin + '/#sitio',
      name: 'Dipsy Doo!', url: origin + '/', inLanguage: 'es-MX', publisher: {'@id': organizationId}
    }
  ],
  clases: [
    {
      '@context': 'https://schema.org', '@type': 'Service', '@id': origin + paths.classes + '#clases',
      name: 'Clases presenciales de Lindy Hop, Rockabilly Jive y Charleston',
      url: origin + paths.classes, provider: {'@id': organizationId}, areaServed: mexicoCity
    }
  ]
};

function shell(path, children) {
  const header = box('header', [
    link('brandHome', 'Dipsy Doo!', '/', {fontFamily: 'Georgia, serif', fontSize: '25px', color: ink, textDecoration: 'none', gap: '10px'}, {
      components: [image('headerLogo', logo, '', 500, 500, {loading: 'eager', styles: {display: 'block', width: '48px', height: '48px', borderRadius: '50%'}})]
    }),
    box('menu', navigation.map(([href, label], index) =>
      link('nav-' + index, label, href, {fontSize: '15px', textUnderlineOffset: '4px', textDecoration: path === href ? 'underline' : 'none'}, path === href ? {ariaCurrent: 'page'} : {})
    ), {...flex, columnGap: '18px', rowGap: '0'}, 'nav', {ariaLabel: 'Principal'})
  ], {...width, ...flex, justifyContent: 'space-between', paddingBlock: '9px'}, 'header');
  const footer = box('footer', [box('footerLayout', [
    image('footerLogo', logo, 'Dipsy Doo!', 500, 500, {styles: {display: 'block', width: '76px', height: 'auto', borderRadius: '50%'}}),
    box('footerCopy', [
      text('footerBrand', 'Dipsy Doo!', 'p', {fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: '700'}),
      text('footerText', 'Clases presenciales de baile en Ciudad de México.', 'p', {fontSize: '14px'})
    ]),
    box('footerNavigation', navigation.map(([href, label], index) => link('footerNav-' + index, label, href, {fontSize: '14px', color: '#ffffff'})), {...flex, gap: '4px 18px'}, 'nav', {ariaLabel: 'Pie de página'}),
    socialLinks('footerSocialLinks', {width: '100%', paddingTop: '20px', borderTop: '1px solid #746881'})
  ], {...width, ...flex, paddingBlock: '30px', justifyContent: 'space-between'})], {background: ink, color: '#ffffff'}, 'footer');
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
  runtime: {analytics: {enabled: true, consentUI: 'none', track: []}, features: {debugMode: false}},
  environments: {test: {aliases: []}},
  site: {
    appIdentity: {identifier: 'dipsydoo', name: 'Dipsy Doo!', version: '0.3.0', description},
    theme: {defaultMode: 'light', palettes: {light: palette, dark: palette}},
    i18n: {defaultLanguage: 'es', supportedLanguages: [{code: 'es', label: 'Español'}]},
    icons: {favicon: logo, themeColor: ink},
    seo: {
      siteName: 'Dipsy Doo!', title, description, canonicalOrigin: origin,
      defaultImage: heroPhoto, openGraph: {locale: 'es_MX'},
      twitter: {card: 'summary_large_image'}
    }
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
    seo: {title: {es: pageTitle}, description: {es: pageDescription}, canonical: origin + path, robots: 'index,follow'},
    ...(structuredData[pageId] ? {structuredData: {entries: structuredData[pageId]}} : {})
  });
  write(prefix + 'components.json', {version: 1, domain, pageId, components});
  writeDefaults(prefix, pageId);
}
