// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/image', '@nuxtjs/supabase', '@nuxt/fonts'],
  fonts: {
    families: [
      { name: 'ArialNova', src: '/fonts/ArialNova.ttf' },
      { name: 'Sloop Script Regular', src: '/fonts/Sloop Script Regular.ttf' },
      { name: 'edwardianscriptitc', src:'/fonts/edwardianscriptitc.ttf'},
      { name: 'Inter', provider: 'google' },
      { name: 'Crimson Text', provider: 'google' },
      { name: 'Cinzel Decorative', provider: 'google' },
      { name: 'Cinzel', provider: 'google' },
      { name: 'League Spartan', provider: 'google' },
      { name: 'Cormorant', provider: 'google' }
    ]
  },
  supabase: {
    redirectOptions: {
      login: '/adminlogin',
      callback: '/confirm',
      include: ['/adminview'],
    }
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
})