import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/admin/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const navigationItems = [
        { path: '/admin/dashboard', label: 'Dashboard' },
        { path: '/admin/manufacturers', label: 'Manufacturers' },
        { path: '/admin/products', label: 'Products' },
        { path: '/admin/nav-items', label: 'Navigation Items' },
        { path: '/admin/downloads', label: 'Downloads' },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-primary text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-xl font-bold">CASECO Admin</h1>
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-sm hover:underline" target="_blank">
                            View Website
                        </Link>
                        <button
                            onClick={handleSignOut}
                            className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-gray-100 shadow-md">
                    <nav className="p-4">
                        <ul className="space-y-2">
                            {navigationItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`block px-4 py-2 rounded-md ${
                                            location.pathname === item.path
                                                ? 'bg-blue-600 text-white'
                                                : 'hover:bg-gray-200'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 bg-gray-50">
                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold">{title}</h2>
                        </div>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;