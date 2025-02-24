import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
    <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-none w-64 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group"
    >
        <div className="aspect-[4/3] bg-gray-50">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            />
        </div>
        <div className="p-4 flex items-center justify-between">
            <h3 className="font-medium text-gray-900 line-clamp-2 flex-1 mr-2 min-h-[48px]">
                {product.name}
            </h3>
            <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-600 flex-shrink-0" />
        </div>
    </a>
);