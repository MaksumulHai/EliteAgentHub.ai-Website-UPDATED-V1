import React, { useEffect } from 'react';
import FaqAccordion from '../components/FaqAccordion';

const aiFaqs = [
    {
        question: "How long does setup take?",
        answer: "Most AI Voice and Chat Agent setups are completed within 3–5 business days, depending on your calendar, call flows, and business details."
    },
    {
        question: "What calendars and CRMs do you integrate with?",
        answer: "We support integrations with common tools such as Google Calendar, Outlook, Calendly, and CRM platforms like GoHighLevel. Additional integrations may be available depending on your setup."
    },
    {
        question: "Is call recording legal, and how do I get consent?",
        answer: "Call recording laws vary by location. When required, we can include a consent message at the beginning of calls. We support both one-party and two-party consent workflows depending on your jurisdiction."
    },
    {
        question: "How do I access call transcripts?",
        answer: "Call transcripts and summaries are available in your dashboard shortly after calls end (when enabled). These help you review conversations and leads without listening to full recordings."
    },
    {
        question: "What happens if the AI can’t answer a question?",
        answer: "If a question falls outside the approved knowledge base, the AI will collect the caller’s details and either notify your team or route the call to a human, depending on your configuration."
    },
    {
        question: "How does human handoff work?",
        answer: "If a caller requests a human, sounds frustrated, or the issue is complex, the AI can transfer the call to your team or take a detailed message and trigger a follow-up notification."
    },
    {
        question: "How does the AI handle emergency calls?",
        answer: "Elite Agent Hub is not an emergency service. If an emergency is detected, the AI directs callers to contact local emergency services immediately."
    },
    {
        question: "How do you handle data security?",
        answer: "We follow industry best practices to protect customer and lead data. Access is restricted to what’s necessary to operate the service, and sensitive systems are configured carefully."
    }
];

const billingFaqs = [
    {
        question: "What is your cancellation policy?",
        answer: "You may cancel your subscription at any time. All plans are billed on a monthly or yearly recurring basis unless canceled. After cancellation, your service remains active until the end of your current billing period."
    },
    {
        question: "Do you offer refunds?",
        answer: "Yes — we offer a limited one-time refund window for first-time purchases only.\n\nHow refunds work:\n• A 14-day refund window applies from the date of your initial purchase, for both monthly and yearly plans.\n• The refund applies only to the first billing cycle.\n• After 14 days, all payments are non-refundable.\n\nImportant notes:\n• You may cancel at any time to avoid future charges.\n• No prorated refunds for unused time.\n• Refunds do not apply to renewals, upgrades, add-ons, or usage-based fees.\n• Website builds follow separate, milestone-based terms.\n\nFor full details, please review our Refund & Cancellation Policy in the Legal section."
    }
];

const websiteFaqs = [
    {
        question: "Do you build websites for businesses without a website?",
        answer: "Yes. We build clean, professional websites for service businesses that either don’t have a website yet or need a fresh start."
    },
    {
        question: "What’s included in the Starter Website?",
        answer: "The Starter Website includes:\n• Up to 5 pages (Home, About, Services, Contact + one additional page)\n• Mobile-friendly design\n• Contact form and click-to-call setup\n• Foundational SEO (titles, meta descriptions, headings)\n• Clear calls-to-action\n• 1 revision round\n• 30-day post-launch bug warranty"
    },
    {
        question: "How long does a website build take?",
        answer: "Typical timelines after intake and approvals:\n• Starter Website: 2–3 weeks\n• Growth Website: 3–4 weeks\n• Authority Website: 4–6 weeks\n\nDelays in content or feedback may extend timelines."
    },
    {
        question: "What do you need from me to start building?",
        answer: "We typically need:\n• Business name and service area\n• List of services\n• Contact details\n• Logo or images (if available)\n• Examples of websites you like (optional)\n\nIf you don’t have assets, we can still move forward with clean placeholder content."
    },
    {
        question: "How many revisions do I get?",
        answer: "Starter: 1 revision round. Growth: 2 revision rounds. Authority: 3 revision rounds. Revisions are for refining content and layout, not full redesigns."
    },
    {
        question: "Do you include hosting and domain?",
        answer: "Domains and business email are owned and paid for by the client (we assist setup). Hosting is included only with an active Website Care Plan."
    },
    {
        question: "Can I use my own hosting?",
        answer: "Yes. If you prefer to self-host, we can deploy the site to your account. Hosting is not included without a care plan."
    }
];

const careFaqs = [
    {
        question: "What’s included in the Essential Care Plan?",
        answer: "Essential Care ($99/month) includes hosting and SSL, uptime monitoring, security and backups, and up to 30 minutes of content updates per month. Unused time does not roll over. No redesigns."
    },
    {
        question: "What’s included in the Growth Care Plan?",
        answer: "Growth Care ($249/month) includes everything in Essential Care, up to 2 hours of updates per month, priority support, performance checks, and SEO health monitoring. Unused time does not roll over. No redesigns."
    }
];

const foundingFaqs = [
    {
        question: "What is the Founding Client offer?",
        answer: "We offer reduced pricing for a limited number of early website clients while building our initial portfolio."
    },
    {
        question: "What are the requirements to qualify for Founding Client pricing?",
        answer: "To qualify, you agree to allow us to showcase your website in our portfolio and provide a testimonial if you’re happy with the result. Founding Client pricing is limited to the first 5 qualifying clients."
    }
];

const generalFaqs = [
    {
        question: "Do you guarantee results?",
        answer: "No. We do not guarantee rankings, revenue, or business outcomes. We build strong foundations and systems designed to support growth, but results depend on many external factors."
    }
];

const FaqPage: React.FC = () => {
    useEffect(() => {
        document.title = "FAQ | Elite Agent Hub";
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', "Answers to common questions about AI voice agents, missed-call recovery, website builds, care plans, and support.");
        }
    }, []);

    return (
        <div className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Frequently Asked Questions</h1>
                    <p className="mt-4 text-lg text-gray-700 font-medium max-w-2xl mx-auto">
                        Everything you need to know about our AI Agents, Website Builds, and more.
                    </p>
                </div>

                <div className="space-y-16">
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-6 uppercase tracking-wider border-b-2 border-primary/10 pb-2">AI Voice & Chat Agents</h2>
                        <FaqAccordion items={aiFaqs} />
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-6 uppercase tracking-wider border-b-2 border-primary/10 pb-2">Pricing, Billing & Refunds</h2>
                        <FaqAccordion items={billingFaqs} />
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-6 uppercase tracking-wider border-b-2 border-primary/10 pb-2">Website Builds</h2>
                        <FaqAccordion items={websiteFaqs} />
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-6 uppercase tracking-wider border-b-2 border-primary/10 pb-2">Website Care Plans</h2>
                        <FaqAccordion items={careFaqs} />
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-6 uppercase tracking-wider border-b-2 border-primary/10 pb-2">Founding Client Offer</h2>
                        <FaqAccordion items={foundingFaqs} />
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-6 uppercase tracking-wider border-b-2 border-primary/10 pb-2">General</h2>
                        <FaqAccordion items={generalFaqs} />
                    </section>
                </div>

                <div className="mt-20 p-8 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
                    <p className="text-gray-600 font-medium mb-6">We're here to help. Reach out to our support team for any additional info.</p>
                    <a href="#/contact" className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all">
                        Contact Us
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FaqPage;