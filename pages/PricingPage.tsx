import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PricingCard from '../components/PricingCard';
import FaqAccordion from '../components/FaqAccordion';
import { PRICING_PLANS, FAQ_DATA } from '../constants';

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

const comparisonData = [
    { feature: 'Works 24/7', human: false, ai: true },
    { feature: 'Handles unlimited calls', human: false, ai: true },
    { feature: 'No sick days or breaks', human: false, ai: true },
    { feature: '100% accurate every time', human: false, ai: true },
    { feature: 'Monthly Cost', human: '$2,800 - $4,000', ai: '$120 - $549' },
];

const MONTHLY_URLS: Record<string, string> = {
  "Starter Lite": "https://buy.stripe.com/bJe4gA4TScnjcrrbs20Ba01",
  "Essentials": "https://buy.stripe.com/fZu4gA72072Zezz1Rs0Ba05",
  "Growth Unlimited": "https://buy.stripe.com/4gM5kEdqo0EB8bb0No0Ba0b",
  "Elite Unlimited": "https://buy.stripe.com/cNifZifywgDz6339jU0Ba0f"
};

const YEARLY_URLS: Record<string, string> = {
  "Starter Lite": "https://buy.stripe.com/cNi14oeus0EB1MNeEe0Ba02",
  "Essentials": "https://buy.stripe.com/aFa28s9a84URbnnfIi0Ba0a",
  "Growth Unlimited": "https://buy.stripe.com/5kQ00k5XWcnjcrr7bM0Ba0e",
  "Elite Unlimited": "https://buy.stripe.com/eVqaEYaecgDzfDDfIi0Ba0g"
};

// FIX: Added 'cta' property to avoid 'Property cta does not exist' error
const WEBSITE_BUILDS = [
    {
        name: "Starter Website",
        price: "$2,500",
        bestFor: "Best for businesses that need to get online properly and fast.",
        features: [
            "Up to 5 pages (Home, About, Services, Contact + 1 extra page)",
            "Mobile-friendly, fast-loading website",
            "Contact form + click-to-call setup",
            "Foundational SEO (titles, meta descriptions, headings)",
            "Clear calls-to-action and trust sections",
            "1 revision round",
            "30-day post-launch bug warranty"
        ],
        delivery: "Typical delivery: 2–3 weeks after intake",
        cta: "Get Started"
    },
    {
        name: "Growth Website",
        price: "$4,500",
        isPopular: true,
        bestFor: "Best for businesses that want their website to actively generate leads.",
        features: [
            "Everything in Starter",
            "Up to 10 pages",
            "Conversion-focused layout and messaging",
            "Trust sections + social proof integration",
            "Enhanced SEO across all pages",
            "Built for local visibility and AI/answer-engine readiness",
            "2 revision rounds"
        ],
        delivery: "Typical delivery: 3–4 weeks after intake",
        cta: "Get Started"
    },
    {
        name: "Authority Website",
        price: "$7,500",
        bestFor: "Best for competitive markets where trust and visibility matter most.",
        features: [
            "Everything in Growth",
            "Up to 15 pages",
            "Blog or content section setup",
            "Advanced SEO foundation + internal linking",
            "Booking or intake integrations (where applicable)",
            "Built to scale with content and automation",
            "3 revision rounds"
        ],
        delivery: "Typical delivery: 4–6 weeks after intake",
        cta: "Get Started"
    }
];

const CARE_PLANS = [
    {
        name: "Essential Care",
        price: "$99 / month",
        features: [
            "Hosting + SSL",
            "Uptime monitoring",
            "Security + backups",
            "Up to 30 minutes of content updates per month",
            "Monthly site health check"
        ],
        rule: "Unused time does not roll over. No redesigns."
    },
    {
        name: "Growth Care",
        price: "$249 / month",
        features: [
            "Everything in Essential",
            "Up to 2 hours of updates per month",
            "Priority support",
            "Performance checks",
            "SEO health monitoring",
            "Quarterly strategy review"
        ],
        rule: "Unused time does not roll over. No redesigns."
    }
];

const PricingPage: React.FC = () => {
    useEffect(() => {
        document.title = "Pricing | Elite Agent Hub";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', "Transparent pricing for AI voice and chat agents plus professional website builds designed for service businesses.");
        }
    }, []);

    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <div className="bg-white">
            {/* AI VOICE & CHAT SECTION */}
            <div className="py-20 text-center bg-gray-50">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">AI Voice & Chat Agents</h1>
                    <p className="mt-4 text-base text-gray-700 font-medium leading-snug max-w-2xl mx-auto">Choose the plan that fits your business. Even 1-2 saved calls per month pays for your entire plan.</p>
                    
                    {/* Billing Toggle */}
                    <div className="mt-10 flex items-center justify-center space-x-4">
                        <span className={`text-base font-semibold ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-700'}`}>Monthly</span>
                        <button 
                            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                            className="relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-gray-200 hover:bg-gray-300"
                            role="switch"
                            aria-checked={billingCycle === 'yearly'}
                        >
                             <span
                                aria-hidden="true"
                                className={`${
                                  billingCycle === 'yearly' ? 'translate-x-6 bg-primary' : 'translate-x-0 bg-white'
                                } pointer-events-none inline-block h-7 w-7 transform rounded-full shadow ring-0 transition duration-200 ease-in-out`}
                              />
                        </button>
                        <span className={`text-base font-semibold ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-700'}`}>
                            Yearly <span className="text-accent">(Save 15%)</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* AI Pricing Cards Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <p className="
                      mt-10 
                      mb-6 
                      text-2xl 
                      md:text-3xl 
                      font-extrabold 
                      text-yellow-500 
                      drop-shadow-md 
                      text-center
                    ">
                      ✨ Limited-Time Bonus: <span className="text-yellow-400">$300</span> Setup Fee Waived ✨
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start relative">
                        {PRICING_PLANS.map((plan) => {
                            const checkoutUrl = billingCycle === 'yearly' 
                                ? YEARLY_URLS[plan.name] 
                                : MONTHLY_URLS[plan.name];

                            return (
                                <PricingCard 
                                    key={plan.name} 
                                    plan={plan} 
                                    billingCycle={billingCycle} 
                                    ctaUrl={checkoutUrl}
                                />
                            );
                        })}
                    </div>
                </div>
            </section>

             {/* AI Billing Notes Section */}
            <section className="pb-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-gray-100 p-8 rounded-lg border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Important Billing Notes</h3>
                        <ul className="space-y-4 text-base text-gray-700 font-medium leading-snug">
                            <li className="flex items-start">
                                <CheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mr-3 mt-1" />
                                <span><strong>Starter Lite</strong> includes no minutes. Usage billed at $0.13/min.</span>
                            </li>
                             <li className="flex items-start">
                                <CheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mr-3 mt-1" />
                                <span><strong>Essentials</strong> includes 500 minutes. Additional minutes at $0.13/min.</span>
                            </li>
                             <li className="flex items-start">
                                <CheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mr-3 mt-1" />
                                <span><strong>Growth Unlimited and Elite Unlimited</strong> include unlimited AI minutes.</span>
                            </li>
                             <li className="flex items-start">
                                <CheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mr-3 mt-1" />
                                <span>All plans have no long-term contract — <strong>cancel anytime</strong>.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* AI vs Human Comparison */}
            <section className="py-20 bg-gray-50 border-y border-gray-100">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">AI vs. Human Receptionist</h2>
                        <p className="mt-4 text-base text-gray-700 font-medium leading-snug">See how an AI agent stacks up on cost, reliability, and performance.</p>
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

            {/* WEBSITE BUILD SECTION */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Website Build Pricing</h2>
                        <p className="mt-4 text-lg md:text-xl text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed">
                            One-time website builds for service businesses that need a clean, professional site built to generate calls, bookings, and trust.
                        </p>
                        <p className="mt-4 text-xs text-gray-500 uppercase tracking-widest font-bold">
                            Domains and business email are owned by the client. Hosting is included only with an active Website Care Plan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto items-start">
                        {WEBSITE_BUILDS.map((item, index) => (
                            <div key={index} className={`relative flex flex-col h-full bg-white border rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${item.isPopular ? 'border-primary ring-1 ring-primary/20 scale-105 z-10' : 'border-gray-200'}`}>
                                {item.isPopular && (
                                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                        <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900">{item.name}</h3>
                                    <p className="text-sm font-medium text-gray-500 mt-1">{item.bestFor}</p>
                                </div>
                                <div className="mb-8">
                                    <p className="text-4xl font-black text-gray-900">{item.price}</p>
                                    <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">One-time payment</p>
                                </div>
                                <ul className="space-y-4 flex-grow mb-10">
                                    {item.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start text-sm font-medium text-gray-700">
                                            <CheckIcon className="h-5 w-5 text-primary flex-shrink-0 mr-3" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-auto space-y-4">
                                    <p className="text-xs font-bold text-gray-500 italic text-center">{item.delivery}</p>
                                    <Link 
                                        to="/build-my-website" 
                                        className={`block w-full text-center py-4 px-6 rounded-xl font-bold text-base transition-all active:scale-[0.98] ${item.isPopular ? 'bg-primary text-white hover:bg-primary-dark shadow-md' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                                    >
                                        {item.cta}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Founding Client Offer Block */}
                    <div className="mt-24 max-w-5xl mx-auto bg-blue-50/50 border border-blue-100 rounded-3xl p-8 md:p-12 shadow-sm">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                            <div className="flex-shrink-0 bg-primary text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                                </svg>
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Founding Client Offer (Limited)</h3>
                                <p className="text-lg text-gray-700 font-medium mb-8">
                                    We’re offering reduced pricing for a limited number of early clients while we build our initial website portfolio.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                                    <div className="bg-white p-4 rounded-xl border border-blue-100">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Starter Website</p>
                                        <p className="text-xl font-bold text-gray-900">$1,750 <span className="text-xs text-green-600 font-bold ml-1">(-30%)</span></p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-blue-100">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Growth Website</p>
                                        <p className="text-xl font-bold text-gray-900">$3,150 <span className="text-xs text-green-600 font-bold ml-1">(-30%)</span></p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-blue-100">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Authority Website</p>
                                        <p className="text-xl font-bold text-gray-900">$5,250 <span className="text-xs text-green-600 font-bold ml-1">(-30%)</span></p>
                                    </div>
                                </div>
                                <div className="space-y-3 mb-10">
                                    <p className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-2">Conditions:</p>
                                    <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                        <CheckIcon className="h-5 w-5 text-primary" />
                                        <span>Permission to showcase your website in our portfolio</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                        <CheckIcon className="h-5 w-5 text-primary" />
                                        <span>A testimonial if you’re happy with the result</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                        <CheckIcon className="h-5 w-5 text-primary" />
                                        <span>Limited to the first 5 Founding Clients total</span>
                                    </div>
                                </div>
                                <Link 
                                    to="/contact" 
                                    className="inline-block bg-gray-900 hover:bg-black text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-transform active:scale-95"
                                >
                                    Check Founding Client Availability
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WEBSITE CARE PLANS SECTION */}
            <section className="py-24 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Website Care Plans (Optional)</h2>
                        <p className="mt-4 text-lg text-gray-700 font-medium max-w-2xl mx-auto">
                            Care plans include hosting, monitoring, and ongoing updates. Hosting is included only with an active care plan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {CARE_PLANS.map((plan, index) => (
                            <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md flex flex-col h-full hover:shadow-lg transition-shadow">
                                <div className="mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                                    <p className="text-4xl font-black text-primary mt-2">{plan.price}</p>
                                </div>
                                <ul className="space-y-4 flex-grow mb-10">
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start text-sm font-medium text-gray-700 leading-snug">
                                            <CheckIcon className="h-5 w-5 text-secondary flex-shrink-0 mr-3" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-auto space-y-4">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center leading-tight">
                                        {plan.rule}
                                    </p>
                                    <Link 
                                        to="/contact" 
                                        className="block w-full text-center py-4 rounded-xl font-bold bg-gray-900 text-white hover:bg-black transition-colors"
                                    >
                                        Inquire About Care Plan
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 text-center max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Not sure which option fits?</h3>
                        <p className="text-gray-600 font-medium mb-8">
                            Send us your business details and we’ll recommend the best website package for your goals.
                        </p>
                        <Link 
                            to="/build-my-website" 
                            className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-4 px-12 rounded-xl shadow-lg transition-transform hover:scale-105"
                        >
                            Build My Website
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
                    </div>
                    <FaqAccordion items={FAQ_DATA} />
                </div>
            </section>
        </div>
    );
};

export default PricingPage;