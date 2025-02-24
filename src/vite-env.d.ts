/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CDN_URL: string
    readonly VITE_APP_ENVIRONMENT: 'beta' | 'prod'
    readonly VITE_API_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}