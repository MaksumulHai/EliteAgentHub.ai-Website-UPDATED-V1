import { parseFixed } from './opportunity.ts';
export function stepValue(raw: string, direction: -1 | 1, step: number, max: number) {
  const value = Number(raw);
  const next = (raw.trim() && Number.isFinite(value) ? value : 0) + direction * step;
  return String(Math.round(Math.min(max, Math.max(0, next)) * 100) / 100);
}
export function calculateRecovery(atRisk: number, raw: string) {
  const share = parseFixed(raw, 100);
  if (share === null) return null;
  const recovered = atRisk * (Number(share) / 10000);
  return { recovered, remaining: Math.max(0, atRisk - recovered) };
}
