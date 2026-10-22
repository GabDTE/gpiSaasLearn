import { useCallback, useMemo, type ReactNode } from 'react'
import { useSearchParams } from 'react-router'
import { filtresDepuisParams, filtresReducer, paramsDepuisFiltres, type Action } from './filtres'
import { FiltresDispatchContext, FiltresStateContext } from './filtresContext'

// Le state des filtres est l'URL (diapo 74) : un lien filtré se partage et survit au
// rechargement. Le reducer reste la seule logique de transition : dispatch lit les filtres
// de l'URL, applique le reducer, puis réécrit l'URL. replace évite une entrée d'historique
// par lettre tapée dans la recherche.
export function FiltresProvider({ children }: { children: ReactNode }) {
  const [params, setParams] = useSearchParams()
  const filtres = useMemo(() => filtresDepuisParams(params), [params])
  const dispatch = useCallback(
    (action: Action) =>
      setParams(actuels => paramsDepuisFiltres(filtresReducer(filtresDepuisParams(actuels), action)), { replace: true }),
    [setParams],
  )
  return (
    <FiltresDispatchContext value={dispatch}>
      <FiltresStateContext value={filtres}>{children}</FiltresStateContext>
    </FiltresDispatchContext>
  )
}
