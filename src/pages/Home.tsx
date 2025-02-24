import React, { useMemo } from 'react';
import { manufacturers } from '../data/manufacturers';
import { ManufacturerSection } from '../components/sections/ManufacturerSection';
import { Manufacturer } from '@/types';

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: Manufacturer[]): Manufacturer[] => {
    const newArray = [...array]; // Create a copy to avoid mutating the original
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
    }
    return newArray;
};

const Home: React.FC = () => {
    // Use useMemo to only randomize on component mount
    // This prevents re-shuffling on every render
    const randomizedManufacturers = useMemo(() => shuffleArray(manufacturers), []);

    return (
        <div className="p-6">
            <div className="space-y-16">
                {randomizedManufacturers.map((manufacturer, index) => (
                    <ManufacturerSection
                        key={`${manufacturer.name}-${index}`}
                        manufacturer={manufacturer}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;