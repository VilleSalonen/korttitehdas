import { useCard } from '../../context/CardContext'
import type { Rarity } from '../../types/card'

const RARITY_OPTIONS: { value: Rarity; label: string }[] = [
  { value: 'common', label: 'Yleinen ●' },
  { value: 'uncommon', label: 'Epätavallinen ◆' },
  { value: 'rare', label: 'Harvinainen ★' },
  { value: 'holo', label: 'Holo ★' },
]

export function FlavorSection() {
  const { card, dispatch } = useCard()

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Lisätiedot</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Pokédex-numero</label>
        <input
          type="text"
          value={card.pokedexNumber}
          onChange={(e) => dispatch({ type: 'SET_POKEDEX_NUMBER', payload: e.target.value })}
          placeholder="esim. 006"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={10}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kuvausteksti</label>
        <textarea
          value={card.flavorText}
          onChange={(e) => dispatch({ type: 'SET_FLAVOR_TEXT', payload: e.target.value })}
          placeholder="Pokémonin kuvaus tai tarina..."
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          maxLength={200}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Piirtäjä</label>
          <input
            type="text"
            value={card.illustrator}
            onChange={(e) => dispatch({ type: 'SET_ILLUSTRATOR', payload: e.target.value })}
            placeholder="Piirtäjän nimi"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={30}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Harvinaisuus</label>
          <select
            value={card.rarity}
            onChange={(e) => dispatch({ type: 'SET_RARITY', payload: e.target.value as Rarity })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {RARITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kortin numero</label>
        <input
          type="text"
          value={card.cardNumber}
          onChange={(e) => dispatch({ type: 'SET_CARD_NUMBER', payload: e.target.value })}
          placeholder="esim. 45/102"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={15}
        />
      </div>
    </div>
  )
}
