import { useState, useCallback, useRef } from 'react'
import Cropper, { type Area } from 'react-easy-crop'
import { useCard } from '../../context/CardContext'
import { Upload, X } from 'lucide-react'

function getCroppedImage(imageSrc: string, crop: Area): Promise<string> {
  return new Promise((resolve) => {
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 744
      canvas.height = 380
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        744,
        380,
      )
      resolve(canvas.toDataURL('image/jpeg', 0.85))
    }
    image.src = imageSrc
  })
}

export function ImageSection() {
  const { card, dispatch } = useCard()
  const [cropSrc, setCropSrc] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedArea, setCroppedArea] = useState<Area | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setCropSrc(reader.result as string)
      setCrop({ x: 0, y: 0 })
      setZoom(1)
    }
    reader.readAsDataURL(file)
  }

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }, [])

  const handleCropConfirm = async () => {
    if (!cropSrc || !croppedArea) return
    const cropped = await getCroppedImage(cropSrc, croppedArea)
    dispatch({ type: 'SET_IMAGE', payload: cropped })
    setCropSrc(null)
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Kuva</h3>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onFileSelect}
        className="hidden"
      />

      {card.imageDataUrl ? (
        <div className="relative">
          <img
            src={card.imageDataUrl}
            alt="Kortin kuva"
            className="w-full h-32 object-cover rounded-lg border border-gray-200"
          />
          <div className="absolute top-2 right-2 flex gap-1">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50"
              title="Vaihda kuva"
            >
              <Upload size={14} />
            </button>
            <button
              onClick={() => dispatch({ type: 'SET_IMAGE', payload: null })}
              className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50"
              title="Poista kuva"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-28 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-colors cursor-pointer"
        >
          <Upload size={24} />
          <span className="text-sm">Lataa kuva</span>
        </button>
      )}

      {/* Crop modal */}
      {cropSrc && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h4 className="text-lg font-bold">Rajaa kuva</h4>
            </div>
            <div className="relative h-80 bg-gray-900">
              <Cropper
                image={cropSrc}
                crop={crop}
                zoom={zoom}
                aspect={744 / 380}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="text-sm text-gray-600">Zoomaus</label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setCropSrc(null)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Peruuta
                </button>
                <button
                  onClick={handleCropConfirm}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Valmis
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
