import { useState, useRef } from 'react'
import ConfirmModal from '../components/ConfirmModal'
import toast from 'react-hot-toast'

const INITIAL = { nombre: '', email: '', mensaje: '' }

function validate(f) {
  const e = {}
  if (f.nombre.trim().length < 2)
    e.nombre = 'El nombre debe tener al menos 2 caracteres'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = 'Ingresa un correo válido (ej: usuario@dominio.com)'
  if (f.mensaje.trim().length < 10)
    e.mensaje = 'El mensaje debe tener al menos 10 caracteres'
  return e
}

export default function Contact() {
  const [fields, setFields]   = useState(INITIAL)
  const [touched, setTouched] = useState({})
  const modalRef = useRef(null)

  const errors  = validate(fields)
  const isValid = Object.keys(errors).length === 0

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
  }

  const handleBlur = (e) => setTouched(prev => ({ ...prev, [e.target.name]: true }))

  const handleSubmitClick = () => {
    setTouched({ nombre: true, email: true, mensaje: true })
    if (isValid) modalRef.current?.open()
  }

  const handleConfirmSend = () => {
    toast.success('¡Mensaje enviado correctamente!')
    setFields(INITIAL)
    setTouched({})
  }

  return (
    <div
      style={{
        paddingTop: '64px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #0f2444 50%, #0a3060 100%)',
        fontFamily: 'Arial',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '100px 20px 60px',
      }}
    >
      <div
        className="w-full"
        style={{ maxWidth: '460px' }}
      >
        {/* Card — igual al login_card del Taller 3 */}
        <div
          className="rounded-xl p-10 text-center"
          style={{ backgroundColor: '#16213e' }}
        >
          <h1 className="text-3xl font-bold text-white m-0 mb-2">Contacto</h1>
          <p style={{ color: '#777', fontSize: '14px', marginBottom: '32px' }}>
            ¿Tienes alguna pregunta o sugerencia? Déjanos un mensaje.
          </p>

          <div className="flex flex-col gap-3 text-left">

            {/* Nombre */}
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm mb-1"
                style={{ color: '#aaa' }}
              >
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={fields.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tu nombre"
                className="poke-input"
                style={touched.nombre && errors.nombre ? { borderColor: '#e94560' } : {}}
                aria-required="true"
                aria-describedby={touched.nombre && errors.nombre ? 'nombre-error' : undefined}
              />
              {touched.nombre && errors.nombre && (
                <p id="nombre-error" role="alert" style={{ color: '#e94560', fontSize: '12px', marginTop: '4px' }}>
                  {errors.nombre}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm mb-1"
                style={{ color: '#aaa' }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={fields.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="correo@ejemplo.com"
                className="poke-input"
                style={touched.email && errors.email ? { borderColor: '#e94560' } : {}}
                aria-required="true"
                aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
              />
              {touched.email && errors.email && (
                <p id="email-error" role="alert" style={{ color: '#e94560', fontSize: '12px', marginTop: '4px' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Mensaje */}
            <div>
              <label
                htmlFor="mensaje"
                className="block text-sm mb-1"
                style={{ color: '#aaa' }}
              >
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                value={fields.mensaje}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Escribe tu mensaje aquí..."
                className="poke-input resize-none"
                style={touched.mensaje && errors.mensaje ? { borderColor: '#e94560' } : {}}
                aria-required="true"
                aria-describedby={touched.mensaje && errors.mensaje ? 'mensaje-error' : undefined}
              />
              <div className="flex justify-between items-start mt-1">
                {touched.mensaje && errors.mensaje ? (
                  <p id="mensaje-error" role="alert" style={{ color: '#e94560', fontSize: '12px' }}>
                    {errors.mensaje}
                  </p>
                ) : <span />}
                <span style={{ color: fields.mensaje.length >= 10 ? '#e94560' : '#777', fontSize: '12px' }}>
                  {fields.mensaje.length} / 10 mín.
                </span>
              </div>
            </div>

            {/* Botón — disabled si no es válido, igual al login_btn del Taller 3 */}
            <button
              type="button"
              onClick={handleSubmitClick}
              disabled={!isValid}
              aria-disabled={!isValid}
              className="btn-primary w-full mt-2 text-base"
              style={{ padding: '12px' }}
            >
              Enviar mensaje
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        ref={modalRef}
        title="¿Enviar mensaje?"
        description={`Se enviará tu mensaje desde ${fields.email}.`}
        confirmLabel="Enviar"
        cancelLabel="Revisar"
        onConfirm={handleConfirmSend}
      />
    </div>
  )
}
