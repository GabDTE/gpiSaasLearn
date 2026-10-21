import { useParams } from 'react-router'

// Écran prévu dans le parcours principal, monté dans un atelier suivant.
// Le projet affiché vient de l'URL (/projets/p-3) : l'URL est un state.
export function PageKanban() {
  const { projetId } = useParams()
  return (
    <>
      <h1>Tableau Kanban</h1>
      <p>Les tâches du projet {projetId}, une colonne par statut.</p>
      <p className="a-venir">Écran à venir.</p>
    </>
  )
}
