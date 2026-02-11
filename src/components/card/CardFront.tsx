import { forwardRef } from 'react'
import type { CardData } from '../../types/card'
import { RARITY_SYMBOLS } from '../../constants/pokemon-types'
import { CardFrame } from './elements/CardFrame'
import { CardHeader } from './elements/CardHeader'
import { CardImage } from './elements/CardImage'
import { AttackRow } from './elements/AttackRow'
import { CardFooter } from './elements/CardFooter'
import styles from './card-styles.module.css'

interface CardFrontProps {
  card: CardData
  blackAndWhite?: boolean
}

const EVOLUTION_LABELS: Record<string, string> = {
  Basic: 'PERUS',
  Stage1: 'TASO 1',
  Stage2: 'TASO 2',
}

export const CardFront = forwardRef<HTMLDivElement, CardFrontProps>(
  ({ card, blackAndWhite = false }, ref) => {
    return (
      <CardFrame type={card.type} ref={ref} blackAndWhite={blackAndWhite}>
        {/* Evolution badge */}
        <div className={styles.evolutionBadge}>
          <span>{EVOLUTION_LABELS[card.evolutionStage]}</span>
          {card.evolvesFrom && (
            <span className={styles.evolvesFrom}>
              Kehittyy: {card.evolvesFrom}
            </span>
          )}
        </div>

        {/* Header: Name + HP */}
        <CardHeader name={card.name} hp={card.hp} type={card.type} blackAndWhite={blackAndWhite} />

        {/* Image */}
        <CardImage imageDataUrl={card.imageDataUrl} name={card.name} />

        {/* Ability */}
        {card.ability && card.ability.name && (
          <div className={styles.abilityBlock}>
            <div>
              <span className={styles.abilityLabel}>Kyky</span>
              <span className={styles.abilityName}>{card.ability.name}</span>
            </div>
            {card.ability.description && (
              <div className={styles.abilityDescription}>
                {card.ability.description}
              </div>
            )}
          </div>
        )}

        {/* Attacks */}
        <div className={styles.attacksContainer}>
          {card.attacks.map((attack, i) => (
            <AttackRow key={i} attack={attack} blackAndWhite={blackAndWhite} />
          ))}
        </div>

        {/* Footer: Weakness / Resistance / Retreat */}
        <CardFooter
          weakness={card.weakness}
          resistance={card.resistance}
          retreatCost={card.retreatCost}
          blackAndWhite={blackAndWhite}
        />

        {/* Flavor text */}
        {card.pokedexNumber && (
          <div className={styles.pokedexLine}>
            No. {card.pokedexNumber}
          </div>
        )}
        {card.flavorText && (
          <div className={styles.flavorText}>{card.flavorText}</div>
        )}

        {/* Meta: illustrator, rarity, card number */}
        <div className={styles.cardMeta}>
          <span className={styles.illustratorText}>
            {card.illustrator ? `Illus. ${card.illustrator}` : ''}
          </span>
          <span>
            <span className={styles.raritySymbol}>
              {RARITY_SYMBOLS[card.rarity]}
            </span>
            {card.cardNumber && ` ${card.cardNumber}`}
          </span>
        </div>
      </CardFrame>
    )
  }
)

CardFront.displayName = 'CardFront'
