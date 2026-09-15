# Tareitas Web

Frontend website for [tareitas.net](https://tareitas.net).

- **Stack:** React, TypeScript, Vite, React Router, SCSS
- **API:** [api.tareitas.net](https://api.tareitas.net) (`tareitas-server`)

## Development

```bash
yarn install
yarn dev
```

Open [http://localhost:5173](http://localhost:5173).

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
