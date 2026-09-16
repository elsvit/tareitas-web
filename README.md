# Tareitas Web

Frontend website for [tareitas.net](https://tareitas.net).

- **Stack:** React, TypeScript, Vite, React Router, SCSS
- **API:** [api.tareitas.net](https://api.tareitas.net) (`tareitas-server`)

## Development

```bash
yarn install
```

| Command | API | Database |
|---------|-----|----------|
| `yarn dev-local` | `http://localhost:3000` | Local Mac PostgreSQL |
| `yarn dev-prod` | `https://api.tareitas.net` | Hetzner PostgreSQL |

`yarn dev` is an alias for `yarn dev-local` (safe default).

**Local backend** (required for `dev-local`):

```bash
cd ../tareitas-server && yarn dev
```

Open [http://localhost:5173](http://localhost:5173).

> **Warning:** `dev-prod` talks to production. Do not test delete-account against real families.

## Build

```bash
yarn build
```

Output: `dist/`

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/privacy-policy` | Privacy Policy |
| `/delete-account` | Delete account |

## Deploy (Hetzner)

1. Clone repo to `/var/www/tareitas-web`
2. `yarn install --frozen-lockfile && yarn build`
3. Point nginx `tareitas.net` root to `/var/www/tareitas-web/dist`

Example nginx:

```nginx
server {
  server_name tareitas.net www.tareitas.net;
  root /var/www/tareitas-web/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

Or run the GitHub Action **Deploy production** (workflow_dispatch).

## Project structure

```
src/
  App.tsx
  AppRouter.tsx
  components/
    blocks/       # layout, shared blocks
    pages/        # route pages
  constants/      # routes, config
  content/        # static legal copy
  services/       # future API client
  styles/
  types/
```
# tareitas-web
