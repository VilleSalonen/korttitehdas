export const PokemonType = {
  Normal: 'Normal',
  Fire: 'Fire',
  Water: 'Water',
  Electric: 'Electric',
  Grass: 'Grass',
  Ice: 'Ice',
  Fighting: 'Fighting',
  Poison: 'Poison',
  Ground: 'Ground',
  Flying: 'Flying',
  Psychic: 'Psychic',
  Bug: 'Bug',
  Rock: 'Rock',
  Ghost: 'Ghost',
  Dragon: 'Dragon',
  Dark: 'Dark',
  Steel: 'Steel',
  Fairy: 'Fairy',
  Colorless: 'Colorless',
} as const

export type PokemonType = (typeof PokemonType)[keyof typeof PokemonType]

export type EvolutionStage = 'Basic' | 'Stage1' | 'Stage2'

export type Rarity = 'common' | 'uncommon' | 'rare' | 'holo'

export interface EnergyCost {
  type: PokemonType
  count: number
}

export interface Attack {
  name: string
  energyCost: EnergyCost[]
  damage: string
  description: string
}

export interface Ability {
  name: string
  description: string
}

export interface TypeModifier {
  type: PokemonType
  value: string
}

export interface CardData {
  id: string
  name: string
  hp: number
  type: PokemonType
  evolutionStage: EvolutionStage
  evolvesFrom: string
  imageDataUrl: string | null
  ability: Ability | null
  attacks: Attack[]
  weakness: TypeModifier | null
  resistance: TypeModifier | null
  retreatCost: number
  pokedexNumber: string
  flavorText: string
  illustrator: string
  rarity: Rarity
  cardNumber: string
}
