# UD3 · Starter Nivel 1 — Panel del Navegador (Básico)

## Objetivo didáctico
- Practicar **objetos predefinidos** (`Date`, `Math`, `document`, `window`, `localStorage`).
- Generar contenido en el DOM desde JavaScript (crear nodos y añadirlos al panel).
- Interactuar con el usuario mediante diálogos simples.

**RAs:** RA2 (verificación en navegador), RA3 (objetos predefinidos del lenguaje).

## Estructura de archivos
- `index.html` — Maquetación mínima con botones y panel.
- `app-n1.js` — Lógica con **TODOs** marcados para completar.

## Tareas
1. Implementa `log(mensaje)` para añadir `<p>` al panel.
2. Botón **Mostrar hora**: usa `new Date().toLocaleTimeString()` y registra en el panel.
3. Botón **Número aleatorio**: genera entero 1..100 con `Math.random()` y registra.
4. Botón **Cambiar título**: pide con `prompt()` y asigna a `document.title`.
5. Botón **Abrir ayuda**: abre una ventana simple con `window.open('about:blank', 'ayuda', 'width=400,height=300')`.
6. **Almacenamiento**: guarda y recupera `nombre` en `localStorage` (setItem/getItem).

## Comprobación rápida (checklist)
- [ ] Se muestran mensajes en el panel con la función `log`.
- [ ] Los cuatro botones funcionan sin errores en la consola.
- [ ] La ventana de ayuda abre (o se notifica bloqueo del navegador).
- [ ] El nombre se guarda y se recupera desde `localStorage`.
- [ ] El código está comentado y sin warnings en la consola.

## Cómo ejecutar
Abre `index.html` en el navegador (doble clic) o sirve la carpeta con un servidor estático.
