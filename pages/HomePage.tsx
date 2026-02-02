import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const stats = [
    { value: '85%', label: 'Of callers never call back after hitting voicemail.' },
    { value: '62%', label: 'Of customers refuse to leave a voicemail.' },
    { value: '35%', label: 'Of calls are missed by service businesses daily.' },
    { value: '$500+', label: 'Average revenue lost per missed new customer call.' },
];

const comparisonData = [
    { feature: 'Works 24/7', human: false, ai: true },
    { feature: 'Handles unlimited calls', human: false, ai: true },
    { feature: 'Consistent Information Handling', human: false, ai: true },
    { feature: 'Consistent, professional responses', human: false, ai: true },
    { feature: 'Always available, no scheduling gaps', human: false, ai: true },
    { feature: 'High consistency with defined workflows', human: false, ai: true },
    { feature: 'Monthly Cost', human: '$2,800 - $4,000', ai: '$120 - $549' },
];

const HomePage: React.FC = () => {
    useEffect(() => {
        document.title = "Elite Agent Hub | AI Voice & Chat Agents for Missed-Call Recovery";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', "Stop losing customers to missed calls. Elite Agent Hub provides AI voice and chat agents that capture leads, book appointments, and respond 24/7.");
        }
    }, []);

    return (
        <div>
            {/* HERO SECTION: Merged Headline & Actions with Background Image */}
            <section 
                className="relative pt-32 pb-24 text-center"
                style={{ 
                    backgroundImage: "url('https://imagedelivery.net/3ycrRDYByciJhEX28VeAng/53ea590d-0551-48cf-c051-017492bf5300/public')",
                    backgroundSize: "115%",
                    backgroundPosition: "left 55%",
                    backgroundRepeat: "no-repeat"
                }}
            >
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/45 backdrop-blur-[0.5px]"></div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Headlines */}
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                        Turn Every Website Visit and Phone Call Into a Real Lead
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl font-semibold text-blue-700 max-w-3xl mx-auto">
                        Elite Agent Hub answers customers for you — through your website and your phone — and captures every inquiry automatically.
                    </p>
                    
                    {/* CTA Actions */}
                    <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                        {/* Primary Button */}
                        <Link
                            to="/book-demo"
                            data-cta="hero-book-demo"
                            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-md hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-transform transform hover:scale-105 duration-300 w-full md:w-auto"
                        >
                            Book a Demo
                        </Link>
                        {/* Secondary Button */}
                         <a
                            href="tel:+18042233141"
                            data-cta="hero-call-belle"
                            className="inline-flex items-center justify-center rounded-lg bg-white border-2 border-blue-600 px-8 py-4 text-lg font-bold text-blue-600 shadow-sm hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-transform transform hover:scale-105 duration-300 w-full md:w-auto"
                        >
                            Call Belle for a Live Demo
                        </a>
                    </div>
                </div>
            </section>
            
            {/* Stats Section */}
            <section className="bg-gray-100 pt-6 pb-0 overflow-hidden">
                <div className="container mx-auto px-4">
                     <div className="text-center mb-12">
                        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 underline underline-offset-8 decoration-blue-600 bg-transparent">
                            The Hard Truth About Missed Customers
                        </h2>
                        <p className="text-2xl md:text-3xl font-extrabold text-red-600 mt-20 max-w-4xl mx-auto leading-tight tracking-tight drop-shadow-sm">
                            When customers visit your website or call your business and don’t get a fast response, they don’t wait — they move on to a competitor. Every missed interaction means lost revenue and lost trust.
                        </p>
                        
                        {/* Calculate Lost Revenue Button (Centered) */}
                        <div className="mt-14 mb-12 flex justify-center perspective-1000">
                            <Link
                                to="/roi-calculator"
                                data-cta="hero-calculate-roi"
                                className="
                                    relative group
                                    inline-flex items-center justify-center
                                    px-10 py-5 md:px-12 md:py-6
                                    text-2xl md:text-3xl font-extrabold text-white tracking-wide uppercase
                                    bg-gradient-to-br from-orange-400 via-orange-500 to-red-600
                                    rounded-2xl
                                    border border-orange-300/30
                                    shadow-[0_8px_0_rgb(154,52,18),0_20px_30px_-5px_rgba(249,115,22,0.4)]
                                    hover:shadow-[0_4px_0_rgb(154,52,18),0_10px_15px_-3px_rgba(249,115,22,0.4)]
                                    active:shadow-[0_0_0_rgb(154,52,18)]
                                    transform hover:translate-y-1 active:translate-y-2
                                    transition-all duration-150 ease-out
                                    overflow-hidden
                                    w-full sm:w-auto
                                "
                            >
                                {/* Holographic/Shiny Overlay Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-2xl"></div>
                                
                                <span className="relative z-10 drop-shadow-lg">Calculate Lost Revenue</span>
                            </Link>
                        </div>
                    </div>
                    
                    {/* Balanced 3-Column Grid for perfect alignment under button */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-x-8 items-end mt-16 mb-0">
                        {/* Column 1: Representative Image */}
                        <div className="flex justify-center lg:justify-end">
                            {/* Desktop / Tablet image: pointing at cards */}
                            <img
                                src="https://imagedelivery.net/3ycrRDYByciJhEX28VeAng/a6ecd065-13f3-47e0-6b65-f9ffa3489700/public"
                                alt="Professional man pointing at stats"
                                className="hidden sm:block w-72 md:w-96 lg:w-full max-w-[420px] object-contain mx-auto lg:mx-0"
                            />
                            {/* Mobile image: hands crossed */}
                            <img
                                src="https://imagedelivery.net/3ycrRDYByciJhEX28VeAng/6ebcb227-b189-4442-91fd-9e24cb47cb00/public"
                                alt="Professional representative"
                                className="block sm:hidden max-w-[220px] mx-auto object-contain"
                            />
                        </div>

                        {/* Column 2: Stats Block centered exactly in the middle of the page */}
                        <div className="flex flex-col items-center justify-center lg:pb-6 mt-8 lg:mt-0 w-full">
                            <div className="max-w-[560px] w-full mx-auto">
                                <div className="flex flex-wrap justify-center">
                                    {stats.map(stat => (
                                        <div key={stat.label} className="
                                            group
                                            bg-white
                                            border border-gray-200
                                            rounded-xl
                                            p-6
                                            transition-all duration-300
                                            hover:scale-110
                                            cursor-pointer
                                            mx-3 my-3
                                            w-40 md:w-52
                                            relative
                                            shadow-[0_0_20px_rgba(34,211,238,0.3)]
                                            hover:shadow-[0_0_50px_rgba(34,211,238,0.7)]
                                            hover:border-cyan-400
                                        ">
                                            <p className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-2 transition-transform duration-300 group-hover:scale-110 text-center">
                                              {stat.value}
                                            </p>
                                            <p className="text-base text-gray-700 font-medium leading-snug text-center">
                                              {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col items-center mt-8">
                                    <Link
                                        to="/hard-facts"
                                        className="text-blue-700 font-extrabold text-2xl md:text-3xl hover:text-blue-900 hover:underline transition-all duration-300 text-center"
                                    >
                                        See full statistics →
                                    </Link>
                                    <p className="mt-6 text-xl md:text-2xl font-semibold text-gray-700 text-center max-w-2xl">
                                        Protect every customer before your competitor answers them.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Column 3: Spacer to maintain center balance on desktop */}
                        <div className="hidden lg:block w-full"></div>
                    </div>
                </div>
            </section>

            {/* Answered Customers Section - Dedicated layout with tight spacing */}
            <section className="bg-slate-50 py-20 border-y border-gray-200/50">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center bg-white p-8 md:p-12 rounded-3xl border border-gray-200 shadow-sm animate-fadeIn">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                            Elite Agent Hub Makes Sure Every Customer Gets Answered
                        </h3>
                        <p className="text-lg text-gray-600 mb-6 font-medium max-w-2xl mx-auto leading-relaxed">
                            Elite Agent Hub is a simple system that answers customers for your business — on your website and on the phone.
                        </p>
                        <p className="text-lg text-gray-600 mb-6 font-medium max-w-2xl mx-auto leading-relaxed">
                            When someone visits your site or calls your business, they’re responded to immediately, guided to the right next step, and captured as a real lead.
                        </p>
                        <p className="text-lg text-gray-900 mb-10 font-bold max-w-2xl mx-auto">
                            No missed messages. No missed calls. No missed opportunities.
                        </p>
                        <div className="perspective-1000">
                            <Link
                                to="/website-scan"
                                data-cta="home-see-plans"
                                className="
                                    relative group
                                    inline-flex items-center justify-center
                                    px-10 py-5 md:px-12 md:py-6
                                    text-2xl md:text-3xl font-extrabold text-white tracking-wide uppercase
                                    bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600
                                    rounded-2xl
                                    border border-emerald-300/30
                                    shadow-[0_8px_0_rgb(6,95,70),0_20px_30px_-5px_rgba(16,185,129,0.4)]
                                    hover:shadow-[0_4px_0_rgb(6,95,70),0_10px_15px_-3px_rgba(16,185,129,0.4)]
                                    active:shadow-[0_0_0_rgb(6,95,70)]
                                    transform hover:translate-y-1 active:translate-y-2
                                    transition-all duration-150 ease-out
                                    overflow-hidden
                                    w-full sm:w-auto
                                "
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-2xl"></div>
                                
                                <span className="relative z-10 drop-shadow-lg text-center">See Plans</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Two Ways Customers Reach Your Business Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Two Ways Customers Reach Your Business — We Handle Both</h2>
                        <p className="mt-6 text-xl text-gray-600 font-medium max-w-3xl mx-auto">
                            Some customers message your website. Others call your business. Elite Agent Hub covers both.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Card 1: Website + Chat */}
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                             <div className="mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Website + Chat Assistant</h3>
                                <p className="text-gray-700 font-medium leading-relaxed">
                                    Answers website visitors instantly, handles common questions, captures contact details, and helps book calls or demos.
                                </p>
                            </div>
                            <div className="mt-auto space-y-4">
                                <div>
                                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Best for:</span>
                                    <p className="text-gray-900 font-medium">Businesses that want their website to respond and capture leads automatically.</p>
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Starting at:</span>
                                    <p className="text-gray-900 font-medium">$199/month (Optional SMS available)</p>
                                </div>
                                <div className="pt-4">
                                    <Link 
                                        to="/pricing"
                                        className="inline-flex justify-center items-center w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all"
                                    >
                                        See Plans
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Voice Agent */}
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                             <div className="mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Voice Agent (Phone Calls)</h3>
                                <p className="text-gray-700 font-medium leading-relaxed">
                                    Answers inbound calls, handles missed calls, books appointments, and escalates when needed.
                                </p>
                            </div>
                            <div className="mt-auto space-y-4">
                                <div>
                                    <span className="text-sm font-bold text-gray-500 uppercase tracking-wide">Best for:</span>
                                    <p className="text-gray-900 font-medium">Businesses that rely heavily on phone calls and want every call answered.</p>
                                </div>
                                <div className="pt-8 flex flex-col gap-3">
                                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center text-center font-bold text-primary">
                                        <Link to="/book-demo" className="hover:underline">Book a Demo</Link>
                                        <span className="hidden sm:inline text-gray-300">•</span>
                                        <a href="tel:+18042233141" className="hover:underline">Call Belle for a Live Demo</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* AI vs Human Comparison */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">AI vs. Human Receptionist</h2>
                        <p className="mt-4 text-lg text-gray-700 font-medium">See how an AI agent stacks up on cost, reliability, and performance.</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-base text-gray-700 border-b border-gray-300">Feature</th>
                                    <th className="py-4 px-6 bg-gray-200 font-bold uppercase text-base text-gray-700 border-b border-gray-300 text-center">Human Receptionist</th>
                                    <th className="py-4 px-6 bg-primary-light/20 font-bold uppercase text-base text-primary-dark border-b border-gray-300 text-center">AI Receptionist</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map(item => (
                                    <tr key={item.feature} className="hover:bg-gray-100">
                                        <td className="py-4 px-6 border-b border-gray-200 font-semibold text-base text-gray-700">{item.feature}</td>
                                        <td className="py-4 px-6 border-b border-gray-200 text-center">
                                            {typeof item.human === 'boolean' ? (
                                                item.human ? <CheckIcon className="h-6 w-6 text-green-500 mx-auto" /> : <XIcon className="h-6 w-6 text-red-500 mx-auto" />
                                            ) : <span className="text-base text-gray-700 font-medium">{item.human}</span>}
                                        </td>
                                        <td className="py-4 px-6 border-b border-gray-200 text-center bg-green-50">
                                            {typeof item.ai === 'boolean' ? (
                                                item.ai ? <CheckIcon className="h-6 w-6 text-green-500 mx-auto" /> : <XIcon className="h-6 w-6 text-red-500 mx-auto" />
                                            ) : <span className="font-bold text-primary text-base">{item.ai}</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            
            {/* Trust Section */}
             <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="pr-8">
                             <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Every Customer Interaction, Clearly Logged</h2>
                             <p className="mt-4 text-lg text-gray-700 font-medium">Get full visibility into how customers interact with your business. Calls and conversations are logged so you can review outcomes, improve responses, and make sure nothing slips through the cracks.</p>
                             <ul className="mt-6 space-y-4">
                                <li className="flex items-start">
                                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary flex items-center justify-center mr-3 mt-1">
                                         <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <p className="text-base text-gray-700 font-medium"><strong className="font-semibold">Quality & Accountability:</strong> Review logs at any time to ensure every customer receives a professional, helpful response.</p>
                                </li>
                                <li className="flex items-start">
                                     <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary flex items-center justify-center mr-3 mt-1">
                                         <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <p className="text-base text-gray-700 font-medium"><strong className="font-semibold">Automatic Compliance:</strong> We handle standard recording notifications automatically, keeping your business safe while you capture every detail.</p>
                                </li>
                             </ul>
                        </div>
                        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg font-mono text-sm">
                             <p className="text-gray-400 mb-4">// Call Transcript: 2024-07-21_14:32.txt</p>
                            <div className="space-y-2">
                                <p><span className="font-bold text-accent">AI Agent:</span> "Thank you for calling... All calls are recorded. How can I help?"</p>
                                <p><span className="font-bold text-gray-300">Caller:</span> "Hi, my AC unit is making a strange noise."</p>
                                <p><span className="font-bold text-accent">AI Agent:</span> "I can help. To book a technician, I'll need your name and address..."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Final CTA Section: Visually separated from footer with bg-gray-50 */}
            <section className="bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        Stop Losing Customers to Your Competitors
                    </h2>
                    <div className="mt-4 text-base md:text-lg text-gray-600 font-medium max-w-2xl mx-auto">
                        Protect every customer interaction, capture every lead, and watch your revenue grow — before someone else does.
                    </div>
                    <div className="mt-8">
                        <Link
                            to="/book-demo"
                            data-cta="cta-band-book-demo"
                            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-lg shadow-lg text-lg transition-transform transform hover:scale-105 duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
                        >
                            Book a Demo
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;