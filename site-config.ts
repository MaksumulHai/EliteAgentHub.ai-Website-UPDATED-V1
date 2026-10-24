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

export const catalogVersion = '2026-10-23-locked-three-website-options-v2';
export const foundingWebsiteDefects = 'Report reproducible in-scope defects within 14 calendar days after accepted handoff. We remain responsible for correcting timely reported defects even if repairs finish after that window. This is not a refund window.';
export const foundingWebsiteCapacity = { initialCustomers: 2, maxActiveBuilds: 2, reviewBeforeTotalExtension: 5 } as const;
export const foundingWebsiteAvailability = 'Initially available to two founding customers in total across all three website options, with no more than two active builds. Project fit and a written order come first; an inquiry does not reserve a place.';
export type Offer = {
  id: string; title: string; need: string; description: string; example: string;
  once: number; monthly?: number; preparing: boolean; secondary?: boolean; founding?: boolean;
  status: string; includes: string[]; excludes: string; inputs: string; process: string;
  support: string; ownership: string; to: string; interest: string;
};
export const catalog: Offer[] = [
  {
  "id": "page",
  "title": "Campaign Landing Page",
  "need": "I need a page for one offer.",
  "description": "A focused page for one service, offer or campaign, with one clear way for visitors to respond.",
  "example": "A painting business needs one page for an exterior-painting campaign, with a tested estimate form.",
  "once": 650,
  "founding": true,
  "preparing": false,
  "status": "Project fit and complete written order first",
  "includes": [
    "One page, up to seven main sections and 1,000 approved words.",
    "One inquiry form with up to five fields or one agreed booking route for one staff member and appointment type.",
    "One consolidated revision before acceptance.",
    "Responsive, keyboard and zoom checks, plus an agreed test of the actual inquiry or booking destination.",
    "Agreed website source, assets and build instructions at handoff."
  ],
  "excludes": "AI chat, voice calling, SMS, advertising, ongoing SEO/content campaigns, ecommerce, a visual CMS, custom applications, new integrations and legal drafting.",
  "inputs": "Approved facts, content and assets with usage rights, one approver, compatible scoped access and the agreed inquiry destination.",
  "process": "Agree the complete written order and provider route, build a private preview, make one consolidated revision, verify the agreed website and inquiry checks, obtain written preview acceptance, then publish or hand off after the agreed payment.",
  "support": `${foundingWebsiteDefects} Later discretionary changes are separately quoted.`,
  "ownership": "Coded templates with the agreed source, assets and build instructions. The order states paid website rights, reusable/third-party licences, domain/account access, recovery duties and technical handoff or exit.",
  "to": "/landing-pages",
  "interest": "websites"
},
  {
  "id": "website",
  "title": "Small Business Website",
  "need": "I need a small business website.",
  "description": "Introduce your business, explain your services and make it easy to get in touch across up to three connected pages.",
  "example": "A cleaning company needs up to three connected pages and one estimate route.",
  "once": 1250,
  "founding": true,
  "preparing": false,
  "status": "Project fit and complete written order first",
  "includes": [
    "Up to three named standard pages and 2,000 approved words across the site.",
    "One shared design and navigation; Home, Services and Contact are examples, not mandatory page choices.",
    "One inquiry form with up to five fields or one agreed booking route for one staff member and appointment type, shared across the site.",
    "One consolidated revision, agreed website/inquiry checks and technical handoff.",
    "Links to your approved policy material; any policy page must fit the agreed page/content scope or be separately scoped."
  ],
  "excludes": "AI chat, voice calling, SMS, advertising, ongoing SEO/content campaigns, ecommerce, a visual CMS, custom applications, new integrations and legal drafting.",
  "inputs": "Approved facts, content and assets with usage rights, one approver, compatible scoped access and the agreed inquiry destination.",
  "process": "Agree the complete written order and provider route, build a private preview, make one consolidated revision, verify the agreed website and inquiry checks, obtain written preview acceptance, then publish or hand off after the agreed payment.",
  "support": `${foundingWebsiteDefects} Later discretionary changes are separately quoted.`,
  "ownership": "Coded templates with the agreed source, assets and build instructions. The order states paid website rights, reusable/third-party licences, domain/account access, recovery duties and technical handoff or exit.",
  "to": "/landing-pages",
  "interest": "websites"
},
  {
  "id": "managed-website",
  "title": "Managed Small Business Website",
  "need": "I want a website with ongoing help.",
  "description": "We build your small website, then handle the agreed hosting, scheduled checks, operating support and a limited monthly batch of changes.",
  "example": "A small service business wants agreed hosting, monthly checks and one bounded edit batch.",
  "once": 999,
  "monthly": 250,
  "founding": true,
  "preparing": false,
  "status": "Project fit and complete written order first",
  "includes": [
    "Up to three named standard pages and 2,000 approved words total, using one shared design and navigation.",
    "One inquiry form with up to five fields or one agreed booking route for one staff member and appointment type.",
    "One consolidated revision, agreed website/inquiry checks and a launch handover explaining access and responsibilities."
  ],
  "excludes": "AI chat, voice calling, SMS, advertising, ongoing SEO/content campaigns, ecommerce, a visual CMS, custom applications, new integrations and legal drafting.",
  "inputs": "Approved facts, content and assets with usage rights, one approver, compatible scoped access and the agreed inquiry destination.",
  "process": "Agree the complete written order and provider route, build a private preview, make one consolidated revision, verify the agreed website and inquiry checks, obtain written preview acceptance, then publish or hand off after the agreed payment.",
  "support": "The managed order states launch handover, correction, support and technical-exit responsibilities. Correcting our own errors does not consume routine edits.",
  "ownership": "Coded templates with the agreed source, assets and build instructions. The order states paid website rights, reusable/third-party licences, domain/account access, recovery duties and technical handoff or exit.",
  "to": "/landing-pages",
  "interest": "websites"
},
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

];

export const websiteOfferDetails: Record<string, {payment: string; ongoing: string; bestFit: string; button: string; careIncludes?: string[]; careExamples?: string; total?: string}> = {
  "page": {
    "payment": "$325 after complete order acceptance and before work; $325 after written preview acceptance, before publication or final handoff.",
    "ongoing": "You pay hosting and domain renewal directly. Any continuing form/calendar subscription or usage is identified before you order. Future discretionary changes are separately quoted; no EAH monthly care subscription is required.",
    "bestFit": "One offer or a simple business presence, with someone available to handle future technical changes.",
    "button": "Discuss a one-page website"
  },
  "website": {
    "payment": "$625 after complete order acceptance and before work; $625 after written preview acceptance, before publication or final handoff.",
    "ongoing": "You pay hosting and domain renewal directly. Any continuing form/calendar subscription or usage is identified before you order. Future discretionary changes are separately quoted; no EAH monthly care subscription is required.",
    "bestFit": "A business wanting a small website and control of its ongoing provider arrangements, with a technical maintainer for later code changes.",
    "button": "Discuss a small business website"
  },
  "managed-website": {
    "payment": "$499.50 after complete order acceptance and before work; $499.50 after written preview acceptance, before publication or final handoff. Monthly care begins only on the agreed, successfully verified launch date with written recurring authorization. No care charge starts merely because a deposit is paid or a preview is ready.",
    "ongoing": "Domain registration/renewal, applicable tax and separately agreed premium licences or metered provider charges are additional. Included hosting and agreed platform access are not charged a second time. Any additional cost and payer are identified before authorization.",
    "bestFit": "A business that wants EAH to operate its agreed site and inquiry route and handle bounded changes. If you expect few changes and prefer to manage your own providers, consider the one-time build.",
    "button": "Discuss a managed website",
    "careIncludes": [
      "Commercial website hosting and the agreed GHL form/calendar service access.",
      "One recorded monthly website and inquiry-route check.",
      "Maintaining the agreed source/recovery materials and operating support within the written scope.",
      "One consolidated routine edit batch taking up to 30 minutes total per month across the whole site, including implementation, checking and request communication. No rollover."
    ],
    "careExamples": "Routine edits can include supplied image swaps, approved service wording, a few supplied FAQs in an existing section, or replacement of supplied policy text on an existing page, where the work fits the allowance. We confirm scope before work that exceeds it. Correcting our own errors does not consume your routine edit allowance.",
    "total": "If you keep care for twelve monthly periods, the total is $3,999: $999 setup + $3,000 care, before separately stated extras. This is a comparison total, not an annual minimum or a build-only price. Care is month-to-month; cancellation and refunds follow the accepted order and published policy. No annual plan is offered."
  }
};

export const websiteSharedDetails = {
  "Clear limits": "Website packages do not include AI chat, voice calling, SMS, advertising, ongoing SEO/content campaigns, ecommerce, a visual CMS, custom applications, new integrations or legal drafting. Additional work requires an agreed quote. Supplying a policy's wording is different from asking us to draft or review legal terms. You approve business claims and asset rights; EAH remains responsible for its agreed work and checks.",
  "Editing and ownership": "These offers use coded templates. EAH or a developer handles code changes; delivered source is not a drag-and-drop editor. You retain your domain, supplied business content and business records. The written order states your rights to the paid website, reusable/third-party asset licences, account access, backup duties and exit package. Managed care can end with a technical handoff to you or a successor; that does not automatically keep every connected service running.",
  "Connected forms and calendars": "A GHL form or calendar needs an active supporting service. For one-time handoff or an exit from managed care, agree a paid provider/transfer arrangement or replacement before that service stops. Your own GHL subscription currently starts at $97/month plus applicable usage; another provider or agency may have different costs. We confirm the actual route and payer before you order. No indefinite free GHL service is implied.",
  "Availability": "Initially available to two founding customers total across all three website options, with no more than two active builds. Fit, capacity and a complete written order come first; an inquiry does not reserve a place. Delivery dates are agreed after complete inputs and compatible access are confirmed.",
  "Standalone defect support": "Report reproducible in-scope defects within 14 calendar days after accepted handoff. Timely reported corrections remain owed afterward. This is not a refund window. Managed-care correction and launch/exit responsibilities are expressly recorded in its order; EAH errors are separate from routine edits."
};
