import { NavLink, Outlet } from 'react-router'

// NavLink ajoute aria-current="page" sur le lien actif : le style s'appuie dessus (voir index.css).
export function Layout() {
  return (
    <>
      <header className="entete">
        <strong className="logo">GpiSaaS</strong>
        <nav aria-label="Navigation principale">
          <NavLink to="/taches" end>Tâches</NavLink>
          <NavLink to="/taches/nouvelle">Nouvelle tâche</NavLink>
          <NavLink to="/projets/p-2">Kanban</NavLink>
          <NavLink to="/idees">Idées</NavLink>
          <NavLink to="/ma-todo">Ma to-do</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
