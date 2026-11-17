import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const expectedGroups = [
  ['Rockabilly Jive', 1, '17:00', 60, 'Nueva Santa María', 'nueva-santa-maria'],
  ['Lindy Hop', 1, '20:00', 60, 'Guerrero', 'guerrero'],
  ['Charleston', 4, '19:00', 60, 'Guerrero', 'guerrero'],
  ['Lindy Hop', 4, '20:00', 60, 'Guerrero', 'guerrero'],
  ['Lindy Hop', 5, '17:00', 60, 'Nueva Santa María', 'nueva-santa-maria'],
  ['Rockabilly Jive', 6, '11:30', 90, 'Jardín Pushkin', 'jardin-pushkin'],
  ['Lindy Hop', 0, '11:30', 90, 'Parque Hundido', 'parque-hundido']
];

function calendarGroups(page) {
  const {components} = JSON.parse(readFileSync(new URL(`../${page}/components.json`, import.meta.url), 'utf8'));
  return components.filter(({type}) => type === 'weekly-calendar').map(({config}) => config);
}

test('both class pages offer permanent calendar controls for the same seven groups', () => {
  const schedule = calendarGroups('horarios-y-sedes');
  const catalog = calendarGroups('clases');
  assert.equal(schedule.length, 7);
  assert.equal(new Set(schedule.map(({uid}) => uid)).size, 7);
  const byUid = (a, b) => a.uid.localeCompare(b.uid);
  assert.deepEqual(catalog.sort(byUid), [...schedule].sort(byUid));

  for (const [index, config] of schedule.entries()) {
    const [style, weekday, localTime, durationMinutes, venue, id] = expectedGroups[index];
    assert.equal(config.summary, 'Dipsy Doo! · ' + style);
    assert.equal(config.weekday, weekday);
    assert.equal(config.localTime, localTime);
    assert.equal(config.durationMinutes, durationMinutes);
    assert.equal(config.timeZone, 'America/Mexico_City');
    assert.match(config.uid, /^[a-z0-9-]+$/);
    assert(config.location.includes(venue));
    assert.equal(config.url, 'https://dipsydoo.com.mx/horarios-y-sedes#' + id);
    assert.match(config.description, /Mapa de referencia: https:\/\/www\.google\.com\/maps\/search\//);
    assert.match(config.ariaLabel, /^Agregar al calendario/);
    assert(config.ariaLabel.includes(style) && config.ariaLabel.includes(localTime) && config.ariaLabel.includes(venue));
  }
});
