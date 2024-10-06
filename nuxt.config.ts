// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: { enabled: false },
    experimental: {
        viewTransition: true,
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        baseURL: '/VS-Code-Portfolio/projects/windows-11/'
    },
    css: [
        '@/assets/css/variables.css',
        '@/assets/css/global.css',
    ],
    modules: [['@nuxtjs/google-fonts', {
        families: {
            Poppins: {
                wght: [100,200,300,400,500,600,700,800,900]
            },
            'Space Grotesk': {
                wght: [100,200,300,400,500,600,700,800,900]
            },
            Quicksand: {
                wght: [100,200,300,400,500,600,700,800,900]
            }
        }
    }], 'nuxt-icon', 'nuxt-quasar-ui', '@nuxtjs/i18n', '@pinia/nuxt', '@nuxt/image', 'nuxt-snackbar', 'nuxt-swiper', '@nuxtjs/robots'],
    plugins: [
        { src: '~/plugins/global.js', mode: 'client' }
    ],
    i18n: {
        vueI18n: './i18n.config.js',
        detectBrowserLanguage: false,
    },
    runtimeConfig: {
        public: {
            version: process.env.VERSION,
            base_url: `https://cc41-2a02-8388-2440-280-6144-6516-4f6c-7d65.ngrok-free.app`,
            backend: {
                base_url: `${process.env.BACKEND_PROTOCOL}://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}`,
            }
        }
    },
    snackbar: {
        bottom: true,
        right: true,
        duration: 5000,
        dense: true,
        border: "left",
        backgroundOpacity: 0.28
    }
});