import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';
import { createPortal } from 'react-dom';
import { NavItem } from '@/types';
import { navItems } from '@/data/navItems';

interface Position {
    x: number;
    y: number;
}

const SideNavbar: React.FC = () => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [submenuPosition, setSubmenuPosition] = useState<Position>({ x: 0, y: 0 });
    let hideTimeout: NodeJS.Timeout;

    const handleMouseEnter = useCallback((event: React.MouseEvent<HTMLLIElement>, title: string): void => {
        clearTimeout(hideTimeout);
        const rect = event.currentTarget.getBoundingClientRect();
        setSubmenuPosition({
            x: rect.right,
            y: rect.top
        });
        setHoveredItem(title);
    }, []);

    const handleLinkClick = useCallback((hasSubitems?: boolean): void => {
        if (window.innerWidth < 768 && !hasSubitems) {
            setIsOpen(false);
        }
    }, []);

    const renderSubMenu = (item: NavItem): React.ReactPortal | null => {
        if (hoveredItem !== item.title || !item.subitems) return null;

        const { x, y } = submenuPosition;

        // Create a temporary div to measure submenu dimensions
        const tempDiv = document.createElement('div');
        tempDiv.style.visibility = 'hidden';
        tempDiv.style.position = 'absolute';
        tempDiv.innerHTML = `<ul>${item.subitems.map(() => '<li style="height: 32px;"></li>').join('')}</ul>`;
        document.body.appendChild(tempDiv);
        const submenuHeight = tempDiv.offsetHeight;
        const submenuWidth = tempDiv.offsetWidth;
        document.body.removeChild(tempDiv);

        // Calculate available space and positioning
        const availableSpaceBelow = window.innerHeight - y;
        const availableSpaceRight = window.innerWidth - x;
        const isMobile = window.innerWidth < 768;

        // Calculate positions
        const topPosition = availableSpaceBelow < submenuHeight && y > submenuHeight
            ? y - submenuHeight + 32 // Add offset for current item height
            : y;

        const leftPosition = isMobile || availableSpaceRight < submenuWidth
            ? Math.max(10, x - submenuWidth)
            : x;

        return createPortal(
            <ul
                style={{
                    position: 'fixed',
                    left: `${leftPosition}px`,
                    top: `${topPosition}px`,
                    maxHeight: '80vh',
                    maxWidth: '90vw'
                }}
                className="bg-white shadow-lg rounded-md p-2 transition-all duration-150 overflow-y-auto"
                onMouseEnter={() => clearTimeout(hideTimeout)}
                onMouseLeave={() => {
                    hideTimeout = setTimeout(() => setHoveredItem(null), 300);
                }}
            >
                {item.subitems.map((subitem) => (
                    <li key={subitem.title} className="py-1 px-4 hover:bg-gray-100 cursor-pointer whitespace-nowrap">
                        {subitem.isInternal ? (
                            <Link
                                to={subitem.link || ''}
                                className="block"
                                onClick={() => handleLinkClick()}
                            >
                                {subitem.title}
                            </Link>
                        ) : (
                            <a
                                href={subitem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                                onClick={() => handleLinkClick(!!item.subitems)}
                            >
                                {subitem.title}
                            </a>
                        )}
                    </li>
                ))}
            </ul>,
            document.body
        );
    };

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
                    transition-transform transform 
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:translate-x-0 md:block 
                    fixed md:relative 
                    inset-0 md:inset-auto
                    md:h-auto 
                    overflow-y-auto 
                    z-50
                    pb-20 md:pb-4
                `}
            >
                {Object.entries(navItems).map(([section, items]) => (
                    <div key={section} className="mb-6">
                        <h2 className="text-lg font-semibold mb-2">{section}</h2>
                        <ul>
                            {items.map((item) => (
                                <li
                                    key={item.title}
                                    className="relative"
                                    onMouseEnter={(event) => handleMouseEnter(event, item.title)}
                                    onMouseLeave={() => {
                                        hideTimeout = setTimeout(() => setHoveredItem(null), 300);
                                    }}
                                >
                                    <div className="flex items-center py-2 px-4 hover:bg-gray-200 cursor-pointer">
                                        {item.isInternal ? (
                                            <Link
                                                to={item.link || ''}
                                                className="block flex-grow"
                                                onClick={() => handleLinkClick(false)}
                                            >
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
                                    </div>
                                    {renderSubMenu(item)}
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