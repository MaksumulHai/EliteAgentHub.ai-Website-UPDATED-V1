import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const SolutionsPage: React.FC = () => {
    useEffect(() => {
        document.title = "Solutions | Elite Agent Hub";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', "Explore solutions to capture more calls, bookings, and leads—voice agents, website health scans, website builds, and visibility optimization.");
        }
    }, []);

    const solutions = [
        {
            title: "Website + Chat Assistant",
            description: "Your website should respond like a real business. It answers visitor questions instantly, captures their contact details, and helps them book a time with you.",
            bullets: [
                "Responds to visitors immediately",
                "Captures names and phone numbers",
                "Guides customers to book"
            ],
            buttonText: "See Plans",
            link: "/pricing"
        },
        {
            title: "Voice Agent (Phone Calls)",
            description: "A missed call is a missed opportunity. Our agent answers the phone 24/7, handles customer questions, and books appointments so you stop losing revenue to voicemail.",
            bullets: [
                "Answers every call, day or night",
                "Secures bookings on the spot",
                "Eliminates phone tag"
            ],
            buttonText: "See Plans",
            link: "/pricing"
        },
        {
            title: "Professional Website Builds",
            description: "Don't have a website? We build clean, professional sites designed to turn visitors into paying customers. Simple, fast, and built for results.",
            bullets: [
                "Built to convert traffic into leads",
                "Professional, mobile-friendly design",
                "Fast setup and launch"
            ],
            buttonText: "Build My Website",
            link: "/build-my-website"
        },
        {
            title: "Free Website Health Scan",
            description: "Wondering why your phone isn't ringing? Find out exactly what is broken on your site and get a clear list of quick fixes to get customers back.",
            bullets: [
                "Identify why customers leave",
                "Get a clear health score",
                "See exactly what to fix"
            ],
            buttonText: "Run Free Scan",
            link: "/website-scan"
        }
    ];

    return (
        <div className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Intro Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Two Ways Customers Reach You. We Handle Both.</h1>
                    <p className="text-lg md:text-xl text-gray-700 font-medium max-w-3xl mx-auto leading-relaxed">
                        Your customers reach you in two ways: through your website and over the phone. We make sure you answer both, every time.
                    </p>
                </div>

                {/* Solutions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {solutions.map((solution, index) => (
                        <div key={index} className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">{solution.title}</h2>
                            <p className="text-gray-700 font-medium mb-6 leading-relaxed flex-grow">
                                {solution.description}
                            </p>
                            <ul className="space-y-3 mb-8">
                                {solution.bullets.map((bullet, i) => (
                                    <li key={i} className="flex items-center text-gray-600 font-medium">
                                        <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto">
                                <Link
                                    to={solution.link}
                                    className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all active:scale-[0.98] w-full text-center sm:w-auto"
                                >
                                    {solution.buttonText}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA Band */}
                <div className="mt-20 bg-gray-50 rounded-3xl p-10 md:p-14 border border-gray-100 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Not sure where to start?</h2>
                    <p className="text-lg text-gray-600 font-medium mb-10 max-w-2xl mx-auto">
                        Run a free scan or calculate your lost revenue to see the fastest way to grow.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/roi-calculator"
                            className="bg-white border border-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
                        >
                            ROI Calculator
                        </Link>
                        <Link
                            to="/website-scan"
                            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors"
                        >
                            Website Scan
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolutionsPage;