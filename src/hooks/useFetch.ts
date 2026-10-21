import { useEffect, useState } from 'react'

type Reponse<T> = { url: string; data: T | null; error: Error | null }

// Charge une URL et expose { data, error, loading }, d'après le useFetch du cours (diapo 62) :
// pas de cache, pas de déduplication, pas de retry. L'AbortController annule la requête
// précédente quand l'URL change, ce qui évite la race condition (diapo 63).
//
// Différence avec la diapo : loading n'est plus un state mis à jour au début de l'effect
// (la règle react-hooks/set-state-in-effect l'interdit). C'est un derived state : on garde
// l'URL de la dernière réponse, et on charge tant qu'elle diffère de l'URL demandée.
export function useFetch<T>(url: string) {
  const [reponse, setReponse] = useState<Reponse<T> | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch(url, { signal: controller.signal })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json() as Promise<T>
      })
      .then(data => setReponse({ url, data, error: null }))
      .catch(error => {
        if (error.name !== 'AbortError') setReponse({ url, data: null, error })
      })
    return () => controller.abort()
  }, [url])

  // Pendant un nouveau chargement, on garde les données précédentes à l'écran (pas de clignotement).
  return {
    data: reponse?.data ?? null,
    error: reponse?.url === url ? reponse.error : null,
    loading: reponse?.url !== url,
  }
}
