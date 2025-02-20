import React from 'react';

const TapeswitchQuickReferences = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Tapeswitch Quick References</h1>
            <p>This page contains quick reference materials for Tapeswitch products.</p>

            <ul className="list-disc ml-6 mt-4">
                <li><a href="/docs/tapeswitch-product-guide.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Tapeswitch Product Guide (PDF)</a></li>
                <li><a href="/docs/tapeswitch-safety-manual.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Tapeswitch Safety Manual</a></li>
                <li><a href="/docs/tapeswitch-troubleshooting.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Troubleshooting Guide</a></li>
            </ul>
        </div>
    );
};

export default TapeswitchQuickReferences;
