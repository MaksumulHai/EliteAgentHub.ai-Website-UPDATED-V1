
import React from 'react';

const TermsPage: React.FC = () => {
    return (
        <div className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Terms of Service</h1>
                <p className="text-gray-600 font-medium mb-12">Last Updated: December 2025</p>

                <div className="prose prose-lg max-w-none text-gray-700 font-medium space-y-8">
                    <p>
                        These Terms of Service (“Terms”) govern your access to and use of the products and services offered under the Elite Agent Hub brand, operated by Elite Impact Lab LLC (“Elite Impact Lab,” “Elite Agent Hub,” “we,” “us,” or “our”).
                    </p>
                    <p>
                        Elite Agent Hub is a software and AI services platform providing AI-powered voice, chat, and messaging solutions for businesses.
                    </p>
                    <p>
                        By accessing our website (https://eliteagenthub.ai), creating an account, purchasing a subscription, or using any part of our services, you agree to be bound by these Terms.
                    </p>
                    <p>
                        If you do not agree, you must not use our services.
                    </p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Company Information</h3>
                    <ul className="list-none pl-0 space-y-2">
                        <li><strong>Legal Entity:</strong> Elite Impact Lab LLC</li>
                        <li><strong>Location:</strong> Ruther Glen, Virginia, USA</li>
                        <li><strong>Website:</strong> <a href="https://eliteagenthub.ai" className="text-primary hover:underline">https://eliteagenthub.ai</a></li>
                        <li><strong>Support Email:</strong> <a href="mailto:support@eliteagenthub.ai" className="text-primary hover:underline">support@eliteagenthub.ai</a></li>
                        <li><strong>Business Phone:</strong> (804) 223-3141</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. Description of Services</h3>
                    <p>Elite Agent Hub provides AI-powered tools designed to help businesses:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Answer inbound phone calls and messages</li>
                        <li>Capture leads and caller details</li>
                        <li>Book, reschedule, or cancel appointments</li>
                        <li>Respond to frequently asked questions</li>
                        <li>Recover missed calls and reduce lost opportunities</li>
                    </ul>
                    <p>Our services may integrate with third-party platforms such as:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Telephony and SMS providers</li>
                        <li>Calendars (e.g., Google Calendar)</li>
                        <li>CRMs and marketing platforms</li>
                        <li>Payment processors (e.g., Stripe, PayPal)</li>
                        <li>GoHighLevel (“GHL”) or similar systems</li>
                    </ul>
                    <p>You acknowledge that:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>AI performance depends on the information and configuration you provide</li>
                        <li>Third-party integrations affect service behavior and reliability</li>
                        <li>You are responsible for keeping your information accurate and up to date</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Eligibility & Accounts</h3>
                    <p>You must be at least 18 years old and legally able to enter into binding contracts to use our services.</p>
                    <p>You are responsible for:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Maintaining the confidentiality of your login credentials</li>
                        <li>All activity that occurs under your account</li>
                        <li>Restricting unauthorized access</li>
                    </ul>
                    <p>If you suspect unauthorized access, notify us immediately at <a href="mailto:support@eliteagenthub.ai" className="text-primary hover:underline">support@eliteagenthub.ai</a>.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Subscription Plans & Billing</h3>
                    
                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">4.1 Subscription Plans</h4>
                    <p>Elite Agent Hub offers subscription plans on a:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Monthly recurring basis</li>
                        <li>Yearly recurring basis (with available discounts)</li>
                    </ul>
                    <p>Plan features, pricing, usage limits, and inclusions are displayed on our website or checkout pages and may change over time.</p>
                    <p>Prices do not include applicable taxes, carrier fees, or usage-based charges unless explicitly stated.</p>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">4.2 Recurring Billing Authorization</h4>
                    <p>By subscribing, you authorize Elite Impact Lab LLC and our payment processors to charge your selected payment method automatically:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>At the start of each billing cycle</li>
                        <li>Until you cancel in accordance with these Terms</li>
                    </ul>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">4.3 Payment Processing</h4>
                    <p>Payments are handled by third-party processors (e.g., Stripe, PayPal, GHL Payments).</p>
                    <p>We do not store full payment card details on our servers.</p>
                    <p>You agree to:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Provide accurate and current payment information</li>
                        <li>Maintain sufficient funds or credit</li>
                    </ul>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">4.4 Price Changes</h4>
                    <p>We may modify pricing with reasonable notice (such as email or in-app notification).</p>
                    <p>Continued use after the effective date constitutes acceptance of updated pricing.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Cancellation & Refunds</h3>
                    
                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">5.1 Cancellation</h4>
                    <p>You may cancel your subscription at any time via:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>The customer portal (if available), or</li>
                        <li>Emailing <a href="mailto:support@eliteagenthub.ai" className="text-primary hover:underline">support@eliteagenthub.ai</a></li>
                    </ul>
                    <p>Upon cancellation:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Your subscription remains active until the end of the current paid billing period</li>
                        <li>No future charges will occur unless you resubscribe</li>
                    </ul>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">5.2 Limited 14-Day Initial Refund (First Purchase Only)</h4>
                    <p>We offer a one-time, limited refund window for first-time subscriptions only.</p>
                    <p>Eligibility:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Must be your first purchase of the plan</li>
                        <li>The request must be made within 14 calendar days of the initial charge</li>
                        <li>Applies only to the first billing period</li>
                        <li>Does not apply to renewals, upgrades, or subsequent billing cycles</li>
                    </ul>
                    <p>After the 14-day window:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Monthly and yearly plans are non-refundable</li>
                        <li>You may cancel to prevent future charges</li>
                    </ul>
                    <p>We reserve the right to deny refunds in cases of abuse or excessive usage.</p>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">5.3 Chargebacks</h4>
                    <p>Filing a chargeback without first contacting us may result in:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Immediate suspension or termination of your account</li>
                        <li>Loss of access to services</li>
                    </ul>
                    <p>We may submit usage records, logs, and agreement acceptance to dispute invalid chargebacks.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. AI Use & Critical Limitations</h3>
                    
                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">6.1 No Professional or Emergency Advice</h4>
                    <p>Elite Agent Hub does not provide:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Medical</li>
                        <li>Legal</li>
                        <li>Financial</li>
                        <li>Immigration</li>
                        <li>Emergency services</li>
                    </ul>
                    <p>AI agents must not be relied upon in emergencies.</p>
                    <p>You are responsible for configuring your agent to direct emergencies to 911 or local emergency services.</p>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">6.2 AI Accuracy & Responsibility</h4>
                    <p>You acknowledge that:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>AI systems may misunderstand inputs or generate inaccurate outputs</li>
                        <li>You are responsible for reviewing and supervising all configurations, scripts, prompts, and workflows</li>
                    </ul>
                    <p>Elite Impact Lab LLC is not responsible for decisions made based on AI outputs.</p>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">6.3 Compliance & Sensitive Data</h4>
                    <p>You agree not to use the services to collect or process:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Social Security numbers</li>
                        <li>Full payment card details by voice or chat</li>
                        <li>Protected health information (PHI) unless explicitly agreed in writing</li>
                    </ul>
                    <p>If you operate in a regulated industry, you are solely responsible for legal compliance, including consent and disclosure requirements.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">7. Acceptable Use</h3>
                    <p>You may not use the services to:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Engage in illegal, fraudulent, or deceptive activities</li>
                        <li>Send spam or unsolicited communications</li>
                        <li>Violate privacy or intellectual property rights</li>
                        <li>Impersonate individuals or entities</li>
                        <li>Reverse engineer or interfere with platform operations</li>
                    </ul>
                    <p>We reserve the right to suspend or terminate accounts that violate these rules.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">8. SMS & Messaging Responsibility</h3>
                    <p>If you use SMS or voice messaging features:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>You are responsible for obtaining proper recipient consent</li>
                        <li>You must comply with TCPA, carrier rules, and applicable laws</li>
                        <li>Elite Agent Hub acts only as a technology provider</li>
                    </ul>
                    <p>Opt-in, opt-out, and message frequency requirements are governed by our Privacy Policy.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">9. Intellectual Property</h3>
                    
                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">9.1 Our Intellectual Property</h4>
                    <p>All software, AI agents, workflows, prompts, designs, and documentation are owned by Elite Impact Lab LLC.</p>
                    <p>You are granted a limited, non-exclusive, non-transferable license to use the services for internal business purposes only.</p>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">9.2 Your Content</h4>
                    <p>You retain ownership of your business data and content.</p>
                    <p>You grant us a limited license to use it solely to provide and support the services.</p>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">9.3 No Resale</h4>
                    <p>Unless explicitly agreed in writing, you may not resell, sublicense, or white-label the services as your own software product.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">10. Service Availability & Changes</h3>
                    <p>We do not guarantee uninterrupted service or 100% uptime.</p>
                    <p>We may modify, update, or discontinue features at any time.</p>
                    <p>If material changes occur, we will make reasonable efforts to notify you.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">11. Disclaimer of Warranties</h3>
                    <p>The services are provided “AS IS” and “AS AVAILABLE”, without warranties of any kind.</p>
                    <p>We disclaim all implied warranties, including:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Merchantability</li>
                        <li>Fitness for a particular purpose</li>
                        <li>Accuracy or reliability of AI outputs</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">12. Limitation of Liability</h3>
                    <p>To the fullest extent permitted by law:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>We are not liable for indirect, incidental, or consequential damages</li>
                        <li>Our total liability shall not exceed the amount you paid to us in the 30 days preceding the event giving rise to the claim</li>
                    </ul>
                    <p>Some jurisdictions may limit this restriction.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">13. Indemnification</h3>
                    <p>You agree to indemnify and hold harmless Elite Impact Lab LLC from claims arising from:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Your use of the services</li>
                        <li>Your violation of these Terms</li>
                        <li>Your misuse or misconfiguration of AI agents</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">14. Governing Law & Dispute Resolution</h3>
                    <p>These Terms are governed by the laws of the Commonwealth of Virginia, USA.</p>
                    <p>Disputes shall be resolved through:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Good-faith negotiation, then</li>
                        <li>Binding arbitration or small claims court in Virginia</li>
                    </ul>
                    <p>Claims must be brought individually, not as part of a class action.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">15. Changes to These Terms</h3>
                    <p>We may update these Terms from time to time.</p>
                    <p>Continued use after changes take effect constitutes acceptance.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">16. Contact</h3>
                    <p>For questions regarding these Terms:</p>
                    <p>Email: <a href="mailto:support@eliteagenthub.ai" className="text-primary hover:underline">support@eliteagenthub.ai</a></p>
                    <p>Website: <a href="https://eliteagenthub.ai" className="text-primary hover:underline">https://eliteagenthub.ai</a></p>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
