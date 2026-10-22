import { describe, expect, it } from 'vitest'
import { filtresDepuisParams, filtresInitiaux, filtresReducer, paramsDepuisFiltres } from './filtres'

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

describe('filtres dans l’URL', () => {
  it('fait l’aller-retour filtres → URL → filtres', () => {
    const filtres = { statut: 'EN_REVUE' as const, membreId: 'm-2', recherche: 'maq' }
    const params = paramsDepuisFiltres(filtres)
    expect(params.toString()).toBe('statut=EN_REVUE&membre=m-2&q=maq')
    expect(filtresDepuisParams(params)).toEqual(filtres)
  })

  it('laisse l’URL vide sans filtre actif', () => {
    expect(paramsDepuisFiltres(filtresInitiaux).toString()).toBe('')
    expect(filtresDepuisParams(new URLSearchParams())).toEqual(filtresInitiaux)
  })

  it('ignore un statut inconnu tapé dans l’URL', () => {
    expect(filtresDepuisParams(new URLSearchParams('statut=PIRATE')).statut).toBe('TOUTES')
    expect(filtresDepuisParams(new URLSearchParams('statut=toString')).statut).toBe('TOUTES')
  })
})
