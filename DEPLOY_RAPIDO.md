# 🚀 Deploy Rápido - Triatlón Apronte Jetman

## Opción 1: Deploy con Vercel (Recomendado - 2 minutos)

### Paso 1: Subir a GitHub

```bash
# En el directorio del proyecto
cd /Users/maxmicciullo/Projects/jetman

# Inicializar git
git init

# Agregar todos los archivos
git add .

# Hacer commit inicial
git commit -m "Initial commit - Landing page Jetman"

# Crear repositorio en GitHub (ve a github.com y crea uno nuevo)
# Luego conecta:
git branch -M main
git remote add origin https://github.com/TU_USUARIO/jetman.git
git push -u origin main
```

### Paso 2: Deploy en Vercel

1. Ve a **[vercel.com](https://vercel.com)** y crea una cuenta (o inicia sesión)
2. Click en **"Add New Project"** o **"Import Project"**
3. Conecta tu cuenta de **GitHub**
4. Selecciona el repositorio **jetman**
5. Vercel detectará automáticamente que es Next.js
6. Click en **"Deploy"**
7. ¡Listo! Tu sitio estará en vivo en menos de 2 minutos

**URL de tu sitio:** `https://jetman.vercel.app` (o el nombre que elijas)

---

## Opción 2: Deploy desde CLI (Sin GitHub)

```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# En el directorio del proyecto
cd /Users/maxmicciullo/Projects/jetman

# Login en Vercel
vercel login

# Deploy (primera vez te hará preguntas)
vercel

# Para producción
vercel --prod
```

---

## ⚠️ Importante: Base de Datos

**El sistema actual usa archivos JSON locales que NO funcionan en Vercel.**

Para que funcione en producción, necesitas una base de datos real. Opciones rápidas:

### Opción A: Supabase (Gratis - Recomendado)

1. Ve a [supabase.com](https://supabase.com) y crea cuenta
2. Crea un nuevo proyecto
3. En SQL Editor, ejecuta:
   ```sql
   CREATE TABLE registrations (
     id TEXT PRIMARY KEY,
     nombre TEXT NOT NULL,
     email TEXT UNIQUE NOT NULL,
     telefono TEXT NOT NULL,
     fecha TIMESTAMP DEFAULT NOW()
   );
   ```
4. Ve a Settings > API y copia:
   - Project URL
   - anon/public key
5. Instala Supabase:
   ```bash
   npm install @supabase/supabase-js
   ```
6. Crea `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=tu-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-key
   ```
7. Actualiza las API routes para usar Supabase

### Opción B: Vercel KV (Solo si usas Vercel)

1. En tu proyecto de Vercel, ve a Storage
2. Crea una KV Database
3. Instala: `npm install @vercel/kv`
4. Actualiza las API routes

---

## 📝 Checklist Pre-Deploy

- [ ] Instalar dependencias: `npm install`
- [ ] Probar localmente: `npm run dev`
- [ ] Agregar imagen en `public/images/jetman-hero.jpg` (opcional)
- [ ] Subir a GitHub
- [ ] Deploy en Vercel
- [ ] (Opcional) Configurar base de datos para contador

---

## 🎯 Para Demo Rápida

Si solo quieres mostrar la demo sin base de datos:
- El contador mostrará 0 (no hay problema)
- El formulario de inscripción no guardará datos
- La página se verá perfecta y funcional

¡Tu landing page estará lista en minutos! 🎉
