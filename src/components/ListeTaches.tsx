import { Link } from 'react-router'
import { LIBELLES_STATUT, type Membre, type Tache } from '../types'

export type TacheAvecMembre = Tache & { membre?: Membre }

export function ListeTaches({ taches }: { taches: TacheAvecMembre[] }) {
  if (taches.length === 0) return <p>Aucune tâche ne correspond.</p>
  return (
    <table className="table-taches">
      <caption className="meta">{taches.length} tâche{taches.length > 1 ? 's' : ''}</caption>
      <thead>
        <tr>
          <th scope="col">Titre</th>
          <th scope="col">Statut</th>
          <th scope="col">Membre</th>
          <th scope="col">Échéance</th>
        </tr>
      </thead>
      <tbody>
        {taches.map(t => (
          <tr key={t.id}>
            <td><Link to={`/taches/${t.id}`}>{t.titre}</Link></td>
            <td>{LIBELLES_STATUT[t.statut]}</td>
            <td>{t.membre?.nom ?? 'Non affectée'}</td>
            <td>{new Date(t.echeance).toLocaleDateString('fr-FR')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
