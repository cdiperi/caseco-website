export interface DownloadLink {
    title: string;
    url: string;
    isExternal?: boolean;
}

export interface DownloadsCategory {
    title: string;
    links: DownloadLink[];
}

export const downloadsData: DownloadsCategory[] = [
    {
        title: "Technical Documentation",
        links: [
            {
                title: "SISTEMA Software",
                url: "https://www.dguv.de/ifa/praxishilfen/praxishilfen-maschinenschutz/software-sistema/sistema-bibliotheken/index.jsp",
                isExternal: true
            },
            {
                title: "Introduction to Safety",
                url: "https://www.reersafety.com/pdf/cataloghi/Safety_Guide_ENG.pdf",
                isExternal: true
            },
            {
                title: "Distance of Light Curtain from Point",
                url: "https://www.reersafety.com/calcolo-distanza-di-sicurezza/index.php?lang=en",
                isExternal: true
            },
            {
                title: "Distance at a Specific Angle",
                url: "https://www.reersafety.com/calcolo-distanza-di-sicurezza/index.php?lang=en",
                isExternal: true
            },
            {
                title: "Thermal Imager Optics Calculator",
                url: "https://www.micro-epsilon.com/temperature-sensors/thermoIMAGER/optics/",
                isExternal: true
            },
            {
                title: "Turn Key Inspection Systems",
                url: "https://www.micro-epsilon.com/measurement-systems/",
                isExternal: true
            }
        ]
    },
    {
        title: "Catalogs",
        links: [
            {
                title: "Full Product Sheet",
                url: "catalogs/full_product_sheet.pdf",
                isExternal: false
            },
            {
                title: "Bumper Product Sheet",
                url: "catalogs/bumper_product_sheet.pdf",
                isExternal: false
            },
            {
                title: "Mat Product Sheet",
                url: "catalogs/mat_product_sheet.pdf",
                isExternal: false
            },
            {
                title: "Light Curtain Product Sheet",
                url: "catalogs/light_curtain_product_sheet.pdf",
                isExternal: false
            },
            {
                title: "Edge Product Sheet",
                url: "catalogs/edge_product_sheet.pdf",
                isExternal: false
            },
            {
                title: "DPM Mats Overview",
                url: "catalogs/dpm_mats_overview.pdf",
                isExternal: false
            },
            {
                title: "Full Pizzato Catalog",
                url: "https://www.pizzato.com/media/images/catalog/category/attachment/ZE_GCS03A18-ENG.pdf",
                isExternal: true
            },
            {
                title: "SafeGate Overview",
                url: "catalogs/safegate_overview.pdf",
                isExternal: false
            },
            {
                title: "SafeGate Brochure",
                url: "catalogs/safegate_brochure.pdf",
                isExternal: false
            },
            {
                title: "Microswitches MK series",
                url: "https://www.pizzatousa.com/catalog/position-switches/index.php",
                isExternal: true
            },
            {
                title: "Safety hinged switches, Palladio series",
                url: "https://www.pizzatousa.com/catalog/safety-devices/safety-switches-for-hinged-doors.php",
                isExternal: true
            },
            {
                title: "Position switches for high temperature",
                url: "https://www.pizzatousa.com/catalog/position-switches/switches-for-special-applications.php",
                isExternal: true
            },
            {
                title: "Coded magnetic sensors SR series",
                url: "https://www.pizzatousa.com/catalog/safety-devices/magnetic-safety-sensors.php",
                isExternal: true
            },
            {
                title: "Safety switches with solenoid FG series",
                url: "https://www.pizzatousa.com/catalog/safety-devices/safety-switches-with-separate-actuator-and-lock.php",
                isExternal: true
            },
            {
                title: "Accessories for rope safety switches, FAST line",
                url: "https://www.pizzatousa.com/catalog/safety-devices/rope-safety-switches.php",
                isExternal: true
            },
            {
                title: "Safety switches with separate actuator, FW series",
                url: "https://www.pizzatousa.com/catalog/safety-devices/safety-switches-with-separate-actuator.php",
                isExternal: true
            }
        ]
    },
    {
        title: "Presentations",
        links: [
            {
                title: "The Muting Function",
                url: "presentations/the_muting_functions.pptx",
                isExternal: false
            },
            {
                title: "MOSAIC Safety Systems",
                url: "https://www.reersafety.com/pdf/Presentazioni/Mosaic_ENG.pdf",
                isExternal: true
            },
            {
                title: "Micron Measurement Overview",
                url: "https://www.reersafety.com/pdf/Presentazioni/Micron_ENG.pdf",
                isExternal: true
            },
            {
                title: "Calculating Minimum Safety Distances",
                url: "presentations/calculating_minimum_safety_distances.pps",
                isExternal: false
            }
        ]
    }
];