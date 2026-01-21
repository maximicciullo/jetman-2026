'use client'

import { useState } from 'react'

interface PaymentSectionProps {
  whatsappNumber?: string
}

export default function PaymentSection({ whatsappNumber = '5491112345678' }: PaymentSectionProps) {
  const [copied, setCopied] = useState(false)
  const mercadoPagoAlias = 'peloton.entrena'

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mercadoPagoAlias)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openMercadoPago = () => {
    // Abrir Mercado Pago en una nueva pestaña
    window.open('https://www.mercadopago.com.ar', '_blank')
  }

  const openWhatsApp = () => {
    const message = encodeURIComponent('Hola! Envío el comprobante de pago del Triatlón Apronte Jetman.\n\n⚠️ No olvides adjuntar la imagen del comprobante en este mensaje.')
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-5 border border-yellow-400/30">
      <div className="space-y-4">
        {/* Instrucciones */}
        <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-3">
          <p className="text-xs md:text-sm text-yellow-200 text-center">
            <strong>Para inscribirte:</strong> Realiza el pago por Mercado Pago y envía el comprobante por WhatsApp.
          </p>
        </div>

        {/* Alias de Mercado Pago */}
        <div className="bg-black/30 rounded-lg p-3 border border-yellow-400/20">
          <p className="text-xs text-gray-300 mb-2 text-center">Alias de Mercado Pago:</p>
          <div className="flex items-center justify-center gap-2">
            <p className="text-lg md:text-xl font-bold text-gold font-mono">
              {mercadoPagoAlias}
            </p>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-yellow-400/20 hover:bg-yellow-400/30 border border-yellow-400/50 rounded text-xs text-yellow-300 transition-colors"
              title="Copiar alias"
            >
              {copied ? '✓ Copiado' : '📋 Copiar'}
            </button>
          </div>
        </div>

        {/* Botón para abrir Mercado Pago */}
        <button
          onClick={openMercadoPago}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <span>💙</span>
          <span>Abrir Mercado Pago</span>
        </button>

        {/* Información sobre el comprobante - Más destacado */}
        <div className="bg-red-500/20 border-2 border-red-500/40 rounded-lg p-3">
          <p className="text-xs md:text-sm text-red-200 text-center mb-2 font-semibold">
            ⚠️ IMPORTANTE: Después de pagar, debes enviar el comprobante por WhatsApp al <strong>+54 9 3484 51-1127</strong> para completar tu inscripción.
          </p>
          <button
            onClick={openWhatsApp}
            className="w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-bold text-sm rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>💬</span>
            <span>Enviar Comprobante por WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  )
}
