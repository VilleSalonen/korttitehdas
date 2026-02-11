import { PokemonType, type EnergyCost } from '../../types/card'
import { TYPE_COLORS, TYPE_NAMES_FI } from '../../constants/pokemon-types'

interface EnergyPickerProps {
  value: EnergyCost[]
  onChange: (costs: EnergyCost[]) => void
  label: string
}

const ENERGY_TYPES = Object.values(PokemonType)

export function EnergyPicker({ value, onChange, label }: EnergyPickerProps) {
  const totalEnergy = value.reduce((sum, c) => sum + c.count, 0)

  function addEnergy(type: PokemonType) {
    if (totalEnergy >= 5) return
    const existing = value.find(c => c.type === type)
    if (existing) {
      onChange(value.map(c => c.type === type ? { ...c, count: c.count + 1 } : c))
    } else {
      onChange([...value, { type, count: 1 }])
    }
  }

  function removeEnergy(type: PokemonType) {
    const existing = value.find(c => c.type === type)
    if (!existing) return
    if (existing.count <= 1) {
      onChange(value.filter(c => c.type !== type))
    } else {
      onChange(value.map(c => c.type === type ? { ...c, count: c.count - 1 } : c))
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} ({totalEnergy}/5)
      </label>

      {/* Current selection */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {value.map((cost) =>
            Array.from({ length: cost.count }, (_, i) => (
              <button
                key={`${cost.type}-${i}`}
                onClick={() => removeEnergy(cost.type)}
                className="w-7 h-7 rounded-full border-2 border-gray-300 text-[10px] font-bold text-white cursor-pointer hover:opacity-70 transition-opacity"
                style={{ background: TYPE_COLORS[cost.type].primary }}
                title={`Poista ${TYPE_NAMES_FI[cost.type]}`}
              >
                {TYPE_COLORS[cost.type].letter}
              </button>
            ))
          )}
        </div>
      )}

      {/* Type buttons to add */}
      <div className="flex flex-wrap gap-1">
        {ENERGY_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => addEnergy(type)}
            disabled={totalEnergy >= 5}
            className="w-6 h-6 rounded-full border border-gray-300 text-[8px] font-bold text-white cursor-pointer hover:scale-110 transition-transform disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: TYPE_COLORS[type].primary }}
            title={TYPE_NAMES_FI[type]}
          >
            {TYPE_COLORS[type].letter}
          </button>
        ))}
      </div>
    </div>
  )
}
