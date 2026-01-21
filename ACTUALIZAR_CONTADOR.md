# 📊 Cómo Actualizar el Contador de Inscriptos

Como ahora las inscripciones se hacen pagando y enviando el comprobante por WhatsApp, el contador no se actualiza automáticamente.

## Opción 1: Actualizar Manualmente (Recomendado)

Puedes actualizar el contador manualmente cuando recibas comprobantes por WhatsApp.

### Desde el navegador (más fácil):

1. Abre la consola del navegador (F12 o Cmd+Option+I)
2. Ejecuta este código:

```javascript
fetch('/api/registrations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ count: 25 }) // Cambia 25 por el número real
})
.then(res => res.json())
.then(data => console.log('Contador actualizado:', data))
```

### Desde la terminal (si tienes acceso al servidor):

```bash
curl -X POST http://localhost:3000/api/registrations \
  -H "Content-Type: application/json" \
  -d '{"count": 25}'
```

## Opción 2: Crear una Página de Admin (Más Profesional)

Puedo crear una página simple protegida con contraseña donde puedas actualizar el contador fácilmente desde la interfaz.

## Opción 3: Eliminar el Contador

Si prefieres, puedo eliminar el contador completamente de la página.

---

**¿Qué opción prefieres?** Puedo implementar cualquiera de estas soluciones.
