# My Website

## Development Setup

### Option 1: Podman preview (no local Ruby setup)

```bash
make preview-podman
```

Preview URL: `http://localhost:8080`

Stop it with:

```bash
make stop-podman
```

### Option 2: Local Jekyll preview (faster edit loop)

Install dependencies:

```bash
make setup-local
```

Run preview:

```bash
make preview-local
```

Preview URL: `http://127.0.0.1:4000`

For live reload, use:

```bash
make preview-live
```

Default livereload port: `35730` (override with `make preview-live LIVERELOAD_PORT=35731`)

If `make preview-local` says `Missing 'observer' gem`, run:

```bash
gem install observer
```

## Recommended Workflow Before Pushing To `main`

1. Create a branch: `git checkout -b feature/<name>`
2. Make edits and preview continuously with `make preview-local` or `make preview-podman`
3. Run a production-style check: `make build-local`
4. Commit and push your branch, then open a PR into `main`
