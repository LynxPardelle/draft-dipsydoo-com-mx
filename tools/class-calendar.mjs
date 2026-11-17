const dayOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const dayMs = 86_400_000;
const dateLabel = new Intl.DateTimeFormat('es-MX', {day: 'numeric', month: 'short', weekday: 'short', timeZone: 'UTC'});
const cdmxOffset = new Intl.DateTimeFormat('en', {timeZone: 'America/Mexico_City', timeZoneName: 'longOffset'});

const stamp = (date) => date.toISOString().replace(/[-:]|\.\d{3}/g, '');
const escapeText = (value) => value.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/[;,]/g, '\\$&');
const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[char]);
const slug = (value) => value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');

function fold(line) {
  let output = '';
  let bytes = 0;
  for (const char of line) {
    const width = Buffer.byteLength(char);
    if (bytes + width > 75) {
      output += '\r\n ';
      bytes = 1;
    }
    output += char;
    bytes += width;
  }
  return output;
}

function localStarts(day, time, firstDate, lastDate) {
  const dates = [];
  for (let ms = Date.parse(firstDate), end = Date.parse(lastDate); ms <= end; ms += dayMs) {
    const localDate = new Date(ms);
    if (dayOfWeek[localDate.getUTCDay()] !== day) continue;
    const isoDate = localDate.toISOString().slice(0, 10);
    const offset = cdmxOffset.formatToParts(localDate).find(({type}) => type === 'timeZoneName').value.slice(3);
    dates.push({localDate, isoDate, start: new Date(isoDate + 'T' + time + ':00' + offset)});
  }
  if (dates.slice(1).some(({start}, index) => start - dates[index].start !== 7 * dayMs)) {
    throw new Error('Weekly series crosses a time zone change');
  }
  return dates;
}

export function calendarDownloads({day, time, style, venue, duration, firstDate, lastDate, url}) {
  const dates = localStarts(day, time, firstDate, lastDate);
  if (!dates.length) return '';
  const stem = 'dipsy-doo-' + slug(`${style}-${day}-${time}-${venue.id}`);
  const summary = 'Dipsy Doo! · ' + style;
  const description = 'Confirma el cupo y el punto de encuentro con Dipsy Doo! antes de ir, especialmente en días festivos.\nMapa de referencia: ' + venue.mapUrl;
  const makeDownload = ({start}, suffix, label, count = 1) => {
    const name = stem + '-' + suffix;
    const lines = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Dipsy Doo//Horarios de clases//ES',
      'BEGIN:VEVENT', 'UID:' + name + '@dipsydoo.com.mx', 'DTSTAMP:' + stamp(new Date(firstDate)),
      'DTSTART:' + stamp(start), 'DTEND:' + stamp(new Date(start.getTime() + duration * 60_000)),
      ...(count > 1 ? ['RRULE:FREQ=WEEKLY;COUNT=' + count] : []),
      'SUMMARY:' + escapeText(summary), 'LOCATION:' + escapeText(venue.location),
      'DESCRIPTION:' + escapeText(description), 'URL:' + url,
      ...['-P1D', '-PT1H'].flatMap(trigger => ['BEGIN:VALARM', 'ACTION:DISPLAY', 'TRIGGER:' + trigger, 'DESCRIPTION:' + escapeText(summary), 'END:VALARM']),
      'END:VEVENT', 'END:VCALENDAR'
    ];
    const href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(lines.map(fold).join('\r\n') + '\r\n');
    const classes = 'ank-display-flex ank-alignItems-center ank-paddingBlock-12px ank-color-HASH004d9d ank-fontWeight-700';
    return `<a href="${href}" download="${name}.ics" class="${classes}">${escapeHtml(label)}</a>`;
  };
  const weekly = dates.length > 1
    ? `<div>${makeDownload(dates[0], 'semanal-' + firstDate, 'Serie semanal', dates.length)} <p>Hasta el ${dateLabel.format(dates.at(-1).localDate)}.</p></div>`
    : '';
  const singles = dates.map(entry => `<li>${makeDownload(entry, entry.isoDate, dateLabel.format(entry.localDate))}</li>`).join('');
  return `<details><summary class="ank-cursor-pointer ank-color-HASH004d9d ank-fontWeight-700 ank-paddingBlock-12px" aria-label="${escapeHtml(`Agregar al calendario: ${style}, ${day.toLowerCase()} a las ${time} en ${venue.location}`)}">Agregar al calendario</summary>${weekly}<p>Para una sola clase, elige la fecha:</p><ul>${singles}</ul></details>`;
}
