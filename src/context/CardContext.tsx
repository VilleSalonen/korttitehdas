import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { CardData, Attack, Ability, TypeModifier, EvolutionStage, Rarity, EnergyCost } from '../types/card'
import { PokemonType } from '../types/card'
import { createEmptyCard } from '../constants/defaults'

type CardAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_HP'; payload: number }
  | { type: 'SET_TYPE'; payload: PokemonType }
  | { type: 'SET_EVOLUTION_STAGE'; payload: EvolutionStage }
  | { type: 'SET_EVOLVES_FROM'; payload: string }
  | { type: 'SET_IMAGE'; payload: string | null }
  | { type: 'SET_ABILITY'; payload: Ability | null }
  | { type: 'SET_ATTACK'; payload: { index: number; attack: Attack } }
  | { type: 'ADD_ATTACK' }
  | { type: 'REMOVE_ATTACK'; payload: number }
  | { type: 'SET_WEAKNESS'; payload: TypeModifier | null }
  | { type: 'SET_RESISTANCE'; payload: TypeModifier | null }
  | { type: 'SET_RETREAT_COST'; payload: number }
  | { type: 'SET_POKEDEX_NUMBER'; payload: string }
  | { type: 'SET_FLAVOR_TEXT'; payload: string }
  | { type: 'SET_ILLUSTRATOR'; payload: string }
  | { type: 'SET_RARITY'; payload: Rarity }
  | { type: 'SET_CARD_NUMBER'; payload: string }
  | { type: 'LOAD_CARD'; payload: CardData }
  | { type: 'NEW_CARD' }
  | { type: 'SET_ATTACK_ENERGY'; payload: { attackIndex: number; energyCost: EnergyCost[] } }

function cardReducer(state: CardData, action: CardAction): CardData {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload }
    case 'SET_HP':
      return { ...state, hp: action.payload }
    case 'SET_TYPE':
      return { ...state, type: action.payload }
    case 'SET_EVOLUTION_STAGE':
      return { ...state, evolutionStage: action.payload }
    case 'SET_EVOLVES_FROM':
      return { ...state, evolvesFrom: action.payload }
    case 'SET_IMAGE':
      return { ...state, imageDataUrl: action.payload }
    case 'SET_ABILITY':
      return { ...state, ability: action.payload }
    case 'SET_ATTACK': {
      const attacks = [...state.attacks]
      attacks[action.payload.index] = action.payload.attack
      return { ...state, attacks }
    }
    case 'ADD_ATTACK':
      if (state.attacks.length >= 2) return state
      return {
        ...state,
        attacks: [...state.attacks, { name: '', energyCost: [], damage: '', description: '' }],
      }
    case 'REMOVE_ATTACK':
      if (state.attacks.length <= 1) return state
      return {
        ...state,
        attacks: state.attacks.filter((_, i) => i !== action.payload),
      }
    case 'SET_ATTACK_ENERGY': {
      const attacks = [...state.attacks]
      attacks[action.payload.attackIndex] = {
        ...attacks[action.payload.attackIndex],
        energyCost: action.payload.energyCost,
      }
      return { ...state, attacks }
    }
    case 'SET_WEAKNESS':
      return { ...state, weakness: action.payload }
    case 'SET_RESISTANCE':
      return { ...state, resistance: action.payload }
    case 'SET_RETREAT_COST':
      return { ...state, retreatCost: action.payload }
    case 'SET_POKEDEX_NUMBER':
      return { ...state, pokedexNumber: action.payload }
    case 'SET_FLAVOR_TEXT':
      return { ...state, flavorText: action.payload }
    case 'SET_ILLUSTRATOR':
      return { ...state, illustrator: action.payload }
    case 'SET_RARITY':
      return { ...state, rarity: action.payload }
    case 'SET_CARD_NUMBER':
      return { ...state, cardNumber: action.payload }
    case 'LOAD_CARD':
      return action.payload
    case 'NEW_CARD':
      return createEmptyCard()
    default:
      return state
  }
}

interface CardContextValue {
  card: CardData
  dispatch: React.Dispatch<CardAction>
}

const CardContext = createContext<CardContextValue | null>(null)

export function CardProvider({ children }: { children: ReactNode }) {
  const [card, dispatch] = useReducer(cardReducer, null, createEmptyCard)
  return (
    <CardContext.Provider value={{ card, dispatch }}>
      {children}
    </CardContext.Provider>
  )
}

export function useCard() {
  const context = useContext(CardContext)
  if (!context) {
    throw new Error('useCard must be used within a CardProvider')
  }
  return context
}

export type { CardAction }
