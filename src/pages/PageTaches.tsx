import { API } from '../api'
import { ListeTaches, type TacheAvecMembre } from '../components/ListeTaches'
import { useFetch } from '../hooks/useFetch'

export function PageTaches() {
  const { data, error, loading } = useFetch<TacheAvecMembre[]>(`${API}/taches?_embed=membre&_sort=echeance`)

  return (
    <>
      <h1>Liste des tâches</h1>
      {loading && <p role="status">Chargement des tâches…</p>}
      {error && <p className="erreur">Impossible de charger les tâches ({error.message}). Le faux back-end tourne-t-il ? (bun run mock)</p>}
      {data && <ListeTaches taches={data} />}
    </>
  )
}
