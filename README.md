# Astro SSR + Better-Auth + Cloudflare D1

A simple setup for MPA auth with Astro, Better-Auth, and Cloudflare D1

## TODO

- [x] Get register/login working locally
- [x] Get migrations for prod auth DB working
- [X] Get migrations for local auth DB working
- [x] Get register/login working in production
- [ ] Change local DB access to use Miniflare instead of directly accessing `.sqlite` file from `.wrangler` directory
- [x] Document needed environment variables (see `.env.example` and `.dev.vars.example`)
- [ ] Add `init` script in package.json
- [ ] Document needed Cloudflare bindings and setup steps
- [ ] Document setting up local auth DB
- [ ] Add demo non-auth DB
- [ ] Add Turnstile to login and register forms (with instructions to remove)
- [ ] Convert to template repository
