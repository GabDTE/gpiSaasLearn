import { describe, expect, it } from 'vitest'
import { filtresInitiaux } from './filtres'
import { urlTaches } from './useTachesFiltrees'

const params = (url: string) => new URL(url).searchParams

describe('urlTaches', () => {
  it('sans filtre : toutes les tâches, membre embarqué, triées par échéance', () => {
    const p = params(urlTaches(filtresInitiaux))
    expect(p.get('_embed')).toBe('membre')
    expect(p.get('_sort')).toBe('echeance')
    expect(p.has('statut')).toBe(false)
    expect(p.has('membreId')).toBe(false)
    expect(p.has('titre:contains')).toBe(false)
  })

  it('traduit statut, membre et recherche en paramètres json-server', () => {
    const p = params(urlTaches({ statut: 'EN_COURS', membreId: 'm-1', recherche: '  kanban ' }))
    expect(p.get('statut')).toBe('EN_COURS')
    expect(p.get('membreId')).toBe('m-1')
    expect(p.get('titre:contains')).toBe('kanban')
  })

  it('ignore une recherche faite uniquement d’espaces', () => {
    expect(params(urlTaches({ ...filtresInitiaux, recherche: '   ' })).has('titre:contains')).toBe(false)
  })
})
