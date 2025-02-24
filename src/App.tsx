import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { routes } from './config/routes';

const Loading: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <Router>
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
            </Router>
        </ErrorBoundary>
    );
};

export default App;