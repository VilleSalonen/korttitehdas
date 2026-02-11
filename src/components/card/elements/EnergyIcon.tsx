import { PokemonType } from '../../../types/card'
import { TYPE_COLORS } from '../../../constants/pokemon-types'
import styles from '../card-styles.module.css'

interface EnergyIconProps {
  type: PokemonType
  small?: boolean
  blackAndWhite?: boolean
}

export function EnergyIcon({ type, small, blackAndWhite = false }: EnergyIconProps) {
  const colors = TYPE_COLORS[type]
  const bg = blackAndWhite
    ? 'radial-gradient(circle at 35% 35%, #888, #555)'
    : `radial-gradient(circle at 35% 35%, ${colors.primary}, ${colors.secondary})`
  return (
    <span
      className={small ? styles.energyIconSmall : styles.energyIcon}
      style={{ background: bg }}
    >
      {colors.letter}
    </span>
  )
}
