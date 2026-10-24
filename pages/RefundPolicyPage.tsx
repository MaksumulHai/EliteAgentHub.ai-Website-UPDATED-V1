
import React from 'react';
import {site, foundingWebsiteDefects} from '../site-config';

const RefundPolicyPage: React.FC = () => {
    return (
        <div className="section wrap reading public-policy">
            <div>
                <h1>Refund & Cancellation Policy</h1>
                <p>Last Updated: {site.policyUpdated}</p>

                <div>
                    <p>
                        This Refund & Cancellation Policy covers subscription cancellations and refunds for services under the Elite Agent Hub brand, operated by Elite Impact Lab LLC (“Elite Impact Lab,” “Elite Agent Hub,” “we,” “us,” or “our”).
                    </p>
                    <p>
                        This policy explains how cancellations work, when refunds are available, and when they are not. By purchasing or using our services, you agree to this policy.
                    </p>

                    <h3>Website build and setup charges</h3>
                    <p>The build/setup charge is a project fee even when the customer also selects monthly managed care. Before work, cancellation refunds payments less only specific, previously approved nonrecoverable outside purchases for that project. After work begins, we itemize completed work at values agreed before work, plus approved nonrecoverable outside costs, and refund the unused balance. There are no invented milestone values, ordinary overhead deductions, vague administration fees or double counting. Payment installments are not automatically earned or non-refundable. The complete order identifies work values, acceptance, cancellation and handoff before payment.</p>
                    <p>Purchasing a one-time project does not authorize recurring charges. Monthly managed care is separately authorized; its complete order states renewal, cancellation/refund and technical-exit arrangements and expressly resolves conflicts with the general subscription provisions below before payment. The setup charge is not the initial subscription billing period. This clarification does not change an existing customer's accepted terms or any applicable nonwaivable rights.</p>
                    <p>For one-time founding website projects: {foundingWebsiteDefects}</p>

                    <h3>Subscription Model Overview</h3>
                    <p>The subscription provisions below apply only to a separately accepted subscription and its agreed billing interval. They do not make a plan available, activate a service or change the terms already accepted for an existing subscription. No annual plan is currently offered.</p>
                    <ul>
                        <li>Only the billing interval in the separately accepted subscription applies</li>
                        <li>Charges recur automatically unless canceled</li>
                        <li>Service availability depends on the agreed scope, required setup and testing.</li>
                    </ul>

                    <h3>How to Cancel Your Subscription</h3>
                    <p>You may cancel your subscription at any time by:</p>
                    <ul>
                        <li>Using the customer portal (if available), or</li>
                        <li>Emailing <a href="mailto:support@eliteagenthub.ai">support@eliteagenthub.ai</a> from the account holder’s email address</li>
                    </ul>
                    <p>What happens after cancellation:</p>
                    <ul>
                        <li>Your subscription remains active until the end of the current paid billing period</li>
                        <li>You will not be charged again after that period</li>
                        <li>Access to services ends when the billing period expires</li>
                    </ul>
                    <p>We do not offer prorated refunds for partial billing periods.</p>

                    <h3>14-Day Initial Refund Policy (First Purchase Only)</h3>
                    <p>We offer a limited one-time refund window.</p>

                    <h4>Eligibility Requirements:</h4>
                    <ul>
                        <li>This is your first-ever purchase of the plan</li>
                        <li>The request is made within 14 calendar days of the initial charge</li>
                        <li>The request applies only to the first billing cycle</li>
                        <li>The account is in good standing</li>
                    </ul>
                    <p>This policy does not apply to renewals, plan upgrades/downgrades, add-ons, or usage-based charges.</p>

                    <h4>3.1 Monthly Plans</h4>
                    <ul>
                        <li>Refund requests must be submitted within 14 days of the first charge</li>
                        <li>After 14 days, the billing period is non-refundable</li>
                        <li>You may cancel to avoid future charges</li>
                    </ul>

                    <h4>3.2 Yearly Plans</h4>
                    <ul>
                        <li>Refund requests must be submitted within 14 days of the initial yearly charge</li>
                        <li>After 14 days, yearly subscriptions are non-refundable</li>
                        <li>You may cancel to prevent renewal at the end of the term</li>
                    </ul>

                    <h4>3.3 Abuse & Fair Use Protection</h4>
                    <p>We reserve the right to deny refunds if:</p>
                    <ul>
                        <li>There is evidence of refund abuse</li>
                        <li>The system has been heavily used (e.g., high call volume, messaging traffic, or automation activity)</li>
                        <li>The request appears to be made after significant benefit has already been received</li>
                    </ul>

                    <h3>No Refunds After Initial Period</h3>
                    <p>After the initial 14-day window:</p>
                    <ul>
                        <li>All subscription payments are final</li>
                        <li>No refunds are issued for renewals, partial months, unused time, downtime caused by third-party providers, or changes in business needs/preferences</li>
                    </ul>

                    <h3>Usage-Based Fees & Third-Party Costs</h3>
                    <p>Some services may include telephony usage, SMS fees, carrier charges, or third-party fees.</p>
                    <p>These charges are non-refundable and billed based on actual usage.</p>

                    <h3>Chargebacks & Payment Disputes</h3>
                    <p>Please contact support@eliteagenthub.ai about a billing error so we can investigate. This request does not limit any right to contact your payment provider or use an available dispute process. Raising a good-faith billing dispute does not by itself forfeit an agreed refund or paid deliverable. We may provide accurate order, payment and service records in responding to a dispute. Separate issues such as actual nonpayment, fraud or misuse are addressed under the applicable order and Terms.</p>

                    <h3>Service Termination by Elite Agent Hub</h3>
                    <p>We may suspend or terminate service if:</p>
                    <ul>
                        <li>Policies are violated</li>
                        <li>Illegal or abusive activity is detected</li>
                        <li>Payment obligations are not met</li>
                        <li>Carrier or platform rules are violated</li>
                    </ul>
                    <p>Any cancellation, refund or treatment of prepaid amounts follows the accepted order and applicable refund policy, subject to rights that cannot be waived. A suspension does not by itself decide a refund claim.</p>

                    <h3>Good-Faith Review & Exceptional Circumstances</h3>
                    <p>While our Refund & Cancellation Policy is enforced as written, Elite Agent Hub understands that exceptional circumstances may occur.</p>
                    
                    <p>In rare cases, and at our sole discretion, we may review refund or billing adjustment requests if an issue is determined to be caused directly by:</p>
                    <ul>
                        <li>A verified service malfunction on our side</li>
                        <li>A documented system outage</li>
                        <li>A confirmed onboarding or configuration error attributable to Elite Agent Hub</li>
                    </ul>

                    <p>Any such review:</p>
                    <ul>
                        <li>Is handled by our support team on a case-by-case basis</li>
                        <li>Does not guarantee a refund or adjustment</li>
                        <li>May result in a partial refund, service credit, or billing adjustment at our discretion</li>
                    </ul>

                    <p>This provision does not modify or replace the standard refund policy and does not apply to:</p>
                    <ul>
                        <li>Customer preference changes</li>
                        <li>Business performance outcomes</li>
                        <li>Lack of usage</li>
                        <li>Misconfiguration by the client</li>
                        <li>Third-party carrier or platform issues</li>
                    </ul>

                    <p>This is our internal review outcome. It does not remove any nonwaivable right or available external dispute process.</p>

                    <h3>Changes to This Policy</h3>
                    <p>We may update this policy from time to time. Changes take effect when posted.</p>

                    <h3>Contact</h3>
                    <p>Elite Agent Hub (operated by Elite Impact Lab LLC)</p>
                    <p>Email: <a href="mailto:support@eliteagenthub.ai">support@eliteagenthub.ai</a></p>
                    <p>Website: <a href="https://eliteagenthub.ai">https://eliteagenthub.ai</a></p>
                    <p>Phone: 804-223-2111</p>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicyPage;
