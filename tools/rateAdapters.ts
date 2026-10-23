import { parseFixed } from './opportunity.ts';

export const rateIds = ['prospect', 'followedUp', 'completion', 'low', 'high'] as const;
export type RateId = typeof rateIds[number];
export type RateDrafts = Record<RateId, string>;
export const blankRates: RateDrafts = { prospect:'', followedUp:'', completion:'', low:'', high:'' };

function formatScaled(value: bigint, places: number) {
  const scale = 10n ** BigInt(places);
  const fraction = (value % scale).toString().padStart(places, '0').replace(/0+$/, '');
  return `${value / scale}${fraction ? `.${fraction}` : ''}`;
}

// A thousandth of one out of ten is exactly a hundredth of one percent.
export function outOfTenToPercent(raw: string): string | null {
  if (raw.length > 16 || !/^\d+(?:\.\d{1,3})?$/.test(raw)) return null;
  const [whole, fraction = ''] = raw.split('.');
  const milli = BigInt(whole) * 1000n + BigInt(fraction.padEnd(3, '0'));
  return milli <= 10000n ? formatScaled(milli, 2) : null;
}

export function percentToOutOfTen(raw: string): string | null {
  const hundredths = parseFixed(raw, 100);
  return hundredths === null ? null : formatScaled(hundredths, 3);
}

export function rateDescription(raw: string) {
  const percent = outOfTenToPercent(raw);
  return percent === null ? 'Not entered' : `${percentToOutOfTen(percent)} out of 10 (${percent}%)`;
}
