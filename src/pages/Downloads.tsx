import React from 'react';
import { getDocumentUrl } from '../utils/documentUtils';
import { downloadsData } from '@/data/downloadsData';

const Downloads: React.FC = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Downloads</h1>

            {downloadsData.map((category) => (
                <section key={category.title} className="mb-8">
                    <h2 className="text-xl font-bold mb-4">{category.title}</h2>
                    <ul className="space-y-2 list-disc ml-6">
                        {category.links.map((link, index) => (
                            <li key={index}>
                            <a
                                href={link.isExternal ? link.url : getDocumentUrl(link.url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                                >
                                {link.title}
                            </a>
                            </li>
                            ))}
                    </ul>
                </section>
            ))}
</div>
);
};

export default Downloads;