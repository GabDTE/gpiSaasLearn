import { API } from '../api'
import type { TacheAvecMembre } from '../components/ListeTaches'
import { useDebounce } from '../hooks/useDebounce'
import { useFetch } from '../hooks/useFetch'
import type { Filtres } from './filtres'
import { useFiltres } from './filtresContext'

// Traduit les filtres en paramètres json-server. Fonction pure : testable sans React.
export function urlTaches(filtres: Filtres): string {
  const params = new URLSearchParams({ _embed: 'membre', _sort: 'echeance' })
  if (filtres.statut !== 'TOUTES') params.set('statut', filtres.statut)
  if (filtres.membreId) params.set('membreId', filtres.membreId)
  const recherche = filtres.recherche.trim()
  if (recherche) params.set('titre:contains', recherche)
  return `${API}/taches?${params}`
}

// Custom hook métier : les tâches qui correspondent aux filtres du context.
// La recherche est débouncée (300 ms) pour ne pas envoyer une requête par lettre.
export function useTachesFiltrees() {
  const filtres = useFiltres()
  const recherche = useDebounce(filtres.recherche, 300)
  const { data, error, loading } = useFetch<TacheAvecMembre[]>(urlTaches({ ...filtres, recherche }))
  return { taches: data, error, loading }
}
