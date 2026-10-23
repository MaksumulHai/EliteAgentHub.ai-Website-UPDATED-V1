
import React from 'react';
import {site} from '../site-config';

const AcceptableUsePage: React.FC = () => {
    return (
        <div className="section wrap reading public-policy">
            <div>
                <h1>Acceptable Use Policy</h1>
                <p>Last Updated: {site.policyUpdated}</p>

                <div>
                    <p>
                        This Acceptable Use Policy (“AUP”) applies to all services provided under the Elite Agent Hub brand, operated by Elite Impact Lab LLC (“Elite Impact Lab,” “Elite Agent Hub,” “we,” “us,” or “our”).
                    </p>
                    <p>
                        This policy defines permitted and prohibited uses of our services. By accessing or using Elite Agent Hub, you agree to comply with this policy.
                    </p>

                    <h3>1. Purpose of This Policy</h3>
                    <p>Elite Agent Hub provides AI-powered voice, chat, and messaging tools intended to help businesses communicate professionally and lawfully.</p>
                    <p>This policy exists to:</p>
                    <ul>
                        <li>Protect users, recipients, and the public</li>
                        <li>Maintain carrier and platform compliance</li>
                        <li>Prevent misuse, abuse, or illegal activity</li>
                        <li>Ensure ethical and responsible use of AI</li>
                    </ul>

                    <h3>2. Permitted Use</h3>
                    <p>You may use Elite Agent Hub only for lawful business purposes, including:</p>
                    <ul>
                        <li>Answering inbound calls and messages</li>
                        <li>Booking, rescheduling, or canceling appointments</li>
                        <li>Responding to FAQs based on approved content</li>
                        <li>Capturing leads with proper consent</li>
                        <li>Providing customer support and business information</li>
                    </ul>
                    <p>These examples describe possible permitted uses, not features currently active in every service. Only the channels and actions included in an accepted scope and separately enabled are available. Services marked “preparing” are not ready for customer activation.</p>
                    <p>All use must comply with applicable laws, carrier rules, and these Terms and related policies.</p>

                    <h3>3. Prohibited Activities</h3>
                    <p>You may not use the services to engage in, facilitate, or promote any of the following:</p>

                    <h4>3.1 Illegal or Harmful Conduct</h4>
                    <ul>
                        <li>Fraud, scams, or deceptive practices</li>
                        <li>Harassment, threats, or abuse</li>
                        <li>Hate speech or discriminatory content</li>
                        <li>Any activity that violates local, state, federal, or international law</li>
                    </ul>

                    <h4>3.2 Spam & Unsolicited Communications</h4>
                    <ul>
                        <li>Sending unsolicited SMS, voice calls, or messages</li>
                        <li>Using purchased, scraped, or third-party contact lists</li>
                        <li>Engaging in robocalling or mass messaging without consent</li>
                        <li>Violating TCPA, CAN-SPAM, or carrier policies</li>
                    </ul>

                    <h4>3.3 Impersonation & Misrepresentation</h4>
                    <ul>
                        <li>Pretending to be another person or entity</li>
                        <li>Misrepresenting the nature of your business</li>
                        <li>Falsely claiming endorsements, affiliations, or authority</li>
                    </ul>

                    <h4>3.4 Abuse of AI Systems</h4>
                    <ul>
                        <li>Prompting AI to generate unlawful, obscene, defamatory, or misleading content</li>
                        <li>Attempting to bypass safeguards or restrictions</li>
                        <li>Using AI outputs as professional advice (medical, legal, financial, etc.)</li>
                        <li>Relying on AI for emergency response handling</li>
                    </ul>

                    <h4>3.5 Sensitive & Regulated Data</h4>
                    <p>Do not submit Social Security numbers, full payment-card details, health records or other sensitive personal information through our ordinary forms, email or AI channels. Regulated-data work is outside the current offer. Any future exception requires a separately approved scope, applicable legal review, necessary provider agreements and enabled safeguards before processing begins. A signed order alone does not enable that use.</p>

                    <h4>3.6 Platform & Infrastructure Abuse</h4>
                    <ul>
                        <li>Unauthorized reverse engineering, extraction of source code, or access to hosted infrastructure or other customers’ data is prohibited. This does not prevent editing, deploying or transferring delivered project files under rights expressly granted in your accepted order. Third-party licence restrictions and platform security rules still apply.</li>
                        <li>Interfering with system performance or security</li>
                        <li>Circumventing usage limits or billing systems</li>
                        <li>Introducing malware or harmful code</li>
                    </ul>

                    <h3>4. SMS & Voice Compliance Responsibility</h3>
                    <p>For a customer’s messaging or calling program, the customer must have the required permission to contact its recipients for the stated purpose. The accepted scope identifies each party’s responsibilities for consent records, notices, opt-outs and configuration. Elite Agent Hub remains responsible for its own agreed work and conduct. A service order, telephone number or campaign registration does not itself supply a recipient’s permission.</p>

                    <h3>5. Monitoring & Enforcement</h3>
                    <p>We reserve the right to monitor usage, investigate violations, and suspend or terminate accounts without notice for violations.</p>
                    <p>Any cancellation, refund or treatment of prepaid amounts follows the accepted order and applicable refund policy, subject to rights that cannot be waived. A suspension does not by itself decide a refund claim.</p>

                    <h3>6. Client Responsibility</h3>
                    <p>AI can make mistakes. You are responsible for the accuracy and authorized use of the business information and content you supply, and for approving your business rules. Elite Agent Hub remains responsible for the configuration, checks and other work it agrees to provide. Each party is responsible for its own conduct and the duties assigned to it in the accepted order. The order identifies who handles monitoring, permissions, notices, consent records, escalation and corrections. Nothing here removes rights or duties that applicable law does not allow a party to waive.</p>

                    <h3>7. Reporting Violations</h3>
                    <p>Email: <a href="mailto:support@eliteagenthub.ai">support@eliteagenthub.ai</a></p>
                    <p>Website: <a href="https://eliteagenthub.ai">https://eliteagenthub.ai</a></p>
                    <p>Phone: 804-223-2111</p>

                    <h3>8. Changes to This Policy</h3>
                    <p>We may update this policy from time to time. Changes take effect when posted. Continued use constitutes acceptance.</p>
                </div>
            </div>
        </div>
    );
};

export default AcceptableUsePage;
