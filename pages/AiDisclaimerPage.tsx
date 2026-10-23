
import React from 'react';
import {site} from '../site-config';

const AiDisclaimerPage: React.FC = () => {
    return (
        <div className="section wrap reading public-policy">
            <div>
                <h1>AI Disclaimer & No-Guarantee Notice</h1>
                <p>Last Updated: {site.policyUpdated}</p>

                <div>
                    <p>
                        This AI Disclaimer applies to all services provided under the Elite Agent Hub brand, operated by Elite Impact Lab LLC (“Elite Impact Lab,” “Elite Agent Hub,” “we,” “us,” or “our”).
                    </p>
                    <p>
                        By using our website, AI agents, voice systems, chat tools, or messaging features, you acknowledge and agree to this disclaimer.
                    </p>

                    <h3>1. Nature of AI Services</h3>
                    <p>Elite Agent Hub provides artificial intelligence–powered tools designed to assist businesses with communication tasks such as:</p>
                    <ul>
                        <li>Answering calls and messages</li>
                        <li>Booking or managing appointments</li>
                        <li>Capturing leads and basic information</li>
                        <li>Responding to frequently asked questions</li>
                    </ul>
                    <p>These examples describe possible permitted uses, not features currently active in every service. Only the channels and actions included in an accepted scope and separately enabled are available. Services marked “preparing” are not ready for customer activation.</p>
                    <p>These tools are assistive only and are not human decision-makers.</p>

                    <h3>2. AI Is Not Perfect</h3>
                    <p>You understand and agree that:</p>
                    <ul>
                        <li>AI systems may misunderstand requests</li>
                        <li>AI responses may be incomplete, inaccurate, or outdated</li>
                        <li>AI behavior depends heavily on configuration, prompts, scripts, and data provided by the client</li>
                    </ul>
                    <p>Elite Agent Hub does not guarantee the accuracy, completeness, or reliability of any AI-generated output.</p>

                    <h3>3. No Professional Advice</h3>
                    <p>Elite Agent Hub does not provide:</p>
                    <ul>
                        <li>Medical advice</li>
                        <li>Legal advice</li>
                        <li>Financial or investment advice</li>
                        <li>Immigration advice</li>
                        <li>Emergency or crisis assistance</li>
                    </ul>
                    <p>AI outputs must never be used as a substitute for licensed professionals or emergency services.</p>
                    <p>If a caller or user presents an emergency situation, the AI must be configured to direct them to 911 or appropriate local emergency services.</p>

                    <h3>4. No Guarantees or Promises</h3>
                    <p>Elite Agent Hub makes no guarantees regarding:</p>
                    <ul>
                        <li>Revenue increases</li>
                        <li>Cost savings</li>
                        <li>Lead conversion rates</li>
                        <li>Business outcomes</li>
                        <li>Customer satisfaction</li>
                        <li>System performance results</li>
                    </ul>
                    <p>Results vary based on industry, configuration, usage, and external factors.</p>
                    <p>Any examples or references to potential benefits are illustrative only and not promises.</p>
                    <p>These limitations do not cancel the deliverables, acceptance checks or correction obligations expressly agreed in your order. A lack of guaranteed sales or other business results does not excuse failure to perform that agreed work.</p>

                    <h3>5. Client Responsibility</h3>
                    <p>AI can make mistakes. You are responsible for the accuracy and authorized use of the business information and content you supply, and for approving your business rules. Elite Agent Hub remains responsible for the configuration, checks and other work it agrees to provide. Each party is responsible for its own conduct and the duties assigned to it in the accepted order. The order identifies who handles monitoring, permissions, notices, consent records, escalation and corrections. Nothing here removes rights or duties that applicable law does not allow a party to waive.</p>

                    <h3>6. Human Oversight and Escalation</h3>
                    <p>Each activated AI service must have a named person responsible for the monitoring and escalation agreed in its service scope. AI is not a substitute for professional advice or emergency services.</p>
                    <p>We strongly recommend:</p>
                    <ul>
                        <li>Ongoing monitoring of AI interactions</li>
                        <li>Human review for sensitive or complex matters</li>
                        <li>Clear escalation paths to real people when needed</li>
                    </ul>

                    <h3>7. Limitation of Liability</h3>
                    <p>AI limitations and the absence of a business-results guarantee do not remove Elite Agent Hub’s obligations under an accepted order. Any limitation of liability is governed by the applicable Terms and accepted order, subject to rights and duties that cannot lawfully be excluded.</p>

                    <h3>8. Changes to This Disclaimer</h3>
                    <p>We may update this AI Disclaimer from time to time. Changes take effect when posted. Continued use constitutes acceptance.</p>

                    <h3>9. Contact</h3>
                    <p>Elite Agent Hub (operated by Elite Impact Lab LLC)</p>
                    <p>Email: <a href="mailto:support@eliteagenthub.ai">support@eliteagenthub.ai</a></p>
                    <p>Website: <a href="https://eliteagenthub.ai">https://eliteagenthub.ai</a></p>
                    <p>Phone: 804-223-2111</p>
                </div>
            </div>
        </div>
    );
};

export default AiDisclaimerPage;
