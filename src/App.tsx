import { Navigate, Route, Routes } from 'react-router'
import { Layout } from './components/Layout'
import { PageCreationTache } from './pages/PageCreationTache'
import { PageFicheTache } from './pages/PageFicheTache'
import { PageIdees } from './pages/PageIdees'
import { PageIntrouvable } from './pages/PageIntrouvable'
import { PageKanban } from './pages/PageKanban'
import { PageMaTodo } from './pages/PageMaTodo'
import { PageTaches } from './pages/PageTaches'

// Une route par écran du parcours principal. Le Layout enveloppe toutes les pages :
// il reste monté pendant la navigation, seule la page dans son <Outlet /> change.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/taches" replace />} />
        <Route path="taches" element={<PageTaches />} />
        <Route path="taches/nouvelle" element={<PageCreationTache />} />
        <Route path="taches/:id" element={<PageFicheTache />} />
        <Route path="projets/:projetId" element={<PageKanban />} />
        <Route path="idees" element={<PageIdees />} />
        <Route path="ma-todo" element={<PageMaTodo />} />
        <Route path="*" element={<PageIntrouvable />} />
      </Route>
    </Routes>
  )
}
