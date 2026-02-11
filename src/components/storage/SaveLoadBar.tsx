import { useState } from 'react'
import { useCard } from '../../context/CardContext'
import { saveCard, loadCards, deleteCard } from '../../utils/storage'
import type { CardData } from '../../types/card'
import { Save, FolderOpen, FilePlus, Trash2 } from 'lucide-react'
import { TYPE_COLORS } from '../../constants/pokemon-types'

export function SaveLoadBar() {
  const { card, dispatch } = useCard()
  const [showSaved, setShowSaved] = useState(false)
  const [savedCards, setSavedCards] = useState<CardData[]>([])
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  const handleSave = () => {
    try {
      saveCard(card)
      setSaveMessage('Kortti tallennettu!')
      setTimeout(() => setSaveMessage(null), 2000)
    } catch (e) {
      setSaveMessage((e as Error).message)
      setTimeout(() => setSaveMessage(null), 3000)
    }
  }

  const handleShowSaved = () => {
    if (!showSaved) {
      setSavedCards(loadCards())
    }
    setShowSaved(!showSaved)
  }

  const handleLoad = (savedCard: CardData) => {
    dispatch({ type: 'LOAD_CARD', payload: savedCard })
    setShowSaved(false)
  }

  const handleDelete = (id: string) => {
    deleteCard(id)
    setSavedCards(loadCards())
  }

  const handleNew = () => {
    dispatch({ type: 'NEW_CARD' })
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save size={16} />
          Tallenna
        </button>
        <button
          onClick={handleShowSaved}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FolderOpen size={16} />
          {showSaved ? 'Piilota' : 'Tallennetut'}
        </button>
        <button
          onClick={handleNew}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FilePlus size={16} />
          Uusi kortti
        </button>
        {saveMessage && (
          <span className="text-sm text-green-600 font-medium">{saveMessage}</span>
        )}
      </div>

      {showSaved && (
        <div className="mt-3 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <h3 className="text-sm font-bold text-gray-600 mb-3">Tallennetut kortit</h3>
          {savedCards.length === 0 ? (
            <p className="text-sm text-gray-400">Ei tallennettuja kortteja.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {savedCards.map((saved) => (
                <div
                  key={saved.id}
                  className="relative group border border-gray-200 rounded-lg p-2 hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => handleLoad(saved)}
                >
                  <div
                    className="w-full h-2 rounded-full mb-2"
                    style={{ background: TYPE_COLORS[saved.type].primary }}
                  />
                  <p className="text-sm font-medium truncate">{saved.name || 'Nimetön'}</p>
                  <p className="text-xs text-gray-400">HP {saved.hp}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDelete(saved.id)
                    }}
                    className="absolute top-1 right-1 p-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Poista"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
