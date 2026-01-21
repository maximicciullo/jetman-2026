'use client'

import { useState } from 'react'

interface RegistrationFormProps {
  onSuccess: () => void
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: '¡Inscripción exitosa! Te esperamos en el evento.' })
        setFormData({ nombre: '', email: '', telefono: '' })
        onSuccess()
      } else {
        setMessage({ type: 'error', text: data.error || 'Error al inscribirse. Intenta nuevamente.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error de conexión. Intenta nuevamente.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="nombre" className="block text-xs font-medium mb-1">
          Nombre Completo *
        </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          required
          value={formData.nombre}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 border border-yellow-400/50 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-white placeholder-gray-400"
          placeholder="Tu nombre completo"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-medium mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 border border-yellow-400/50 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-white placeholder-gray-400"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label htmlFor="telefono" className="block text-xs font-medium mb-1">
          Teléfono *
        </label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          required
          value={formData.telefono}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 border border-yellow-400/50 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-white placeholder-gray-400"
          placeholder="+54 9 11 1234-5678"
        />
      </div>

      {message && (
        <div
          className={`p-2 text-xs rounded-lg ${
            message.type === 'success'
              ? 'bg-green-500/20 border border-green-500 text-green-200'
              : 'bg-red-500/20 border border-red-500 text-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 px-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-sm rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        {isSubmitting ? 'Inscribiendo...' : 'Inscribirme Ahora'}
      </button>
    </form>
  )
}
