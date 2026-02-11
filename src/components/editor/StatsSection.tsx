import { useCard } from '../../context/CardContext'
import { PokemonType } from '../../types/card'
import { TYPE_NAMES_FI } from '../../constants/pokemon-types'

const MAIN_TYPES = Object.values(PokemonType).filter(t => t !== PokemonType.Colorless)

export function StatsSection() {
  const { card, dispatch } = useCard()

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Tilastot</h3>

      {/* Weakness */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Heikkous</label>
        <div className="flex gap-2">
          <select
            value={card.weakness?.type || ''}
            onChange={(e) => {
              if (!e.target.value) {
                dispatch({ type: 'SET_WEAKNESS', payload: null })
              } else {
                dispatch({
                  type: 'SET_WEAKNESS',
                  payload: { type: e.target.value as PokemonType, value: card.weakness?.value || 'x2' },
                })
              }
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Ei heikkoutta</option>
            {MAIN_TYPES.map((type) => (
              <option key={type} value={type}>{TYPE_NAMES_FI[type]}</option>
            ))}
          </select>
          {card.weakness && (
            <select
              value={card.weakness.value}
              onChange={(e) =>
                dispatch({
                  type: 'SET_WEAKNESS',
                  payload: { ...card.weakness!, value: e.target.value },
                })
              }
              className="w-20 px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="x2">x2</option>
              <option value="+20">+20</option>
              <option value="+30">+30</option>
            </select>
          )}
        </div>
      </div>

      {/* Resistance */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Vastustus</label>
        <div className="flex gap-2">
          <select
            value={card.resistance?.type || ''}
            onChange={(e) => {
              if (!e.target.value) {
                dispatch({ type: 'SET_RESISTANCE', payload: null })
              } else {
                dispatch({
                  type: 'SET_RESISTANCE',
                  payload: { type: e.target.value as PokemonType, value: card.resistance?.value || '-20' },
                })
              }
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Ei vastustusta</option>
            {MAIN_TYPES.map((type) => (
              <option key={type} value={type}>{TYPE_NAMES_FI[type]}</option>
            ))}
          </select>
          {card.resistance && (
            <select
              value={card.resistance.value}
              onChange={(e) =>
                dispatch({
                  type: 'SET_RESISTANCE',
                  payload: { ...card.resistance!, value: e.target.value },
                })
              }
              className="w-20 px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="-20">-20</option>
              <option value="-30">-30</option>
            </select>
          )}
        </div>
      </div>

      {/* Retreat Cost */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Perääntymisku. ({card.retreatCost})
        </label>
        <input
          type="range"
          min={0}
          max={4}
          value={card.retreatCost}
          onChange={(e) => dispatch({ type: 'SET_RETREAT_COST', payload: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span>
        </div>
      </div>
    </div>
  )
}
