import React from 'react';
import { Manufacturer } from '../../types/manufacturer';
import { ProductCarousel } from '../carousel/ProductCarousel';

interface ManufacturerSectionProps {
    manufacturer: Manufacturer;
}

export const ManufacturerSection: React.FC<ManufacturerSectionProps> = ({ manufacturer }) => (
    <section className="mb-16">
        <div className="bg-gray-50 rounded-xl shadow-lg p-8">
            <div className="mb-8">
                <a
                    href={manufacturer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full max-w-3xl mx-auto h-32 bg-white rounded-lg
                             overflow-hidden hover:shadow-md transition-all duration-300
                             border border-gray-100"
                >
                    <img
                        src={manufacturer.logo}
                        alt={`${manufacturer.name} logo`}
                        className="w-full h-full object-contain p-4"
                    />
                </a>
            </div>

            {manufacturer.description && (
                <div className="mb-8 text-center text-gray-600 max-w-3xl mx-auto">
                    <p>{manufacturer.description}</p>
                </div>
            )}

            <div className="bg-white rounded-lg p-6">
                <ProductCarousel products={manufacturer.products} />
            </div>
        </div>
    </section>
);