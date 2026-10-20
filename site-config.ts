/** Staged website release. Agent and payment activation remain separately gated. */
export const site = {
  brand: 'Elite Agent Hub', seller: 'Elite Impact Lab LLC',
  email: 'support@eliteagenthub.ai', phone: '(804) 223-2111', phoneE164: '+18042232111',
  policyVersion: '2026-10-15',
  agent: { status: 'preparing' as 'preparing' | 'verified', phoneE164: '', phoneDisplay: '', routingEvidence: '' },
  chat: { status: 'preparing' as 'preparing' | 'verified', widgetId: '', scriptUrl: '', knowledgeVersion: '', evidence: '' },
  booking: { status: 'verified' as 'preparing' | 'verified', url: 'https://api.leadconnectorhq.com/widget/booking/i5FDnRI93yvxtYQGNq1Q', calendarId: 'i5FDnRI93yvxtYQGNq1Q', evidence: '2026-10-15 website appointment matched to Confirmed record; separate native email test. Agent conversational booking remains unverified.' },
  agentBooking: { status: 'preparing' as 'preparing' | 'verified', voiceEvidence: '', chatEvidence: '' },
  payment: { status: 'held', approvedOrders: [] },
} as const;

export const agentExperienceReady =
  site.agent.status === 'verified' && !!site.agent.phoneE164 && !!site.agent.routingEvidence &&
  site.chat.status === 'verified' && !!site.chat.widgetId && !!site.chat.knowledgeVersion && !!site.chat.evidence &&
  site.agentBooking.status === 'verified' && !!site.agentBooking.voiceEvidence && !!site.agentBooking.chatEvidence;

export const services = [
  { id: 'voice', number: '01', title: 'Voice & phone', headline: 'While you’re on the job.', description: 'Inbound assistance for approved questions and callback requests. Real discovery booking is part of the demonstration we are preparing.', status: 'Agent demonstration preparing for testing', to: '/voice-demo', action: 'Explore phone assistance' },
  { id: 'chat', number: '02', title: 'Website chat', headline: 'When they visit your site.', description: 'Useful answers and inquiry capture, with appointments booked against an actual connected calendar after testing. Web chat and SMS are separate channels.', status: 'Agent demonstration preparing for testing', to: '/chat', action: 'Explore website chat' },
  { id: 'websites', number: '03', title: 'Websites & pages', headline: 'For your next campaign.', description: 'A focused landing page or a small business website. Agencies can bring a defined overflow page-production brief.', status: 'Discuss a scoped project', to: '/landing-pages', action: 'Explore page production' },
];

/** Quote-based public scope. No unapproved package prices or usage allowances. */
export const catalogVersion = '2026-10-15-quote-based';
export const catalog = [
  { id: 'page', title: 'Campaign page', status: 'Quoted after scope review', bullets: ['One focused page and an agreed customer action', 'Content, sections, revision and testing agreed before work', 'Editable source or native-editor handoff, as scoped'], interest: 'websites' },
  { id: 'website', title: 'Small business website', status: 'Quoted after scope review', bullets: ['An agreed set of standard business pages', 'Platform, content, hosting and editing responsibilities confirmed', 'Ecommerce, migrations and custom applications need separate assessment'], interest: 'websites' },
  { id: 'chat', title: 'Website chat', status: 'Preparing for testing', bullets: ['Approved business answers and inquiry capture', 'Native booking is a required target, pending agent testing', 'Usage, support and provider costs specified in the order'], interest: 'chat' },
  { id: 'voice-chat', title: 'Voice & website chat', status: 'Preparing for testing', bullets: ['Inbound assistance using a verified number and approved knowledge', 'Conversational booking and human fallback must pass tests', 'Setup, recurring service and usage are scoped separately'], interest: 'voice' },
  { id: 'follow-up', title: 'Consented follow-up', status: 'Separate scope and sender checks', bullets: ['Only agreed purposes and permitted recipients', 'Sender registration, suppression and delivery tests before activation', 'No cold SMS or automatic inclusion in a page or agent service'], interest: 'follow-up' },
  { id: 'review', title: 'Review & Response Action Plan', status: 'Proposed service; orders not yet available', bullets: ['A bounded public-review question for one service-business location', 'Source access and delivery feasibility confirmed before an order', 'Report, editable actions and source appendix under an agreed scope'], interest: 'review' },
  { id: 'care', title: 'Managed website care', status: 'Quoted when needed', bullets: ['One agreed managed site and defined support responsibilities', 'Clarify included care before adding a separate fee', 'Domains, hosting, provider costs and exit arrangements specified'], interest: 'websites' },
];
