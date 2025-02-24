import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Get the root element and add type assertion
const rootElement = document.getElementById('root');

// Add error handling for missing root element
if (!rootElement) {
    throw new Error(
        'Root element not found. The element with id "root" must exist in index.html'
    );
}

// Create root with proper typing
const root = createRoot(rootElement);

// Render app with error boundary
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

// Enable HMR for development
if (import.meta.hot) {
    import.meta.hot.accept();
}

// Report web vitals if needed
// reportWebVitals();