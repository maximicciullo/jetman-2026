import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'registrations.json')

// Asegurar que el directorio existe
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ count: 0 }))
  }
}

export async function GET() {
  try {
    ensureDataDir()
    
    if (!fs.existsSync(DATA_FILE)) {
      return NextResponse.json({ count: 0 })
    }

    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    
    return NextResponse.json({
      count: data.count || 0,
    })
  } catch (error) {
    console.error('Error leyendo registraciones:', error)
    return NextResponse.json({ count: 0 })
  }
}

// Endpoint para actualizar el contador manualmente
export async function POST(request: NextRequest) {
  try {
    ensureDataDir()

    const body = await request.json()
    const { count } = body

    if (typeof count !== 'number' || count < 0) {
      return NextResponse.json(
        { error: 'Count debe ser un número positivo' },
        { status: 400 }
      )
    }

    // Guardar el contador
    fs.writeFileSync(DATA_FILE, JSON.stringify({ count }))

    return NextResponse.json(
      { message: 'Contador actualizado', count },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error actualizando contador:', error)
    return NextResponse.json(
      { error: 'Error al actualizar el contador' },
      { status: 500 }
    )
  }
}
