import { useCard } from '../../context/CardContext'

export function AbilitySection() {
  const { card, dispatch } = useCard()
  const hasAbility = card.ability !== null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wide">Kyky</h3>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={hasAbility}
            onChange={(e) => {
              if (e.target.checked) {
                dispatch({ type: 'SET_ABILITY', payload: { name: '', description: '' } })
              } else {
                dispatch({ type: 'SET_ABILITY', payload: null })
              }
            }}
            className="rounded border-gray-300"
          />
          Lisää kyky
        </label>
      </div>

      {hasAbility && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kyvyn nimi</label>
            <input
              type="text"
              value={card.ability?.name || ''}
              onChange={(e) =>
                dispatch({
                  type: 'SET_ABILITY',
                  payload: { name: e.target.value, description: card.ability?.description || '' },
                })
              }
              placeholder="esim. Liekkivartalo"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={40}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kyvyn kuvaus</label>
            <textarea
              value={card.ability?.description || ''}
              onChange={(e) =>
                dispatch({
                  type: 'SET_ABILITY',
                  payload: { name: card.ability?.name || '', description: e.target.value },
                })
              }
              placeholder="Kyvyn vaikutus..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              maxLength={200}
            />
          </div>
        </>
      )}
    </div>
  )
}
