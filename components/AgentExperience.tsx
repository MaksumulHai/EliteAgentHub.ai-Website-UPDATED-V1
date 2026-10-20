import { useState } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../site-config';
import { openVerifiedChat } from '../integrations/chat-widget';
export default function AgentExperience() {
  const [message, setMessage] = useState('');
  const voiceReady = site.agent.status === 'verified' && !!site.agent.phoneE164 && !!site.agent.routingEvidence;
  const chatReady = site.chat.status === 'verified' && !!site.chat.widgetId && !!site.chat.evidence && !!site.chat.knowledgeVersion;
  const bookingReady = site.booking.status === 'verified' && !!site.booking.calendarId && !!site.booking.evidence && !!site.booking.url;
  const chat = async () => {
    setMessage('Loading the chat assistant…');
    try { await openVerifiedChat(); setMessage('Chat opened. The assistant is AI.'); }
    catch { setMessage('The chat assistant could not be opened. Please use the business contact below.'); }
  };
  return <section className="experience" id="agent-experience" tabIndex={-1} aria-labelledby="agent-title">
    <div className="section-heading"><div><p className="eyebrow">Agent demonstrations · preparing for testing</p><h2 id="agent-title">A real conversation.<br/>A useful next step.</h2></div><p>Ask about our services, scope and process. Phone and chat demonstrations are preparing for testing. You can book a human discovery conversation with us now.</p></div>
    <div className="grid three experience-grid">
      <article className="card"><span className="status">Phone demo · preparing</span><h3>Speak with our agent.</h3><p>Get an approved answer, discuss what fits, and book a discovery conversation from actual availability once tested.</p>{voiceReady ? <><a className="button ink" href={`tel:${site.agent.phoneE164}`}>Call our agent</a><p>Agent number: <a href={`tel:${site.agent.phoneE164}`}>{site.agent.phoneDisplay}</a></p></> : <button className="button" type="button" disabled aria-describedby="voice-readiness">Call our agent</button>}<p className="small" id="voice-readiness">The demo number and inbound routing must be confirmed before activation.</p></article>
      <article className="card"><span className="status">Web chat · preparing</span><h3>Ask on your terms.</h3><p>Explore the services through real website chat. The AI assistant will use approved business knowledge and provide a human fallback.</p><button className="button ink" type="button" disabled={!chatReady} aria-describedby="chat-readiness" onClick={chat}>Chat with our agent</button><p className="small" id="chat-readiness">Chat answers and in-conversation booking are preparing for testing.</p></article>
      <article className="card"><span className="status">Human discovery call</span><h3>Find a time that fits.</h3><p>Choose a time to discuss your business with us. Confirm your timezone and details in the connected calendar. This is separate from conversational AI booking.</p>{bookingReady ? <Link className="button ink" to="/book-demo">Book a discovery call</Link> : <button className="button" type="button" disabled aria-describedby="booking-readiness">Book a conversation</button>}<p className="small" id="booking-readiness">The human calendar is available. Phone-agent and chat-agent booking are preparing for testing.</p></article>
    </div><p role="status" aria-live="polite">{message}</p><p className="experience-note">You can also <Link to="/contact">discuss your business</Link>. The business contact {site.phone} is separate from the unverified agent route. Please do not provide sensitive records or payment-card details. <Link to="/privacy-policy">Privacy details</Link>.</p>
  </section>;
}
