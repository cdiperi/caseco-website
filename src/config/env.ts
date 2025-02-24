interface EnvConfig {
    cdnUrl: string;
    environment: string;
    apiUrl: string;
    assetsPath: string;
}

export const getEnvConfig = (): EnvConfig => {
    return {
        cdnUrl: import.meta.env.VITE_CDN_URL || '',
        environment: import.meta.env.VITE_APP_ENVIRONMENT || 'beta',
        apiUrl: import.meta.env.VITE_API_URL || '',
        assetsPath: import.meta.env.VITE_ASSETS_PATH || '/assets'
    };
};