import { Link } from 'react-router'

export function PageIntrouvable() {
  return (
    <>
      <h1>Page introuvable</h1>
      <p><Link to="/taches">Retour à la liste des tâches</Link></p>
    </>
  )
}
