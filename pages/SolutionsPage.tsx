import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const SolutionsPage: React.FC = () => {
    useEffect(() => {
        document.title = "Solutions | Elite Agent Hub";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', "Explore solutions to capture more calls, bookings, and leads—AI agents, website health scans, website builds, and visibility optimization.");
        }
    }, []);

    const solutions = [
        {
            title: "AI Voice & Chat Agents",
            description: "Answer calls and messages instantly, book appointments, and capture leads automatically.",
            bullets: [
                "24/7 call & chat coverage",
                "Booking + lead capture",
                "Missed-call recovery"
            ],
            buttonText: "See AI Agents",
            link: "/"
        },
        {
            title: "Free Website Health Scan",
            description: "Find what’s broken, missing, or costing you leads — in minutes.",
            bullets: [
                "Website health score",
                "Top opportunities + quick wins",
                "Built for service businesses"
            ],
            buttonText: "Run Free Website Scan",
            link: "/website-scan"
        },
        {
            title: "Website Builds (No Website Yet?)",
            description: "Get a clean, professional website built to generate calls, bookings, and trust.",
            bullets: [
                "Fast, simple, conversion-first",
                "Mobile-friendly and clear messaging",
                "Ready for automation and growth"
            ],
            buttonText: "Build My Website",
            link: "/build-my-website"
        },
        {
            title: "SEO, GEO & AI Visibility",
            description: "Improve how customers find you on Google and in AI-powered search results.",
            bullets: [
                "Local visibility improvements",
                "On-page clarity and structure",
                "AI/answer engine readiness"
            ],
            buttonText: "Improve My Visibility",
            link: "/website-scan"
        }
    ];

    return (
        <div className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Intro Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Solutions</h1>
                    <p className="text-lg md:text-xl text-gray-700 font-medium max-w-3xl mx-auto leading-relaxed">
                        Everything you need to capture more calls, bookings, and leads — without missing opportunities.
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
                        Use the free scan or the ROI calculator — we’ll help you prioritize the highest-impact fixes.
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