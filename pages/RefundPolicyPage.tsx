
import React from 'react';

const RefundPolicyPage: React.FC = () => {
    return (
        <div className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Refund & Cancellation Policy</h1>
                <p className="text-gray-600 font-medium mb-12">Last Updated: December 2025</p>

                <div className="prose prose-lg max-w-none text-gray-700 font-medium space-y-8">
                    <p>
                        This Refund & Cancellation Policy applies to all services provided under the Elite Agent Hub brand, operated by Elite Impact Lab LLC (“Elite Impact Lab,” “Elite Agent Hub,” “we,” “us,” or “our”).
                    </p>
                    <p>
                        This policy explains how cancellations work, when refunds are available, and when they are not. By purchasing or using our services, you agree to this policy.
                    </p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Subscription Model Overview</h3>
                    <p>Elite Agent Hub operates on a subscription-based SaaS model.</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Plans are billed on a monthly or yearly recurring basis</li>
                        <li>Charges recur automatically unless canceled</li>
                        <li>Services begin immediately upon successful payment</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How to Cancel Your Subscription</h3>
                    <p>You may cancel your subscription at any time by:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Using the customer portal (if available), or</li>
                        <li>Emailing <a href="mailto:support@eliteagenthub.ai" className="text-primary hover:underline">support@eliteagenthub.ai</a> from the account holder’s email address</li>
                    </ul>
                    <p>What happens after cancellation:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Your subscription remains active until the end of the current paid billing period</li>
                        <li>You will not be charged again after that period</li>
                        <li>Access to services ends when the billing period expires</li>
                    </ul>
                    <p>We do not offer prorated refunds for partial billing periods.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">14-Day Initial Refund Policy (First Purchase Only)</h3>
                    <p>We offer a limited one-time refund window.</p>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">Eligibility Requirements:</h4>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>This is your first-ever purchase of the plan</li>
                        <li>The request is made within 14 calendar days of the initial charge</li>
                        <li>The request applies only to the first billing cycle</li>
                        <li>The account is in good standing</li>
                    </ul>
                    <p>This policy does not apply to renewals, plan upgrades/downgrades, add-ons, or usage-based charges.</p>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">3.1 Monthly Plans</h4>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Refund requests must be submitted within 14 days of the first charge</li>
                        <li>After 14 days, the billing period is non-refundable</li>
                        <li>You may cancel to avoid future charges</li>
                    </ul>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">3.2 Yearly Plans</h4>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Refund requests must be submitted within 14 days of the initial yearly charge</li>
                        <li>After 14 days, yearly subscriptions are non-refundable</li>
                        <li>You may cancel to prevent renewal at the end of the term</li>
                    </ul>

                    <h4 className="text-xl font-bold text-gray-900 mt-6 mb-2">3.3 Abuse & Fair Use Protection</h4>
                    <p>We reserve the right to deny refunds if:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>There is evidence of refund abuse</li>
                        <li>The system has been heavily used (e.g., high call volume, messaging traffic, or automation activity)</li>
                        <li>The request appears to be made after significant benefit has already been received</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">No Refunds After Initial Period</h3>
                    <p>After the initial 14-day window:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>All subscription payments are final</li>
                        <li>No refunds are issued for renewals, partial months, unused time, downtime caused by third-party providers, or changes in business needs/preferences</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Usage-Based Fees & Third-Party Costs</h3>
                    <p>Some services may include telephony usage, SMS fees, carrier charges, or third-party fees.</p>
                    <p>These charges are non-refundable and billed based on actual usage.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Chargebacks & Payment Disputes</h3>
                    <p>Contact us first to resolve billing issues.</p>
                    <p>Filing a chargeback without attempting resolution may result in account suspension/termination and loss of access.</p>
                    <p>We may dispute chargebacks using logs and usage records.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Service Termination by Elite Agent Hub</h3>
                    <p>We may suspend or terminate service without refund if:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Policies are violated</li>
                        <li>Illegal or abusive activity is detected</li>
                        <li>Payment obligations are not met</li>
                        <li>Carrier or platform rules are violated</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Good-Faith Review & Exceptional Circumstances</h3>
                    <p>While our Refund & Cancellation Policy is enforced as written, Elite Agent Hub understands that exceptional circumstances may occur.</p>
                    
                    <p>In rare cases, and at our sole discretion, we may review refund or billing adjustment requests if an issue is determined to be caused directly by:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>A verified service malfunction on our side</li>
                        <li>A documented system outage</li>
                        <li>A confirmed onboarding or configuration error attributable to Elite Agent Hub</li>
                    </ul>

                    <p>Any such review:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Is handled by our support team on a case-by-case basis</li>
                        <li>Does not guarantee a refund or adjustment</li>
                        <li>May result in a partial refund, service credit, or billing adjustment at our discretion</li>
                    </ul>

                    <p>This provision does not modify or replace the standard refund policy and does not apply to:</p>
                    <ul className="list-disc pl-6 space-y-2 mb-4">
                        <li>Customer preference changes</li>
                        <li>Business performance outcomes</li>
                        <li>Lack of usage</li>
                        <li>Misconfiguration by the client</li>
                        <li>Third-party carrier or platform issues</li>
                    </ul>

                    <p>All decisions made under this review process are final.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Changes to This Policy</h3>
                    <p>We may update this policy from time to time. Changes take effect when posted.</p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Contact</h3>
                    <p>Elite Agent Hub (operated by Elite Impact Lab LLC)</p>
                    <p>Email: <a href="mailto:support@eliteagenthub.ai" className="text-primary hover:underline">support@eliteagenthub.ai</a></p>
                    <p>Website: <a href="https://eliteagenthub.ai" className="text-primary hover:underline">https://eliteagenthub.ai</a></p>
                    <p>Phone: 804-223-3141</p>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicyPage;
