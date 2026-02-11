import { useCard } from '../../context/CardContext'
import type { EvolutionStage } from '../../types/card'
import { TypeSelector } from './TypeSelector'

const EVOLUTION_OPTIONS: { value: EvolutionStage; label: string }[] = [
  { value: 'Basic', label: 'Perus' },
  { value: 'Stage1', label: 'Taso 1' },
  { value: 'Stage2', label: 'Taso 2' },
]

export function BasicInfoSection() {
  const { card, dispatch } = useCard()

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Perustiedot</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nimi</label>
        <input
          type="text"
          value={card.name}
          onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
          placeholder="Pokémonin nimi"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength={30}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">HP</label>
          <input
            type="number"
            value={card.hp}
            onChange={(e) => dispatch({ type: 'SET_HP', payload: Math.max(10, Math.min(340, Number(e.target.value))) })}
            min={10}
            max={340}
            step={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <TypeSelector
          value={card.type}
          onChange={(type) => dispatch({ type: 'SET_TYPE', payload: type })}
          label="Tyyppi"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kehitysaste</label>
          <select
            value={card.evolutionStage}
            onChange={(e) => dispatch({ type: 'SET_EVOLUTION_STAGE', payload: e.target.value as EvolutionStage })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {EVOLUTION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kehittyy lajista</label>
          <input
            type="text"
            value={card.evolvesFrom}
            onChange={(e) => dispatch({ type: 'SET_EVOLVES_FROM', payload: e.target.value })}
            placeholder="esim. Charmander"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={30}
          />
        </div>
      </div>
    </div>
  )
}
