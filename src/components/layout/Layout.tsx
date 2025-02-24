import React from 'react';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';
import Footer from './Footer';
import { LayoutProps } from '@/types';

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <TopNavbar />
            <div className="flex-1 flex">
                <div className="w-64 flex-shrink-0">
                    <SideNavbar />
                </div>
                <main className="flex-1 overflow-x-hidden">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;