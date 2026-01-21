# Triatlón Apronte Jetman - Landing Page

Landing page para el evento Triatlón Apronte Jetman con sistema de inscripciones y contador en vivo.

## 🚀 Deploy Rápido en Vercel

### Opción 1: Deploy desde GitHub (Recomendado)

1. **Sube tu código a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <tu-repo-url>
   git push -u origin main
   ```

2. **Deploy en Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu cuenta de GitHub
   - Importa el repositorio
   - Vercel detectará automáticamente Next.js
   - Click en "Deploy"
   - ¡Listo! Tu sitio estará en vivo en menos de 2 minutos

### Opción 2: Deploy desde CLI

```bash
# Instala Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Para producción
vercel --prod
```

## 🏃 Desarrollo Local

1. **Instala dependencias:**
   ```bash
   npm install
   ```

2. **Agrega la imagen del evento:**
   - Coloca tu imagen en `public/images/jetman-hero.jpg`
   - Formatos soportados: JPG, PNG, WebP
   - Tamaño recomendado: 1920x1080px o mayor (formato horizontal)
   - Si no agregas la imagen, se mostrará un fondo degradado azul

3. **Ejecuta el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abre [http://localhost:3000](http://localhost:3000)**

## 📝 Características

- ✅ Landing page moderna y responsive
- ✅ Imagen hero del evento como fondo
- ✅ Formulario de inscripción con validación
- ✅ Contador en vivo de inscriptos
- ✅ Diseño basado en la identidad visual del evento
- ✅ Actualización automática cada 2 segundos

## 🔄 Migración a Base de Datos Real

Para producción, te recomiendo migrar a una de estas opciones:

### Opción A: Supabase (Recomendado - Gratis)
1. Crea cuenta en [supabase.com](https://supabase.com)
2. Crea una tabla `registrations` con campos: id, nombre, email, telefono, fecha
3. Reemplaza las API routes para usar Supabase client

### Opción B: Firebase Firestore
1. Crea proyecto en [firebase.google.com](https://firebase.google.com)
2. Configura Firestore
3. Usa Firebase SDK en las API routes

### Opción C: Vercel KV (Redis)
1. Agrega Vercel KV a tu proyecto
2. Usa Redis para almacenar las inscripciones

## 📦 Estructura del Proyecto

```
jetman/
├── app/
│   ├── api/
│   │   ├── register/      # Endpoint para inscripciones
│   │   └── registrations/ # Endpoint para obtener contador
│   ├── layout.tsx
│   ├── page.tsx          # Landing page principal
│   └── globals.css
├── components/
│   ├── RegistrationForm.tsx
│   └── LiveCounter.tsx
├── public/
│   └── images/
│       └── jetman-hero.jpg  # Imagen del evento (agregar aquí)
└── data/                 # Archivo JSON (solo para demo)
    └── registrations.json
```

## 🎨 Personalización

- Colores: Edita `tailwind.config.ts` para cambiar los colores dorados
- Contenido: Modifica `app/page.tsx` para cambiar textos y fechas
- Estilos: Ajusta `app/globals.css` para personalizar el diseño

## 📱 Responsive

La landing page está completamente optimizada para:
- 📱 Móviles
- 💻 Tablets
- 🖥️ Desktop

---

¡Listo para mostrar tu demo! 🎉
