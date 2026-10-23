
import React from 'react';
import {site, foundingWebsiteDefects} from '../site-config';

const TermsPage: React.FC = () => {
    return (
        <div className="section wrap reading public-policy">
            <div>
                <h1>Terms of Service</h1>
                <p>Last Updated: {site.policyUpdated}</p>

                <div>
                    <p>
                        These Terms of Service (“Terms”) govern your access to and use of the products and services offered under the Elite Agent Hub brand, operated by Elite Impact Lab LLC (“Elite Impact Lab,” “Elite Agent Hub,” “we,” “us,” or “our”).
                    </p>
                    <p>
                        Elite Agent Hub provides website and landing-page build and update services, AI voice/phone assistance, and AI website-chat services for businesses. Each service is limited to the scope agreed for the particular project or subscription.
                    </p>
                    <p>
                        By accessing our website (https://eliteagenthub.ai), creating an account, purchasing a subscription, or using any part of our services, you agree to be bound by these Terms.
                    </p>
                    <p>
                        If you do not agree, you must not use our services.
                    </p>

                    <h3>1. Company Information</h3>
                    <ul>
                        <li><strong>Legal Entity:</strong> Elite Impact Lab LLC</li>
                        <li><strong>Location:</strong> Ruther Glen, Virginia, USA</li>
                        <li><strong>Website:</strong> <a href="https://eliteagenthub.ai">https://eliteagenthub.ai</a></li>
                        <li><strong>Support Email:</strong> <a href="mailto:support@eliteagenthub.ai">support@eliteagenthub.ai</a></li>
                        <li><strong>Business Phone:</strong> (804) 223-2111</li>
                    </ul>

                    <h3>2. Description of Services</h3>
                    <p>Our service categories include:</p>
                    <ul>
                        <li>Building and updating agreed websites and landing pages for businesses, including agency overflow projects</li>
                        <li>Configuring AI voice/phone assistance for agreed business inquiries and tasks</li>
                        <li>Configuring AI website-chat assistance for agreed business inquiries and tasks</li>
                    </ul>
                    <p>Forms, CRM records, workflows, booking and payment integrations are included only when expressly identified in the accepted scope. Availability depends on the selected platform, access, configuration and testing; listing a category does not mean every feature is active or included. SMS and outbound messaging require their own purpose, consent, sender and service setup.</p>
                    <p>Our services may integrate with third-party platforms such as:</p>
                    <ul>
                        <li>Telephony and SMS providers</li>
                        <li>Calendars (e.g., Google Calendar)</li>
                        <li>CRMs and marketing platforms</li>
                        <li>Payment processors (e.g., Stripe, PayPal)</li>
                        <li>GoHighLevel (“GHL”) or similar systems</li>
                    </ul>
                    <p>You acknowledge that:</p>
                    <ul>
                        <li>AI performance depends on the information and configuration you provide</li>
                        <li>Third-party integrations affect service behavior and reliability</li>
                        <li>You are responsible for keeping your information accurate and up to date</li>
                    </ul>

                    <h4>Website and landing-page projects</h4>
                    <p>The accepted written proposal or order identifies the buyer and approver, platform, pages or sections, content and asset inputs, integrations, schedule, included revisions, testing and acceptance criteria, support, and handoff. Updates beyond that scope require a separately agreed change. Delivery depends on the agreed inputs and compatible access; no fixed turnaround or business result is promised by this description.</p>
                    <p>The order distinguishes editable coded-source delivery from native hosted-site editor access. It identifies domain and hosting owners, renewal payers, backups, and the agreed export, transfer or exit method. Native platform access does not imply portable source export. Project-specific handoff and agency rights are addressed in Section 9.</p>

                    <p>For the current founding website offers: {foundingWebsiteDefects}</p>

                    <h3>3. Eligibility & Accounts</h3>
                    <p>You must be at least 18 years old and legally able to enter into binding contracts to use our services.</p>
                    <p>You are responsible for:</p>
                    <ul>
                        <li>Maintaining the confidentiality of your login credentials</li>
                        <li>All activity that occurs under your account</li>
                        <li>Restricting unauthorized access</li>
                    </ul>
                    <p>If you suspect unauthorized access, notify us immediately at <a href="mailto:support@eliteagenthub.ai">support@eliteagenthub.ai</a>.</p>

                    <h3>4. Project Fees, Subscriptions & Billing</h3>
                    
                    <h4>One-time projects and optional ongoing care</h4>
                    <p>Website builds, landing pages and updates may be one-time projects. Their written order states the scope, price, deposit or payment milestones, acceptance and cancellation/refund treatment before work or payment. Ongoing hosting, care, support and subscriptions are separate unless expressly included. Buying a one-time project does not authorize recurring charges.</p>
                    <p>The order identifies included and additional third-party costs, such as domain, hosting, software, telephony, registration and usage charges, with the responsible payer. Additional scope or costs require agreement before they are incurred on the customer's behalf. No particular project price, allowance or free trial is created by this section.</p>
                    <p>For one-time projects, the specific accepted order controls project fees, deliverables, acceptance, cancellation and handoff. The subscription provisions in Sections 4.1, 4.2, 5.1 and 5.2 apply only to a separately purchased subscription; they do not create a project subscription or define a project refund policy. For one-time projects, the accepted written order's cancellation and refund terms also take precedence over inconsistent subscription language in the separate Refund Policy, even where that policy refers generally to all services. This exception does not change the refund terms of a separately purchased subscription. Section 4.4 does not change an accepted fixed project price without agreement. Applicable nonwaivable rights remain unaffected.</p>

                    <h4>4.1 Subscription Plans</h4>
                    <p>A recurring service is available only when expressly offered and accepted in a separate order. That order identifies the billing interval, price, included usage, activation requirements and cancellation terms before billing. No annual plan is currently offered. Purchasing a one-time website does not start a subscription.</p>
                    <p>Prices do not include applicable taxes, carrier fees, or usage-based charges unless explicitly stated.</p>

                    <h4>4.2 Recurring Billing Authorization</h4>
                    <p>By subscribing, you authorize Elite Impact Lab LLC and our payment processors to charge your selected payment method automatically:</p>
                    <ul>
                        <li>At the start of each billing cycle</li>
                        <li>Until you cancel in accordance with these Terms</li>
                    </ul>

                    <h4>4.3 Payment Processing</h4>
                    <p>Payments are handled by third-party processors (e.g., Stripe, PayPal, GHL Payments).</p>
                    <p>We do not store full payment card details on our servers.</p>
                    <p>You agree to:</p>
                    <ul>
                        <li>Provide accurate and current payment information</li>
                        <li>Maintain sufficient funds or credit</li>
                    </ul>

                    <h4>4.4 Price Changes</h4>
                    <p>We may modify pricing with reasonable notice (such as email or in-app notification).</p>
                    <p>Continued use after the effective date constitutes acceptance of updated pricing.</p>

                    <h3>5. Cancellation & Refunds</h3>
                    
                    <h4>5.1 Cancellation</h4>
                    <p>You may cancel your subscription at any time via:</p>
                    <ul>
                        <li>The customer portal (if available), or</li>
                        <li>Emailing <a href="mailto:support@eliteagenthub.ai">support@eliteagenthub.ai</a></li>
                    </ul>
                    <p>Upon cancellation:</p>
                    <ul>
                        <li>Your subscription remains active until the end of the current paid billing period</li>
                        <li>No future charges will occur unless you resubscribe</li>
                    </ul>

                    <h4>5.2 Limited 14-Day Initial Refund (First Purchase Only)</h4>
                    <p>We offer a one-time, limited refund window for first-time subscriptions only.</p>
                    <p>Eligibility:</p>
                    <ul>
                        <li>Must be your first purchase of the plan</li>
                        <li>The request must be made within 14 calendar days of the initial charge</li>
                        <li>Applies only to the first billing period</li>
                        <li>Does not apply to renewals, upgrades, or subsequent billing cycles</li>
                    </ul>
                    <p>After the 14-day window:</p>
                    <ul>
                        <li>Monthly and yearly plans are non-refundable</li>
                        <li>You may cancel to prevent future charges</li>
                    </ul>
                    <p>We reserve the right to deny refunds in cases of abuse or excessive usage.</p>

                    <h4>5.3 Chargebacks</h4>
                    <p>Please contact support@eliteagenthub.ai about a billing error so we can investigate. This request does not limit any right to contact your payment provider or use an available dispute process. Raising a good-faith billing dispute does not by itself forfeit an agreed refund or paid deliverable. We may provide accurate order, payment and service records in responding to a dispute. Separate issues such as actual nonpayment, fraud or misuse are addressed under the applicable order and Terms.</p>

                    <h3>6. AI Use & Critical Limitations</h3>
                    
                    <h4>6.1 No Professional or Emergency Advice</h4>
                    <p>Elite Agent Hub does not provide:</p>
                    <ul>
                        <li>Medical</li>
                        <li>Legal</li>
                        <li>Financial</li>
                        <li>Immigration</li>
                        <li>Emergency services</li>
                    </ul>
                    <p>AI agents must not be relied upon in emergencies.</p>
                    <p>You are responsible for configuring your agent to direct emergencies to 911 or local emergency services.</p>

                    <h4>6.2 AI Accuracy & Responsibility</h4>
                    <p>AI can make mistakes. You are responsible for the accuracy and authorized use of the business information and content you supply, and for approving your business rules. Elite Agent Hub remains responsible for the configuration, checks and other work it agrees to provide. Each party is responsible for its own conduct and the duties assigned to it in the accepted order. The order identifies who handles monitoring, permissions, notices, consent records, escalation and corrections. Nothing here removes rights or duties that applicable law does not allow a party to waive.</p>

                    <h4>6.3 Compliance & Sensitive Data</h4>
                    <p>Do not submit Social Security numbers, full payment-card details, health records or other sensitive personal information through our ordinary forms, email or AI channels. Regulated-data work is outside the current offer. Any future exception requires a separately approved scope, applicable legal review, necessary provider agreements and enabled safeguards before processing begins. A signed order alone does not enable that use.</p>

                    <h3>7. Acceptable Use</h3>
                    <p>You may not use the services to:</p>
                    <ul>
                        <li>Engage in illegal, fraudulent, or deceptive activities</li>
                        <li>Send spam or unsolicited communications</li>
                        <li>Violate privacy or intellectual property rights</li>
                        <li>Impersonate individuals or entities</li>
                        <li>Unauthorized reverse engineering or interference with platform operations</li>
                    </ul>
                    <p>Unauthorized reverse engineering, extraction of source code, or access to hosted infrastructure or other customers’ data is prohibited. This does not prevent editing, deploying or transferring delivered project files under rights expressly granted in your accepted order. Third-party licence restrictions and platform security rules still apply.</p>
                    <p>We reserve the right to suspend or terminate accounts that violate these rules.</p>

                    <h3>8. Customer Care SMS Program</h3>
                    <p>Elite Impact Lab LLC operates the Elite Agent Hub Customer Care SMS program. When enabled, it sends non-marketing updates about services you have requested, including agreed website, landing-page, voice or chat services, and related appointment confirmations, reminders or changes, only to people who separately opt in. This program does not authorize promotional or cold-outreach messages. Broader inquiry, callback or support texting requires consent that expressly covers that purpose before it is enabled.</p>
                    <p>SMS consent is optional and is not a condition of purchase or of submitting an inquiry. Giving us a phone number alone is not SMS consent. SMS permission does not authorize automated voice calls or call recording. Message frequency varies with your requested services and appointments. Message and data rates may apply.</p>
                    <p>To leave the program, reply STOP to the number that sent the message. You will receive a confirmation of the opt-out, and further program messages will stop. To join again, complete the program's opt-in process again; a new inquiry alone does not restore SMS permission. For help, reply HELP or email <a href="mailto:support@eliteagenthub.ai">support@eliteagenthub.ai</a>.</p>
                    <p>Wireless carriers are not responsible for message delays or delivery failures. Read our <a href="/#/privacy-policy">Privacy Policy</a> for information handling and SMS consent-data protections. SMS availability depends on completed sender and registration setup; the public business-contact number is not designated here as the program's SMS sender.</p>
                    <p>For a client's separate messaging service, the written scope identifies the sender, permitted purpose, consent and suppression controls, and each party's responsibilities. That service does not replace the first-party program terms above.</p>

                    <h3>9. Intellectual Property</h3>
                    
                    <h4>9.1 Existing materials and project deliverables</h4>
                    <p>Pre-existing software, tools, templates and methods remain with their owners. Third-party software, fonts, images and other assets retain their applicable licenses. The written project order identifies project-specific ownership or license rights, permitted uses, any attribution, and the handoff conditions.</p>
                    <p>For a coded project, the order specifies the editable source and build/deployment instructions to be delivered at the agreed paid handoff. For a native hosted project, it specifies editor access and supported transfer or exit arrangements. A hosted-service license is limited to the agreed service use, except where the project order expressly grants broader deliverable rights.</p>

                    <h4>9.2 Your Content</h4>
                    <p>You retain ownership of your business data and content.</p>
                    <p>You grant us a limited license to use it solely to provide and support the services.</p>

                    <h4>9.3 Agency overflow and agreed handoff rights</h4>
                    <p>For an agency overflow website or landing-page project, the order identifies the agency, named end client and their rights to edit, deploy, use, transfer and resell the commissioned deliverables. Those express rights take precedence over a general internal-use or non-transferable service restriction. Authorized editing of delivered project source is permitted.</p>
                    <p>These project rights do not transfer ownership of our pre-existing tools or third-party platforms, or authorize resale of hosted AI services beyond a separate agreement. The order must resolve assignment versus license and any third-party restrictions before handoff.</p>

                    <h3>10. Service Availability & Changes</h3>
                    <p>We do not guarantee uninterrupted service or 100% uptime.</p>
                    <p>We may modify, update, or discontinue features at any time.</p>
                    <p>If material changes occur, we will make reasonable efforts to notify you.</p>
                    <p>These limitations do not cancel the deliverables, acceptance checks or correction obligations expressly agreed in your order. A lack of guaranteed sales or other business results does not excuse failure to perform that agreed work.</p>

                    <h3>11. Disclaimer of Warranties</h3>
                    <p>The services are provided “AS IS” and “AS AVAILABLE”, without warranties of any kind.</p>
                    <p>We disclaim all implied warranties, including:</p>
                    <ul>
                        <li>Merchantability</li>
                        <li>Fitness for a particular purpose</li>
                        <li>Accuracy or reliability of AI outputs</li>
                    </ul>
                    <p>These limitations do not cancel the deliverables, acceptance checks or correction obligations expressly agreed in your order. A lack of guaranteed sales or other business results does not excuse failure to perform that agreed work.</p>

                    <h3>12. Limitation of Liability</h3>
                    <p>To the fullest extent permitted by law:</p>
                    <ul>
                        <li>We are not liable for indirect, incidental, or consequential damages</li>
                        <li>Our total liability shall not exceed the amount you paid to us in the 30 days preceding the event giving rise to the claim</li>
                    </ul>
                    <p>Some jurisdictions may limit this restriction.</p>

                    <h3>13. Indemnification</h3>
                    <p>You agree to indemnify and hold harmless Elite Impact Lab LLC from claims arising from:</p>
                    <ul>
                        <li>Your use of the services</li>
                        <li>Your violation of these Terms</li>
                        <li>Your misuse or misconfiguration of AI agents</li>
                    </ul>

                    <h3>14. Governing Law & Dispute Resolution</h3>
                    <p>These Terms are governed by the laws of the Commonwealth of Virginia, USA.</p>
                    <p>Disputes shall be resolved through:</p>
                    <ul>
                        <li>Good-faith negotiation, then</li>
                        <li>Binding arbitration or small claims court in Virginia</li>
                    </ul>
                    <p>Claims must be brought individually, not as part of a class action.</p>

                    <h3>15. Changes to These Terms</h3>
                    <p>We may update these Terms from time to time.</p>
                    <p>Continued use after changes take effect constitutes acceptance.</p>

                    <h3>16. Contact</h3>
                    <p>For questions regarding these Terms:</p>
                    <p>Email: <a href="mailto:support@eliteagenthub.ai">support@eliteagenthub.ai</a></p>
                    <p>Website: <a href="https://eliteagenthub.ai">https://eliteagenthub.ai</a></p>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
