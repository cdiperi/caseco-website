import { lazy } from 'react';

export interface RouteConfig {
    path: string;
    component: React.LazyExoticComponent<React.ComponentType<any>> | React.ComponentType;
    exact?: boolean;
}

// Lazy load routes for better performance
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Buy = lazy(() => import('../pages/Buy'));
const Downloads = lazy(() => import('../pages/Downloads'));
const Links = lazy(() => import('../pages/Links'));
const TapeswitchQuickReferences = lazy(() => import('../pages/TapeswitchQuickReferences'));

export const routes: RouteConfig[] = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/buy',
        component: Buy
    },
    {
        path: '/downloads',
        component: Downloads
    },
    {
        path: '/links',
        component: Links
    },
    {
        path: '/tapeswitch-quick-references',
        component: TapeswitchQuickReferences
    }
];

// Function to get route by path
export const getRouteByPath = (path: string): RouteConfig | undefined => {
    return routes.find(route => route.path === path);
};