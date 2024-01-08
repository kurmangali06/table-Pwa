// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
  '@vite-pwa/nuxt', 
  '@ant-design-vue/nuxt'
  ],

  pwa: {
    disable: false,
    registerType: 'autoUpdate',
    injectManifest: {
      globPatterns: ['**/*.{js,json,css,html,txt,svg,png,ico,webp,woff,woff2,ttf,eot,otf,wasm}'],
    },
    scope: '/',
    srcDir: './service-worker',
    filename: 'sw.ts',
    manifest: {
      name: 'My Awesome App',
      description: 'app',
      short_name: 'NuxtVitePWA',
      lang: 'ru',
      id: '/',
      icons: [
        {
          src: 'icon.png',
          sizes: '192x192',
          type: 'image/png'
        },
      ],
    },
    strategies: "injectManifest",
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    devOptions: {
      enabled: true,
    },
  },
  routeRules: {
    // Static generation
    '/': { prerender: true },
    // CDN cache rules
    '/manifest.webmanifest': {
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    },
  },
})