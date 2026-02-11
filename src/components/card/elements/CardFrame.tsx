import { forwardRef, type ReactNode } from 'react'
import { PokemonType } from '../../../types/card'
import { TYPE_COLORS } from '../../../constants/pokemon-types'
import styles from '../card-styles.module.css'

interface CardFrameProps {
  type: PokemonType
  children: ReactNode
}

export const CardFrame = forwardRef<HTMLDivElement, CardFrameProps>(
  ({ type, children }, ref) => {
    const colors = TYPE_COLORS[type]
    return (
      <div
        ref={ref}
        className={styles.cardFrame}
        style={{
          '--card-primary': colors.primary,
          '--card-secondary': colors.secondary,
          '--card-light': colors.light,
        } as React.CSSProperties}
      >
        {children}
      </div>
    )
  }
)

CardFrame.displayName = 'CardFrame'
