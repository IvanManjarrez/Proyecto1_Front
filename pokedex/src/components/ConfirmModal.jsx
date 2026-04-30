import { useRef, useImperativeHandle, forwardRef } from 'react'

/**
 * Le pedí ayuda a la IA
 * ConfirmModal — usa <dialog> nativo + useRef + showModal()
 * DARK PATTERN INTENCIONAL:
 * El botón de acción destructiva ("Quitar") se muestra primero y con el color
 * de acento (#e94560) que el usuario ya asocia a "acción principal" (mismo
 * color que todos los botones primarios del sitio). El botón "Cancelar" está
 * opacado y posicionado en segundo lugar, aprovechando el sesgo de posición
 * izquierda y la familiaridad del color para que el usuario confirme la
 * acción destructiva más fácilmente que la segura.
 * Patrón: confirmshaming + visual hierarchy manipulation.
 */
const ConfirmModal = forwardRef(function ConfirmModal(
  { title, description, onConfirm, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar' },
  ref
) {
  const dialogRef = useRef(null)

  useImperativeHandle(ref, () => ({
    open:  () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }))

  const handleConfirm = () => { dialogRef.current?.close(); onConfirm?.() }
  const handleCancel  = () => dialogRef.current?.close()
  const handleBdClick = (e) => { if (e.target === dialogRef.current) handleCancel() }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBdClick}
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      style={{
        background: '#16213e',
        border: '1px solid #2a2a4a',
        borderRadius: '16px',
        padding: '32px',
        width: '100%',
        maxWidth: '380px',
        color: 'white',
      }}
      className="backdrop:bg-black/60 open:animate-[fadeInUp_.25s_ease_forwards]"
    >
      <div className="flex flex-col gap-5 items-center text-center">
        {/* Icono */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(233,69,96,0.1)', border: '2px solid rgba(233,69,96,0.3)' }}
        >
          <svg className="w-7 h-7" style={{ color: '#e94560' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <div>
          <h2 id="modal-title" className="font-bold text-xl text-white m-0">{title}</h2>
          {description && (
            <p id="modal-desc" style={{ color: '#aaa', fontSize: '14px', marginTop: '8px' }}>
              {description}
            </p>
          )}
        </div>

        {/* Botones — DARK PATTERN: destructivo primero + color de acción primaria */}
        <div className="flex gap-3 w-full mt-1">
          {/* Confirmar: color #e94560 (acción principal del sitio → confunde al usuario) */}
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 rounded-full font-bold text-white border-none cursor-pointer transition-colors"
            style={{ backgroundColor: '#e94560' }}
          >
            {confirmLabel}
          </button>
          {/* Cancelar: opacado para que destaque menos */}
          <button
            onClick={handleCancel}
            className="flex-1 py-2.5 rounded-full font-bold cursor-pointer transition-colors border-none"
            style={{ backgroundColor: '#2a2a4a', color: '#aaa' }}
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </dialog>
  )
})

export default ConfirmModal
