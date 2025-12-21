import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">
                        About Elite Agent Hub
                    </h1>
                    
                    <p className="text-xl text-gray-800 font-semibold mb-6 leading-relaxed">
                        Elite Agent Hub helps service businesses get more calls, more bookings, and more customers—without missing opportunities.
                    </p>
                    
                    <div className="space-y-6 text-lg text-gray-700 font-medium leading-relaxed">
                        <p>
                            Many businesses don’t lose customers because they’re bad at what they do. They lose customers because they don’t have a website, no one answers the phone, or their site doesn’t convert visitors into real inquiries.
                        </p>
                        <p className="font-bold text-primary text-2xl">
                            We fix that.
                        </p>
                    </div>

                    <section className="mt-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Do</h2>
                        <p className="text-lg text-gray-700 font-medium mb-6">
                            We help service businesses at any stage—from having no website at all to optimizing an existing one.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Building clean, professional websites for businesses starting from scratch",
                                "Fixing websites that aren’t generating calls or leads",
                                "Setting up AI-powered voice and chat systems to answer customers 24/7",
                                "Automating booking, lead capture, and missed-call recovery",
                                "Connecting everything into one simple, reliable system"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="text-primary mr-3 text-xl">•</span>
                                    <span className="text-lg text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-lg text-gray-800 font-bold italic">
                            Whether you’re just getting online or ready to scale, we focus on what actually drives results.
                        </p>
                    </section>

                    <section className="mt-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Help</h2>
                        <p className="text-lg text-gray-700 font-medium mb-6">
                            Elite Agent Hub is built for service-based businesses, including:
                        </p>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Local service providers",
                                "Home services (cleaning, pool service, repair, maintenance, etc.)",
                                "Clinics, practices, and appointment-based businesses",
                                "Small teams that can’t afford to miss calls or leads"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="text-primary mr-3 text-xl">•</span>
                                    <span className="text-lg text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-lg text-gray-800 font-bold italic">
                            If customers need to contact you, book you, or trust you—our systems are built for that.
                        </p>
                    </section>

                    <section className="mt-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">For Businesses Without a Website</h2>
                        <div className="space-y-6 text-lg text-gray-700 font-medium">
                            <p>
                                If you don’t have a website yet, we can help you get one built quickly and correctly.
                            </p>
                            <p>
                                We design simple, conversion-focused websites that clearly explain what you do, make it easy for customers to contact or book you, and are ready for automation and growth from day one.
                            </p>
                        </div>
                    </section>

                    <section className="mt-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why AI (And Why Now)</h2>
                        <div className="space-y-6 text-lg text-gray-700 font-medium mb-8">
                            <p>
                                Customers expect instant responses. They don’t wait. They don’t retry. They move on.
                            </p>
                            <p>
                                AI isn’t about replacing people—it’s about never missing an opportunity when you’re busy, unavailable, or closed.
                            </p>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "Responds instantly",
                                "Builds trust",
                                "Captures revenue that would otherwise be lost"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="text-primary mr-3 text-xl">•</span>
                                    <span className="text-lg text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="mt-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Don’t Do</h2>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Lock you into complicated systems",
                                "Sell hype or unrealistic promises",
                                "Push automation without purpose",
                                "Build websites that just “look nice” but don’t convert"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start">
                                    <span className="text-red-500 mr-3 text-xl">×</span>
                                    <span className="text-lg text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-lg text-gray-800 font-bold italic">
                            Everything we build is practical, measurable, and designed to support real business growth.
                        </p>
                    </section>

                    <section className="mt-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Approach</h2>
                        <ol className="space-y-6 list-decimal pl-6">
                            {[
                                "Start with where you are (no website, or an underperforming one)",
                                "Fix the highest-impact gaps first",
                                "Automate what should never be missed",
                                "Keep everything simple, scalable, and transparent"
                            ].map((item, i) => (
                                <li key={i} className="text-lg text-gray-700 font-bold pl-2">
                                    <span className="font-medium text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ol>
                    </section>

                    <section className="mt-16 p-10 bg-gray-50 rounded-2xl border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Let’s Get You Set Up</h2>
                        <p className="text-xl text-gray-700 font-medium leading-relaxed">
                            Whether you need a website, better conversions, or automation that actually helps—Elite Agent Hub is here to make it easier.
                        </p>
                        <div className="mt-10">
                            <a href="#/book-demo" className="inline-block bg-primary hover:bg-primary-dark text-white font-black py-4 px-10 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105">
                                Book a Demo
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;