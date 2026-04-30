// Colores por tipo de Pokémon
export const TYPE_COLORS = {
  fire:     { bg: '#e94560',   text: '#fff' },
  water:    { bg: '#2980ef',   text: '#fff' },
  grass:    { bg: '#3fa129',   text: '#fff' },
  electric: { bg: '#f3d23b',   text: '#1a1a2e' },
  ice:      { bg: '#3fd8ff',   text: '#1a1a2e' },
  fighting: { bg: '#e04030',   text: '#fff' },
  poison:   { bg: '#a040a0',   text: '#fff' },
  ground:   { bg: '#e0c068',   text: '#1a1a2e' },
  flying:   { bg: '#a890f0',   text: '#fff' },
  psychic:  { bg: '#f85888',   text: '#fff' },
  bug:      { bg: '#a8b820',   text: '#fff' },
  rock:     { bg: '#b8a038',   text: '#fff' },
  ghost:    { bg: '#705898',   text: '#fff' },
  dragon:   { bg: '#7038f8',   text: '#fff' },
  dark:     { bg: '#705848',   text: '#fff' },
  steel:    { bg: '#b8b8d0',   text: '#1a1a2e' },
  fairy:    { bg: '#f0b6bc',   text: '#1a1a2e' },
  normal:   { bg: '#a8a878',   text: '#fff' },
}

export function getTypeStyle(type) {
  return TYPE_COLORS[type] || { bg: '#777', text: '#fff' }
}
