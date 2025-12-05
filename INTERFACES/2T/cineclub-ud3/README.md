# CineClub · Starter UD3 (DIW · 0615)
Plantilla mínima para practicar **implantación de contenido multimedia**.

## Qué incluye
- Imágenes con `<picture>`: **AVIF ▸ WebP ▸ JPEG/PNG** (fallback).
- Vídeo con múltiples fuentes: **AV1 (MP4)**, **VP9 (WebM)**, **H.264 (MP4)**; `poster` y descarga alternativa.
- Audio: **MP3** y **OGG**.
- Atribución **TASL** en cada ficha.

## Targets sugeridos
- **Poster hero**: 1600×900 (AVIF/WebP/JPEG).
- **Poster ficha**: 1200×1800 (AVIF/WebP/JPEG o PNG si transparencia).
- **Vídeo tráiler**: 1280×720 (720p) – AV1/VP9/H.264.
- **Audio**: MP3 ~192 kbps + OGG q≈5.

## Tareas para el alumnado
1. Sustituir imágenes y generar variantes AVIF/WebP/JPEG (o PNG si alfa).
2. Exportar tráiler a AV1/VP9/H.264, añadir `poster` y (opcional) `track` de subtítulos.
3. Añadir clip de audio en MP3 y OGG.
4. Completar atribuciones **TASL** con enlaces y licencias.
5. Validar HTML y revisar pesos de archivos.

## Estructura
- `index.html` – catálogo y objetivos técnicos.
- `pelicula-ciudad-de-noche.html` – ejemplo completo (con vídeo/audio).
- `pelicula-luz-en-invierno.html` – segunda ficha para completar.
- `styles.css` – estilos básicos.

> Nota: Los recursos bajo `media/` son rutas de ejemplo. Añade tus propios archivos.


## Actividad: Comparativa de formatos (site de películas)
1. Abre `comparativa-formatos.html` y sustituye las rutas de `/media/compare/` por tus exportaciones (JPEG, PNG, WebP, AVIF y un PNG generado desde SVG).
2. Comprueba los KPIs (tiempo de carga y tamaño) que muestra cada tarjeta y añade tus comentarios de calidad.
3. Usa `srcset`/`sizes`, `loading="lazy"` y exporta con herramientas como **Squoosh**, **TinyPNG** o **ImageOptim**.
## ¿Qué hacer en el resto de páginas del starter?
- `index.html`: reemplaza la imagen *hero* por la tuya (AVIF/WebP/JPEG). Añade 2–4 tarjetas nuevas de películas y completa sinopsis.
- `pelicula-ciudad-de-noche.html`: úsala como ejemplo; si tienes materiales, cambia el `<video>` por tus ficheros (AV1/VP9/H.264), `poster` y audio (MP3/OGG).
- `pelicula-luz-en-invierno.html`: completa esta ficha tú mismo/a. Añade `<picture>` al póster, un tráiler con 3 fuentes y un clip de audio.
- En todas las páginas: añade atribución **TASL** (Título, Autor, Source, Licencia), revisa `alt`, `width/height`, `loading="lazy"` y prueba en 2 navegadores.

## Conclusiones de la comparativa
Escribe aquí tus conclusiones (qué formato recomendarías y por qué), usando los datos de **peso** y **tiempo** y tus observaciones de **calidad**.
