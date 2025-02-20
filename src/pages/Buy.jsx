import React from 'react';

const Buy = () => {
    return (
        <div className="container mx-auto p-6">
            <div className="bg-black text-white py-4 mb-8 text-center">
                <h1 className="text-2xl font-bold">BUY NOW</h1>
            </div>

            <div className="max-w-2xl mx-auto">
                <ul className="space-y-4">
                    <li>
                        <a
                            href="http://www.tapeswitch.com/store/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-lg block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Tapeswitch
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.tapeswitch.com/store/products.php?cat=Safety+and+Signal+Mats"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-lg block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Safety Mats
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.tapeswitch.com/store/products.php?cat=Non-contact+Interlocks"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-lg block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Safety Interlocks
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.tapeswitch.com/store/products.php?cat=Sensing+Edges"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-lg block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Safety Edges
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://www.tapeswitch.com/store/products.php?cat=Interface+Controllers"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-lg block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Interface Controllers
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Buy;