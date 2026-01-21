'use client'

import { useEffect, useState } from 'react'

interface LiveCounterProps {
  count: number
}

export default function LiveCounter({ count }: LiveCounterProps) {
  const [displayCount, setDisplayCount] = useState(count)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (displayCount !== count) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setDisplayCount(count)
        setIsAnimating(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [count, displayCount])

  return (
    <div className="bg-gradient-to-br from-yellow-400/20 via-yellow-500/15 to-yellow-400/20 backdrop-blur-sm rounded-lg p-4 md:p-6 border-2 border-yellow-400/50 max-w-md mx-auto shadow-2xl">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <span className="text-sm md:text-base uppercase tracking-wider text-red-400 font-bold">En Vivo</span>
        </div>
        <div className="space-y-2">
          <p className="text-gray-200 text-sm md:text-base font-medium">Inscriptos hasta ahora:</p>
          <div
            className={`text-5xl md:text-7xl font-black text-gold text-gold-shadow transition-all duration-300 ${
              isAnimating ? 'scale-110' : 'scale-100'
            }`}
          >
            {displayCount}
          </div>
        </div>
      </div>
    </div>
  )
}
