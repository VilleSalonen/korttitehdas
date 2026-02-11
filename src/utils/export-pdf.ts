import jsPDF from 'jspdf'
import { toPng } from 'html-to-image'

const CARD_WIDTH_MM = 63
const CARD_HEIGHT_MM = 88
const A4_WIDTH_MM = 210
const A4_HEIGHT_MM = 297
const COLS = 3
const ROWS = 3
const CARDS_PER_PAGE = COLS * ROWS
const MARGIN_X = (A4_WIDTH_MM - COLS * CARD_WIDTH_MM) / (COLS + 1)
const MARGIN_Y = (A4_HEIGHT_MM - ROWS * CARD_HEIGHT_MM) / (ROWS + 1)

// Crop mark length in mm
const CROP_MARK_LEN = 5
const CROP_MARK_OFFSET = 2

function drawCropMarks(pdf: jsPDF, x: number, y: number, w: number, h: number) {
  pdf.setDrawColor(0)
  pdf.setLineWidth(0.2)

  // Top-left
  pdf.line(x - CROP_MARK_OFFSET - CROP_MARK_LEN, y, x - CROP_MARK_OFFSET, y)
  pdf.line(x, y - CROP_MARK_OFFSET - CROP_MARK_LEN, x, y - CROP_MARK_OFFSET)

  // Top-right
  pdf.line(x + w + CROP_MARK_OFFSET, y, x + w + CROP_MARK_OFFSET + CROP_MARK_LEN, y)
  pdf.line(x + w, y - CROP_MARK_OFFSET - CROP_MARK_LEN, x + w, y - CROP_MARK_OFFSET)

  // Bottom-left
  pdf.line(x - CROP_MARK_OFFSET - CROP_MARK_LEN, y + h, x - CROP_MARK_OFFSET, y + h)
  pdf.line(x, y + h + CROP_MARK_OFFSET, x, y + h + CROP_MARK_OFFSET + CROP_MARK_LEN)

  // Bottom-right
  pdf.line(x + w + CROP_MARK_OFFSET, y + h, x + w + CROP_MARK_OFFSET + CROP_MARK_LEN, y + h)
  pdf.line(x + w, y + h + CROP_MARK_OFFSET, x + w, y + h + CROP_MARK_OFFSET + CROP_MARK_LEN)
}

export async function exportCardsPdf(
  frontElements: HTMLElement[],
  backElement: HTMLElement,
): Promise<void> {
  // Render all card fronts to PNG
  const frontImages = await Promise.all(
    frontElements.map((el) =>
      toPng(el, { pixelRatio: 1, quality: 1.0, backgroundColor: 'white' })
    )
  )

  // Render card back to PNG
  const backImage = await toPng(backElement, {
    pixelRatio: 1,
    quality: 1.0,
    backgroundColor: '#1a3a6a',
  })

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const totalPages = Math.ceil(frontImages.length / CARDS_PER_PAGE)

  for (let page = 0; page < totalPages; page++) {
    const pageCards = frontImages.slice(
      page * CARDS_PER_PAGE,
      (page + 1) * CARDS_PER_PAGE
    )

    // Page 1 (or odd): front sides
    if (page > 0) pdf.addPage()

    for (let i = 0; i < pageCards.length; i++) {
      const col = i % COLS
      const row = Math.floor(i / COLS)
      const x = MARGIN_X + col * (CARD_WIDTH_MM + MARGIN_X)
      const y = MARGIN_Y + row * (CARD_HEIGHT_MM + MARGIN_Y)

      pdf.addImage(pageCards[i], 'PNG', x, y, CARD_WIDTH_MM, CARD_HEIGHT_MM)
      drawCropMarks(pdf, x, y, CARD_WIDTH_MM, CARD_HEIGHT_MM)
    }

    // Page 2 (or even): back sides — mirrored horizontally for double-sided printing
    pdf.addPage()

    for (let i = 0; i < pageCards.length; i++) {
      const col = i % COLS
      const row = Math.floor(i / COLS)
      // Mirror: rightmost column becomes leftmost
      const mirroredCol = COLS - 1 - col
      const x = MARGIN_X + mirroredCol * (CARD_WIDTH_MM + MARGIN_X)
      const y = MARGIN_Y + row * (CARD_HEIGHT_MM + MARGIN_Y)

      pdf.addImage(backImage, 'PNG', x, y, CARD_WIDTH_MM, CARD_HEIGHT_MM)
      drawCropMarks(pdf, x, y, CARD_WIDTH_MM, CARD_HEIGHT_MM)
    }
  }

  pdf.save('pokemon-kortit.pdf')
}

// Single card PDF export
export async function exportSingleCardPdf(
  frontElement: HTMLElement,
  backElement: HTMLElement,
): Promise<void> {
  return exportCardsPdf([frontElement], backElement)
}
