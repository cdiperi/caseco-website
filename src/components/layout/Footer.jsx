import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-primary text-white py-6 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                <div>
                    <h3 className="text-lg font-semibold mb-2">CASECO</h3>
                    <p>Controls Automation Safety Engineering Company</p>
                    <p>508 Queens Court</p>
                    <p>Franklin, TN 37064</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Contact</h3>
                    <p>Phone: (615) 591-7399 [Phone/Fax]</p>
                    <p>Email: info@company.com</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Legal</h3>
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700 text-center">
                <p>&copy; 2003-2025. C.A.S.E.C.O. All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;