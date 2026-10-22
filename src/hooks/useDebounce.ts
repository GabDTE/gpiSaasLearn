import { useEffect, useState } from 'react'

// Renvoie `valeur` avec un retard : la valeur retardée ne change qu'après `delai` ms
// sans nouvelle modification (diapo 59). Le cleanup annule le timer précédent à chaque frappe.
export function useDebounce<T>(valeur: T, delai = 300): T {
  const [valeurRetardee, setValeurRetardee] = useState(valeur)
  useEffect(() => {
    const id = setTimeout(() => setValeurRetardee(valeur), delai)
    return () => clearTimeout(id)
  }, [valeur, delai])
  return valeurRetardee
}
