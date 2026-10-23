import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import SectionLink from './SectionLink';
export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  const location = useLocation();
  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    if (!open) return;
    nav.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    const click = (e: MouseEvent) => { if (!nav.current?.contains(e.target as Node) && !toggle.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('keydown', escape); document.addEventListener('click', click);
    return () => { document.removeEventListener('keydown', escape); document.removeEventListener('click', click); };
  }, [open]);
  return <header className="header"><div className="wrap header-inner">
    <Link className="brand" to="/" aria-label="Elite Agent Hub home"><img src="/assets/brand/original-eah-logo.avif" className="original-logo" width="60" height="59" alt=""/><span>Elite Agent Hub</span></Link>
    <nav ref={nav} id="site-navigation" aria-label="Main navigation" className={`navigation ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)}>
      <NavLink to="/" end>Home</NavLink><Link to="/solutions">Services</Link><Link to="/pricing">Pricing</Link><SectionLink id="work">Examples</SectionLink><Link to="/resources">Tools</Link><Link to="/faq">FAQ</Link>
    </nav><Link className="button mint header-cta" to="/book-demo">Book a discovery call</Link>
    <button ref={toggle} className="menu-toggle" type="button" aria-controls="site-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Close menu' : 'Menu'}</button>
  </div></header>;
}
