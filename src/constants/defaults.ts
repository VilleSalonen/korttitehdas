import { v4 as uuidv4 } from 'uuid'
import type { CardData } from '../types/card'
import { PokemonType } from '../types/card'

export function createEmptyCard(): CardData {
  return {
    id: uuidv4(),
    name: '',
    hp: 60,
    type: PokemonType.Fire,
    evolutionStage: 'Basic',
    evolvesFrom: '',
    imageDataUrl: null,
    ability: null,
    attacks: [
      {
        name: '',
        energyCost: [],
        damage: '',
        description: '',
      },
    ],
    weakness: null,
    resistance: null,
    retreatCost: 1,
    pokedexNumber: '',
    flavorText: '',
    illustrator: '',
    rarity: 'common',
    cardNumber: '',
  }
}
