import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const schedules = [
  ['20261116T230000Z', 60, 7, 'Rockabilly Jive', 'Nueva Santa María'],
  ['20261117T020000Z', 60, 7, 'Lindy Hop', 'Guerrero'],
  ['20261120T010000Z', 60, 7, 'Charleston', 'Guerrero'],
  ['20261120T020000Z', 60, 7, 'Lindy Hop', 'Guerrero'],
  ['20261120T230000Z', 60, 6, 'Lindy Hop', 'Nueva Santa María'],
  ['20261121T173000Z', 90, 6, 'Rockabilly Jive', 'Jardín Pushkin'],
  ['20261122T173000Z', 90, 6, 'Lindy Hop', 'Parque Hundido']
];
const date = (stamp) => Date.parse(stamp.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/, '$1-$2-$3T$4:$5:$6Z'));

function events(page) {
  const { components } = JSON.parse(readFileSync(new URL(`../${page}/components.json`, import.meta.url), 'utf8'));
  return components.flatMap(({ config }) => [...(config.html ?? '').matchAll(/href="data:text\/calendar;charset=utf-8,([^"]+)" download="([a-z0-9-]+\.ics)"/g)]
    .map(([, encoded, file]) => {
      const raw = decodeURIComponent(encoded);
      assert(raw.startsWith('BEGIN:VCALENDAR\r\n') && raw.endsWith('END:VCALENDAR\r\n'));
      assert(raw.split('\r\n').every(line => Buffer.byteLength(line) <= 75));
      const fields = raw.replace(/\r\n /g, '').split('\r\n');
      const get = (key) => fields.find(line => line.startsWith(key + ':'))?.slice(key.length + 1);
      assert.deepEqual(fields.filter(line => line.startsWith('TRIGGER:')), ['TRIGGER:-P1D', 'TRIGGER:-PT1H']);
      assert.equal(fields.filter(line => line === 'ACTION:DISPLAY').length, 2);
      assert.match(get('DESCRIPTION'), /Confirma el cupo y el punto de encuentro/);
      assert.match(get('DESCRIPTION'), /https:\/\/www\.google\.com\/maps\/search\//);
      return { file, uid: get('UID'), start: get('DTSTART'), end: get('DTEND'), rule: get('RRULE'), summary: get('SUMMARY'), location: get('LOCATION') };
    }));
}

test('both class pages offer the same weekly and individual calendar files', () => {
  const scheduleEvents = events('horarios-y-sedes').sort((a, b) => a.file.localeCompare(b.file));
  const classEvents = events('clases').sort((a, b) => a.file.localeCompare(b.file));
  assert.equal(scheduleEvents.filter(event => event.rule).length, 7, 'one series download per advertised group');
  assert.deepEqual(classEvents, scheduleEvents);
  assert.equal(new Set(scheduleEvents.map(event => event.uid)).size, scheduleEvents.length);
});

test('calendar files preserve Mexico City start times, durations and the end of the published schedule', () => {
  const downloads = events('horarios-y-sedes');
  assert.equal(downloads.length, schedules.reduce((sum, [, , count]) => sum + count + 1, 0));
  for (const [start, duration, count, style, venue] of schedules) {
    const series = downloads.find(event => event.rule && event.start === start);
    assert(series, `missing weekly ${style} series starting ${start}`);
    assert.equal(series.rule, `FREQ=WEEKLY;COUNT=${count}`);
    assert.match(series.summary, new RegExp(style));
    assert(series.location.includes(venue));
    assert.equal(date(series.end) - date(series.start), duration * 60_000);

    const dates = downloads.filter(event => !event.rule && event.summary === series.summary && event.location === series.location
      && (date(event.start) - date(start)) % (7 * 86_400_000) === 0).sort((a, b) => a.start.localeCompare(b.start));
    assert.equal(dates.length, count);
    for (const [index, event] of dates.entries()) {
      assert.equal(date(event.start), date(start) + index * 7 * 86_400_000);
      assert.equal(date(event.end) - date(event.start), duration * 60_000);
    }
  }
});
