import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const VoiceDemoPage: React.FC = () => {
    useEffect(() => {
        document.title = "Voice Demo Unavailable | Elite Agent Hub";
    }, []);

    return (
        <div className="bg-white py-20 min-h-screen flex items-center justify-center">
            <div className="container mx-auto px-4 max-w-2xl text-center">
                <div className="bg-gray-50 border border-gray-200 rounded-3xl p-10 md:p-14 shadow-sm">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                        Voice Demo Temporarily Unavailable
                    </h1>
                    
                    <p className="text-lg text-gray-700 font-medium mb-10 leading-relaxed max-w-lg mx-auto">
                        This browser-based voice demo is currently offline.
                        <br />
                        For a live demo, call Belle or book a demo — we’ll show you exactly how it works.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:+18042233141"
                            className="inline-flex justify-center items-center px-8 py-4 text-lg font-bold rounded-xl bg-primary text-white hover:bg-primary-dark transition-transform transform hover:scale-105 shadow-lg"
                        >
                            Call Belle for a Live Demo
                        </a>
                        <Link
                            to="/book-demo"
                            className="inline-flex justify-center items-center px-8 py-4 text-lg font-bold rounded-xl bg-white border-2 border-primary text-primary hover:bg-blue-50 transition-transform transform hover:scale-105 shadow-sm"
                        >
                            Book a Demo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoiceDemoPage;