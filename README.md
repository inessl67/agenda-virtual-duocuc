# Landing Extendida Detallada — DuocUC Sede San Joaquín

## Descripción

Versión extendida y detallada de la landing page de agendamiento. Incluye todas las secciones de la versión extendida más una sección de **Colaboradores** organizada por áreas con sistema de collapse.

## Sección Colaboradores

La sección "Nuestro Equipo" muestra los colaboradores agrupados por área:
- Cada área se puede expandir/colapsar haciendo clic
- Los coordinadores se identifican con un badge dorado y borde lateral
- Cada persona muestra: foto, nombre, rol, correo electrónico
- Los coordinadores además muestran a qué área pertenecen

### Cómo modificar los colaboradores

Edita directamente el archivo `index.html`. Cada área sigue esta estructura:

```html
<div class="team-area">
    <button class="team-area-toggle" aria-expanded="false" aria-controls="area-ID">
        <span class="area-name">Nombre del Área</span>
        <span class="area-count">N personas</span>
        <!-- ícono chevron -->
    </button>
    <div id="area-ID" class="team-area-panel" hidden>
        <div class="team-grid">
            <!-- Cards de personas aquí -->
        </div>
    </div>
</div>
```

Para agregar un coordinador, agrega la clase `team-card--coordinator` y el badge:

```html
<article class="team-card team-card--coordinator">
    <!-- contenido -->
    <span class="team-badge">Coordinador</span>
</article>
```

## Cómo modificar el Enlace de Bookings

Edita la constante `BOOKING_URL` al inicio de `js/main.js`.

## Deploy en GitHub Pages

1. Sube el contenido de esta carpeta a un repositorio en GitHub
2. Settings → Pages → Deploy from branch → main → / (root)
3. Listo

## Estructura

```
landing-extendida-detallada/
├── index.html
├── css/styles.css
├── js/main.js
├── assets/
│   ├── logo-duoc.svg
│   ├── favicon.svg
│   └── og-image.svg
└── README.md
```
