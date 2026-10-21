import { useReducer, type ReactNode } from 'react'
import { filtresInitiaux, filtresReducer } from './filtres'
import { FiltresDispatchContext, FiltresStateContext } from './filtresContext'

// Le Provider détient le state ; barre de filtres et liste le lisent via les hooks.
export function FiltresProvider({ children }: { children: ReactNode }) {
  const [filtres, dispatch] = useReducer(filtresReducer, filtresInitiaux)
  return (
    <FiltresDispatchContext value={dispatch}>
      <FiltresStateContext value={filtres}>{children}</FiltresStateContext>
    </FiltresDispatchContext>
  )
}
