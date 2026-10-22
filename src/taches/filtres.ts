import { LIBELLES_STATUT, type Statut } from '../types'

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

// Les filtres sont rangés dans l'URL (/taches?statut=EN_COURS&membre=m-1&q=maq) pour qu'un
// lien filtré se partage. L'URL vient de l'utilisateur : un statut inconnu retombe sur 'TOUTES'.
export function filtresDepuisParams(params: URLSearchParams): Filtres {
  const statut = params.get('statut')
  return {
    statut: statut && Object.hasOwn(LIBELLES_STATUT, statut) ? (statut as Statut) : 'TOUTES',
    membreId: params.get('membre') || null,
    recherche: params.get('q') ?? '',
  }
}

// Sens inverse : seuls les filtres actifs apparaissent, sans filtre l'URL reste /taches.
export function paramsDepuisFiltres(filtres: Filtres): URLSearchParams {
  const params = new URLSearchParams()
  if (filtres.statut !== 'TOUTES') params.set('statut', filtres.statut)
  if (filtres.membreId) params.set('membre', filtres.membreId)
  if (filtres.recherche) params.set('q', filtres.recherche)
  return params
}
