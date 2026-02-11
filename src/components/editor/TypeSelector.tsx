import { PokemonType } from '../../types/card'
import { TYPE_COLORS, TYPE_NAMES_FI } from '../../constants/pokemon-types'

interface TypeSelectorProps {
  value: PokemonType
  onChange: (type: PokemonType) => void
  label: string
  includeColorless?: boolean
  allowNone?: boolean
}

const MAIN_TYPES = Object.values(PokemonType).filter(t => t !== PokemonType.Colorless)
const ALL_TYPES = Object.values(PokemonType)

export function TypeSelector({ value, onChange, label, includeColorless, allowNone }: TypeSelectorProps) {
  const types = includeColorless ? ALL_TYPES : MAIN_TYPES

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as PokemonType)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
          style={{ paddingLeft: 36 }}
        >
          {allowNone && <option value="">— Ei mitään —</option>}
          {types.map((type) => (
            <option key={type} value={type}>
              {TYPE_NAMES_FI[type]}
            </option>
          ))}
        </select>
        <div
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border border-gray-300"
          style={{ background: TYPE_COLORS[value]?.primary || '#ccc' }}
        />
      </div>
    </div>
  )
}
