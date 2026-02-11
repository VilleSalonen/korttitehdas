import type { CardData } from '../types/card'

const STORAGE_KEY = 'korttitehdas-cards'

interface StoredData {
  version: 1
  cards: CardData[]
}

function getStoredData(): StoredData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { version: 1, cards: [] }
    const data = JSON.parse(raw)
    if (data.version === 1) return data
    return { version: 1, cards: [] }
  } catch {
    return { version: 1, cards: [] }
  }
}

function setStoredData(data: StoredData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.error('LocalStorage save failed:', e)
    throw new Error('Tallennustila on täynnä. Poista vanhoja kortteja.')
  }
}

export function saveCard(card: CardData): void {
  const data = getStoredData()
  const existingIndex = data.cards.findIndex((c) => c.id === card.id)
  if (existingIndex >= 0) {
    data.cards[existingIndex] = card
  } else {
    data.cards.push(card)
  }
  setStoredData(data)
}

export function loadCards(): CardData[] {
  return getStoredData().cards
}

export function deleteCard(id: string): void {
  const data = getStoredData()
  data.cards = data.cards.filter((c) => c.id !== id)
  setStoredData(data)
}
