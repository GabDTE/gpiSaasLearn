import { createContext, useContext, type Dispatch } from 'react'
import type { Action, Filtres } from './filtres'

// Deux contexts séparés (diapo 41) : un composant qui ne lit que dispatch n'est pas
// re-rendu par le context quand les filtres changent, car dispatch est stable. Il
// re-render tout de même si son parent re-render : c'est le cas du bouton
// « Réinitialiser », enfant de BarreFiltres qui lit les filtres. Ce fichier est en .ts
// (pas de JSX) pour que Fast Refresh accepte le Provider seul dans FiltresProvider.tsx.
export const FiltresStateContext = createContext<Filtres | null>(null)
export const FiltresDispatchContext = createContext<Dispatch<Action> | null>(null)

// Les hooks sont la seule porte d'entrée : le reste de l'app ne connaît pas les contexts.
export function useFiltres() {
  const filtres = useContext(FiltresStateContext)
  if (!filtres) throw new Error('useFiltres doit être utilisé dans <FiltresProvider>')
  return filtres
}

export function useFiltresDispatch() {
  const dispatch = useContext(FiltresDispatchContext)
  if (!dispatch) throw new Error('useFiltresDispatch doit être utilisé dans <FiltresProvider>')
  return dispatch
}
