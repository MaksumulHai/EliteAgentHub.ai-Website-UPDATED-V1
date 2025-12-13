
import React from 'react';

const AcceptableUsePage: React.FC = () => {
    return (
        <div className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Acceptable Use Policy</h1>
                <p className="text-gray-600 font-medium mb-12">Last Updated: December 2025</p>

                <div className="prose prose-lg max-w-none text-gray-700 font-medium space-y-8">
                    <p>
                        This Acceptable Use Policy (“AUP”) applies to all services provided under the Elite Agent Hub brand, operated by Elite Impact Lab LLC (“Elite Impact Lab,” “Elite Agent Hub,” “we,” “us,” or “our”).
                    </p>
                    <p>
                        This policy defines permitted and prohibited uses of our services. By accessing or using Elite Agent Hub, you agree to comply with this policy.
                    </p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Purpose of This Policy</h3>
                    <p>Elite Agent Hub provides AI-powered voice, chat, and messaging tools intended to help businesses communicate professionally and lawfully.</p>
                    <p>This policy exists to:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Protect users, recipients, and the public</li>
                        <li>Maintain carrier and platform compliance</li>
                        <li>Prevent misuse, abuse, or illegal activity</li>
                        <li>Ensure ethical and responsible use of AI</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. Permitted Use</h3>
                    <p>You may use Elite Agent Hub only for lawful business purposes, including:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Answering inbound calls and messages</li>
                        <li>Booking, rescheduling, or canceling appointments</li>
                        <li>Responding to FAQs based on approved content</li>
                        <li>Capturing leads with proper consent</li>
                        <li>Providing customer support and business information</li>
                    </ul>
                    <p>All use must comply with applicable laws, carrier rules, and these Terms and related policies.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Prohibited Activities</h3>
                    <p>You may not use the services to engage in, facilitate, or promote any of the following:</p>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">3.1 Illegal or Harmful Conduct</h4>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Fraud, scams, or deceptive practices</li>
                        <li>Harassment, threats, or abuse</li>
                        <li>Hate speech or discriminatory content</li>
                        <li>Any activity that violates local, state, federal, or international law</li>
                    </ul>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">3.2 Spam & Unsolicited Communications</h4>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Sending unsolicited SMS, voice calls, or messages</li>
                        <li>Using purchased, scraped, or third-party contact lists</li>
                        <li>Engaging in robocalling or mass messaging without consent</li>
                        <li>Violating TCPA, CAN-SPAM, or carrier policies</li>
                    </ul>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">3.3 Impersonation & Misrepresentation</h4>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Pretending to be another person or entity</li>
                        <li>Misrepresenting the nature of your business</li>
                        <li>Falsely claiming endorsements, affiliations, or authority</li>
                    </ul>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">3.4 Abuse of AI Systems</h4>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Prompting AI to generate unlawful, obscene, defamatory, or misleading content</li>
                        <li>Attempting to bypass safeguards or restrictions</li>
                        <li>Using AI outputs as professional advice (medical, legal, financial, etc.)</li>
                        <li>Relying on AI for emergency response handling</li>
                    </ul>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">3.5 Sensitive & Regulated Data</h4>
                    <p>You may not collect, process, or store:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Social Security numbers</li>
                        <li>Full payment card details by voice or chat</li>
                        <li>Protected Health Information (PHI) without a signed agreement</li>
                        <li>Biometric or highly sensitive personal data</li>
                    </ul>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">3.6 Platform & Infrastructure Abuse</h4>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Reverse engineering or attempting to extract source code</li>
                        <li>Interfering with system performance or security</li>
                        <li>Circumventing usage limits or billing systems</li>
                        <li>Introducing malware or harmful code</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. SMS & Voice Compliance Responsibility</h3>
                    <p>If you use SMS or voice features, you are solely responsible for:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Obtaining proper opt-in consent</li>
                        <li>Providing opt-out instructions (e.g., STOP)</li>
                        <li>Honoring opt-out requests immediately</li>
                        <li>Complying with carrier rules and applicable laws</li>
                    </ul>
                    <p>Elite Agent Hub acts only as a technology provider and does not assume responsibility for your communications.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Monitoring & Enforcement</h3>
                    <p>We reserve the right to monitor usage, investigate violations, and suspend or terminate accounts without notice for violations.</p>
                    <p>No refunds are required for suspensions or terminations resulting from policy violations.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Client Responsibility</h3>
                    <p>You are responsible for how your AI agent is configured, the scripts/prompts/workflows deployed, and ensuring communications are accurate and lawful.</p>
                    <p>Misuse of the platform is your responsibility, not ours.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">7. Reporting Violations</h3>
                    <p>Email: <a href="mailto:support@eliteagenthub.ai" className="text-primary hover:underline">support@eliteagenthub.ai</a></p>
                    <p>Website: <a href="https://eliteagenthub.ai" className="text-primary hover:underline">https://eliteagenthub.ai</a></p>
                    <p>Phone: 804-223-3141</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">8. Changes to This Policy</h3>
                    <p>We may update this policy from time to time. Changes take effect when posted. Continued use constitutes acceptance.</p>
                </div>
            </div>
        </div>
    );
};

export default AcceptableUsePage;
