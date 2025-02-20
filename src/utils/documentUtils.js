import { CONFIG } from '../config/config.js';

export const getDocumentUrl = (documentPath) => {
    return `${CONFIG.CLOUDFRONT_URL}/static/${documentPath}`;
};