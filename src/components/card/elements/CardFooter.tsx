import type { TypeModifier } from '../../../types/card'
import { PokemonType } from '../../../types/card'
import { EnergyIcon } from './EnergyIcon'
import styles from '../card-styles.module.css'

interface CardFooterProps {
  weakness: TypeModifier | null
  resistance: TypeModifier | null
  retreatCost: number
}

export function CardFooter({ weakness, resistance, retreatCost }: CardFooterProps) {
  return (
    <div className={styles.cardFooter}>
      <div className={styles.footerSection}>
        <span className={styles.footerLabel}>Heikkous</span>
        <div className={styles.footerValue}>
          {weakness ? (
            <>
              <EnergyIcon type={weakness.type} small />
              <span>{weakness.value}</span>
            </>
          ) : (
            <span style={{ color: '#ccc' }}>—</span>
          )}
        </div>
      </div>

      <div className={styles.footerSection}>
        <span className={styles.footerLabel}>Vastustus</span>
        <div className={styles.footerValue}>
          {resistance ? (
            <>
              <EnergyIcon type={resistance.type} small />
              <span>{resistance.value}</span>
            </>
          ) : (
            <span style={{ color: '#ccc' }}>—</span>
          )}
        </div>
      </div>

      <div className={styles.footerSection}>
        <span className={styles.footerLabel}>Perääntymisku.</span>
        <div className={styles.retreatCostIcons}>
          {retreatCost > 0 ? (
            Array.from({ length: retreatCost }, (_, i) => (
              <EnergyIcon key={i} type={PokemonType.Colorless} small />
            ))
          ) : (
            <span style={{ color: '#ccc', fontSize: '18px', fontWeight: 'bold' }}>—</span>
          )}
        </div>
      </div>
    </div>
  )
}
