export default function ErrorMessage({ message = 'No se pudo cargar la información.', onRetry }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 gap-6 text-center"
      role="alert"
      aria-live="assertive"
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(233,69,96,0.1)', border: '2px solid rgba(233,69,96,0.3)' }}
      >
        <svg className="w-8 h-8" style={{ color: '#e94560' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <div>
        <p className="font-bold text-white">{message}</p>
        <p style={{ color: '#777', fontSize: '14px', marginTop: '4px' }}>
          Verifica tu conexión e intenta de nuevo.
        </p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Reintentar
        </button>
      )}
    </div>
  )
}
