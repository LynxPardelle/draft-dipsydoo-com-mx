const mapsSearch = (query) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);

export const venues = {
  Guerrero: {
    id: 'guerrero',
    location: 'Colonia Guerrero, Cuauhtémoc, CDMX',
    // https://mexicocity.cdmx.gob.mx/venues/metro-guerrero/
    description: 'Colonia Guerrero, en Cuauhtémoc. El Metro Guerrero (líneas 3 y B) es una referencia para ubicar la zona. Pide por WhatsApp la dirección de la clase.',
    mapUrl: mapsSearch('Colonia Guerrero, Cuauhtémoc, Ciudad de México'),
    mapLabel: 'Ver la colonia en Google Maps'
  },
  'Nueva Santa María': {
    id: 'nueva-santa-maria',
    location: 'Colonia Nueva Santa María, Azcapotzalco, CDMX',
    // https://mexicocity.cdmx.gob.mx/locations/azcapotzalco/
    description: 'Colonia Nueva Santa María, en Azcapotzalco. Puedes ubicar la colonia en el mapa y pedir por WhatsApp la dirección de la clase.',
    mapUrl: mapsSearch('Colonia Nueva Santa María, Azcapotzalco, Ciudad de México'),
    mapLabel: 'Ver la colonia en Google Maps'
  },
  'Jardín Pushkin': {
    id: 'jardin-pushkin',
    location: 'Jardín Pushkin, Av. Cuauhtémoc 104, Roma Norte, CDMX',
    // https://mexicocity.cdmx.gob.mx/venues/jardin-pushkin/
    description: 'Av. Cuauhtémoc 104, Roma Norte. Puedes llegar por la estación Jardín Pushkin del Metrobús (línea 3). Confirma en qué parte del jardín se reúne el grupo.',
    mapUrl: mapsSearch('Jardín Alexander Pushkin, Av. Cuauhtémoc 104, Roma Norte, Ciudad de México'),
    mapLabel: 'Ver el jardín en Google Maps'
  },
  'Parque Hundido': {
    id: 'parque-hundido',
    location: 'Parque Hundido, Av. Insurgentes Sur s/n, Extremadura Insurgentes, CDMX',
    // https://mexicocity.cdmx.gob.mx/venues/parque-hundido/
    description: 'Av. Insurgentes Sur s/n, colonia Extremadura Insurgentes. La estación Parque Hundido del Metrobús (línea 1) es una referencia para llegar. Pide por WhatsApp el punto exacto dentro del parque antes de ir.',
    mapUrl: mapsSearch('Parque Hundido, Av. Insurgentes Sur, Extremadura Insurgentes, Ciudad de México'),
    mapLabel: 'Ver el parque en Google Maps'
  }
};
