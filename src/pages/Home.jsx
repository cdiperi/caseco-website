import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';

// ProductCarousel Component
const ProductCarousel = ({ products }) => {
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
                        <a
                            key={index}
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
                                <h3 className="font-medium text-gray-900 line-clamp-2 flex-1 mr-2 min-h-[48px]">{product.name}</h3>
                                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-600 flex-shrink-0" />
                            </div>
                        </a>
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
// ManufacturerSection Component
const ManufacturerSection = ({ manufacturer }) => (
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

// Main Home Component
const Home = () => {
    const manufacturers = [
        {
            name: "Micro-Epsilon",
            logo: getImageUrl('images/micro-epsilon/micro-epsilon_logo.svg'),
            website: "https://www.micro-epsilon.com/",
            description: "Leading manufacturer of high-precision sensors, measurement devices and systems for dimensional measurement, inspection and automation.",
            products: [
                {
                    name: "Inductive Sensor Systems",
                    image: getImageUrl('images/micro-epsilon/eddyncdt-3300.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/inductive-sensors-eddy-current/eddyncdt-3300/"
                },
                {
                    name: "Rotational Speed Sensors",
                    image: getImageUrl('images/micro-epsilon/rotational-speed-sensors.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/inclination-acceleration-sensors/rotation-speed-sensors/"
                },
                {
                    name: "Laser Displacement Sensors",
                    image: getImageUrl('images/micro-epsilon/optoncdt-1900.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/laser-sensors/optoncdt-1900/"
                },
                {
                    name: "Thermal Imaging Cameras",
                    image: getImageUrl('images/micro-epsilon/thermal-imaging-cameras.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/temperature-sensors/thermal-imaging-cameras/"
                },
                {
                    name: "High Speed Photospectrometers",
                    image: getImageUrl('images/micro-epsilon/color-measuring-systems.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/color-sensors/color-measuring-systems/"
                },
                {
                    name: "Confocal Chromatic Sensor Systems",
                    image: getImageUrl('images/micro-epsilon/confocal-chromatic-sensor-system.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/confocal-sensors/confocaldt-ifd2410-2415/"
                },
                {
                    name: "Infared Pyrometers with Integrated Controller",
                    image: getImageUrl('images/micro-epsilon/pyrometer-with-integrated-controller.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/temperature-sensors/pyrometer-with-integrated-controller-cs/"
                },
                {
                    name: "Optocontrol CLS1000",
                    image: getImageUrl('images/micro-epsilon/optocontrol-CLS1000.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/fiber-optic-sensors/controller-optocontrol-cls1000/"
                },
                {
                    name: "White Light Interferometers",
                    image: getImageUrl('images/micro-epsilon/white-light-interferometer.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/interferometers/5600-ds/"
                },
                {
                    name: "3D Sensors for Surface Inspections",
                    image: getImageUrl('images/micro-epsilon/surface-control-sensors.png'),
                    link: "https://www.micro-epsilon.com/2d-3d-measurement/3d-sensors/surfacecontrol/"
                },
                {
                    name: "Intelligent Spotfinder Pyrometers",
                    image: getImageUrl('images/micro-epsilon/intelligent-spoftfine-pyrometer.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/temperature-sensors/pyrometer-with-spotfinder-tim-8/"
                },
                {
                    name: "Laser Distance Sensors",
                    image: getImageUrl('images/micro-epsilon/optoncdt-ilr2250.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/laser-distance-sensors/optoncdt-ilr2250/"
                },
                {
                    name: "3D Sensors for Shiny Surface Inspections",
                    image: getImageUrl('images/micro-epsilon/reflect-control.png'),
                    link: "https://www.micro-epsilon.com/2d-3d-measurement/3d-sensors/reflectcontrol/"
                },
                {
                    name: "IF2035 Interace Modules for Ethernet Connections",
                    image: getImageUrl('images/micro-epsilon/if2035-for-industrial-ethernet.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/interfaces/if2035-for-industrial-ethernet/"
                },
                {
                    name: "Indusensor LVDT Gauges",
                    image: getImageUrl('images/micro-epsilon/indusensor-dta-gauge.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/inductive-sensors-lvdt/indusensor-dta-gauge/"
                },
                {
                    name: "High-Performance Laser Scanners",
                    image: getImageUrl('images/micro-epsilon/scancontrol-30x0.png'),
                    link: "https://www.micro-epsilon.com/2d-3d-measurement/laser-profile-scanners/scancontrol-30x0/"
                },
                {
                    name: "Magneto-Inductive Displacement Sensors",
                    image: getImageUrl('images/micro-epsilon/mainsensor-mds-35-45.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/magneto-inductive-sensors/mainsensor-mds-35-45/"
                },
                {
                    name: "High Performance Micrometers",
                    image: getImageUrl('images/micro-epsilon/optocontrol-2700.png'),
                    link: "https://www.micro-epsilon.com/2d-3d-measurement/optical-micrometer/optocontrol-2700/"
                },
                {
                    name: "String-Potentiometer Mechanics",
                    image: getImageUrl('images/micro-epsilon/draw-wire-sensors-mechanics.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/draw-wire-sensors/mechanics/"
                },
            ]
        },
    ];

    return (
        <div className="p-6">
            <div className="space-y-16">
                {manufacturers.map((manufacturer, index) => (
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