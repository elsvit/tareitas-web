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

### One-time server setup

SSH to Hetzner as root, then:

```bash
git clone https://github.com/elsvit/tareitas-web.git /var/www/tareitas-web
cd /var/www/tareitas-web
bash scripts/bootstrap-hetzner.sh
```

Configure nginx (example):

```nginx
server {
  server_name tareitas.net www.tareitas.net tareitas.com www.tareitas.com;
  root /var/www/tareitas-web/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

```bash
nginx -t && systemctl reload nginx
```

### GitHub Actions

1. In the **tareitas-web** GitHub repo: **Settings → Secrets → Actions**
2. Add secret `DEPLOY_SSH_KEY` (same private key as `tareitas-server` deploy)
3. Push to `main`, then run **Actions → Deploy production → Run workflow**

The workflow pulls `main` on the server, runs `yarn build`, and reloads nginx.

Production builds use `.env.production` (`VITE_API_URL=https://api.tareitas.net`).

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
