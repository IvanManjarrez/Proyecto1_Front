import { Link } from 'react-router-dom'
import PokeballIcon from '../components/PokeballIcon'

export default function NotFound() {
  return (
    <div
      style={{
        paddingTop: '64px',
        minHeight: '100vh',
        background: 'linear-gradient(130deg, #1a1a2e, #0f335f)',
        fontFamily: 'Arial',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px',
      }}
    >
      {/* Pokéball giratoria */}
      <PokeballIcon
        className="w-28 h-28 mb-6 opacity-20"
        aria-hidden="true"
      />

      <h1
        className="font-bold"
        style={{ fontSize: '120px', lineHeight: 1, color: '#e94560', opacity: 0.2, margin: 0 }}
        aria-hidden="true"
      >
        404
      </h1>

      <div style={{ marginTop: '-20px' }}>
        <h2 className="text-3xl font-bold text-white mb-2">Página no encontrada</h2>
        <p style={{ color: '#aaa', marginBottom: '32px' }}>
          La ruta que buscas no existe en esta aplicación.
        </p>
        <Link to="/" className="btn-primary no-underline">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
