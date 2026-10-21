import { Link, useParams } from 'react-router'
import { API } from '../api'
import { useFetch } from '../hooks/useFetch'
import { LIBELLES_STATUT, type Commentaire, type Membre, type Projet, type Tache } from '../types'

type FicheTache = Tache & { membre?: Membre; projet?: Projet }
type CommentaireAvecMembre = Commentaire & { membre?: Membre }

// L'id vient de l'URL (/taches/t-3) : la fiche se recharge si on change d'URL,
// et le lien peut se partager.
export function PageFicheTache() {
  const { id = '' } = useParams()
  const idUrl = encodeURIComponent(id)
  const tache = useFetch<FicheTache>(`${API}/taches/${idUrl}?_embed=membre&_embed=projet`)
  const commentaires = useFetch<CommentaireAvecMembre[]>(`${API}/commentaires?tacheId=${idUrl}&_embed=membre&_sort=date`)

  // useFetch garde l'ancienne réponse pendant un rechargement : utile pour une liste, pas pour
  // une fiche (on afficherait la tâche précédente sous la nouvelle URL).
  if (tache.loading) return <p role="status">Chargement de la tâche…</p>
  if (tache.error) {
    return (
      <>
        <h1>{tache.error.message === 'HTTP 404' ? 'Tâche introuvable' : 'Erreur de chargement'}</h1>
        <p className="erreur">{tache.error.message}</p>
        <p><Link to="/taches">← Retour à la liste</Link></p>
      </>
    )
  }
  if (!tache.data) return null
  const t = tache.data

  return (
    <article className="fiche">
      <p><Link to="/taches">← Retour à la liste</Link></p>
      <h1>{t.titre}</h1>
      <dl>
        <dt>Statut</dt>
        <dd>{LIBELLES_STATUT[t.statut]}</dd>
        <dt>Membre</dt>
        <dd>{t.membre?.nom ?? 'Non affectée'}</dd>
        <dt>Échéance</dt>
        <dd>{new Date(t.echeance).toLocaleDateString('fr-FR', { dateStyle: 'long' })}</dd>
        <dt>Projet</dt>
        <dd>{t.projet ? <Link to={`/projets/${t.projet.id}`}>{t.projet.nom}</Link> : '—'}</dd>
      </dl>
      <p>{t.description}</p>

      <h2>Sous-tâches</h2>
      {t.sousTaches.length === 0
        ? <p className="meta">Aucune sous-tâche.</p>
        : (
          <ul>
            {t.sousTaches.map(st => (
              <li key={st.id}>
                <span aria-hidden="true">{st.faite ? '✓' : '○'}</span> {st.titre}
                <span className="meta"> ({st.faite ? 'faite' : 'à faire'})</span>
              </li>
            ))}
          </ul>
        )}

      <h2>Commentaires</h2>
      {commentaires.error && <p className="erreur">Commentaires indisponibles ({commentaires.error.message}).</p>}
      {commentaires.data?.length === 0 && <p className="meta">Aucun commentaire.</p>}
      {commentaires.data?.map(c => (
        <div key={c.id} className="commentaire">
          <span className="meta">{c.membre?.nom ?? 'Membre inconnu'} · {new Date(c.date).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}</span>
          <p>{c.texte}</p>
        </div>
      ))}
    </article>
  )
}
