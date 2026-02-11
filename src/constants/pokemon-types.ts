import { PokemonType } from '../types/card'

export interface TypeColors {
  primary: string
  secondary: string
  light: string
  letter: string
}

export const TYPE_COLORS: Record<PokemonType, TypeColors> = {
  [PokemonType.Normal]:    { primary: '#A8A878', secondary: '#8A8A5C', light: '#F0F0E0', letter: 'N' },
  [PokemonType.Fire]:      { primary: '#E62829', secondary: '#F89020', light: '#FDE8E0', letter: 'R' },
  [PokemonType.Water]:     { primary: '#6890F0', secondary: '#4A7BF7', light: '#D6E4FF', letter: 'W' },
  [PokemonType.Electric]:  { primary: '#FAC000', secondary: '#D4A800', light: '#FFF6D0', letter: 'L' },
  [PokemonType.Grass]:     { primary: '#78C850', secondary: '#5CA636', light: '#E2F5D6', letter: 'G' },
  [PokemonType.Ice]:       { primary: '#98D8D8', secondary: '#7CBCBC', light: '#E8F8F8', letter: 'I' },
  [PokemonType.Fighting]:  { primary: '#C03028', secondary: '#9C2820', light: '#F0D8D0', letter: 'F' },
  [PokemonType.Poison]:    { primary: '#A040A0', secondary: '#803880', light: '#F0D8F0', letter: 'P' },
  [PokemonType.Ground]:    { primary: '#E0C068', secondary: '#B8A038', light: '#F8F0D0', letter: 'Gn' },
  [PokemonType.Flying]:    { primary: '#A890F0', secondary: '#8878D0', light: '#E8E0FF', letter: 'Fl' },
  [PokemonType.Psychic]:   { primary: '#F85888', secondary: '#C44068', light: '#FFE0EA', letter: 'U' },
  [PokemonType.Bug]:       { primary: '#A8B820', secondary: '#8C9C18', light: '#F0F0D0', letter: 'B' },
  [PokemonType.Rock]:      { primary: '#B8A038', secondary: '#9C8828', light: '#F0E8D0', letter: 'Rk' },
  [PokemonType.Ghost]:     { primary: '#705898', secondary: '#584078', light: '#E0D8F0', letter: 'Gh' },
  [PokemonType.Dragon]:    { primary: '#7038F8', secondary: '#5828C8', light: '#D8C8FF', letter: 'Dn' },
  [PokemonType.Dark]:      { primary: '#705848', secondary: '#584038', light: '#E0D8D0', letter: 'D' },
  [PokemonType.Steel]:     { primary: '#B8B8D0', secondary: '#9898B0', light: '#F0F0F8', letter: 'M' },
  [PokemonType.Fairy]:     { primary: '#EE99AC', secondary: '#D07888', light: '#FFE8F0', letter: 'Y' },
  [PokemonType.Colorless]: { primary: '#A8A8A8', secondary: '#888888', light: '#F0F0F0', letter: 'C' },
}

export const TYPE_NAMES_FI: Record<PokemonType, string> = {
  [PokemonType.Normal]: 'Normaali',
  [PokemonType.Fire]: 'Tuli',
  [PokemonType.Water]: 'Vesi',
  [PokemonType.Electric]: 'Sähkö',
  [PokemonType.Grass]: 'Ruoho',
  [PokemonType.Ice]: 'Jää',
  [PokemonType.Fighting]: 'Taistelu',
  [PokemonType.Poison]: 'Myrkky',
  [PokemonType.Ground]: 'Maa',
  [PokemonType.Flying]: 'Lento',
  [PokemonType.Psychic]: 'Psyykkinen',
  [PokemonType.Bug]: 'Ötökkä',
  [PokemonType.Rock]: 'Kivi',
  [PokemonType.Ghost]: 'Haamu',
  [PokemonType.Dragon]: 'Lohikäärme',
  [PokemonType.Dark]: 'Pimeä',
  [PokemonType.Steel]: 'Teräs',
  [PokemonType.Fairy]: 'Keiju',
  [PokemonType.Colorless]: 'Väritön',
}

export const RARITY_SYMBOLS: Record<string, string> = {
  common: '●',
  uncommon: '◆',
  rare: '★',
  holo: '★',
}
