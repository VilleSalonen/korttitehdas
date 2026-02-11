import { useRef, useState } from 'react'
import { useCard } from '../../context/CardContext'
import { usePrintSettings } from '../../context/PrintSettingsContext'
import { CardFront } from '../card/CardFront'
import { CardBack } from '../card/CardBack'
import { exportCardPng } from '../../utils/export-png'
import { exportSingleCardPdf } from '../../utils/export-pdf'
import { Download, FileText, Printer } from 'lucide-react'

export function ExportPanel() {
  const { card } = useCard()
  const { blackAndWhite, setBlackAndWhite } = usePrintSettings()
  const frontRef = useRef<HTMLDivElement>(null)
  const backRef = useRef<HTMLDivElement>(null)
  const [exporting, setExporting] = useState<string | null>(null)

  const handlePng = async () => {
    if (!frontRef.current) return
    setExporting('png')
    try {
      await exportCardPng(frontRef.current, card.name || 'pokemon-kortti')
    } catch (e) {
      console.error('PNG export failed:', e)
      alert('PNG-vienti epäonnistui. Yritä uudelleen.')
    }
    setExporting(null)
  }

  const handlePdf = async () => {
    if (!frontRef.current || !backRef.current) return
    setExporting('pdf')
    try {
      await exportSingleCardPdf(frontRef.current, backRef.current)
    } catch (e) {
      console.error('PDF export failed:', e)
      alert('PDF-vienti epäonnistui. Yritä uudelleen.')
    }
    setExporting(null)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      <label className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <input
          type="checkbox"
          checked={blackAndWhite}
          onChange={(e) => setBlackAndWhite(e.target.checked)}
          className="rounded border-gray-300"
        />
        Mustavalkoinen tulostus
      </label>
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={handlePng}
          disabled={!!exporting}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          <Download size={16} />
          {exporting === 'png' ? 'Ladataan...' : 'Lataa PNG'}
        </button>
        <button
          onClick={handlePdf}
          disabled={!!exporting}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
        >
          <FileText size={16} />
          {exporting === 'pdf' ? 'Luodaan...' : 'Lataa PDF'}
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Printer size={16} />
          Tulosta
        </button>
      </div>

      {/* Hidden render targets for export */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <CardFront ref={frontRef} card={card} blackAndWhite={blackAndWhite} />
        <CardBack ref={backRef} blackAndWhite={blackAndWhite} />
      </div>
    </>
  )
}
