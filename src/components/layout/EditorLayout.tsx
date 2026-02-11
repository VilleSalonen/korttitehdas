import { CardEditor } from '../editor/CardEditor'
import { CardPreview } from '../card/CardPreview'
import { ExportPanel } from '../export/ExportPanel'
import { SaveLoadBar } from '../storage/SaveLoadBar'

export function EditorLayout() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <SaveLoadBar />
      <div className="mt-4 flex flex-col lg:flex-row gap-6">
        {/* Editor */}
        <div className="lg:w-[420px] flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 max-h-[calc(100vh-160px)] overflow-y-auto">
            <CardEditor />
          </div>
        </div>

        {/* Preview + Export */}
        <div className="flex-1 flex flex-col items-center gap-4">
          <div className="sticky top-4">
            <CardPreview />
            <div className="mt-4">
              <ExportPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
