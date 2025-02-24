import { DocumentUtilsConfig } from '../types';

const config: DocumentUtilsConfig = {
    baseUrl: import.meta.env.VITE_CDN_URL || '',
    environment: import.meta.env.VITE_APP_ENVIRONMENT || 'beta'
};

export const getDocumentUrl = (path: string): string => {
    return `${config.baseUrl}/${config.environment}/documents/${path}`;
};