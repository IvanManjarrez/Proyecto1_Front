export default function Footer() {
  return (
    <footer
      className="text-center py-5 text-white text-sm"
      style={{ backgroundColor: 'black', fontFamily: 'Arial, sans-serif' }}
    >
      <p>
        © 2026 <span style={{ color: '#e94560', fontWeight: 'bold' }}>PokéDex</span>.
        {' '}Datos sacados de la <span style={{ color: '#e94560', fontWeight: 'bold' }}>PokéAPI</span>.
      </p>
    </footer>
  )
}
