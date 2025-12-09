
import React from 'react';
import { Link } from 'react-router-dom';

interface CtaBandProps {
    title?: string;
    subtitle?: string | React.ReactNode;
    buttonText?: string;
    buttonLink?: string;
}

const CtaBand: React.FC<CtaBandProps> = ({
    title = "Stop Losing Customers to Your Competitors",
    subtitle = "Protect every call, capture every lead, and watch your revenue grow. Your competitors are answering the calls you miss.",
    buttonText = "Stop Losing Customers Now",
    buttonLink = "/book-demo"
}) => {
    return (
        <div className="bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                    {title}
                </h2>
                <div className="mt-4 text-base md:text-lg text-blue-100 font-medium max-w-2xl mx-auto">
                    {subtitle}
                </div>
                <div className="mt-8">
                    <Link
                        to={buttonLink}
                        data-cta="cta-band-book-demo"
                        className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-lg shadow-lg text-lg transition-transform transform hover:scale-105 duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                    >
                        {buttonText}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CtaBand;
