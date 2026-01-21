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
    fs.writeFileSync(DATA_FILE, JSON.stringify({ registrations: [] }))
  }
}

export async function POST(request: NextRequest) {
  try {
    ensureDataDir()

    const body = await request.json()
    const { nombre, email, telefono } = body

    // Validación básica
    if (!nombre || !email || !telefono) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Leer registraciones existentes
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
    
    // Verificar si el email ya está registrado
    const exists = data.registrations.some((reg: any) => reg.email === email)
    if (exists) {
      return NextResponse.json(
        { error: 'Este email ya está registrado' },
        { status: 400 }
      )
    }

    // Agregar nueva inscripción
    const newRegistration = {
      id: Date.now().toString(),
      nombre,
      email,
      telefono,
      fecha: new Date().toISOString(),
    }

    data.registrations.push(newRegistration)

    // Guardar
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))

    return NextResponse.json(
      { message: 'Inscripción exitosa', registration: newRegistration },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error en registro:', error)
    return NextResponse.json(
      { error: 'Error al procesar la inscripción' },
      { status: 500 }
    )
  }
}
