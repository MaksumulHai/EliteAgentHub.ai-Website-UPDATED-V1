import { Link } from 'react-router-dom';
import { PageIntro } from './RevivalPages';
const resources=[
  ['Free local tool','Missed-call opportunity planner','Explore unique prospects, unhandled inquiries and a paid-job assumption. Optional cost coverage uses contribution, not gross revenue as profit.','/roi-calculator'],
  ['Free local tool','Website content check','Inspect supplied HTML or text with escaped evidence and optional literal phrase counts. URL retrieval, actual delivery, rankings and AI citations are not assessed.','/website-scan'],
  ['Free guide','Understand your missed calls','Count a month of attempts, deduplicate prospects and review later handling. Use a worked scenario and a practical measurement checklist.','/hard-facts'],
  ['Optional proposed service','Review & Response Action Plan','A bounded sourced report for one nonregulated service-business location. Orders are not yet available; source access and delivery feasibility must be confirmed first.','/review-audit'],
];
export default function ResourcesPage(){return <><PageIntro label="Tools & guides" title="Useful questions. Inspectable inputs."><p>Use the free local tools without an email gate. They help you frame a business question; they do not certify outcomes or require a paid report before discussing a service.</p></PageIntro><section className="section wrap grid two">{resources.map(([label,title,copy,to])=><article className="card" key={to}><span className="status">{label}</span><h2>{title}</h2><p>{copy}</p><Link className="button ink" to={to}>Explore {title.toLowerCase()}</Link></article>)}</section></>;}
