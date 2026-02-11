import { PokemonType } from '../../../types/card'
import { EnergyIcon } from './EnergyIcon'
import styles from '../card-styles.module.css'

interface CardHeaderProps {
  name: string
  hp: number
  type: PokemonType
  blackAndWhite?: boolean
}

export function CardHeader({ name, hp, type, blackAndWhite }: CardHeaderProps) {
  return (
    <div className={styles.cardHeader}>
      <span className={styles.cardName}>{name || 'Nimi'}</span>
      <div className={styles.hpContainer}>
        <span className={styles.hpLabel}>HP</span>
        <span className={styles.hpValue}>{hp}</span>
        <EnergyIcon type={type} blackAndWhite={blackAndWhite} />
      </div>
    </div>
  )
}
