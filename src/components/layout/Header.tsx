export function Header() {
  return (
    <header className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
          K
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Korttitehdas</h1>
          <p className="text-xs text-white/80">Luo omat keräilykortit</p>
        </div>
      </div>
    </header>
  )
}
