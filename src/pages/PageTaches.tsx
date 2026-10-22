import { BarreFiltres } from '../components/BarreFiltres'
import { ListeTaches } from '../components/ListeTaches'
import { FiltresProvider } from '../taches/FiltresProvider'
import { useTachesFiltrees } from '../taches/useTachesFiltrees'

export function PageTaches() {
  return (
    <FiltresProvider>
      <h1>Liste des tâches</h1>
      <BarreFiltres />
      <TachesFiltrees />
    </FiltresProvider>
  )
}

// Le composant dit quoi afficher ; useTachesFiltrees cache comment les tâches sont obtenues.
function TachesFiltrees() {
  const { taches, error, loading } = useTachesFiltrees()
  return (
    <>
      {loading && <p role="status">Chargement des tâches…</p>}
      {error && <p className="erreur">Impossible de charger les tâches ({error.message}). Le faux back-end tourne-t-il ? (bun run mock)</p>}
      {taches && <ListeTaches taches={taches} />}
    </>
  )
}
