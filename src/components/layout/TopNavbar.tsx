import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu } from 'lucide-react';
import { NavItem } from '@/types';

interface NavLinkProps {
    item: NavItem;
    onLinkClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, onLinkClick }) => {
    const isExternal = item.path?.startsWith('http') || item.path?.startsWith('mailto:');

    if (isExternal) {
        return (
            <a
                href={item.path}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors"
                onClick={onLinkClick}
                target={item.path?.startsWith('mailto:') ? undefined : '_blank'}
                rel={item.path?.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            >
                {item.title}
            </a>
        );
    }

    return (
        <Link
            to={item.path || '/'}
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors"
            onClick={onLinkClick}
        >
            {item.title}
        </Link>
    );
};

const TopNavbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const navItems: NavItem[] = [
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

    const handleLinkClick = (): void => {
        if (window.innerWidth < 768) {
            setIsOpen(false);
        }
    };

    return (
        <nav className="bg-primary text-white shadow-lg p-4">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <Link to="/" onClick={handleLinkClick} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                    <Home className="h-8 w-8" />
                    <div>
                        <span className="font-bold text-xl">CASECO</span>
                        <span className="block text-sm">Controls Automation Safety Company</span>
                    </div>
                </Link>

                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation menu"
                >
                    <Menu className="h-6 w-6" />
                </button>

                <div className="hidden md:flex space-x-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            item={item}
                            onLinkClick={handleLinkClick}
                        />
                    ))}
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden flex flex-col items-center bg-primary p-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            item={item}
                            onLinkClick={handleLinkClick}
                        />
                    ))}
                </div>
            )}
        </nav>
    );
};

export default TopNavbar;