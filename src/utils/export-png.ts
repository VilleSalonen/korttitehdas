import { toPng } from 'html-to-image'

export async function exportCardPng(cardElement: HTMLElement, fileName: string = 'pokemon-kortti'): Promise<void> {
  const dataUrl = await toPng(cardElement, {
    pixelRatio: 1,
    quality: 1.0,
    backgroundColor: 'transparent',
  })

  const link = document.createElement('a')
  link.download = `${fileName}.png`
  link.href = dataUrl
  link.click()
}
