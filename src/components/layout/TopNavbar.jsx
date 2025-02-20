import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu } from 'lucide-react';

const TopNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navItems = [
        { title: 'Home', path: '/' },
        { title: 'Blog', path: 'https://casecoinc.wordpress.com/' },
        { title: 'News', path: '/news' },
        { title: 'Events', path: '/events' },
        { title: 'Links', path: '/links' },
        { title: 'Downloads', path: '/downloads' },
        { title: 'About Us', path: '/about' },
        { title: 'Contact Us', path: 'mailto:timdiperi@caseco-inc.com' },
        { title: 'Buy Now', path: '/buy' },
    ];

    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setIsOpen(false); // Close the mobile menu after a link is clicked
        }
    };

    return (
        <nav className="bg-primary text-white shadow-lg p-4">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo with Link */}
                <Link to="/" onClick={handleLinkClick} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                    <Home className="h-8 w-8" />
                    <div>
                        <span className="font-bold text-xl">CASECO</span>
                        <span className="block text-sm">Controls Automation Safety Company</span>
                    </div>
                </Link>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <Menu className="h-6 w-6" />
                </button>

                {/* Desktop Nav */}
                <div className="hidden md:flex space-x-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors"
                            onClick={handleLinkClick}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden flex flex-col items-center bg-primary p-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="w-full text-center py-2 border-b border-gray-600"
                            onClick={handleLinkClick}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default TopNavbar;