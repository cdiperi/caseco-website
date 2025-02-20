import React from 'react';
import { getDocumentUrl } from '../utils/documentUtils';

const Downloads = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Downloads</h1>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Technical Documentation</h2>
                <ul className="space-y-2 list-disc ml-6">
                    <li>
                        <a
                            href="https://www.dguv.de/ifa/praxishilfen/praxishilfen-maschinenschutz/software-sistema/sistema-bibliotheken/index.jsp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            SISTEMA Software
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.reersafety.com/pdf/cataloghi/Safety_Guide_ENG.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Introduction to Safety
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.reersafety.com/calcolo-distanza-di-sicurezza/index.php?lang=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Distance of Light Curtain from Point
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.reersafety.com/calcolo-distanza-di-sicurezza/index.php?lang=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Distance at a Specific Angle
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.micro-epsilon.com/temperature-sensors/thermoIMAGER/optics/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Thermal Imager Optics Calculator
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.micro-epsilon.com/measurement-systems/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Turn Key Inspection Systems
                        </a>
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Catalogs</h2>
                <ul className="space-y-2 list-disc ml-6">
                    <li>
                        <a
                            href={getDocumentUrl('catalogs/full_product_sheet.pdf')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Full Product Sheet
                        </a>
                    </li>
                    <li>
                        <a
                            href={getDocumentUrl('catalogs/bumper_product_sheet.pdf')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Bumper Product Sheet
                        </a>
                    </li>
                    <li>
                        <a
                            href={getDocumentUrl('catalogs/mat_product_sheet.pdf')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Mat Product Sheet
                        </a>
                    </li>
                    <li>
                        <a
                            href={getDocumentUrl('catalogs/light_curtain_product_sheet.pdf')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Light Curtain Product Sheet
                        </a>
                    </li>
                    <li>
                        <a
                            href={getDocumentUrl('catalogs/edge_product_sheet.pdf')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Edge Product Sheet
                        </a>
                    </li>
                    <li>
                        <a
                            href={getDocumentUrl('catalogs/dpm_mats_overview.pdf')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            DPM Mats Overview
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.pizzato.com/media/images/catalog/category/attachment/ZE_GCS03A18-ENG.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Full Pizzato Catalog
                        </a>
                    </li>
                    <li>
                        <a
                            href={getDocumentUrl('catalogs/safegate_overview.pdf')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            SafeGate Overview
                        </a>
                    </li>
                    <li>
                        <a
                            href={getDocumentUrl('catalogs/safegate_brochure.pdf')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            SafeGate Brochure
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.pizzatousa.com/catalog/position-switches/index.php"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Microswitches MK series
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.pizzatousa.com/catalog/safety-devices/safety-switches-for-hinged-doors.php"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Safety hinged switches, Palladio series
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.pizzatousa.com/catalog/position-switches/switches-for-special-applications.php"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Position switches for high temperature
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.pizzatousa.com/catalog/safety-devices/magnetic-safety-sensors.php"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Coded magnetic sensors SR series
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.pizzatousa.com/catalog/safety-devices/safety-switches-with-separate-actuator-and-lock.php"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Safety switches with solenoid FG series
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.pizzatousa.com/catalog/safety-devices/rope-safety-switches.php"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Accessories for rope safety switches, FAST line
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.pizzatousa.com/catalog/safety-devices/safety-switches-with-separate-actuator.php"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Safety switches with separate actuator, FW series
                        </a>
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Presentations</h2>
                <ul className="space-y-2 list-disc ml-6">
                    <li>
                        <a
                            href={getDocumentUrl('presentations/the_muting_functions.pptx')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            The Muting Function
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.reersafety.com/pdf/Presentazioni/Mosaic_ENG.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            MOSAIC Safety Systems
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.reersafety.com/pdf/Presentazioni/Micron_ENG.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Micron Measurement Overview
                        </a>
                    </li>
                    <li>
                        <a
                            href={getDocumentUrl('presentations/calculating_minimum_safety_distances.pps')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Calculating Minimum Safety Distances
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Downloads;