// Fotos curadas y verificadas visualmente
// Pexels: photo IDs públicos (CC0)
// Unsplash: photo IDs públicos (Unsplash License)

const px = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&q=75`

const un = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`

export const photos = {
  // Hero / Nosotros — banquete elegante con sillas Chiavari y flores blancas
  banqueteElegante: px(2306281),
  // Mesa con candelabra dorada — Bodas y comuniones
  mesaCandelabra: px(2306280),
  // Candelabra cristal dorado — detalle
  candelabraDetalle: px(2306279),
  // Pareja boda
  parejaBoda: un('1519741497674-611481863552'),
  // Mesa larga con flores
  mesaLargaFlores: un('1519225421980-715cb0215aed'),
  // Mesa rústica madera maciza
  mesaRustica: px(1395964),
  // Sillas Cross Back / wedding outdoor
  sillasOutdoor: un('1531058020387-3be344556be6'),
  // Mesa de postres / barra dulce
  mesaDulce: px(587741),
  // Centro floral
  centroFloral: px(169193),
  // Beach wedding altar / carpa
  carpaExterior: px(169199),
  // Beach wedding ceremony / tarima
  ceremoniaTarima: px(169198),
  // Beach wedding tables (long imperial)
  mesaImperial: px(169194),
  // Place setting
  placeSetting: un('1414235077428-338989a2e8c0'),
  // Banquet wide
  banquetWide: un('1469371670807-013ccf25f16a'),
  // Outdoor wedding
  outdoorWedding: un('1464366400600-7168b8af9bc3'),
  // Wedding chairs
  weddingChairs: un('1532712938310-34cb3982ef74'),
  // Wedding venue
  weddingVenue: un('1583939003579-730e3918a45a'),
}
