# hono-sqlite-auth

Adaptación del crash course de auth de WebDevSimplified (original en PostgreSQL) a **SQLite + Drizzle**.

## Tecnologías

- Hono
- Drizzle ORM (SQLite)
- better-sqlite3
- Zod
- JWT (hono/jwt) + API keys

## Auth

- **Registro / login** → JWT (5 min). El JWT **solo** sirve para gestionar API keys (`/api-keys`).
- **API keys** → credencial de larga duración, se envía por `X-API-KEY`. Sirve para crear/editar/borrar autores y libros.
- **Flujo dual** (implementado): `/authors` y `/books` aceptan **JWT o API key**. La UI web usa JWT; clientes externos usan API key.
- `GET /authors` y `GET /books` son públicos.
- Roles: `user` (por defecto) y `admin`. Un admin puede modificar/borrar cualquier libro; un usuario solo los suyos.

## Ejecución

```bash
cp .env.example .env   # configurar JWT_SECRET
bun install
bun run dev
```