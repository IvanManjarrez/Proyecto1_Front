import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { getTypeStyle } from '../utils/typeColors'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import ConfirmModal from '../components/ConfirmModal'
import toast from 'react-hot-toast'

export default function Detail() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [species, setSpecies] = useState(null)
  const [status, setStatus]   = useState('loading')
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const modalRef = useRef(null)
  const fav = pokemon ? isFavorite(pokemon.id) : false

  const fetchData = () => {
    setStatus('loading')
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(data => {
        setPokemon(data)
        setStatus('success')
        // Fetch species separado para la descripción
        return fetch(data.species.url)
      })
      .then(r => r.json())
      .then(s => setSpecies(s))
      .catch(() => setStatus('error'))
  }

  useEffect(() => { fetchData() }, [id])

  const handleFav = () => {
    if (fav) modalRef.current?.open()
    else {
      addFavorite(pokemon)
      toast.success(`${pokemon.name} agregado a favoritos`)
    }
  }

  const handleConfirmRemove = () => {
    removeFavorite(pokemon.id)
    toast('Quitado de favoritos', { icon: '💔' })
  }

  // Descripción en español o inglés
  const description = species?.flavor_text_entries
    ?.find(e => e.language.name === 'es')?.flavor_text
    ?.replace(/\f/g, ' ')
    || species?.flavor_text_entries
    ?.find(e => e.language.name === 'en')?.flavor_text
    ?.replace(/\f/g, ' ')

  const num = pokemon ? String(pokemon.id).padStart(3, '0') : ''
  const img = pokemon?.sprites?.other?.['official-artwork']?.front_default || pokemon?.sprites?.front_default

  if (status === 'loading') return <div style={{ paddingTop: '64px' }}><LoadingSpinner message="Cargando Pokémon..." /></div>
  if (status === 'error')   return <div style={{ paddingTop: '64px' }}><ErrorMessage onRetry={fetchData} /></div>

  return (
    <div style={{ paddingTop: '64px', fontFamily: 'Arial', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">

        {/* Volver */}
        <Link
          to="/explorar"
          className="inline-flex items-center gap-2 mb-8 no-underline transition-colors duration-200"
          style={{ color: '#aaa' }}
          onMouseEnter={e => e.currentTarget.style.color = 'aqua'}
          onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
          aria-label="Volver a explorar"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Volver a explorar
        </Link>

        <div className="grid md:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          {/* Poster */}
          <div className="flex flex-col gap-4">
            <div
              className="rounded-2xl flex items-center justify-center p-8"
              style={{
                background: 'linear-gradient(135deg, #0f172a, #16213e)',
                border: '1px solid #2a2a4a',
              }}
            >
              {img ? (
                <img
                  src={img}
                  alt={`Imagen oficial de ${pokemon.name}`}
                  className="w-full max-w-[200px] drop-shadow-2xl"
                />
              ) : (
                <div className="w-40 h-40 flex items-center justify-center text-[#2a2a4a]">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="4" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="4" />
                    <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                </div>
              )}
            </div>

            <button
              onClick={handleFav}
              aria-label={fav ? `Quitar ${pokemon.name} de favoritos` : `Agregar ${pokemon.name} a favoritos`}
              className={fav ? 'btn-outline' : 'btn-primary'}
              style={fav ? { borderColor: '#e94560', color: '#e94560' } : {}}
            >
              {fav ? '💔 Quitar de favoritos' : '❤️ Agregar a favoritos'}
            </button>
          </div>

          {/* Info */}
          <article aria-label={`Información de ${pokemon.name}`}>
            <p className="text-sm font-bold mb-1" style={{ color: '#777' }}>#{num}</p>

            {/* Tipos */}
            <div className="flex gap-2 mb-3">
              {pokemon.types.map(t => {
                const s = getTypeStyle(t.type.name)
                return (
                  <span
                    key={t.type.name}
                    className="type-badge"
                    style={{ backgroundColor: s.bg, color: s.text }}
                  >
                    {t.type.name}
                  </span>
                )
              })}
            </div>

            <h1 className="text-5xl font-bold capitalize text-white mt-0 mb-1">{pokemon.name}</h1>

            {description && (
              <p className="mb-6 leading-relaxed" style={{ color: '#aaa', fontSize: '15px' }}>
                {description}
              </p>
            )}

            {/* Stats grid */}
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {[
                { label: 'Altura',   value: `${pokemon.height / 10} m` },
                { label: 'Peso',     value: `${pokemon.weight / 10} kg` },
                { label: 'Exp. base',value: pokemon.base_experience || '—' },
                /*{ label: 'Habilidades', value: pokemon.abilities.slice(0, 2).map(a => a.ability.name).join(', ') }*/
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl p-4"
                  style={{ backgroundColor: '#16213e', border: '1px solid #2a2a4a' }}
                >
                  <dt className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#777' }}>
                    {label}
                  </dt>
                  <dd className="font-bold text-white capitalize">{value}</dd>
                </div>
              ))}
            </dl>

            {/* Estadísticas de batalla */}
            <h2 className="font-bold mb-3" style={{ color: '#aaa', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Estadísticas base
            </h2>
            <div className="flex flex-col gap-2">
              {pokemon.stats.map(s => {
                const pct = Math.min((s.base_stat / 255) * 100, 100)
                return (
                  <div key={s.stat.name} className="flex items-center gap-3">
                    <span className="w-20 text-xs capitalize shrink-0" style={{ color: '#777' }}>
                      {s.stat.name.replace('-', ' ')}
                    </span>
                    <span className="w-8 text-right text-xs font-bold" style={{ color: '#aaa' }}>
                      {s.base_stat}
                    </span>
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#2a2a4a' }}>
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: pct > 66 ? '#3fa129' : pct > 33 ? '#f3d23b' : '#e94560',
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </article>
        </div>
      </div>

      <ConfirmModal
        ref={modalRef}
        title="¿Quitar de favoritos?"
        description={`Esto quitará a ${pokemon?.name} de tu lista de favoritos.`}
        confirmLabel="Quitar"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmRemove}
      />
    </div>
  )
}
