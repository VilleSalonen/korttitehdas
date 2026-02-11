import { forwardRef, type ReactNode } from 'react'
import { PokemonType } from '../../../types/card'
import { TYPE_COLORS } from '../../../constants/pokemon-types'
import styles from '../card-styles.module.css'

interface CardFrameProps {
  type: PokemonType
  children: ReactNode
  blackAndWhite?: boolean
}

export const CardFrame = forwardRef<HTMLDivElement, CardFrameProps>(
  ({ type, children, blackAndWhite = false }, ref) => {
    const colors = TYPE_COLORS[type]
    return (
      <div
        ref={ref}
        className={styles.cardFrame}
        style={{
          '--card-primary': colors.primary,
          '--card-secondary': colors.secondary,
          '--card-light': colors.light,
          '--card-fill-primary': blackAndWhite ? '#888' : colors.primary,
          '--card-fill-secondary': blackAndWhite ? '#666' : colors.secondary,
          '--card-fill-light': blackAndWhite ? '#f0f0f0' : colors.light,
        } as React.CSSProperties}
      >
        {children}
      </div>
    )
  }
)

CardFrame.displayName = 'CardFrame'
