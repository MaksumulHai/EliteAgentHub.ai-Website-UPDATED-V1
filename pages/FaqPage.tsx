import React, { useEffect } from 'react';
import FaqAccordion from '../components/FaqAccordion';

const serviceFaqs = [
    {
        question: "How long does setup take?",
        answer: "Standard setup takes 3–5 business days. We handle the configuration for your phone answering and website assistant, ensuring everything connects correctly to your calendar and business rules before going live."
    },
    {
        question: "How does the Website + Chat subscription work?",
        answer: "This is a fully managed service. We provide a professional, conversion-focused website equipped with an automated chat assistant to answer visitors and capture leads. The website, hosting, and assistant remain active and supported as long as your subscription is current."
    },
    {
        question: "What calendars and systems do you integrate with?",
        answer: "We integrate with major platforms including Google Calendar, Outlook, Calendly, and GoHighLevel. This allows appointments to flow directly into your existing schedule without manual entry."
    },
    {
        question: "Is call recording legal?",
        answer: "Yes, when handled correctly. We can configure the system to play a standard consent notification at the start of every call to ensure compliance with recording laws in your jurisdiction."
    },
    {
        question: "How do I review customer conversations?",
        answer: "You have access to a dashboard where you can read transcripts and summaries of every call and chat. This lets you quickly verify lead details and interaction quality without listening to every recording."
    },
    {
        question: "What happens if a customer asks a question the system doesn’t know?",
        answer: "If the system encounters a question outside its knowledge base, it is designed to capture the customer’s contact details and project requirements, then notify you immediately so you can follow up."
    },
    {
        question: "Can calls be transferred to my team?",
        answer: "Yes. We can set up call routing to transfer calls to you or your staff if a caller specifically asks for a person or meets certain criteria you define."
    },
    {
        question: "How are emergency calls handled?",
        answer: "This service is not for emergencies. We configure the system to instruct callers with emergencies to hang up and dial 911 or contact local emergency services."
    },
    {
        question: "Is customer data secure?",
        answer: "Yes. We adhere to strict industry standards for data protection. Customer and lead data is encrypted, and access is restricted to essential service operations."
    }
];

const billingFaqs = [
    {
        question: "What is your cancellation policy?",
        answer: "You may cancel your subscription at any time. All plans are billed on a monthly or yearly recurring basis unless canceled. After cancellation, your service remains active until the end of your current billing period."
    },
    {
        question: "Do you offer refunds?",
        answer: "Yes — we offer a limited one-time refund window for first-time purchases only.\n\nHow refunds work:\n• A 14-day refund window applies from the date of your initial purchase, for both monthly and yearly plans.\n• The refund applies only to the first billing cycle.\n• After 14 days, all payments are non-refundable.\n\nImportant notes:\n• You may cancel at any time to avoid future charges.\n• No prorated refunds for unused time.\n• Refunds do not apply to renewals, upgrades, add-ons, or usage-based fees.\n\nFor full details, please review our Refund & Cancellation Policy in the Legal section."
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
            metaDesc.setAttribute('content', "Answers to common questions about Elite Agent Hub services, billing, and support.");
        }
    }, []);

    return (
        <div className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Frequently Asked Questions</h1>
                    <p className="mt-4 text-lg text-gray-700 font-medium max-w-2xl mx-auto">
                        Everything you need to know about our services, billing, and how we help your business grow.
                    </p>
                </div>

                <div className="space-y-16">
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-6 uppercase tracking-wider border-b-2 border-primary/10 pb-2">Voice & Website Services</h2>
                        <FaqAccordion items={serviceFaqs} />
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-6 uppercase tracking-wider border-b-2 border-primary/10 pb-2">Pricing, Billing & Refunds</h2>
                        <FaqAccordion items={billingFaqs} />
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