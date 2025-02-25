import React, { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import { createPortal } from 'react-dom';
import { NavItem } from '@/types';
import { navItems } from '@/data/navItems';

const SideNavbar: React.FC = () => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [submenuPosition, setSubmenuPosition] = useState({ x: 0, y: 0 });
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const clearTimeout = useCallback(() => {
        if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    const handleItemHover = useCallback((event: React.MouseEvent<HTMLLIElement>, title: string) => {
        clearTimeout();
        const rect = event.currentTarget.getBoundingClientRect();
        setSubmenuPosition({ x: rect.right, y: rect.top });
        setHoveredItem(title);
    }, [clearTimeout]);

    const handleMouseLeave = useCallback(() => {
        timeoutRef.current = setTimeout(() => setHoveredItem(null), 300);
    }, []);

    const handleLinkClick = useCallback((hasSubitems = false) => {
        if (window.innerWidth < 768 && !hasSubitems) {
            setIsOpen(false);
        }
    }, []);

    const SubMenu = useCallback(({ item }: { item: NavItem }) => {
        if (hoveredItem !== item.title || !item.subitems) return null;

        const { x, y } = submenuPosition;
        const isMobile = window.innerWidth < 768;

        // Calculate positioning based on available space
        const submenuHeight = item.subitems.length * 40; // Estimate height
        const submenuWidth = 200; // Reasonable estimate

        const availableBelow = window.innerHeight - y;
        const availableRight = window.innerWidth - x;

        const top = availableBelow < submenuHeight && y > submenuHeight
            ? y - submenuHeight + 32
            : y;

        const left = isMobile || availableRight < submenuWidth
            ? Math.max(10, x - submenuWidth)
            : x;

        return createPortal(
            <ul
                className="bg-white shadow-lg rounded-md p-2 transition-all duration-150 overflow-y-auto z-50"
                style={{
                    position: 'fixed',
                    left: `${left}px`,
                    top: `${top}px`,
                    maxHeight: '80vh',
                    maxWidth: '90vw'
                }}
                onMouseEnter={clearTimeout}
                onMouseLeave={handleMouseLeave}
            >
                {item.subitems.map(subitem => (
                    <li key={subitem.title} className="py-1 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                        {subitem.isInternal ? (
                            <Link to={subitem.link || ''} className="block" onClick={() => handleLinkClick()}>
                                {subitem.title}
                            </Link>
                        ) : (
                            <a
                                href={subitem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                                onClick={() => handleLinkClick()}
                            >
                                {subitem.title}
                            </a>
                        )}
                    </li>
                ))}
            </ul>,
            document.body
        );
    }, [hoveredItem, submenuPosition, clearTimeout, handleMouseLeave, handleLinkClick]);

    const NavLinkContent = ({ item }: { item: NavItem }) => (
        <>
            {item.isInternal ? (
                <Link to={item.link || ''} className="block flex-grow" onClick={() => handleLinkClick(false)}>
                    {item.title}
                </Link>
            ) : (
                <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block flex-grow"
                    onClick={() => handleLinkClick(!!item.subitems)}
                >
                    {item.title}
                </a>
            )}
            {item.subitems && <ChevronDown className="ml-2 h-4 w-4" />}
        </>
    );

    return (
        <>
            <button
                className="md:hidden p-3 bg-gray-200 w-full text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Menu className="h-6 w-6 inline-block" /> Products
            </button>

            <nav
                className={`
                    w-64 bg-gray-100 p-4 text-sm 
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:translate-x-0 md:block 
                    fixed md:relative 
                    inset-0 md:inset-auto
                    z-40 overflow-y-auto 
                    pb-20 md:pb-4
                `}
            >
                {Object.entries(navItems).map(([section, items]) => (
                    <div key={section} className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">{section}</h2>
                        <ul>
                            {items.map(item => (
                                <li
                                    key={item.title}
                                    className="relative"
                                    onMouseEnter={e => handleItemHover(e, item.title)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className="flex items-center py-2 px-4 hover:bg-gray-200 cursor-pointer">
                                        <NavLinkContent item={item} />
                                    </div>
                                    <SubMenu item={item} />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </>
    );
};

export default SideNavbar;