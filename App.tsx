import { Component, ErrorInfo, ReactNode, Suspense, lazy, useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { focusSection } from './components/SectionLink';
import { routes } from './routes';
import { site } from './site-config';
import { NativeInformationChat } from './components/AgentExperience';
import './index.css';
const pages = Object.fromEntries(routes.map(([, , , name]) => [name, lazy(() => import(`./pages/${name}.tsx`))]));
const NotFound = lazy(() => import('./pages/NotFoundPage'));
function RouteMetadata() {
  const location = useLocation();
  useEffect(() => {
    const route = routes.find(([path]) => path === location.pathname);
    document.title = `${route?.[1] || 'Page not found'} | Elite Agent Hub`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', route?.[2] || 'Find the services and contact at Elite Agent Hub.');
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', route?.[2] || 'Elite Agent Hub');
  }, [location.pathname]);
  return null;
}
function PageReady() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    const section = new URLSearchParams(search).get('section');
    if (section && document.getElementById(section)) focusSection(section);
    else { window.scrollTo(0,0); const heading = document.querySelector<HTMLElement>('main h1'); if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); } }
  }, [pathname, search]);
  return null;
}
class RouteError extends Component<{ children: ReactNode; reset: string }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(_error: Error, _info: ErrorInfo) { /* Do not log visitor fields or provider payloads. */ }
  componentDidUpdate(prev: { reset: string }) { if (prev.reset !== this.props.reset && this.state.failed) this.setState({ failed: false }); }
  render() { return this.state.failed ? <section className="wrap section"><h1 tabIndex={-1}>This page could not load.</h1><p>Your business contact is still available: <a href={`mailto:${site.email}`}>{site.email}</a>.</p><button className="button ink" onClick={() => location.reload()}>Reload this page</button></section> : this.props.children; }
}
function Shell() {
  const location = useLocation();
  return <><a className="skip" href="#main" onClick={e => { e.preventDefault(); document.getElementById('main')?.focus(); }}>Skip to content</a>
    {site.privateReview && <aside className="private-review-banner" aria-label="Private review status"><strong>Private review</strong> · Founding website prices are approved; other service prices remain proposals. Purchases and agent activation are unavailable. Existing contact and discovery calendar connect to real providers.</aside>}<Header/><RouteMetadata/>
    <main id="main" tabIndex={-1}><RouteError reset={location.pathname}><Suspense fallback={<div className="wrap section" role="status">Loading page… <a href={`mailto:${site.email}`}>Email the business</a></div>}><Routes>{routes.map(([path,,,name]) => { const Page = pages[name]; return <Route key={path} path={path} element={<Page key={path}/>}/>; })}<Route path="*" element={<NotFound/>}/></Routes><PageReady/></Suspense></RouteError></main><Footer/><NativeInformationChat/>
  </>;
}
export default function App() { return <HashRouter><Shell/></HashRouter>; }
