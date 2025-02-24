import React from 'react';

interface FooterSection {
    title: string;
    items: Array<{
        text: string;
        link?: string;
    }>;
}

const Footer: React.FC = () => {
    const footerSections: FooterSection[] = [
        {
            title: 'CASECO',
            items: [
                { text: 'Controls Automation Safety Engineering Company' },
                { text: '508 Queens Court' },
                { text: 'Franklin, TN 37064' }
            ]
        },
        {
            title: 'Contact',
            items: [
                { text: 'Phone: (615) 591-7399 [Phone/Fax]' },
                { text: 'Email: info@company.com', link: 'mailto:info@company.com' }
            ]
        },
        {
            title: 'Legal',
            items: [
                { text: 'Privacy Policy', link: '/privacy' },
                { text: 'Terms of Service', link: '/terms' }
            ]
        }
    ];

    const currentYear = new Date().getFullYear();

    const renderFooterItem = (item: FooterSection['items'][0]) => {
        if (item.link) {
            return (
                <a
                    href={item.link}
                    className="hover:text-gray-300 transition-colors"
                    {...(item.link.startsWith('mailto:') ? {} : {
                        target: '_blank',
                        rel: 'noopener noreferrer'
                    })}
                >
                    {item.text}
                </a>
            );
        }
        return <p>{item.text}</p>;
    };

    return (
        <footer className="bg-primary text-white py-6 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                {footerSections.map((section) => (
                    <div key={section.title}>
                        <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                        <div className="space-y-1">
                            {section.items.map((item, index) => (
                                <div key={index}>
                                    {renderFooterItem(item)}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700 text-center">
                <p>&copy; 2003-{currentYear}. C.A.S.E.C.O. All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;