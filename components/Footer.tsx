import { Link } from 'react-router-dom';
import { informationChatReady, site } from '../site-config';
export default function Footer() {
  return <footer className="footer"><div className="wrap footer-grid"><div>
    <Link className="brand" to="/"><img src="/assets/brand/original-eah-logo.avif" className="original-logo" width="60" height="59" alt=""/><span>{site.brand}</span></Link>
    <p>A brand of {site.seller}.</p><p>Voice · chat · websites.</p>
    <p><a href={`mailto:${site.email}`}>{site.email}</a><br/>Business contact: <a href={`tel:${site.phoneE164}`}>{site.phone}</a></p>
    <div className="registered-agent-address"><p><strong>Registered-agent address</strong><br/>8401 Mayland Dr, Suite A<br/>Henrico, VA 23294</p><p>For legal registered-agent purposes only. Not an operating office or general mailing address.</p></div>
  </div><nav aria-label="Company links"><h2>Company</h2><Link to="/solutions">Services</Link><Link to="/pricing">Scope & pricing</Link><Link to="/how-it-works">Process</Link><Link to="/about">About</Link><Link to="/faq">All FAQs</Link><Link to="/contact">Contact</Link></nav>
  <nav aria-label="Tools and guides"><h2>Tools & guides</h2><Link to="/resources">Tools & guides</Link><Link to="/roi-calculator">Missed-call opportunity planner</Link><Link to="/website-scan">Website content check</Link><Link to="/hard-facts">Understand your missed calls</Link><Link to="/review-audit">Review & response plan</Link></nav>
  <nav aria-label="Policy links"><h2>Policies</h2><Link to="/legal">Policies</Link><Link to="/privacy-policy">Privacy</Link><Link to="/terms">Service terms</Link><Link to="/refund-policy">Cancellation & refunds</Link><Link to="/acceptable-use">Acceptable use</Link><Link to="/ai-disclaimer">AI & responsibility</Link></nav></div>
  <div className="wrap footer-bottom">© {new Date().getFullYear()} {site.seller}. {informationChatReady ? 'Maya website chat provides information only. Phone-agent and conversational booking demonstrations remain preparing for testing.' : 'Agent demonstrations are preparing for testing.'} The business contact is separate from the unverified agent line.</div></footer>;
}
