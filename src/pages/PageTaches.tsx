import { API } from '../api'
import { BarreFiltres } from '../components/BarreFiltres'
import { ListeTaches, type TacheAvecMembre } from '../components/ListeTaches'
import { useDebounce } from '../hooks/useDebounce'
import { useFetch } from '../hooks/useFetch'
import { FiltresProvider } from '../taches/FiltresProvider'
import { useFiltres } from '../taches/filtresContext'

export function PageTaches() {
  return (
    <FiltresProvider>
      <h1>Liste des tâches</h1>
      <BarreFiltres />
      <TachesFiltrees />
    </FiltresProvider>
  )
}

// Lit les filtres dans le context et les traduit en paramètres json-server :
// le serveur ne renvoie que les tâches qui correspondent.
function TachesFiltrees() {
  const filtres = useFiltres()
  // Le champ suit chaque frappe, mais la requête ne part qu'après 300 ms de pause.
  const recherche = useDebounce(filtres.recherche.trim(), 300)
  const params = new URLSearchParams({ _embed: 'membre', _sort: 'echeance' })
  if (filtres.statut !== 'TOUTES') params.set('statut', filtres.statut)
  if (filtres.membreId) params.set('membreId', filtres.membreId)
  if (recherche) params.set('titre:contains', recherche)
  const { data, error, loading } = useFetch<TacheAvecMembre[]>(`${API}/taches?${params}`)

  return (
    <>
      {loading && <p role="status">Chargement des tâches…</p>}
      {error && <p className="erreur">Impossible de charger les tâches ({error.message}). Le faux back-end tourne-t-il ? (bun run mock)</p>}
      {data && <ListeTaches taches={data} />}
    </>
  )
}
