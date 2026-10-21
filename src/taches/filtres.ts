import type { Statut } from '../types'

// Les filtres de la liste des tâches (diapos 31-32) : plusieurs states qui changent
// ensemble, d'où un reducer plutôt que trois useState.

export type Filtres = {
  statut: Statut | 'TOUTES'
  membreId: string | null
  recherche: string
}

// Discriminated union : TypeScript sait quels champs existent selon `type`.
export type Action =
  | { type: 'statut'; statut: Filtres['statut'] }
  | { type: 'membre'; id: string | null }
  | { type: 'recherche'; texte: string }
  | { type: 'reinitialiser' }

export const filtresInitiaux: Filtres = { statut: 'TOUTES', membreId: null, recherche: '' }

// Pure function : pas de fetch, pas de Date.now(), pas de mutation.
export function filtresReducer(state: Filtres, action: Action): Filtres {
  switch (action.type) {
    case 'statut':
      return { ...state, statut: action.statut }
    case 'membre':
      return { ...state, membreId: action.id }
    case 'recherche':
      return { ...state, recherche: action.texte }
    case 'reinitialiser':
      return filtresInitiaux
  }
}
