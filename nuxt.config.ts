import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  modules: ["@nuxt/content"],
  css: ["~/assets/styles.css"],
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "Bonka | Build worlds for GBA",
      meta: [
        {
          name: "description",
          content:
            "Bonka is an experimental browser-based editor for building isometric Game Boy Advance worlds.",
        },
      ],
       link: [
          { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
          { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Instrument+Serif:ital@0;1&display=swap",
        },
      ],
    },
  },
  nitro: {
    publicAssets: [
      {
        baseURL: "/_mgba",
        dir: fileURLToPath(
          new URL("./node_modules/@thenick775/mgba-wasm/dist", import.meta.url),
        ),
      },
    ],
    routeRules: {
      "/**": {
        headers: {
          "Cross-Origin-Opener-Policy": "same-origin",
          "Cross-Origin-Embedder-Policy": "require-corp",
        },
      },
    },
    prerender: {
      routes: [
        "/",
        "/getting-started",
        "/examples",
        "/docs/introduction",
        "/docs/installation",
        "/docs/configuration",
        "/docs/project-format",
        "/docs/gba-pipeline",
      ],
    },
  },
  compatibilityDate: "2026-10-14",
});
