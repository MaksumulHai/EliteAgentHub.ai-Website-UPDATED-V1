
import React from 'react';

const AiDisclaimerPage: React.FC = () => {
    return (
        <div className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">AI Disclaimer & No-Guarantee Notice</h1>
                <p className="text-gray-600 font-medium mb-12">Last Updated: December 2025</p>

                <div className="prose prose-lg max-w-none text-gray-700 font-medium space-y-8">
                    <p>
                        This AI Disclaimer applies to all services provided under the Elite Agent Hub brand, operated by Elite Impact Lab LLC (“Elite Impact Lab,” “Elite Agent Hub,” “we,” “us,” or “our”).
                    </p>
                    <p>
                        By using our website, AI agents, voice systems, chat tools, or messaging features, you acknowledge and agree to this disclaimer.
                    </p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Nature of AI Services</h3>
                    <p>Elite Agent Hub provides artificial intelligence–powered tools designed to assist businesses with communication tasks such as:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Answering calls and messages</li>
                        <li>Booking or managing appointments</li>
                        <li>Capturing leads and basic information</li>
                        <li>Responding to frequently asked questions</li>
                    </ul>
                    <p>These tools are assistive only and are not human decision-makers.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. AI Is Not Perfect</h3>
                    <p>You understand and agree that:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>AI systems may misunderstand requests</li>
                        <li>AI responses may be incomplete, inaccurate, or outdated</li>
                        <li>AI behavior depends heavily on configuration, prompts, scripts, and data provided by the client</li>
                    </ul>
                    <p>Elite Agent Hub does not guarantee the accuracy, completeness, or reliability of any AI-generated output.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. No Professional Advice</h3>
                    <p>Elite Agent Hub does not provide:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Medical advice</li>
                        <li>Legal advice</li>
                        <li>Financial or investment advice</li>
                        <li>Immigration advice</li>
                        <li>Emergency or crisis assistance</li>
                    </ul>
                    <p>AI outputs must never be used as a substitute for licensed professionals or emergency services.</p>
                    <p>If a caller or user presents an emergency situation, the AI must be configured to direct them to 911 or appropriate local emergency services.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. No Guarantees or Promises</h3>
                    <p>Elite Agent Hub makes no guarantees regarding:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Revenue increases</li>
                        <li>Cost savings</li>
                        <li>Lead conversion rates</li>
                        <li>Business outcomes</li>
                        <li>Customer satisfaction</li>
                        <li>System performance results</li>
                    </ul>
                    <p>Results vary based on industry, configuration, usage, and external factors.</p>
                    <p>Any examples or references to potential benefits are illustrative only and not promises.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Client Responsibility</h3>
                    <p>You are solely responsible for:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Reviewing and approving AI scripts, prompts, and workflows</li>
                        <li>Ensuring outputs align with your business policies</li>
                        <li>Monitoring AI performance and behavior</li>
                        <li>Ensuring legal and regulatory compliance</li>
                    </ul>
                    <p>Elite Impact Lab LLC is not responsible for actions taken based on AI outputs.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Human Oversight Recommended</h3>
                    <p>AI tools are intended to augment, not replace, human judgment.</p>
                    <p>We strongly recommend:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Ongoing monitoring of AI interactions</li>
                        <li>Human review for sensitive or complex matters</li>
                        <li>Clear escalation paths to real people when needed</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">7. Limitation of Liability</h3>
                    <p>To the maximum extent permitted by law:</p>
                    <p>Elite Impact Lab LLC shall not be liable for:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Decisions made based on AI-generated content</li>
                        <li>Errors or misunderstandings caused by AI</li>
                        <li>Missed opportunities, losses, or damages related to AI usage</li>
                    </ul>
                    <p>Use of AI services is at your own risk.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">8. Changes to This Disclaimer</h3>
                    <p>We may update this AI Disclaimer from time to time. Changes take effect when posted. Continued use constitutes acceptance.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">9. Contact</h3>
                    <p>Elite Agent Hub (operated by Elite Impact Lab LLC)</p>
                    <p>Email: <a href="mailto:support@eliteagenthub.ai" className="text-primary hover:underline">support@eliteagenthub.ai</a></p>
                    <p>Website: <a href="https://eliteagenthub.ai" className="text-primary hover:underline">https://eliteagenthub.ai</a></p>
                    <p>Phone: 804-223-3141</p>
                </div>
            </div>
        </div>
    );
};

export default AiDisclaimerPage;
