export default function LoadingSpinner({ message = 'Cargando...' }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 gap-6"
      role="status"
      aria-live="polite"
    >
      {/* Pokéball giratoria */}
      <div className="relative w-16 h-16">
        <svg viewBox="0 0 100 100" className="w-16 h-16 animate-spin" style={{ animationDuration: '1s' }}>
          <circle cx="50" cy="50" r="44" fill="none" stroke="#2a2a4a" strokeWidth="8" />
          <path d="M6 50 A44 44 0 0 1 94 50" stroke="#e94560" strokeWidth="8" fill="none" />
          <line x1="6" y1="50" x2="94" y2="50" stroke="#2a2a4a" strokeWidth="5" />
          <circle cx="50" cy="50" r="12" fill="#1a1a2e" stroke="#e94560" strokeWidth="4" />
        </svg>
      </div>
      <p style={{ color: '#aaa', fontFamily: 'Arial' }}>{message}</p>
    </div>
  )
}
