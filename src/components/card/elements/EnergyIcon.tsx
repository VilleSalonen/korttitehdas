import { PokemonType } from '../../../types/card'
import { TYPE_COLORS } from '../../../constants/pokemon-types'
import styles from '../card-styles.module.css'

interface EnergyIconProps {
  type: PokemonType
  small?: boolean
}

export function EnergyIcon({ type, small }: EnergyIconProps) {
  const colors = TYPE_COLORS[type]
  return (
    <span
      className={small ? styles.energyIconSmall : styles.energyIcon}
      style={{ background: `radial-gradient(circle at 35% 35%, ${colors.primary}, ${colors.secondary})` }}
    >
      {colors.letter}
    </span>
  )
}
