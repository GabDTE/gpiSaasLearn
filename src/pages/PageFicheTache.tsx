import { useParams } from 'react-router'

export function PageFicheTache() {
  const { id } = useParams()
  return <h1>Fiche de la tâche {id}</h1>
}
