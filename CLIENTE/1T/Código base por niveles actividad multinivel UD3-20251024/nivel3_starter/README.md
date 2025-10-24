# UD3 · Starter Nivel 3 — Bloc multi-ventana con postMessage y Storage

## Objetivo didáctico
- Implementar **comunicación entre ventanas** con `postMessage` (validando `event.origin`).
- Gestionar **persistencia seleccionable**: `localStorage` (persistente) y `sessionStorage` (por pestaña).
- Diseñar un **logger** básico de eventos y generar contenido dinámico con marca temporal.

**RAs:** RA3 (objetos del navegador), RA4 (modularización y funciones propias).

## Estructura de archivos
- `index.html` — Ventana principal con panel y logger.
- `app-main.js` — Lógica principal (TODOs: abrir bloc, logger, receptor de mensajes).
- `bloc.html` — Ventana hija (editor de texto).
- `bloc.js` — Lógica del bloc (TODOs: autosave y envío al padre).

## Tareas
1. **Principal** (`app-main.js`):
   - Implementar `log(msg)` con timestamp.
   - Abrir `bloc.html` (controlar bloqueo de pop-ups).
   - Recibir mensajes `postMessage` con `type: 'bloc:texto'`, validar `event.origin` y **pintar** en el panel con fecha/hora.
   - Botón **Limpiar panel**.
2. **Bloc** (`bloc.js`):
   - Autosave del texto en `localStorage` (clave `bloc_autosave`), con conmutador a `sessionStorage`.
   - Botón **Enviar**: `window.opener.postMessage({ type:'bloc:texto', payload: area.value }, location.origin)`.
   - Botón **Limpiar**: vaciar y guardar.

## Comprobación rápida (checklist)
- [ ] Se abre el bloc (o aparece aviso si está bloqueado).
- [ ] El texto se guarda automáticamente y persiste según el modo elegido.
- [ ] Al pulsar **Enviar**, el principal recibe el texto y lo inserta con marca temporal.
- [ ] Se valida `event.origin` antes de aceptar mensajes.
- [ ] Logger registra acciones y no hay errores en consola.

## Cómo ejecutar
Abre `index.html` en el navegador (idealmente desde un servidor estático para simular origen). Luego pulsa **Abrir Bloc**.
