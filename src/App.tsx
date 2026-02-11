import { CardProvider } from './context/CardContext'
import { Header } from './components/layout/Header'
import { EditorLayout } from './components/layout/EditorLayout'

function App() {
  return (
    <CardProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <EditorLayout />
      </div>
    </CardProvider>
  )
}

export default App
