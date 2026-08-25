[ Español](README.es.md) | **English**

# Globify

Spotify web player. Browse categories, playlists and saved tracks, search songs and control playback — all through the Spotify Web API and the Web Playback SDK.

## 🚀 How to launch the project

The project ships with a Makefile that wraps Docker Compose. From the project root:

```bash
make setup   # first time only — creates config.local.js from template
make restart
```

Once the container is running, open your browser and navigate to: http://localhost:8080

> Note: Spotify OAuth2 requires a valid Client ID. Edit `src/scripts/config.local.js` with your own Spotify Client ID (see [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)). The token exchange runs through a local Node.js backend on port 3000.

## 🧪 Tests

The utility functions (`src/scripts/utils.js`) are covered by Vitest tests (jsdom environment):

```bash
npm install
npm test
```

## 🏗️ Architecture

- `src/index.html` — SPA shell: header, sidebar menu, main content area, player bar and mobile footer.
- `src/styles/main.css` — full responsive layout (breakpoints at 1120px and 430px) with CSS Grid and Spotify-like dark theme.
- `src/scripts/main.js` — entry point: wires auth, router, menu, player and event listeners.
- `src/scripts/config.js` — Spotify API configuration, endpoints and storage keys.
- `src/scripts/auth.js` — OAuth 2.0 PKCE flow (login, callback, logout, token management).
- `src/scripts/api.js` — Spotify API layer (user, browse, playlists, search, player).
- `src/scripts/router.js` — hash-based SPA router.
- `src/scripts/views.js` — view renderers (home, favorites, playlists, playlist detail, search, profile).
- `src/scripts/player.js` — Spotify Web Playback SDK integration (play, pause, seek, progress).
- `src/scripts/menu.js` — sidebar navigation and mobile drawer.
- `src/scripts/utils.js` — DOM helpers, formatting, debounce, XSS sanitization.
- `server/server.js` — Express backend that proxies the Spotify token exchange (port 3000).
- `Dockerfile` — multi-stage build: nginx + Node.js managed by supervisord.
- `docker-compose.yml` — single `web` service exposing ports 8080 (nginx) and 3000 (Node).
- `nginx.conf` — SPA routing, gzip, static asset caching and security headers.
- `supervisord.conf` — runs nginx and the Node.js token-exchange server inside the same container.

## 🎮 How to use

Log in with your Spotify account. Browse music categories on the home page, open playlists, check your saved tracks in Favorites, search for songs and control playback from the player bar. A Spotify Premium account is required for actual audio playback via the Web Playback SDK.
