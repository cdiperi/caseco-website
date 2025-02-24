import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductCarouselProps {
    products: Product[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const cardWidth = 256;
    const gap = 24;
    const [visibleCards, setVisibleCards] = useState(3);

    useEffect(() => {
        const updateVisibleCards = () => {
            const containerWidth = window.innerWidth - 48;
            const cards = Math.floor(containerWidth / (cardWidth + gap));
            setVisibleCards(Math.max(1, cards));
        };

        updateVisibleCards();
        window.addEventListener('resize', updateVisibleCards);
        return () => window.removeEventListener('resize', updateVisibleCards);
    }, []);

    const maxIndex = Math.max(0, products.length - visibleCards);

    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
            }, 2700);
            return () => clearInterval(interval);
        }
    }, [isHovered, maxIndex]);

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="overflow-hidden px-1 py-3">
                <div
                    className="flex gap-6 duration-500 ease-out transition-transform"
                    style={{
                        transform: `translateX(-${currentIndex * (cardWidth + gap)}px)`,
                    }}
                >
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </div>

            {products.length > visibleCards && (
                <>
                    <button
                        onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg -ml-4
                                  hover:bg-white transition-colors ${currentIndex === 0 ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}
                        disabled={currentIndex === 0}
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>

                    <button
                        onClick={() => setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1)}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg -mr-4
                                  hover:bg-white transition-colors ${currentIndex >= maxIndex ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}
                        disabled={currentIndex >= maxIndex}
                    >
                        <ChevronRight className="w-6 h-6 text-gray-700" />
                    </button>
                </>
            )}
        </div>
    );
};