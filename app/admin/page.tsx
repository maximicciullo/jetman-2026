'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [currentCount, setCurrentCount] = useState(0)
  const [newCount, setNewCount] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Contraseña desde variable de entorno (obligatoria)
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
  
  if (!ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD no configurada. Configura NEXT_PUBLIC_ADMIN_PASSWORD en las variables de entorno.')
  }

  useEffect(() => {
    // Verificar si ya está autenticado
    const auth = sessionStorage.getItem('admin_authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadCurrentCount()
    }
  }, [])

  const loadCurrentCount = async () => {
    try {
      const res = await fetch('/api/registrations')
      const data = await res.json()
      setCurrentCount(data.count || 0)
      setNewCount(String(data.count || 0))
    } catch (error) {
      console.error('Error cargando contador:', error)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!ADMIN_PASSWORD) {
      setMessage({ type: 'error', text: 'Error de configuración: Contraseña no configurada. Contacta al administrador.' })
      return
    }
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem('admin_authenticated', 'true')
      loadCurrentCount()
      setPassword('')
    } else {
      setMessage({ type: 'error', text: 'Contraseña incorrecta' })
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const count = parseInt(newCount)
    if (isNaN(count) || count < 0) {
      setMessage({ type: 'error', text: 'Por favor ingresa un número válido' })
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count }),
      })

      const data = await res.json()

      if (res.ok) {
        setCurrentCount(count)
        setMessage({ type: 'success', text: `Contador actualizado a ${count}` })
      } else {
        setMessage({ type: 'error', text: data.error || 'Error al actualizar' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error de conexión' })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_authenticated')
    setIsAuthenticated(false)
    setMessage(null)
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-yellow-400/30 max-w-md w-full">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gold text-gold-shadow">
            🔐 Admin - Jetman
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-200">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-yellow-400/50 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-white placeholder-gray-400"
                placeholder="Ingresa la contraseña"
                required
              />
            </div>
            {message && (
              <div
                className={`p-3 rounded-lg ${
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
              className="w-full py-3 px-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Ingresar
            </button>
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-yellow-400/30">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gold text-gold-shadow">
              📊 Panel de Administración
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors"
            >
              Salir
            </button>
          </div>

          {/* Contador actual */}
          <div className="bg-black/30 rounded-lg p-4 mb-6 border border-yellow-400/20">
            <p className="text-sm text-gray-300 mb-2">Contador actual:</p>
            <p className="text-4xl font-black text-gold text-center">{currentCount}</p>
          </div>

          {/* Formulario de actualización */}
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label htmlFor="newCount" className="block text-sm font-medium mb-2 text-gray-200">
                Nuevo valor del contador
              </label>
              <input
                type="number"
                id="newCount"
                value={newCount}
                onChange={(e) => setNewCount(e.target.value)}
                min="0"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-yellow-400/50 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 text-white placeholder-gray-400"
                placeholder="Ingresa el nuevo número"
                required
              />
            </div>

            {message && (
              <div
                className={`p-3 rounded-lg ${
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
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Actualizando...' : 'Actualizar Contador'}
            </button>
          </form>

          {/* Link de vuelta */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-yellow-400 hover:text-yellow-300 text-sm underline"
            >
              ← Volver a la landing page
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
