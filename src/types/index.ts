// Base types
export interface Position {
    x: number;
    y: number;
}

export interface Product {
    name: string;
    image: string;
    link: string;
}

export interface Manufacturer {
    name: string;
    logo: string;
    website: string;
    description?: string;
    products: Product[];
}

export interface NavItem {
    title: string;
    link?: string;
    path?: string;
    subitems?: NavItem[];
    isInternal?: boolean;
}

export interface NavItems {
    [section: string]: NavItem[];
}

// Props interfaces
export interface LayoutProps {
    children: React.ReactNode;
}

export interface ProductCarouselProps {
    products: Product[];
}

export interface ProductCardProps {
    product: Product;
}

export interface ManufacturerSectionProps {
    manufacturer: Manufacturer;
}

// Config interfaces
export interface ImageUtilsConfig {
    baseUrl: string;
    environment: string;
    assetsPath: string;
}

export interface DocumentUtilsConfig {
    baseUrl: string;
    environment: string;
}

export interface EnvConfig {
    cdnUrl: string;
    environment: string;
    apiUrl: string;
}

// Route types
export interface RouteConfig {
    path: string;
    component: React.LazyExoticComponent<React.ComponentType<any>> | React.ComponentType;
    exact?: boolean;
}