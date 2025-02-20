import { CONFIG } from '../config/config.js';

export const getImageUrl = (imagePath) => {
    return `${CONFIG.CLOUDFRONT_URL}/static/${imagePath}`;
};