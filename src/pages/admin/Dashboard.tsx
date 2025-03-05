import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.tsx';

const Dashboard: React.FC = () => {
    const { user, signOut } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const adminModules = [
        {
            name: 'Manufacturers',
            path: '/admin/manufacturers',
            description: 'Manage manufacturer information and logos'
        },
        {
            name: 'Products',
            path: '/admin/products',
            description: 'Manage product catalog and details'
        },
        {
            name: 'Navigation Items',
            path: '/admin/nav-items',
            description: 'Manage website navigation structure'
        },
        {
            name: 'Downloads',
            path: '/admin/downloads',
            description: 'Manage downloadable resources and documents'
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-primary text-white shadow-md p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">CASECO Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm">{user?.attributes?.email}</span>
                        <button
                            onClick={handleSignOut}
                            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Welcome to the Admin Panel</h2>
                    <p className="text-gray-600">
                        Use this dashboard to manage content for the CASECO website. Select a module below to get started.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {adminModules.map((module) => (
                        <Link
                            key={module.path}
                            to={module.path}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-lg font-bold mb-2">{module.name}</h3>
                            <p className="text-gray-600">{module.description}</p>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link
                        to="/"
                        className="text-blue-600 hover:underline"
                    >
                        Return to Website
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;