// SVG inline — ícono de Pokéball para el logo
export default function PokeballIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Mitad superior (roja) */}
      <path d="M10 50 A40 40 0 0 1 90 50 Z" fill="#e94560" />
      {/* Mitad inferior (blanca/gris oscuro) */}
      <path d="M10 50 A40 40 0 0 0 90 50 Z" fill="#16213e" />
      {/* Banda central */}
      <rect x="8" y="46" width="84" height="8" fill="#2a2a4a" />
      {/* Círculo central exterior */}
      <circle cx="50" cy="50" r="14" fill="#2a2a4a" />
      {/* Círculo central interior */}
      <circle cx="50" cy="50" r="8" fill="#1a1a2e" stroke="#e94560" strokeWidth="2" />
    </svg>
  )
}
