
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

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

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { to: "/", text: "Home" },
        { to: "/how-it-works", text: "How It Works" },
        { to: "/pricing", text: "Pricing" },
        { to: "/roi-calculator", text: "ROI Calculator" },
        { to: "/faq", text: "FAQ" },
    ];

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

                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) => `${linkClass} ${isActive ? activeLinkClass : ''}`}
                            >
                                {link.text}
                            </NavLink>
                        ))}
                    </nav>
                    
                    <div className="hidden md:block">
                        <Link
                            to="/book-demo"
                            data-cta="header-book-demo"
                            className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-5 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
                        >
                            See It In Action
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open main menu">
                            {isMenuOpen ? <CloseMenuIcon className="h-6 w-6" /> : <NavMenuIcon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) => `block px-3 py-2 rounded-md ${linkClass} ${isActive ? activeLinkClass : ''}`}
                            >
                                {link.text}
                            </NavLink>
                        ))}
                        <div className="pt-4 pb-2 px-3">
                             <Link
                                to="/book-demo"
                                data-cta="mobile-header-book-demo"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full text-center block bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-5 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300"
                            >
                                See It In Action
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
