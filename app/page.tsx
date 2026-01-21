'use client'

import { useState, useEffect } from 'react'
import LiveCounter from '@/components/LiveCounter'
import PaymentSection from '@/components/PaymentSection'

export default function Home() {
  const [registrations, setRegistrations] = useState(0)

  useEffect(() => {
    // Cargar el contador inicial
    fetch('/api/registrations')
      .then(res => res.json())
      .then(data => setRegistrations(data.count))
      .catch(() => setRegistrations(0))

    // Actualizar cada 2 segundos para efecto "en vivo"
    const interval = setInterval(() => {
      fetch('/api/registrations')
        .then(res => res.json())
        .then(data => setRegistrations(data.count))
        .catch(() => {})
    }, 2000)

    return () => clearInterval(interval)
  }, [])


  return (
    <main className="h-screen overflow-hidden">
      {/* Hero Section - Todo en una sola vista */}
      <section className="relative h-screen overflow-y-auto py-2 md:py-4 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        {/* Imagen de fondo con blur */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/jetman-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(8px)',
            transform: 'scale(1.1)',
          }}
        />
        {/* Overlay para mejorar legibilidad del texto */}
        <div className="fixed inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-[1]"></div>
        
        {/* Contenido - Todo compacto */}
        <div className="container mx-auto max-w-6xl relative z-[2] py-2 md:py-4">
          {/* Header compacto */}
          <div className="text-center space-y-1 md:space-y-2 mb-3 md:mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white-shadow uppercase tracking-wide" style={{ fontFamily: 'var(--font-racing)' }}>
              Triatlón Apronte
            </h1>
            <h2 className="text-4xl md:text-5xl font-black text-gold text-gold-shadow uppercase" style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.1em' }}>
              JETMAN
            </h2>
            <div className="flex items-center justify-center gap-2 text-lg md:text-xl font-bold text-white-shadow">
              <span>750</span>
              <span className="text-gold">-</span>
              <span>20</span>
              <span className="text-gold">-</span>
              <span>5</span>
            </div>
            <p className="text-sm md:text-base italic text-white-shadow flex items-center justify-center gap-1" style={{ fontFamily: 'var(--font-righteous), Arial Black, Impact, sans-serif' }}>
              "El más picante"
              <span className="text-red-500 text-lg">🌶️</span>
            </p>
            <div className="inline-block bg-black/60 border-2 border-yellow-400 px-4 py-2 rounded-lg backdrop-blur-sm">
              <p className="text-sm md:text-base font-bold text-white-shadow">
                Sábado 31/01
              </p>
            </div>
          </div>

          {/* Event Details - Información adicional */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-yellow-400/30 max-w-2xl mx-auto mb-3 md:mb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center mb-3">
              <div>
                <div className="text-xl md:text-2xl mb-1">🏁</div>
                <p className="text-xs text-gray-300 mb-0.5">Tipo</p>
                <p className="text-sm md:text-base font-bold text-gold">Apronte Short</p>
              </div>
              <div>
                <div className="text-xl md:text-2xl mb-1">📍</div>
                <p className="text-xs text-gray-300 mb-0.5">Lugar</p>
                <p className="text-sm md:text-base font-bold text-gold">Jet Park</p>
              </div>
              <div>
                <div className="text-xl md:text-2xl mb-1">🕐</div>
                <p className="text-xs text-gray-300 mb-0.5">Hora</p>
                <p className="text-sm md:text-base font-bold text-gold">8:30hs</p>
              </div>
              <div>
                <div className="text-xl md:text-2xl mb-1">💰</div>
                <p className="text-xs text-gray-300 mb-0.5">Valor</p>
                <p className="text-sm md:text-base font-bold text-gold">$50.000</p>
              </div>
            </div>
            
            {/* Mapa embebido - Captura pequeña */}
            <div className="mb-3 rounded-lg overflow-hidden border border-yellow-400/20">
              <a
                href="https://maps.app.goo.gl/qhn4tZuCcUvfK2Xq5"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group"
              >
                <div className="relative w-full h-40 md:h-48 bg-gray-800 overflow-hidden">
                  {/* Imagen del mapa - Reemplazar con la imagen correcta */}
                  <img
                    src="/images/jetpark-map.jpg"
                    alt="Ubicación Jet Park"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Si la imagen no existe, mostrar un placeholder
                      e.currentTarget.style.display = 'none'
                      const parent = e.currentTarget.parentElement
                      if (parent) {
                        parent.innerHTML = `
                          <div class="flex items-center justify-center h-full">
                            <div class="text-center">
                              <div class="text-4xl mb-2">📍</div>
                              <p class="text-sm text-gray-300">Jet Park</p>
                              <p class="text-xs text-yellow-400 mt-1">Click para ver en Google Maps</p>
                            </div>
                          </div>
                        `
                      }
                    }}
                  />
                  {/* Overlay para indicar que es clickeable */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="bg-black/60 px-3 py-1 rounded-lg backdrop-blur-sm">
                      <p className="text-xs text-white font-semibold">Click para ver mapa completo</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            
            {/* Botón para ver ubicación en Google Maps */}
            <a
              href="https://maps.app.goo.gl/qhn4tZuCcUvfK2Xq5"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs md:text-sm rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>🗺️</span>
              <span>Ver Ubicación en Google Maps</span>
            </a>
          </div>

          {/* Información adicional del evento */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-yellow-400/30 max-w-2xl mx-auto mb-3 md:mb-4">
            <h3 className="text-base md:text-lg font-bold text-center mb-3 text-gold text-gold-shadow">
              ✅ Incluye en tu inscripción:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2 text-gray-200">
                <span className="text-green-400">✓</span>
                <span>Estacionamiento en el predio</span>
              </div>
              <div className="flex items-center gap-2 text-gray-200">
                <span className="text-green-400">✓</span>
                <span>Hidratación</span>
              </div>
              <div className="flex items-center gap-2 text-gray-200">
                <span className="text-green-400">✓</span>
                <span>Kit del entrenamiento</span>
              </div>
              <div className="flex items-center gap-2 text-gray-200">
                <span className="text-green-400">✓</span>
                <span>Seguridad en la laguna</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-yellow-400/20">
              <p className="text-xs md:text-sm text-center text-yellow-300 font-semibold">
                ℹ️ Acompañantes abonan el ingreso al predio
              </p>
            </div>
          </div>

          {/* Event Info Cards - Más compactas */}
          <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-5">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-yellow-400/30">
              <div className="text-3xl md:text-4xl mb-2 text-center">🏊</div>
              <h3 className="text-sm md:text-base font-bold text-gold mb-1 text-center">Natación</h3>
              <p className="text-lg md:text-xl font-bold text-center">750m</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-yellow-400/30">
              <div className="text-3xl md:text-4xl mb-2 text-center">🚴</div>
              <h3 className="text-sm md:text-base font-bold text-gold mb-1 text-center">Ciclismo</h3>
              <p className="text-lg md:text-xl font-bold text-center">20km</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-yellow-400/30">
              <div className="text-3xl md:text-4xl mb-2 text-center">🏃</div>
              <h3 className="text-sm md:text-base font-bold text-gold mb-1 text-center">Running</h3>
              <p className="text-lg md:text-xl font-bold text-center">5km</p>
            </div>
          </div>

          {/* Live Counter - Destacado y visible */}
          <div className="mb-4 md:mb-5">
            <LiveCounter count={registrations} />
          </div>

          {/* Payment Section - Inscripción por pago */}
          <div className="max-w-xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-3 text-gold text-gold-shadow">
              Inscríbete Ahora
            </h2>
            <PaymentSection whatsappNumber="5493484511127" />
          </div>

          {/* Sección de Consultas */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 border border-yellow-400/30 max-w-xl mx-auto mb-3">
            <div className="text-center">
              <p className="text-xs md:text-sm text-gray-300 mb-2">¿Tenés consultas?</p>
              <a
                href="https://wa.me/5493484511127"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-bold text-sm md:text-base transition-colors"
              >
                <span>💬</span>
                <span>+54 9 3484 51-1127</span>
              </a>
            </div>
          </div>

          {/* Footer compacto */}
          <footer className="mt-3 text-center text-gray-300 text-xs">
            <p>© 2026 Triatlón Apronte Jetman - El más picante</p>
          </footer>
        </div>
      </section>
    </main>
  )
}
