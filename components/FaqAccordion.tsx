import { Faq } from '../content';
export default function FaqAccordion({ items }: { items: Faq[] }) {
  return <div className="faq-items">{items.map(item => <details key={item.id}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>;
}
