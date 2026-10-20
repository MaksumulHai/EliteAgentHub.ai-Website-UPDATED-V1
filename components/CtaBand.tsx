import { Link } from 'react-router-dom';
export default function CtaBand() {
  return <section className="wrap section"><div className="cta-band"><div><p className="eyebrow">Start with the need</p><h2>What happens to your next inquiry?</h2><p>Tell us what your business needs. We’ll review fit, readiness and scope before an order.</p></div><Link className="button mint" to="/contact">Discuss your business</Link></div></section>;
}
