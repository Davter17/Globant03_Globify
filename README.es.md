**Español** | [English](README.md)

# Globify

Reproductor web de Spotify. Explora categorías, playlists y canciones guardadas, busca temas y controla la reproducción — todo a través de la Spotify Web API y el Web Playback SDK.

## 🚀 Cómo lanzar el proyecto

El proyecto incluye un Makefile que envuelve Docker Compose. Desde la raíz del proyecto:

```bash
make setup   # solo la primera vez — crea config.local.js a partir de la plantilla
make restart
```

Una vez iniciado el contenedor, abre tu navegador y navega a: http://localhost:8080

> Nota: Spotify OAuth2 requiere un Client ID válido. Edita `src/scripts/config.local.js` con tu Client ID de Spotify (ver [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)). El intercambio de tokens se realiza a través de un backend Node.js local en el puerto 3000.

## 🧪 Tests

Las funciones de utilidad (`src/scripts/utils.js`) están cubiertas por tests con Vitest (entorno jsdom):

```bash
npm install
npm test
```

## 🏗️ Arquitectura

- `src/index.html` — shell de la SPA: header, menú lateral, área de contenido principal, barra de reproducción y footer móvil.
- `src/styles/main.css` — layout responsive completo (breakpoints en 1120px y 430px) con CSS Grid y tema oscuro estilo Spotify.
- `src/scripts/main.js` — punto de entrada: conecta auth, router, menú, reproductor y eventos.
- `src/scripts/config.js` — configuración de la API de Spotify, endpoints y claves de almacenamiento.
- `src/scripts/auth.js` — flujo OAuth 2.0 PKCE (login, callback, logout, gestión de tokens).
- `src/scripts/api.js` — capa de integración con la API de Spotify (usuario, browse, playlists, búsqueda, reproductor).
- `src/scripts/router.js` — router SPA basado en hash.
- `src/scripts/views.js` — renderizado de vistas (home, favoritos, playlists, detalle de playlist, búsqueda, perfil).
- `src/scripts/player.js` — integración con Spotify Web Playback SDK (play, pause, seek, progreso).
- `src/scripts/menu.js` — navegación del menú lateral y drawer móvil.
- `src/scripts/utils.js` — helpers DOM, formateo, debounce, sanitización XSS.
- `server/server.js` — backend Express que proxya el intercambio de tokens de Spotify (puerto 3000).
- `Dockerfile` — build multi-stage: nginx + Node.js gestionados por supervisord.
- `docker-compose.yml` — servicio único `web` que expone los puertos 8080 (nginx) y 3000 (Node).
- `nginx.conf` — enrutamiento SPA, gzip, caché de estáticos y cabeceras de seguridad.
- `supervisord.conf` — ejecuta nginx y el servidor Node.js de intercambio de tokens en el mismo contenedor.

## 🎮 Cómo usar

Inicia sesión con tu cuenta de Spotify. Explora las categorías de música en la página principal, abre playlists, revisa tus canciones guardadas en Favoritos, busca temas y controla la reproducción desde la barra del reproductor. Se necesita una cuenta Spotify Premium para la reproducción de audio real a través del Web Playback SDK.
