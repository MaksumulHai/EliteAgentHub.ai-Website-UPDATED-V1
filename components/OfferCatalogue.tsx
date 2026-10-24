import { Link } from 'react-router-dom';
import ArrowIcon from './ArrowIcon';
import { catalog, foundingWebsiteAvailability, Offer, site, websiteOfferDetails } from '../site-config';

const dollars = (value: number) => new Intl.NumberFormat('en-US', { style:'currency', currency:'USD', minimumFractionDigits:0, maximumFractionDigits:2 }).format(value);
export function OfferPrice({ offer }: { offer: Offer }) {
  return <p className="offer-price"><span className="price-label">{offer.founding ? 'Founding customer price' : 'Proposed price'}</span>
    {offer.monthly ? <><strong>{offer.once ? `${dollars(offer.once)} setup` : 'No setup fee in this proposal'}</strong><span>+ {dollars(offer.monthly)} / month</span></> : <><strong>{dollars(offer.once)}</strong><span>{offer.founding ? 'one-time build' : 'one-time project'}</span></>}
  </p>;
}
export function ServiceChooser() {
  return <section className="service-chooser" aria-labelledby="chooser-title"><p className="eyebrow">A simple starting point</p><h2 id="chooser-title">Which service fits?</h2><p>Start with the problem you want to solve. You can browse before sharing contact details.</p>
    <ul className="chooser-list">{catalog.filter(offer => !offer.secondary).map(offer => <li key={offer.id}><span>{offer.need}</span><Link to={`/pricing?section=${offer.id}`}>{offer.title}<span className="service-link-arrow" aria-hidden="true"><ArrowIcon/></span></Link></li>)}</ul>
    <p className="small">Not sure yet? <Link to="/book-demo">Book a discovery call</Link>. No purchase or subscription starts from a booking.</p>
  </section>;
}
export function ServiceCards() {
  return <div className="grid three service-grid offer-summaries">{catalog.filter(offer => !offer.secondary).map(offer => <article className="service-card" key={offer.id}>
    <p className="eyebrow">{offer.title}</p><h3>{offer.need}</h3><p>{offer.description}</p><p className="small"><strong>For example:</strong> {offer.example}</p><OfferPrice offer={offer}/>{offer.founding && <p className="small">{foundingWebsiteAvailability}</p>}<p className="status">{offer.status}</p><Link to={`/pricing?section=${offer.id}`}>See what is included</Link>
  </article>)}</div>;
}
export function OfferDetail({ offer }: { offer: Offer }) {
  const website = websiteOfferDetails[offer.id];
  return <article className="card offer-detail" id={offer.id} tabIndex={-1} aria-labelledby={`offer-${offer.id}`}>
    <p className="status">{offer.status}</p><h3 id={`offer-${offer.id}`}>{offer.title}</h3><p>{offer.description}</p><OfferPrice offer={offer}/>
    {offer.founding && <p className="small">{foundingWebsiteAvailability}</p>}<p className="small"><strong>For example:</strong> {offer.example}</p><ul className="scope-list">{offer.includes.map(item => <li key={item}>{item}</li>)}</ul>
    {website?.careIncludes && <><h4>Your $250 monthly care includes</h4><ul className="scope-list">{website.careIncludes.map(item => <li key={item}>{item}</li>)}</ul><p>{website.careExamples}</p></>}
    {website && <><p><strong>{offer.monthly ? 'Continuing costs:' : 'Ongoing costs:'}</strong> {website.ongoing}</p><p><strong>{offer.monthly ? 'Setup payment:' : 'Payment:'}</strong> {website.payment}</p><p><strong>Best fit:</strong> {website.bestFit}</p>{website.total && <p className="notice small">{website.total}</p>}</>}
    <p className="small"><strong>Not included:</strong> {offer.excludes}</p>
    <details className="offer-terms"><summary>Inputs, delivery, support and ownership</summary><dl><dt>You provide</dt><dd>{offer.inputs}</dd><dt>How delivery works</dt><dd>{offer.process}</dd><dt>Revisions and support</dt><dd>{offer.support}</dd><dt>Ownership and handoff</dt><dd>{offer.ownership}</dd></dl></details>
    {!website && <p className="small">{site.privateReview && <>Payable on this preview: <strong>$0</strong>. </>} {offer.monthly ? 'Setup payment stages are agreed in writing. Monthly billing starts only after written activation acceptance; annual plans are not offered.' : `The accepted written order will set payment milestones.${site.privateReview ? ' This preview does not set a deposit or authorize a charge.' : ' An inquiry does not set a deposit or authorize a charge.'}`}</p>}
    <div className="actions"><Link className="button ink" to={`/contact?interest=${offer.interest}`}>{website?.button || (offer.preparing ? 'Discuss this proposed service' : 'Request a scope review')}</Link>{!offer.to.startsWith('/pricing') && !offer.to.startsWith('/contact') && <Link to={offer.to}>Read service details</Link>}</div>
  </article>;
}
export function PaymentJourney() {
  return <section className="payment-journey" aria-labelledby="payment-journey-title"><p className="eyebrow">From inquiry to handoff</p><h2 id="payment-journey-title">Know what happens next.</h2>
    <p className="notice">Checkout is not enabled. {site.privateReview ? 'The three website prices are locked; agent and other service prices remain proposals.' : 'All three website options require project fit, provider preflight and a complete written order before payment. Agent and review-report prices remain proposals.'} A scope request, calendar appointment or link click does not mean an order is accepted, payment received or service activated.</p>
    <ol className="journey-steps"><li><h3>Agree the work</h3><p>Confirm fit, deliverables, your inputs, provider costs and payer, price, payment stages, delivery date, acceptance, cancellation/refunds, rights, support and exit in a complete written order.</p></li>
      <li><h3>Receive the payment request</h3><p>Once the order and payment path are ready, use the verified hosted Stripe payment page or invoice for that order. Review the full initial amount, any future monthly charge and applicable taxes before paying.</p></li>
      <li><h3>Confirm payment and prepare</h3><p>Only a verified payment record counts as paid. The agreed flow must issue a receipt and onboarding checklist, record the order and alert the business. A failed payment remains unpaid; a repeated event must not create a second order.</p></li>
      <li><h3>Provide content and review</h3><p>Supply approved facts, assets, one approver and safe platform access invitations. Never send passwords or card details in an ordinary form, chat or email. Review the private work and the included revision.</p></li>
      <li><h3>Accept and hand off</h3><p>Complete the agreed checks and payment milestones. Receive the specified technical source handoff for a one-time build, or the managed launch handover and documented later technical exit. Managed care begins only at the agreed verified launch with written recurring authorization. Agent service has its own activation acceptance and passed readiness tests.</p></li></ol>
    <p>One-time projects do not create subscriptions. A managed website setup fee pays for the build and is separate from monthly care. Canceling an appointment does not cancel a service subscription. A delivered-defect correction period is separate from refund eligibility.</p>
    <p><Link to="/terms">Service terms</Link> · <Link to="/refund-policy">Cancellation and refunds</Link> · <Link to="/privacy-policy">Privacy</Link></p>
  </section>;
}
