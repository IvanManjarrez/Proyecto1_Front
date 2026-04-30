import { Link } from 'react-router-dom'
import PokeballIcon from '../components/PokeballIcon'

// Idea: tipos destacados para navegar rápido
{/*
const TYPES = [
  { name: 'fire',     label: 'Fuego',    emoji: '🔥' },
  { name: 'water',    label: 'Agua',     emoji: '💧' },
  { name: 'grass',    label: 'Planta',   emoji: '🌿' },
  { name: 'electric', label: 'Eléctrico',emoji: '⚡' },
  { name: 'psychic',  label: 'Psíquico', emoji: '🔮' },
  { name: 'dragon',   label: 'Dragón',   emoji: '🐉' },
]
*/}
export default function Home() {
  return (
    <div style={{ paddingTop: '64px' }}>
      <section
        className="hero-section flex flex-col items-center justify-center"
        aria-label="Sección de inicio"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        <PokeballIcon className="w-24 h-24 mb-6 fade-in-up stagger-1" aria-hidden="true" />

        <h1 className="fade-in-up stagger-2 text-4xl sm:text-5xl md:text-6xl font-bold text-white m-0 leading-tight text-center">
          Descubre el mundo{' '}
          <span style={{ color: '#e94560' }}>Pokemon</span>
        </h1>

        <p className="fade-in-up stagger-3 text-lg mt-4 mb-8 text-center max-w-lg" style={{ color: '#aaaaaa' }}>
          Explora más de 1000 Pokemon en tiempo real desde la PokéAPI.
          Busca, filtra por tipo y guarda tus favoritos.
        </p>

        <div className="fade-in-up stagger-4 flex flex-col sm:flex-row gap-4">
          <Link to="/explorar" className="btn-primary text-lg px-8 py-4 no-underline">
            Explorar Pokemon
          </Link>
          <Link to="/favoritos" className="btn-outline text-lg px-8 py-4 no-underline">
            Mis favoritos
          </Link>
        </div>

        {/*<div
          className="fade-in-up stagger-5 flex gap-12 mt-16 px-12 py-8 rounded-3xl"
          style={{ backgroundColor: '#16213e' }}
        >
          {[
            { num: '1025+', label: 'Pokemon' },
            { num: '18',    label: 'Tipos' },
            { num: 'Gen IX', label: 'Más reciente' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <div className="text-4xl font-bold" style={{ color: '#e94560' }}>{num}</div>
              <div className="text-sm mt-1" style={{ color: '#777' }}>{label}</div>
            </div>
          ))}
        </div>
        */}
      </section>

      {/* ─── Tipos destacados ─── */}
      {/*
      <section
        className="dark-section"
        aria-label="Tipos de Pokémon"
        style={{ fontFamily: 'Arial, sans-serif', paddingTop: '60px', paddingBottom: '60px' }}
      >
        <h2 className="section-title">Explorar por tipo</h2>
        <p className="section-sub">Elige un tipo para explorar directamente</p>

        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto mt-8">
          {TYPES.map(({ name, label, emoji }) => (
            <Link
              key={name}
              to={`/explorar?tipo=${name}`}
              className="no-underline"
              aria-label={`Ver Pokémon de tipo ${label}`}
            >
              <article
                className="flex flex-col items-center gap-2 px-6 py-5 rounded-xl cursor-pointer transition-all duration-200 border"
                style={{
                  backgroundColor: '#16213e',
                  borderColor: '#2a2a4a',
                  color: 'white',
                  width: '120px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#e94560'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#2a2a4a'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <span className="text-3xl" role="img" aria-label={label}>{emoji}</span>
                <span className="text-sm font-bold capitalize">{label}</span>
              </article>
            </Link>
          ))}
        </div>
      </section>
      */}
    </div>
  )
}
