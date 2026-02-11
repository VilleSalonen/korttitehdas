import { useCard } from '../../context/CardContext'
import { EnergyPicker } from './EnergyPicker'
import { Plus, Trash2 } from 'lucide-react'

export function AttacksSection() {
  const { card, dispatch } = useCard()

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide">
          Hyökkäykset ({card.attacks.length}/2)
        </h3>
        {card.attacks.length < 2 && (
          <button
            onClick={() => dispatch({ type: 'ADD_ATTACK' })}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Plus size={14} />
            Lisää hyökkäys
          </button>
        )}
      </div>

      {card.attacks.map((attack, index) => (
        <div key={index} className="p-3 bg-gray-50 rounded-lg space-y-2 border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500">Hyökkäys {index + 1}</span>
            {card.attacks.length > 1 && (
              <button
                onClick={() => dispatch({ type: 'REMOVE_ATTACK', payload: index })}
                className="text-red-400 hover:text-red-600 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>

          <EnergyPicker
            value={attack.energyCost}
            onChange={(energyCost) =>
              dispatch({ type: 'SET_ATTACK_ENERGY', payload: { attackIndex: index, energyCost } })
            }
            label="Energiakulu"
          />

          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Nimi</label>
              <input
                type="text"
                value={attack.name}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_ATTACK',
                    payload: { index, attack: { ...attack, name: e.target.value } },
                  })
                }
                placeholder="Hyökkäyksen nimi"
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={30}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Vahinko</label>
              <input
                type="text"
                value={attack.damage}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_ATTACK',
                    payload: { index, attack: { ...attack, damage: e.target.value } },
                  })
                }
                placeholder="60"
                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={10}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Kuvaus</label>
            <textarea
              value={attack.description}
              onChange={(e) =>
                dispatch({
                  type: 'SET_ATTACK',
                  payload: { index, attack: { ...attack, description: e.target.value } },
                })
              }
              placeholder="Hyökkäyksen vaikutus (valinnainen)"
              rows={2}
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              maxLength={200}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
