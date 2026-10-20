import { Link, useLocation } from 'react-router-dom';
export function focusSection(id: string) {
  const target = document.getElementById(id);
  target?.focus({ preventScroll: true });
  target?.scrollIntoView({ block: 'start', behavior: 'auto' });
}
export default function SectionLink({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  const location = useLocation();
  return <Link className={className} to={`/?section=${id}`} onClick={event => {
    if (location.pathname === '/') { event.preventDefault(); focusSection(id); }
  }}>{children}</Link>;
}
