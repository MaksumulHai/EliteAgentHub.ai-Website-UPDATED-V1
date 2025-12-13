
import React from 'react';
import { Link } from 'react-router-dom';

const ShieldCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const DocumentTextIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const ScaleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
);

const CashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ExclamationCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

const LegalPage: React.FC = () => {
    const legalLinks = [
        {
            title: "Privacy Policy",
            description: "How we collect, use, and protect your personal data, including SMS consent.",
            link: "/privacy-policy",
            icon: <ShieldCheckIcon className="h-8 w-8 text-primary" />
        },
        {
            title: "Terms of Service",
            description: "The agreement between you and Elite Agent Hub regarding the use of our services.",
            link: "/terms",
            icon: <DocumentTextIcon className="h-8 w-8 text-primary" />
        },
        {
            title: "Refund & Cancellation",
            description: "Our policies on billing, subscriptions, refunds, and cancellation procedures.",
            link: "/refund-policy",
            icon: <CashIcon className="h-8 w-8 text-primary" />
        },
        {
            title: "Acceptable Use Policy",
            description: "Guidelines on prohibited activities and fair use of our AI and communication tools.",
            link: "/acceptable-use",
            icon: <ScaleIcon className="h-8 w-8 text-primary" />
        },
         {
            title: "AI Disclaimer",
            description: "Information about the limitations of AI technology and liability.",
            link: "/ai-disclaimer",
            icon: <ExclamationCircleIcon className="h-8 w-8 text-primary" />
        }
    ];

    return (
        <div className="bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Legal & Compliance</h1>
                    <p className="mt-4 text-lg text-gray-700 font-medium">Transparency, security, and your rights.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {legalLinks.map((item, index) => (
                        <Link 
                            key={index} 
                            to={item.link} 
                            className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-primary transition-all duration-300 group flex flex-col items-start"
                        >
                            <div className="bg-blue-50 p-3 rounded-lg mb-4 group-hover:bg-blue-100 transition-colors">
                                {item.icon}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{item.title}</h2>
                            <p className="text-gray-700 font-medium mb-6 flex-grow">{item.description}</p>
                            <span className="text-primary font-bold flex items-center group-hover:translate-x-1 transition-transform">
                                Read Policy 
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 text-center text-gray-600 font-medium">
                    <p>Elite Agent Hub is operated by Elite Impact Lab LLC.</p>
                    <p>Questions? Contact us at <a href="mailto:support@eliteagenthub.ai" className="text-primary hover:underline">support@eliteagenthub.ai</a></p>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
