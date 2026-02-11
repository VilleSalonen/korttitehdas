import { CardEditor } from '../editor/CardEditor'
import { CardPreview } from '../card/CardPreview'
import { ExportPanel } from '../export/ExportPanel'
import { SaveLoadBar } from '../storage/SaveLoadBar'

export function EditorLayout() {
  return (
    <div className="flex-1 min-h-0 max-w-7xl w-full mx-auto px-4 py-4 flex flex-col">
      <SaveLoadBar />
      <div className="mt-4 flex-1 min-h-0 flex flex-col lg:flex-row gap-6">
        {/* Editor */}
        <div className="lg:w-[420px] flex-shrink-0 min-h-0">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 h-full overflow-y-auto">
            <CardEditor />
          </div>
        </div>

        {/* Preview + Export */}
        <div className="flex-1 flex flex-col items-center gap-4 overflow-y-auto min-h-0">
          <CardPreview />
          <div>
            <ExportPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
