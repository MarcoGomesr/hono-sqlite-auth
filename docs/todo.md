# Backend Architecture TODO

_Decided: 2026-10-17_

## Target: feature-modular layered architecture
routes → service → repo, per module (`authors`, `auth`), plus shared HTTP/middleware concerns.

- [ ] Split entrypoint: `src/app.ts` (Hono app factory) + `src/index.ts` (composition root + serve)
- [ ] Add `src/shared/http`: AppError classes, centralized `onError`, `ok/created/noContent` helpers
- [ ] Add typed Hono context (`AppEnv` Variables: userId/role) + shared types
- [ ] Add auth middleware (JWT verify) + `requireRole` guard; protect `/authors` mutations
- [ ] Introduce `authors` module: `authors.routes / .service / .repo / .schema`; thin out route
- [ ] Introduce `auth` module: `auth.routes / .service / .repo / .schema`; centralize JWT
- [ ] Move `data/env.ts` → `src/config/env.ts`; update imports
- [ ] Add request logger middleware + `/health` endpoint
- [ ] Add tests for services/repos once layers exist
