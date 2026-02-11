import { useRef, useState, useEffect } from 'react'
import { useCard } from '../../context/CardContext'
import { CardFront } from './CardFront'
import { CardBack } from './CardBack'

const CARD_BASE_WIDTH = 744
const CARD_BASE_HEIGHT = 1039

export function CardPreview() {
  const { card } = useCard()
  const containerRef = useRef<HTMLDivElement>(null)
  const cardFrontRef = useRef<HTMLDivElement>(null)
  const cardBackRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.47)
  const [showBack, setShowBack] = useState(false)

  useEffect(() => {
    function updateScale() {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth - 32
        setScale(Math.min(availableWidth / CARD_BASE_WIDTH, 0.55))
      }
    }
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-3">
      <button
        onClick={() => setShowBack(!showBack)}
        className="px-4 py-2 text-sm font-medium rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
      >
        {showBack ? 'Näytä etupuoli' : 'Näytä takapuoli'}
      </button>

      <div
        style={{
          width: CARD_BASE_WIDTH * scale,
          height: CARD_BASE_HEIGHT * scale,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: CARD_BASE_WIDTH,
            height: CARD_BASE_HEIGHT,
            position: 'absolute',
            top: 0,
            left: 0,
            display: showBack ? 'none' : 'block',
          }}
        >
          <CardFront ref={cardFrontRef} card={card} />
        </div>
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            width: CARD_BASE_WIDTH,
            height: CARD_BASE_HEIGHT,
            position: 'absolute',
            top: 0,
            left: 0,
            display: showBack ? 'block' : 'none',
          }}
        >
          <CardBack ref={cardBackRef} />
        </div>
      </div>
    </div>
  )
}

export { CARD_BASE_WIDTH, CARD_BASE_HEIGHT }
