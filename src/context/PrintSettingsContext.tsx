import { createContext, useContext, useState, type ReactNode } from 'react'

interface PrintSettingsContextValue {
  blackAndWhite: boolean
  setBlackAndWhite: (value: boolean) => void
}

const PrintSettingsContext = createContext<PrintSettingsContextValue | null>(null)

export function PrintSettingsProvider({ children }: { children: ReactNode }) {
  const [blackAndWhite, setBlackAndWhite] = useState(false)
  return (
    <PrintSettingsContext.Provider value={{ blackAndWhite, setBlackAndWhite }}>
      {children}
    </PrintSettingsContext.Provider>
  )
}

export function usePrintSettings() {
  const context = useContext(PrintSettingsContext)
  if (!context) {
    throw new Error('usePrintSettings must be used within a PrintSettingsProvider')
  }
  return context
}
