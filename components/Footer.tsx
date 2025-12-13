
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const navLinks = [
        { to: "/how-it-works", text: "How It Works" },
        { to: "/pricing", text: "Pricing" },
        { to: "/roi-calculator", text: "ROI Calculator" },
        { to: "/faq", text: "FAQ" },
        { to: "/book-demo", text: "Book a Demo" },
    ];

    const legalLinks = [
        { to: "/legal", text: "Legal & Compliance" },
        { to: "/privacy-policy", text: "Privacy Policy" },
        { to: "/terms", text: "Terms of Service" },
        { to: "/refund-policy", text: "Refund Policy" },
        { to: "/acceptable-use", text: "Acceptable Use" },
        { to: "/ai-disclaimer", text: "AI Disclaimer" },
    ];

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-extrabold">
                            Elite <span className="text-accent">Agent Hub</span>
                        </h2>
                        <p className="text-sm md:text-base text-gray-300 font-medium leading-relaxed">
                            Answer every call. Book more appointments. Capture the revenue you’re already earning.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-200 uppercase tracking-wider">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                            {navLinks.map(link => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300 font-medium">
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-lg font-semibold text-gray-200 uppercase tracking-wider">Legal</h3>
                        <ul className="mt-4 space-y-2">
                            {legalLinks.map(link => (
                                <li key={link.to}>
                                    <Link to={link.to} className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300 font-medium">
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm md:text-base text-gray-400 font-medium">
                    <p>&copy; {new Date().getFullYear()} Elite Agent Hub. Operated by Elite Impact Lab LLC. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
