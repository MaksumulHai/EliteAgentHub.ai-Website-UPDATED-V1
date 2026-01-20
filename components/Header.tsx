import React, { useState } from 'react';
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

    const navLinks = [
        { to: "/", text: "Home" },
        { to: "/solutions", text: "Solutions" },
        { to: "/how-it-works", text: "How It Works" },
        { to: "/pricing", text: "Pricing" },
        { to: "/roi-calculator", text: "ROI Calculator" },
        { to: "/website-scan", text: "Website Scan" },
        { to: "/faq", text: "FAQ" },
    ];

    const handleCtaClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMenuOpen(false);
        navigate('/voice-demo');
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
                        <div className="flex flex-col items-end">
                            <button
                                onClick={handleCtaClick}
                                type="button"
                                className="relative group inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-primary text-white font-bold py-2.5 px-6 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all transform hover:scale-105 active:scale-95 duration-300"
                            >
                                <MicroPhoneIcon className="h-4 w-4" />
                                <div className="flex flex-col leading-none text-left">
                                    <span className="text-sm">Try Voice Agent Demo</span>
                                    <span className="text-[9px] uppercase tracking-widest opacity-80 font-medium italic">Meet Josh (Browser)</span>
                                </div>
                            </button>
                        </div>

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
                            <button
                                onClick={handleCtaClick}
                                className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3"
                            >
                                <MicroPhoneIcon className="h-5 w-5" />
                                Try Voice Agent Demo
                            </button>
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