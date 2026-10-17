# bonka.dev

The static documentation and product website for Bonka.

## Development

Use a supported Node.js version, then install dependencies and start Nuxt:

```bash
npm install
npm run dev
```

## Static deployment

Create the production site with:

```bash
npm run generate
```

Upload the contents of `.output/public/` to the web host. The generated site
does not require Node.js, PHP, or a server-side application to run.

The embedded Welcome Screen emulator requires these response headers:

```text
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

For Apache hosts, `public/.htaccess` provides the required configuration.

## Documentation

Markdown documentation lives in `content/docs/`. Add a new document there,
then include its route in `DocsSidebar.vue` and `nuxt.config.ts` so it appears
in navigation and is pre-rendered in the static export.
