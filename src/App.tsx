import { CardProvider } from './context/CardContext'
import { PrintSettingsProvider } from './context/PrintSettingsContext'
import { Header } from './components/layout/Header'
import { EditorLayout } from './components/layout/EditorLayout'

function App() {
  return (
    <CardProvider>
      <PrintSettingsProvider>
        <div className="h-screen flex flex-col overflow-hidden bg-gray-100">
          <Header />
          <EditorLayout />
        </div>
      </PrintSettingsProvider>
    </CardProvider>
  )
}

export default App
