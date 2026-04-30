import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import PokemonCard from '../components/PokemonCard'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

const TYPES = [
  'fire','water','grass','electric','ice','fighting',
  'poison','ground','flying','psychic','bug','rock',
  'ghost','dragon','dark','steel','fairy','normal',
]

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [query, setQuery]       = useState(searchParams.get('q') || '')
  const [type, setType]         = useState(searchParams.get('tipo') || '')
  const [allPokemon, setAll]    = useState([])   // lista completa paginada
  const [filtered, setFiltered] = useState([])
  const [status, setStatus]     = useState('loading')
  const [debouncedQ, setDebounced] = useState(query)

  // Debounce
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 400)
    return () => clearTimeout(t)
  }, [query])

  // Fetch lista por tipo o general
  const fetchList = useCallback(async () => {
    setStatus('loading')
    try {
      let list = []
      if (type) {
        // Fetch por tipo
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)
        if (!res.ok) throw new Error()
        const data = await res.json()
        // type endpoint da { pokemon: [{pokemon: {name, url}}] }
        const urls = data.pokemon.slice(0, 120).map(p => p.pokemon.url)
        const details = await Promise.all(urls.map(u => fetch(u).then(r => r.json())))
        list = details
      } else {
        // Fetch paginado general (150 Pokémon)
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0')
        if (!res.ok) throw new Error()
        const data = await res.json()
        const details = await Promise.all(
          data.results.map(p => fetch(p.url).then(r => r.json()))
        )
        list = details
      }
      setAll(list)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }, [type])

  useEffect(() => { fetchList() }, [fetchList])

  // Filtrar por nombre en el frontend
  useEffect(() => {
    if (!debouncedQ) {
      setFiltered(allPokemon)
    } else {
      setFiltered(allPokemon.filter(p =>
        p.name.toLowerCase().includes(debouncedQ.toLowerCase()) ||
        String(p.id).includes(debouncedQ)
      ))
    }
  }, [debouncedQ, allPokemon])

  const handleQueryChange = (e) => {
    const v = e.target.value
    setQuery(v)
    const p = new URLSearchParams(searchParams)
    if (v) p.set('q', v); else p.delete('q')
    setSearchParams(p)
  }

  const handleTypeChange = (e) => {
    const v = e.target.value
    setType(v)
    setQuery('')
    const p = new URLSearchParams()
    if (v) p.set('tipo', v)
    setSearchParams(p)
  }

  return (
    <div style={{ paddingTop: '64px', minHeight: '100vh', fontFamily: 'Arial' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-1">
            Explorar <span style={{ color: '#e94560' }}>Pokémon</span>
          </h1>
          <p style={{ color: '#777' }}>Datos obtenidos en tiempo real desde la PokéAPI</p>
        </div>

        {/* Búsqueda y filtro */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <label htmlFor="search-input" className="sr-only">Buscar Pokémon</label>
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: '#777' }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              id="search-input"
              type="search"
              value={query}
              onChange={handleQueryChange}
              placeholder="Buscar por nombre o número..."
              className="poke-input pl-10"
              aria-label="Buscar Pokémon por nombre o número"
            />
          </div>

          <div>
            <label htmlFor="type-select" className="sr-only">Filtrar por tipo</label>
            <select
              id="type-select"
              value={type}
              onChange={handleTypeChange}
              className="poke-select w-full sm:w-48"
              aria-label="Filtrar por tipo de Pokémon"
            >
              <option value="">Todos los tipos</option>
              {TYPES.map(t => (
                <option key={t} value={t} className="capitalize">{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Contador */}
        {status === 'success' && (
          <p className="mb-6 text-sm" style={{ color: '#777' }} aria-live="polite">
            Mostrando {filtered.length} de {allPokemon.length} resultados
          </p>
        )}

        {/* Estados */}
        {status === 'loading' && <LoadingSpinner message="Cargando Pokémon..." />}
        {status === 'error'   && <ErrorMessage onRetry={fetchList} />}

        {/* Estado vacío */}
        {status === 'success' && filtered.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-24 gap-4 text-center"
            role="status"
            aria-live="polite"
          >
            <svg className="w-16 h-16" style={{ color: '#2a2a4a' }} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="6" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="6" />
              <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="6" />
            </svg>
            <p className="font-bold text-white">Sin resultados para "{query}"</p>
            <p style={{ color: '#777', fontSize: '14px' }}>Intenta con otro nombre o tipo</p>
          </div>
        )}

        {/* Grid */}
        {status === 'success' && filtered.length > 0 && (
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}
            role="list"
            aria-label="Listado de Pokémon"
          >
            {filtered.map((p, i) => (
              <div
                key={p.id}
                role="listitem"
                className="fade-in-up"
                style={{ animationDelay: `${Math.min(i * 0.03, 0.6)}s`, opacity: 0 }}
              >
                <PokemonCard pokemon={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
