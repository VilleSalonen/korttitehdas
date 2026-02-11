import { forwardRef } from 'react'

const backStyles: Record<string, React.CSSProperties> = {
  frame: {
    width: 744,
    height: 1039,
    borderRadius: 24,
    border: '10px solid #1a3a6a',
    background: 'linear-gradient(135deg, #1a3a6a 0%, #2a5aaa 25%, #1a3a6a 50%, #2a5aaa 75%, #1a3a6a 100%)',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Gill Sans', 'Trebuchet MS', system-ui, sans-serif",
  },
  patternOverlay: {
    position: 'absolute',
    inset: 0,
    background: `
      radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
      repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.02) 0deg 10deg, transparent 10deg 20deg)
    `,
  },
  centerCircle: {
    width: 280,
    height: 280,
    borderRadius: '50%',
    border: '8px solid #0a2040',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
    boxShadow: '0 0 60px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,0,0,0.3)',
  },
  topHalf: {
    width: '100%',
    height: '50%',
    background: 'linear-gradient(180deg, #fff 0%, #e8e8e8 100%)',
  },
  bottomHalf: {
    width: '100%',
    height: '50%',
    background: 'linear-gradient(180deg, #e02020 0%, #b01818 100%)',
  },
  centerLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 8,
    background: '#0a2040',
    transform: 'translateY(-50%)',
    zIndex: 2,
  },
  centerButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: '6px solid #0a2040',
    background: 'radial-gradient(circle at 40% 40%, #fff, #ccc)',
    transform: 'translate(-50%, -50%)',
    zIndex: 3,
  },
  title: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 8,
    textTransform: 'uppercase',
    zIndex: 1,
  },
}

interface CardBackProps {
  blackAndWhite?: boolean
}

export const CardBack = forwardRef<HTMLDivElement, CardBackProps>(
  ({ blackAndWhite = false }, ref) => {
    const frameStyle = blackAndWhite
      ? { ...backStyles.frame, background: 'linear-gradient(135deg, #555 0%, #888 25%, #555 50%, #888 75%, #555 100%)' }
      : backStyles.frame

    const bottomHalfStyle = blackAndWhite
      ? { ...backStyles.bottomHalf, background: 'linear-gradient(180deg, #666 0%, #444 100%)' }
      : backStyles.bottomHalf

    return (
      <div ref={ref} style={frameStyle}>
        <div style={backStyles.patternOverlay} />
        <div style={backStyles.centerCircle}>
          <div style={backStyles.topHalf} />
          <div style={bottomHalfStyle} />
          <div style={backStyles.centerLine} />
          <div style={backStyles.centerButton} />
        </div>
        <div style={backStyles.title}>Korttitehdas</div>
      </div>
    )
  }
)

CardBack.displayName = 'CardBack'
