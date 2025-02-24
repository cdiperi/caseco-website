import { Manufacturer } from '@/types';
import { getImageUrl } from '../utils/imageUtils';

// Helper function to get manufacturer-specific image paths
const getMfgImageUrl = (manufacturer: string, imageName: string): string => {
    return getImageUrl(`images/${manufacturer}/${imageName}`);
};

export const manufacturers: Manufacturer[] = [
    {
        name: "Micro-Epsilon",
        logo: getMfgImageUrl('micro-epsilon', 'micro-epsilon_logo.svg'),
        website: "https://www.micro-epsilon.com/",
        description: "Leading manufacturer of high-precision sensors, measurement devices and systems for dimensional measurement, inspection and automation.",
        products: (() => {
            // Create a closure with the manufacturer name for cleaner code
            const getImage = (imageName: string) => getMfgImageUrl('micro-epsilon', imageName);

            return [
                {
                    name: "Inductive Sensor Systems",
                    image: getImage('eddyncdt-3300.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/inductive-sensors-eddy-current/eddyncdt-3300/"
                },
                {
                    name: "Rotational Speed Sensors",
                    image: getImage('rotational-speed-sensors.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/inclination-acceleration-sensors/rotation-speed-sensors/"
                },
                {
                    name: "Laser Displacement Sensors",
                    image: getImage('optoncdt-1900.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/laser-sensors/optoncdt-1900/"
                },
                {
                    name: "Thermal Imaging Cameras",
                    image: getImage('thermal-imaging-cameras.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/temperature-sensors/thermal-imaging-cameras/"
                },
                {
                    name: "High Speed Photospectrometers",
                    image: getImage('color-measuring-systems.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/color-sensors/color-measuring-systems/"
                },
                {
                    name: "Confocal Chromatic Sensor Systems",
                    image: getImage('confocal-chromatic-sensor-system.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/confocal-sensors/confocaldt-ifd2410-2415/"
                },
                {
                    name: "Infared Pyrometers with Integrated Controller",
                    image: getImage('pyrometer-with-integrated-controller.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/temperature-sensors/pyrometer-with-integrated-controller-cs/"
                },
                {
                    name: "Optocontrol CLS1000",
                    image: getImage('optocontrol-CLS1000.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/fiber-optic-sensors/controller-optocontrol-cls1000/"
                },
                {
                    name: "White Light Interferometers",
                    image: getImage('white-light-interferometer.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/interferometers/5600-ds/"
                },
                {
                    name: "3D Sensors for Surface Inspections",
                    image: getImage('surface-control-sensors.png'),
                    link: "https://www.micro-epsilon.com/2d-3d-measurement/3d-sensors/surfacecontrol/"
                },
                {
                    name: "Intelligent Spotfinder Pyrometers",
                    image: getImage('intelligent-spoftfine-pyrometer.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/temperature-sensors/pyrometer-with-spotfinder-tim-8/"
                },
                {
                    name: "Laser Distance Sensors",
                    image: getImage('optoncdt-ilr2250.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/laser-distance-sensors/optoncdt-ilr2250/"
                },
                {
                    name: "3D Sensors for Shiny Surface Inspections",
                    image: getImage('reflect-control.png'),
                    link: "https://www.micro-epsilon.com/2d-3d-measurement/3d-sensors/reflectcontrol/"
                },
                {
                    name: "IF2035 Interace Modules for Ethernet Connections",
                    image: getImage('if2035-for-industrial-ethernet.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/interfaces/if2035-for-industrial-ethernet/"
                },
                {
                    name: "Indusensor LVDT Gauges",
                    image: getImage('indusensor-dta-gauge.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/inductive-sensors-lvdt/indusensor-dta-gauge/"
                },
                {
                    name: "High-Performance Laser Scanners",
                    image: getImage('scancontrol-30x0.png'),
                    link: "https://www.micro-epsilon.com/2d-3d-measurement/laser-profile-scanners/scancontrol-30x0/"
                },
                {
                    name: "Magneto-Inductive Displacement Sensors",
                    image: getImage('mainsensor-mds-35-45.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/magneto-inductive-sensors/mainsensor-mds-35-45/"
                },
                {
                    name: "High Performance Micrometers",
                    image: getImage('optocontrol-2700.png'),
                    link: "https://www.micro-epsilon.com/2d-3d-measurement/optical-micrometer/optocontrol-2700/"
                },
                {
                    name: "String-Potentiometer Mechanics",
                    image: getImage('draw-wire-sensors-mechanics.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/draw-wire-sensors/mechanics/"
                },
            ];
        })()
    },
    {
        name: "Tapeswitch",
        logo: getMfgImageUrl('tapeswitch', 'tapeswitch-logo.png'),
        website: "https://www.tapeswitch.com/index.html",
        description: "Leading provider of safety products and pressure sensitive switches, specializing in safety mats, sensing edges, ribbon switches, and control systems designed to protect workers and meet industrial safety regulations.",
        products: (() => {
            // Create a closure with the manufacturer name for cleaner code
            const getImage = (imageName: string) => getMfgImageUrl('micro-epsilon', imageName);

            return [
                {
                    name: "Inductive Sensor Systems",
                    image: getImage('eddyncdt-3300.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/inductive-sensors-eddy-current/eddyncdt-3300/"
                },
                {
                    name: "Rotational Speed Sensors",
                    image: getImage('rotational-speed-sensors.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/inclination-acceleration-sensors/rotation-speed-sensors/"
                },
                {
                    name: "Laser Displacement Sensors",
                    image: getImage('optoncdt-1900.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/laser-sensors/optoncdt-1900/"
                },
                {
                    name: "Thermal Imaging Cameras",
                    image: getImage('thermal-imaging-cameras.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/temperature-sensors/thermal-imaging-cameras/"
                },
                {
                    name: "High Speed Photospectrometers",
                    image: getImage('color-measuring-systems.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/color-sensors/color-measuring-systems/"
                },
                {
                    name: "Confocal Chromatic Sensor Systems",
                    image: getImage('confocal-chromatic-sensor-system.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/confocal-sensors/confocaldt-ifd2410-2415/"
                },
                {
                    name: "Infared Pyrometers with Integrated Controller",
                    image: getImage('pyrometer-with-integrated-controller.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/temperature-sensors/pyrometer-with-integrated-controller-cs/"
                },
                {
                    name: "Optocontrol CLS1000",
                    image: getImage('optocontrol-CLS1000.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/fiber-optic-sensors/controller-optocontrol-cls1000/"
                },
                {
                    name: "White Light Interferometers",
                    image: getImage('white-light-interferometer.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/interferometers/5600-ds/"
                },
                {
                    name: "3D Sensors for Surface Inspections",
                    image: getImage('surface-control-sensors.png'),
                    link: "https://www.micro-epsilon.com/2d-3d-measurement/3d-sensors/surfacecontrol/"
                },
                {
                    name: "Intelligent Spotfinder Pyrometers",
                    image: getImage('intelligent-spoftfine-pyrometer.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/temperature-sensors/pyrometer-with-spotfinder-tim-8/"
                },
                {
                    name: "Laser Distance Sensors",
                    image: getImage('optoncdt-ilr2250.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/laser-distance-sensors/optoncdt-ilr2250/"
                },
                {
                    name: "3D Sensors for Shiny Surface Inspections",
                    image: getImage('reflect-control.png'),
                    link: "https://www.micro-epsilon.com/2d-3d-measurement/3d-sensors/reflectcontrol/"
                },
                {
                    name: "IF2035 Interace Modules for Ethernet Connections",
                    image: getImage('if2035-for-industrial-ethernet.png'),
                    link: "https://www.micro-epsilon.com/industry-sensors/interfaces/if2035-for-industrial-ethernet/"
                },
                {
                    name: "Indusensor LVDT Gauges",
                    image: getImage('indusensor-dta-gauge.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/inductive-sensors-lvdt/indusensor-dta-gauge/"
                },
                {
                    name: "High-Performance Laser Scanners",
                    image: getImage('scancontrol-30x0.png'),
                    link: "https://www.micro-epsilon.com/2d-3d-measurement/laser-profile-scanners/scancontrol-30x0/"
                },
                {
                    name: "Magneto-Inductive Displacement Sensors",
                    image: getImage('mainsensor-mds-35-45.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/magneto-inductive-sensors/mainsensor-mds-35-45/"
                },
                {
                    name: "High Performance Micrometers",
                    image: getImage('optocontrol-2700.png'),
                    link: "https://www.micro-epsilon.com/2d-3d-measurement/optical-micrometer/optocontrol-2700/"
                },
                {
                    name: "String-Potentiometer Mechanics",
                    image: getImage('draw-wire-sensors-mechanics.png'),
                    link: "https://www.micro-epsilon.com/distance-sensors/draw-wire-sensors/mechanics/"
                },
            ];
        })()
    },
    // Additional manufacturers would go here...
];