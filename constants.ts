import type { PricingPlan, FaqItem } from './types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter Lite",
    monthlyPrice: 120,
    includedMinutes: 0,
    perMinuteRate: "$0.13/min",
    additionalLocationFee: "+$99/mo",
    features: [
      "24/7 AI receptionist",
      "Pay-per-use minutes",
      "Call answering",
      "Appointment booking",
      "Basic FAQ",
      "Call recordings + transcripts",
      "Basic CRM entry",
      "Multi-line support",
      "1 physical location included",
      "Cancel anytime"
    ],
    cta: 'Start Free Trial',
    note: "Perfect entry-level plan.",
  },
  {
    name: "Essentials",
    monthlyPrice: 249,
    includedMinutes: 500,
    perMinuteRate: "$0.13/min overage",
    additionalLocationFee: "+$99/mo",
    features: [
      "Everything in Starter Lite",
      "500 AI call minutes included",
      "Missed-call recovery",
      "Lead qualification",
      "Better onboarding support",
      "1 physical location included",
      "Cancel anytime"
    ],
    cta: 'Start Free Trial',
    note: "Great for growing local businesses.",
  },
  {
    name: "Growth Unlimited",
    monthlyPrice: 349,
    includedMinutes: "Unlimited",
    perMinuteRate: "Unlimited",
    additionalLocationFee: "+$99/mo",
    features: [
      "Everything in Essentials",
      "Unlimited AI call minutes",
      "CRM sync (2-way)",
      "Advanced routing",
      "Automations & workflows",
      "Priority support",
      "1 physical location included",
      "Cancel anytime"
    ],
    isPopular: true,
    cta: 'Start Free Trial',
    note: "Best value for high volume.",
  },
  {
    name: "Elite Unlimited",
    monthlyPrice: 549,
    includedMinutes: "Unlimited",
    perMinuteRate: "Unlimited",
    additionalLocationFee: "+$99/mo",
    features: [
      "Everything in Growth",
      "Multiple AI agents (Sales + Support)",
      "AI website chat agent",
      "Custom call flows",
      "Advanced automation",
      "Dedicated support manager",
      "Reporting + insights",
      "1 physical location included"
    ],
    cta: 'Start Free Trial',
    note: "For businesses needing custom solutions.",
  }
];

export const FAQ_DATA: FaqItem[] = [
    {
        question: "How long does setup take?",
        answer: "Standard setup is completed within 3-5 business days. We handle the porting of your number and configure the AI agent based on your business needs. You'll have a chance to review and approve all call flows before going live."
    },
    {
        question: "What calendars and CRMs do you integrate with?",
        answer: "We integrate with most major platforms, including Google Calendar, Outlook, Calendly, HubSpot, Salesforce, and GoHighLevel. If you use a custom or less common system, let us know, and we'll explore integration options."
    },
    {
        question: "Is call recording legal and how do I get consent?",
        answer: "All agent-handled calls are recorded and transcribed for quality assurance. We automatically include a consent notice at the beginning of each call, compliant with one-party and two-party consent laws. We can adjust settings based on your region's specific requirements."
    },
    {
        question: "How do I access call transcripts?",
        answer: "Transcripts are available in your client dashboard within minutes of a call ending. They are fully searchable, allowing you to quickly find information without listening to entire recordings."
    },
    {
        question: "What is your cancellation policy?",
        answer: "You can cancel your subscription at any time. All plans are billed on a recurring basis (monthly or yearly) unless canceled. We offer a 14-day refund window for first-time purchases only. After that, payments are non-refundable, but canceling will stop future charges at the end of your current billing period. For full details, please review our Refund & Cancellation Policy in the Legal section."
    },
    {
        question: "How do you handle data security?",
        answer: "We take data security very seriously. All data, including call recordings and transcripts, is encrypted at rest and in transit. We follow industry best practices to ensure your and your clients' information is protected."
    },
    {
        question: "How does the AI handle emergency calls?",
        answer: "We configure specific keywords and phrases (e.g., 'emergency,' 'gas leak,' 'fire') to trigger an immediate, automated escalation. The AI will provide the caller with an emergency contact number and/or instantly transfer the call to a designated human line."
    },
    {
        question: "How does human handoff work?",
        answer: "With our Elite plan, if the AI detects a caller is frustrated, asks for a human, or discusses a high-value or complex topic you've pre-defined, the call is seamlessly transferred to your designated on-call staff in seconds."
    }
];