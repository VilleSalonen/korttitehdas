import type { Attack } from '../../../types/card'
import { EnergyIcon } from './EnergyIcon'
import styles from '../card-styles.module.css'

interface AttackRowProps {
  attack: Attack
}

export function AttackRow({ attack }: AttackRowProps) {
  if (!attack.name && !attack.damage) return null

  return (
    <div className={styles.attackRow}>
      <div className={styles.attackEnergy}>
        {attack.energyCost.map((cost, i) =>
          Array.from({ length: cost.count }, (_, j) => (
            <EnergyIcon key={`${i}-${j}`} type={cost.type} />
          ))
        )}
      </div>
      <div className={styles.attackNameSection}>
        <div className={styles.attackName}>{attack.name}</div>
        {attack.description && (
          <div className={styles.attackDescription}>{attack.description}</div>
        )}
      </div>
      {attack.damage && (
        <div className={styles.attackDamage}>{attack.damage}</div>
      )}
    </div>
  )
}
