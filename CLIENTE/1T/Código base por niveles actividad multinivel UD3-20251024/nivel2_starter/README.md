# UD3 · Starter Nivel 2 — Panel del Navegador (Intermedio)

## Objetivo didáctico
- Usar `location`, `screen`, `history` y **persistir** un tema claro/oscuro en `localStorage`.
- Generar HTML dinámico para presentar información del navegador.
- Abrir una ventana de ayuda pasando datos por **query string** y leerlos con `URLSearchParams`.

**RAs:** RA2 (verificación en navegador), RA3 (objetos predefinidos y generación dinámica).

## Estructura de archivos
- `index.html` — Interfaz con panel de información y botones.
- `styles.css` — Estilos y clases de tema (`.light`, `.dark`).
- `app-n2.js` — Lógica con **TODOs** para completar.
- `ayuda.html` — Ventana auxiliar (completar saludo con `URLSearchParams`).

## Tareas
1. **pintarInfo()**: mostrar `location.href`, `location.pathname`, `screen.width`, `screen.height` en una lista HTML.
2. **Tema**:
   - `leerTema()` devuelve `'light' | 'dark'`.
   - `aplicarTema(tema)` altera la clase del `<body>`.
   - Botón **Cambiar tema**: alterna y guarda en `localStorage` (clave `tema`).
3. **Historial**: botones **Atrás** / **Adelante** con `history.back()` / `history.forward()`.
4. **Ayuda**: pedir nombre con `prompt`, abrir `ayuda.html?autor=...`, y en `ayuda.html` mostrar “Hola, {autor}”.

## Comprobación rápida (checklist)
- [ ] El panel muestra info actual de `location` y `screen`.
- [ ] El tema persiste al recargar la página.
- [ ] Los botones de historial no producen errores (su efecto depende del flujo de navegación).
- [ ] La ventana de ayuda saluda con el nombre pasado por query string.
- [ ] No hay errores en consola; el código está comentado.

## Cómo ejecutar
Abre `index.html` en el navegador. Para probar `history`, navega entre varias páginas o usa un servidor local.
