import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const NavMenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CloseMenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const MicroPhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
);

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const navLinks = [
        { to: "/", text: "Home" },
        { to: "/solutions", text: "Solutions" },
        { to: "/how-it-works", text: "How It Works" },
        { to: "/pricing", text: "Pricing" },
        { to: "/roi-calculator", text: "ROI Calculator" },
        { to: "/website-scan", text: "Website Scan" },
    ];

    const handleCopyPhone = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText("8042233141");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const linkClass = "text-gray-600 hover:text-primary-dark transition-colors duration-300 text-lg font-semibold";
    const activeLinkClass = "text-primary-dark";

    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-3">
                            <img
                                src="https://imagedelivery.net/3ycrRDYByciJhEX28VeAng/807f56da-fb76-465e-fc6d-e4b451499f00/public"
                                alt="Elite Agent Hub logo"
                                className="h-14 w-auto rounded-lg shadow-lg"
                            />
                            <div className="flex flex-col">
                                <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                                    <span className="text-primary">Elite</span> Agent Hub
                                </span>
                                <span className="text-xs text-slate-500">
                                    Your Success Powers Our Success.
                                </span>
                            </div>
                        </Link>
                    </div>

                    <nav className="hidden xl:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''} text-sm`}
                            >
                                {link.text}
                            </NavLink>
                        ))}
                    </nav>
                    
                    <div className="flex items-center gap-4">
                        {/* Primary Desktop CTA: Phone Demo */}
                        <div className="hidden sm:flex items-center gap-3">
                            <div className="flex flex-col items-end mr-1">
                                <span className="text-[9px] uppercase font-black tracking-widest text-primary animate-pulse mb-1">Live Demo Active</span>
                                <span className="text-sm font-black text-slate-900">(804) 223-3141</span>
                            </div>
                            <button
                                onClick={handleCopyPhone}
                                className={`relative group inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-black text-sm transition-all transform active:scale-95 duration-300 ${copied ? 'bg-green-600 text-white' : 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20'}`}
                            >
                                {copied ? 'Number Copied!' : 'Call Belle (Live)'}
                            </button>
                        </div>

                        {/* Mobile Phone Link */}
                        <a 
                            href="tel:+18042233141"
                            className="sm:hidden flex items-center justify-center bg-primary text-white w-10 h-10 rounded-full shadow-lg"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                        </a>

                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open main menu">
                                {isMenuOpen ? <CloseMenuIcon className="h-6 w-6" /> : <NavMenuIcon className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 shadow-xl overflow-hidden animate-slideDown">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) => `block px-3 py-3 rounded-lg ${linkClass} ${isActive ? activeLinkClass + ' bg-blue-50' : 'hover:bg-gray-50'}`}
                            >
                                {link.text}
                            </NavLink>
                        ))}
                        <div className="pt-4 border-t border-gray-100">
                            <a
                                href="tel:+18042233141"
                                className="w-full bg-primary text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg"
                            >
                                <MicroPhoneIcon className="h-5 w-5" />
                                Call Belle (Live Demo)
                            </a>
                        </div>
                    </div>
                </div>
            )}
            
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes slideDown {
                    from { transform: translateY(-10px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slideDown { animation: slideDown 0.3s ease-out forwards; }
            `}} />
        </header>
    );
};

export default Header;