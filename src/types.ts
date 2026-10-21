// Types du domaine GpiSaaS : la forme des données servies par mock/db.json.

export type Statut = 'A_FAIRE' | 'EN_COURS' | 'EN_REVUE' | 'TERMINEE'

export type Membre = {
  id: string
  nom: string
  espaceId: string
}

export type Projet = {
  id: string
  nom: string
  description: string
}

export type SousTache = {
  id: string
  titre: string
  faite: boolean
}

export type Tache = {
  id: string
  titre: string
  description: string
  statut: Statut
  echeance: string // date ISO "AAAA-MM-JJ" : se trie avec localeCompare
  membreId: string | null
  projetId: string
  sousTaches: SousTache[]
}

export type Commentaire = {
  id: string
  tacheId: string
  membreId: string
  texte: string
  date: string
}

export type Idee = {
  id: string
  titre: string
  tri: 'A_TRIER' | 'TODO' | 'PROJET'
}

export const LIBELLES_STATUT: Record<Statut, string> = {
  A_FAIRE: 'À faire',
  EN_COURS: 'En cours',
  EN_REVUE: 'En revue',
  TERMINEE: 'Terminée',
}
