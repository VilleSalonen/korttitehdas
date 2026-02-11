import styles from '../card-styles.module.css'

interface CardImageProps {
  imageDataUrl: string | null
  name: string
}

export function CardImage({ imageDataUrl, name }: CardImageProps) {
  return (
    <div className={styles.imageArea}>
      {imageDataUrl ? (
        <img src={imageDataUrl} alt={name || 'Kortin kuva'} />
      ) : (
        <span className={styles.imagePlaceholder}>🖼</span>
      )}
    </div>
  )
}
