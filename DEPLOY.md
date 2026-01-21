# 🚀 Guía de Deploy Rápido

## Opción 1: Vercel (Más Rápido - 2 minutos)

### Desde la Web (Recomendado):

1. **Sube tu código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <tu-repo-github>
   git push -u origin main
   ```

2. **Ve a [vercel.com/new](https://vercel.com/new)**
   - Conecta tu cuenta de GitHub
   - Selecciona el repositorio `jetman`
   - Vercel detectará automáticamente Next.js
   - Click en **"Deploy"**
   - ¡Listo! Tu sitio estará en vivo en menos de 2 minutos

### Desde la CLI:

```bash
# Instala Vercel CLI globalmente
npm i -g vercel

# En el directorio del proyecto
vercel login
vercel

# Para producción
vercel --prod
```

## Opción 2: Netlify (Alternativa)

1. **Sube a GitHub** (igual que arriba)

2. **Ve a [app.netlify.com](https://app.netlify.com)**
   - Click en "Add new site" > "Import an existing project"
   - Conecta GitHub y selecciona el repo
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click "Deploy site"

## ⚠️ Nota Importante sobre el Almacenamiento

**Para la demo:** El sistema usa un archivo JSON local que funciona perfectamente en desarrollo.

**Para producción en Vercel/Netlify:** Necesitarás migrar a una base de datos real porque:
- Los archivos del sistema de archivos no persisten entre deployments
- Cada vez que se hace deploy, se pierden los datos

### Solución Rápida para Producción:

**Opción A: Supabase (Gratis y Fácil)**

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
4. Instala: `npm install @supabase/supabase-js`
5. Crea `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=tu-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-key
   ```
6. Actualiza las API routes para usar Supabase

**Opción B: Vercel KV (Redis) - Solo Vercel**

1. En tu proyecto de Vercel, ve a Storage
2. Crea una KV Database
3. Instala: `npm install @vercel/kv`
4. Actualiza las API routes

## 🧪 Probar Localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## ✅ Checklist Pre-Deploy

- [ ] Instalar dependencias: `npm install`
- [ ] Probar localmente: `npm run dev`
- [ ] Verificar que el formulario funciona
- [ ] Verificar que el contador se actualiza
- [ ] Subir a GitHub
- [ ] Deploy en Vercel/Netlify
- [ ] (Opcional) Configurar base de datos para producción

---

**¡Tu landing page estará lista en minutos!** 🎉
