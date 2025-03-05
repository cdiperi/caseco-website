import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { routes } from './config/routes';
import { configureAmplify } from './config/amplify';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Configure Amplify on app initialization
configureAmplify();

// Lazy load admin pages
const AdminLogin = React.lazy(() => import('./pages/admin/Login'));
const AdminDashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const AdminManufacturers = React.lazy(() => import('./pages/admin/ManufacturersPage'));
const AdminProducts = React.lazy(() => import('./pages/admin/ProductsPage'));
const AdminNavItems = React.lazy(() => import('./pages/admin/NavItemsPage'));
const AdminDownloads = React.lazy(() => import('./pages/admin/DownloadsPage'));

const Loading: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <Router>
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            {/* Admin Routes */}
                            <Route path="/admin/login" element={<AdminLogin />} />
                            <Route
                                path="/admin/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <AdminDashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admin/manufacturers"
                                element={
                                    <ProtectedRoute>
                                        <AdminManufacturers />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admin/products"
                                element={
                                    <ProtectedRoute>
                                        <AdminProducts />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admin/nav-items"
                                element={
                                    <ProtectedRoute>
                                        <AdminNavItems />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admin/downloads"
                                element={
                                    <ProtectedRoute>
                                        <AdminDownloads />
                                    </ProtectedRoute>
                                }
                            />

                            {/* Public Routes */}
                            <Route path="/*" element={
                                <Layout>
                                    <Suspense fallback={<Loading />}>
                                        <Routes>
                                            {routes.map(({ path, component: Component }) => (
                                                <Route
                                                    key={path}
                                                    path={path}
                                                    element={<Component />}
                                                />
                                            ))}
                                        </Routes>
                                    </Suspense>
                                </Layout>
                            } />
                        </Routes>
                    </Suspense>
                </Router>
            </AuthProvider>
        </ErrorBoundary>
    );
};

export default App;