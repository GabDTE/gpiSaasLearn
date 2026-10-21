import { describe, expect, it } from 'vitest'
import { filtresInitiaux, filtresReducer } from './filtres'

// Pas de navigateur, pas de render : une fonction, des entrées, une sortie (diapo 34).
describe('filtresReducer', () => {
  it('change le statut sans toucher au reste', () => {
    const avant = { ...filtresInitiaux, membreId: 'm-1', recherche: 'kanban' }
    const etat = filtresReducer(avant, { type: 'statut', statut: 'EN_COURS' })
    expect(etat).toEqual({ ...avant, statut: 'EN_COURS' })
  })

  it('ne mute pas le state reçu', () => {
    const avant = { ...filtresInitiaux }
    const apres = filtresReducer(avant, { type: 'recherche', texte: 'maq' })
    expect(avant).toEqual(filtresInitiaux)
    expect(apres).not.toBe(avant)
  })

  it('choisit puis retire un membre', () => {
    const avec = filtresReducer(filtresInitiaux, { type: 'membre', id: 'm-2' })
    expect(avec.membreId).toBe('m-2')
    expect(filtresReducer(avec, { type: 'membre', id: null }).membreId).toBeNull()
  })

  it('réinitialise tous les filtres', () => {
    const modifies = { statut: 'TERMINEE' as const, membreId: 'm-3', recherche: 'audit' }
    expect(filtresReducer(modifies, { type: 'reinitialiser' })).toEqual(filtresInitiaux)
  })
})
