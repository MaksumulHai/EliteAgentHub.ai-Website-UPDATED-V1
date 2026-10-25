import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { informationChatReady, site } from '../site-config';
import { loadInformationChat } from '../integrations/chat-widget';
export default function AgentExperience() {
  const voiceReady = site.agent.status === 'verified' && !!site.agent.phoneE164 && !!site.agent.routingEvidence;
  const chatReady = informationChatReady;
  const bookingReady = site.booking.status === 'verified' && !!site.booking.calendarId && !!site.booking.evidence && !!site.booking.url;
  return <section className="experience" id="agent-experience" tabIndex={-1} aria-labelledby="agent-title">
    <div className="section-heading"><div><p className="eyebrow">{chatReady ? 'Maya website chat · information only' : 'Agent demonstrations · preparing for testing'}</p><h2 id="agent-title">A real conversation.<br/>A useful next step.</h2></div><p>Ask about our services, scope and process. {chatReady ? 'Maya, our AI assistant, can answer service questions in website chat. It cannot book, change or cancel appointments. Phone-agent demonstrations remain preparing for testing.' : 'Phone and chat demonstrations are preparing for testing.'} You can book a human discovery conversation with us now.</p></div>
    <div className="grid three experience-grid">
      <article className="card"><span className="status">Phone demo · preparing</span><h3>Speak with our agent.</h3><p>Get an approved answer, discuss what fits, and book a discovery conversation from actual availability once tested.</p>{voiceReady ? <><a className="button ink" href={`tel:${site.agent.phoneE164}`}>Call our agent</a><p>Agent number: <a href={`tel:${site.agent.phoneE164}`}>{site.agent.phoneDisplay}</a></p></> : <button className="button" type="button" disabled aria-describedby="voice-readiness">Call our agent</button>}<p className="small" id="voice-readiness">The demo number and inbound routing must be confirmed before activation.</p></article>
      <article className="card"><span className="status">{chatReady ? 'Maya website chat · information only' : 'Web chat · preparing'}</span><h3>Ask on your terms.</h3><p>{chatReady ? "Maya is Elite Agent Hub’s AI assistant. Ask about our services, prices and process. Open the Maya chat button at the bottom right; use its close control to leave." : 'The AI assistant is preparing to answer from approved business knowledge with a human fallback.'}</p>{chatReady ? <Link className="button ink" to="/chat">About Maya website chat</Link> : <button className="button" type="button" disabled aria-describedby="chat-readiness">Chat with Maya</button>}<p className="small" id="chat-readiness">{chatReady ? 'Information only: no appointment actions, SMS, calls or payments. Use the separate discovery calendar to book.' : 'Website chat is preparing for testing.'}</p></article>
      <article className="card"><span className="status">Human discovery call</span><h3>Find a time that fits.</h3><p>Choose a time to discuss your business with us. Confirm your timezone and details in the connected calendar. This is separate from conversational AI booking.</p>{bookingReady ? <Link className="button ink" to="/book-demo">Book a discovery call</Link> : <button className="button" type="button" disabled aria-describedby="booking-readiness">Book a conversation</button>}<p className="small" id="booking-readiness">The human calendar is available. Phone-agent and chat-agent booking are preparing for testing.</p></article>
    </div><p className="experience-note">You can also <Link to="/contact">discuss your business</Link>. The business contact {site.phone} is separate from the unverified agent route. Please do not provide sensitive records or payment-card details. <Link to="/privacy-policy">Privacy details</Link>.</p>
  </section>;
}

/** Persist across website routes; the official widget owns its launcher and chat window. */
export function NativeInformationChat() {
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    if (!informationChatReady) return;
    let current = true;
    loadInformationChat().catch(() => { if (current) setUnavailable(true); });
    return () => { current = false; };
  }, []);
  return unavailable ? <aside className="wrap small" role="status">Maya website chat could not load. Please <Link to="/contact">contact the business</Link> or email <a href={`mailto:${site.email}`}>{site.email}</a>.</aside> : null;
}
