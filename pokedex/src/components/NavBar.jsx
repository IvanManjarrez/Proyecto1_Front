import { NavLink } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import PokeballIcon from './PokeballIcon'

export default function NavBar() {
  const { favorites } = useFavorites()

  return (
    <header
      role="banner"
      className="fixed w-full top-0 left-0 z-50 flex justify-between items-center px-5 h-16"
      style={{ backgroundColor: '#1a1a2e', borderBottom: '1px solid #2a2a4a' }}
    >
      {/* Logo */}
      <NavLink
        to="/"
        className="flex items-center gap-2 no-underline"
        aria-label="PokéDex inicio"
      >
        <PokeballIcon className="w-7 h-7" />
        <span style={{ color: '#e94560', fontWeight: 'bold', fontSize: '20px' }}>
          PokéDex
        </span>
      </NavLink>

      {/* Links */}
      <nav aria-label="Navegación principal">
        <ul className="flex items-center gap-1 list-none m-0 p-0" style={{ fontSize: '16px' }}>
          {[
            { to: '/',           label: 'Inicio',     end: true },
            { to: '/explorar',   label: 'Explorar' },
            { to: '/favoritos',  label: 'Favoritos',  badge: favorites.length },
            { to: '/contacto',   label: 'Contacto' },
          ].map(({ to, label, badge, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-4 py-2 rounded transition-colors duration-200 no-underline
                   ${isActive ? 'text-[#e94560]' : 'text-white hover:bg-[aqua] hover:text-[#1a1a2e]'}`
                }
              >
                {label}
                {badge > 0 && (
                  <span
                    aria-label={`${badge} favoritos`}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: '#e94560', color: 'white' }}
                  >
                    {badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
