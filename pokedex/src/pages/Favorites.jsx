import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import PokemonCard from '../components/PokemonCard'
import ConfirmModal from '../components/ConfirmModal'
import toast from 'react-hot-toast'

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites()
  const modalRef  = useRef(null)
  const pendingId = useRef(null)

  const handleRemoveClick = (id) => {
    pendingId.current = id
    modalRef.current?.open()
  }

  const handleConfirmRemove = () => {
    if (pendingId.current !== null) {
      removeFavorite(pendingId.current)
      toast('Quitado de favoritos', { icon: '💔' })
      pendingId.current = null
    }
  }

  const pending = favorites.find(p => p.id === pendingId.current)

  return (
    <div style={{ paddingTop: '64px', minHeight: '100vh', fontFamily: 'Arial' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* Encabezado */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white mb-1">
            Mis <span style={{ color: '#e94560' }}>Favoritos</span>
          </h1>
          <p style={{ color: '#777' }}>
            {favorites.length} {favorites.length === 1 ? 'Pokémon guardado' : 'Pokémon guardados'}
          </p>
        </div>

        {/* Estado vacío */}
        {favorites.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-32 gap-6 text-center"
            role="status"
            aria-live="polite"
          >
            <svg viewBox="0 0 24 24" className="w-20 h-20" style={{ color: '#2a2a4a' }} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <div>
              <p className="font-bold text-white text-lg">No tienes favoritos guardados</p>
              <p style={{ color: '#777', fontSize: '14px', marginTop: '4px' }}>
                Explora y agrega algunos
              </p>
            </div>
            <Link to="/explorar" className="btn-primary no-underline">
              Explorar y agregar
            </Link>
          </div>
        )}

        {/* Grid */}
        {favorites.length > 0 && (
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}
            role="list"
            aria-label="Pokémon favoritos"
          >
            {favorites.map((p, i) => (
              <div
                key={p.id}
                role="listitem"
                className="relative fade-in-up"
                style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
              >
                <PokemonCard pokemon={p} />
                {/* Botón quitar rápido */}
                <button
                  onClick={() => handleRemoveClick(p.id)}
                  aria-label={`Quitar ${p.name} de favoritos`}
                  className="absolute bottom-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-all duration-200"
                  style={{
                    backgroundColor: 'rgba(15,23,42,0.9)',
                    border: '1px solid rgba(233,69,96,0.4)',
                    color: '#e94560',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = '#e94560'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'rgba(15,23,42,0.9)'
                    e.currentTarget.style.color = '#e94560'
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        ref={modalRef}
        title="¿Quitar de favoritos?"
        description={pending ? `Esto quitará a ${pending.name} de tu lista.` : ''}
        confirmLabel="Quitar"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmRemove}
      />
    </div>
  )
}
