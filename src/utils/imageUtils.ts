import { getEnvConfig } from '@/config/env';
import { ImageUtilsConfig } from '@/types';

const config: ImageUtilsConfig = {
    baseUrl: getEnvConfig().cdnUrl || '',
    environment: getEnvConfig().environment || 'beta',
    assetsPath: getEnvConfig().assetsPath || '/assets'
};

export const getImageUrl = (path: string): string => {
    // If CDN URL is configured, use it with environment
    if (config.baseUrl) {
        return `${config.baseUrl}/${config.environment}/${path}`;
    }

    // Otherwise, use local assets path
    return `${config.assetsPath}/${path}`;
};