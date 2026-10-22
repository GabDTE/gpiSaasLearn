import { API } from '../api'
import { useFetch } from '../hooks/useFetch'
import type { Filtres } from '../taches/filtres'
import { useFiltres, useFiltresDispatch } from '../taches/filtresContext'
import { LIBELLES_STATUT, type Membre, type Statut } from '../types'

const STATUTS = Object.keys(LIBELLES_STATUT) as Statut[]

export function BarreFiltres() {
  const filtres = useFiltres()
  const dispatch = useFiltresDispatch()
  const { data: membres } = useFetch<Membre[]>(`${API}/membres`)

  return (
    <form className="barre-filtres" role="search" onSubmit={e => e.preventDefault()}>
      <label>
        Rechercher
        <input
          type="search"
          value={filtres.recherche}
          onChange={e => dispatch({ type: 'recherche', texte: e.target.value })}
          placeholder="Titre de la tâche"
        />
      </label>
      <label>
        Statut
        <select
          value={filtres.statut}
          onChange={e => dispatch({ type: 'statut', statut: e.target.value as Filtres['statut'] })}
        >
          <option value="TOUTES">Tous les statuts</option>
          {STATUTS.map(s => <option key={s} value={s}>{LIBELLES_STATUT[s]}</option>)}
        </select>
      </label>
      <label>
        Membre
        <select
          value={filtres.membreId ?? ''}
          onChange={e => dispatch({ type: 'membre', id: e.target.value || null })}
        >
          <option value="">Tous les membres</option>
          {membres?.map(m => <option key={m.id} value={m.id}>{m.nom}</option>)}
        </select>
      </label>
      <BoutonReinitialiser />
    </form>
  )
}

// N'utilise que dispatch, mais re-render quand même à chaque changement de filtre : son parent
// BarreFiltres lit les filtres, et un composant re-render avec son parent (aucun memo ici).
function BoutonReinitialiser() {
  const dispatch = useFiltresDispatch()
  return <button type="button" onClick={() => dispatch({ type: 'reinitialiser' })}>Réinitialiser</button>
}
