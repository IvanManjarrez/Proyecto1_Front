import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { getTypeStyle } from '../utils/typeColors'
import toast from 'react-hot-toast'

export default function PokemonCard({ pokemon }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const fav = isFavorite(pokemon.id)

  const img =
    pokemon.sprites?.other?.['official-artwork']?.front_default ||
    pokemon.sprites?.front_default

  const handleFav = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (fav) {
      removeFavorite(pokemon.id)
      toast('Quitado de favoritos', { icon: '💔' })
    } else {
      addFavorite(pokemon)
      toast.success(`${pokemon.name} agregado a favoritos`)
    }
  }

  const num = String(pokemon.id).padStart(3, '0')

  return (
    <article
      className="poke-card relative flex flex-col"
      aria-label={`Pokémon ${pokemon.name}`}
    >
      <Link to={`/detalle/${pokemon.id}`} aria-label={`Ver detalle de ${pokemon.name}`}>
        {/* Imagen */}
        <div
          className="relative flex items-center justify-center py-6 px-4"
          style={{ background: 'linear-gradient(135deg, #0f172a, #16213e)' }}
        >
          {/* Número */}
          <span
            className="absolute top-2 left-3 text-xs font-bold"
            style={{ color: '#777' }}
          >
            #{num}
          </span>

          {img ? (
            <img
              src={img}
              alt={`Imagen de ${pokemon.name}`}
              className="w-28 h-28 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-28 h-28 flex items-center justify-center">
              <PokeballPlaceholder />
            </div>
          )}

          {/* Botón favorito */}
          <button
            onClick={handleFav}
            aria-label={fav ? `Quitar ${pokemon.name} de favoritos` : `Agregar ${pokemon.name} a favoritos`}
            className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border"
            style={{
              background: fav ? 'rgba(233,69,96,0.2)' : 'rgba(15,23,42,0.8)',
              borderColor: fav ? '#e94560' : '#2a2a4a',
              color: fav ? '#e94560' : '#777',
            }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3
            className="font-bold text-base capitalize mb-2 transition-colors duration-200"
            style={{ color: 'white' }}
          >
            {pokemon.name}
          </h3>
          <div className="flex flex-wrap gap-1">
            {pokemon.types?.map(t => {
              const style = getTypeStyle(t.type.name)
              return (
                <span
                  key={t.type.name}
                  className="type-badge"
                  style={{ backgroundColor: style.bg, color: style.text }}
                >
                  {t.type.name}
                </span>
              )
            })}
          </div>
        </div>
      </Link>
    </article>
  )
}

function PokeballPlaceholder() {
  return (
    <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-20">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#777" strokeWidth="4" />
      <line x1="10" y1="50" x2="90" y2="50" stroke="#777" strokeWidth="4" />
      <circle cx="50" cy="50" r="12" fill="none" stroke="#777" strokeWidth="4" />
    </svg>
  )
}
