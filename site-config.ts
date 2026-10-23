/** Staged website release. Agent and payment activation remain separately gated. */
export const site = {
  brand: 'Elite Agent Hub', seller: 'Elite Impact Lab LLC',
  email: 'support@eliteagenthub.ai', phone: '(804) 223-2111', phoneE164: '+18042232111',
  policyVersion: '2026-10-23', policyUpdated: 'October 23, 2026',
  privateReview: false,
  sms: { status: 'preparing', senderEvidence: '', consentEvidence: '', deliveryEvidence: '' },
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

export const catalogVersion = '2026-10-21-approved-founding-websites-v1';
export const foundingWebsiteDefects = 'Report reproducible in-scope defects within 14 calendar days after accepted handoff. We remain responsible for correcting timely reported defects even if repairs finish after that window. This is not a refund window.';
export const foundingWebsiteCapacity = { initialCustomers: 2, maxActiveBuilds: 2, reviewBeforeTotalExtension: 5 } as const;
export const foundingWebsiteAvailability = 'Initially available to two founding customers in total across both website offers, with no more than two active builds. Project fit and a written order come first; an inquiry does not reserve a place.';
export type Offer = {
  id: string; title: string; need: string; description: string; example: string;
  once: number; monthly?: number; preparing: boolean; secondary?: boolean; founding?: boolean;
  status: string; includes: string[]; excludes: string; inputs: string; process: string;
  support: string; ownership: string; to: string; interest: string;
};
export const catalog: Offer[] = [
  { id:'page', title:'Campaign Page', need:'I need a page for one offer.',
    description:'A clear one-page website for your service or offer, with a tested way for customers to contact you.',
    example:'A painting business needs one page for an exterior-painting campaign, with a tested estimate form.',
    once:650, founding:true, preparing:false, status:'Project fit and written order first',
    includes:['One page, up to seven sections and 1,000 approved words','One form with up to five fields OR one agreed native booking path','One consolidated revision and responsive, keyboard and zoom checks','Agreed editable-source or native-editor handoff'],
    excludes:'Ecommerce, membership, custom apps, migration, multiple languages, branding strategy, traffic acquisition and ongoing search work. Hosting and domain subscriptions are separate.',
    inputs:'Your approved offer, facts, usable assets and rights, one approver, safe platform invitations and the inquiry destination.',
    process:'Agree the brief and payment milestones, build a private preview, make one consolidated revision, test the inquiry path, then accept and hand off. A delivery date is agreed after inputs and access are ready.',
    support:`${foundingWebsiteDefects} New requests or third-party changes need a separate scope.`,
    ownership:'Coded work includes the agreed editable source. Native platform work uses the editor/access/transfer route written in the order. Third-party licences remain separate.',
    to:'/landing-pages', interest:'websites' },
  { id:'website', title:'Small Business Website', need:'I need a small business website.',
    description:'Up to three clear business pages with shared navigation and one inquiry route.',
    example:'A cleaning company needs Home, Services and Contact pages, all pointing to one estimate request.',
    once:1250, founding:true, preparing:false, status:'Project fit and written order first',
    includes:['Up to three standard pages and 2,000 supplied or approved words','One shared design, navigation and inquiry integration','One consolidated revision and agreed delivery checks','Links to your approved policy material'],
    excludes:'Extra pages, ecommerce, CMS databases, migrations, custom integrations and bespoke legal drafting. Hosting, domain and premium licences are separate.',
    inputs:'Approved page content and assets, one approver, an agreed editing platform and a working inquiry destination.',
    process:'Check platform/content fit, agree the order and payment stages, review the private build, revise once, test and hand off.',
    support:`${foundingWebsiteDefects} Ongoing care is optional and separately scoped.`,
    ownership:'Customer account and domain ownership, editable source or native-editor access, backups and exit arrangements are stated in the order.',
    to:'/landing-pages', interest:'websites' },
  { id:'chat', title:'Website Chat', need:'Visitors need answers on my site.',
    description:'A chat box on your website that answers approved questions, collects inquiries and helps with appointments after testing.',
    example:'A visitor asks which services you offer, then requests a suitable appointment or a human callback.',
    once:699, monthly:349, preparing:true, status:'Preparing for testing · not available to activate',
    includes:['One business/site, one supported language and up to ten concise knowledge sources','1,000 AI responses per month, not 1,000 conversations','One native calendar lifecycle, subject to identity and action tests','250 notification text-message segments and 500 email events per month across recipients'],
    excludes:'Card collection, regulated advice, arbitrary customer-record actions, external integrations and a staffed 24-hour human desk. Website chat is separate from conversational texting.',
    inputs:'Approved business answers, one calendar and lead destination, an accountable human fallback and lawful notice/consent choices.',
    process:'Agree the scope, configure knowledge and the calendar, test booking and authorized changes plus notices and failures, then obtain written activation acceptance. No monthly service charge starts from a guessed date.',
    support:'One knowledge-change batch of up to 30 minutes per month. Ordinary monitoring/defect handling and fallback responsibilities are agreed in the order.',
    ownership:'The order names account access, records, retention, export and exit arrangements. Existing appointment changes retain a permitted human route if automation pauses.',
    to:'/chat', interest:'chat' },
  { id:'voice-chat', title:'Inbound Voice + Website Chat', need:'I miss incoming calls.',
    description:'An AI voice agent answers incoming calls using your approved answers. Website chat is included in the same package.',
    example:'While you are working, a caller explains a request and the tested service books a time or routes a callback.',
    once:999, monthly:549, preparing:true, status:'Conditional proposal · voice appointment changes unverified',
    includes:['One business, one US local number and a tested standard voice','500 provider-billed inbound minutes and 1,000 text-channel AI responses per month','Website chat included: no second chat subscription for the same service','The same 250 notification SMS segments and 500 email events per month; not a second allowance'],
    excludes:'Outbound calling, transfers, recording/transcription, premium voices, additional languages/locations and untested appointment changes. Call rounding and billable call legs must be agreed.',
    inputs:'Approved knowledge, business hours, a native calendar, a human fallback and verified number/routing and notice permissions.',
    process:'Prove incoming calls, identity checks, calendar actions, notices and failures. Native voice cancellation/rescheduling is not established: revise the scope or use an agreed human/secure-management route before an order.',
    support:'One 30-minute knowledge-change batch per month. Monitoring, support and fallback are bounded in the order; AI availability is not 24-hour human staffing.',
    ownership:'The order identifies number/account control, permitted records, access, retention, usage resets and exit arrangements.',
    to:'/voice-demo', interest:'voice' },
  { id:'text', title:'Customer Care Text Assistant', need:'Consenting customers need text help.',
    description:'AI-assisted text-message replies for customers who opted in to the agreed customer-care purpose.',
    example:'An opted-in customer asks a service question or requests an appointment change through the tested route.',
    once:299, monthly:149, preparing:true, status:'Preparing · add-on to an agreed agent service',
    includes:['Same client location, approved sender and calendar as the parent service','500 additional inbound plus outbound SMS segments per month','Up to 250 AI replies, counted within the parent 1,000-response allowance','Separate consent, opt-out, appointment-authority and delivery tests before activation'],
    excludes:'Cold outreach, marketing blasts, purchased lists, MMS, review campaigns and automatic missed-call texting. The add-on is not a standalone subscription.',
    inputs:'Purpose-specific customer consent, approved sender/registration, STOP handling, human fallback and the parent service.',
    process:'Check the actual business/sender and consent scope, configure the customer-care channel, test authorized actions and notices, then agree activation. Existing registration does not prove this channel is ready.',
    support:'Support and permitted changes are written into the parent order. No duplicate number/campaign or shared-service charge where already included.',
    ownership:'The order states who owns the sender and records, and preserves suppression and an accurate email/human fallback when SMS is unavailable.',
    to:'/pricing?section=text', interest:'follow-up' },
  { id:'review', title:'Review & Response Action Plan', need:'I want to learn from public customer reviews.',
    description:'A sourced report about public customer reviews and practical response actions. This is not a technical website audit.',
    example:'Understand recurring communication themes in accessible public reviews for one business and up to three peers.',
    once:297, preparing:true, secondary:true, status:'Proposed · full sample rehearsal required before orders',
    includes:['One location and one main public profile, up to three peers and at most 60 accessible records','A 6–8-page report, source appendix and editable five-action table','Up to three draft responses and one written clarification round'],
    excludes:'Review posting/removal, ongoing reputation management, inaccessible sources, regulated advice and revenue-loss or ranking promises.',
    inputs:'Public profile links, approved facts, the review question and one approver. No passwords or private customer records.',
    process:'Confirm source access before payment, agree the order and due date, produce and verify the sourced report, then deliver the report/table/appendix.',
    support:'One consolidated written clarification round requested within seven calendar days of delivery, plus agreed factual/source/arithmetic corrections.',
    ownership:'Report-use rights and delivery/cancellation terms belong in the accepted one-time order. No automatic renewal.',
    to:'/review-audit', interest:'review' },
  { id:'care', title:'Small Website Care', need:'I need small updates after handoff.',
    description:'Optional care for one compatible small site on customer-paid hosting.',
    example:'A monthly page check and an approved change to opening hours or service copy.',
    once:0, monthly:99, preparing:true, secondary:true, status:'Optional proposal · compatibility and support capacity first',
    includes:['One monthly smoke check','Up to 30 minutes of small content edits per month, no rollover'],
    excludes:'Redesign, new integrations, emergency response, security certification, paid hosting, domains and premium licences. No duplicate charge for care already included in another order.',
    inputs:'A compatible site, approved small changes and safe access invitations.',
    process:'Check site compatibility and available support, agree the scope and renewal/cancellation terms, then activate separately.',
    support:'The order states support responsibilities; no unstaffed response-time or resolution guarantee.',
    ownership:'Customer-paid hosting and existing domain/account ownership remain as agreed. Access and exit arrangements are documented.',
    to:'/contact?interest=websites', interest:'websites' },
];
