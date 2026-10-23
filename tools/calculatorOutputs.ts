import { blankScenario, calculateOpportunity, calculateScenario, parseFixed, type OpportunityFields, type OpportunityOptions } from './opportunity.ts';
import { percentToOutOfTen } from './rateAdapters.ts';

const percentString = (value:bigint) => `${value/100n}.${(value%100n).toString().padStart(2,'0')}`;

export function rangeExampleValues(mainPercentage:string) {
  const main=parseFixed(mainPercentage,100);
  if(main===null) return null;
  const low=main>1000n?main-1000n:0n;
  const high=main<9000n?main+1000n:10000n;
  return {low:percentString(low),high:percentString(high)};
}

export function calculateOutputs(fields:OpportunityFields,options:OpportunityOptions) {
  // Numeric opportunity stays a quick illustration until entered record dates pass their own checks.
  const basic=calculateOpportunity(fields,{...options,mode:'quick',includeRange:false,includeCost:false});
  const main=parseFixed(fields.completion,100),mainRate=percentToOutOfTen(fields.completion);
  const rangeErrors: Partial<Record<'low'|'high',string>> = {};
  let range: {low:number;high:number}|null=null;
  if(options.includeRange) {
    const low=parseFixed(fields.low,100),high=parseFixed(fields.high,100);
    if(low===null) rangeErrors.low='Enter a lower comparison from 0 to 10. Leave the main estimate unchanged.';
    else if(main!==null && low>main) rangeErrors.low=`Your lower comparison is above the main estimate of ${mainRate} out of 10. Enter 0 to ${mainRate}, or deliberately edit the main estimate above.`;
    if(high===null) rangeErrors.high='Enter a higher comparison from 0 to 10. Leave the main estimate unchanged.';
    else if(main!==null && high<main) rangeErrors.high=`Your higher comparison is below the main estimate of ${mainRate} out of 10. Enter ${mainRate} to 10, or deliberately edit the main estimate above.`;
    if(!Object.keys(rangeErrors).length && basic.result) range=calculateOpportunity(fields,{...options,mode:'quick',includeRange:true,includeCost:false}).result?.range??null;
  }
  const rangeStatus=!options.includeRange?'':range?'':Object.values(rangeErrors).join(' ') || 'Complete the main inputs before calculating a comparison.';

  // Cost coverage depends only on first-job value, entered cost and contribution margin.
  // Zero call factors isolate the existing exact cost arithmetic; no call result from this run is displayed.
  const costOutcome=options.includeCost?calculateScenario({...blankScenario,missed:'0',prospect:'0',unhandled:'0',completion:'0',value:fields.value,cost:fields.cost,margin:fields.margin},true,{requireDates:false}):null;
  const costErrors: Partial<Record<'cost'|'margin'|'value',string>> = {};
  if(costOutcome?.errors.cost) costErrors.cost='Enter the full monthly solution cost from $0 to $1,000,000, with at most two decimal places.';
  if(costOutcome?.errors.margin) costErrors.margin='Enter a contribution margin from 0 to 100%. For example, 50 means $50 left per $100 after job-variable costs. 500 is not a percentage in this range.';
  if(costOutcome?.errors.value) costErrors.value='Enter a valid first-job revenue amount above to calculate cost coverage.';
  const cost=costOutcome?.result?.cost??null;
  const costStatus=options.includeCost&&!cost?Object.values(costErrors).join(' '):'';

  const records=options.mode==='records'?calculateOpportunity(fields,{...options,includeRange:false,includeCost:false}):null;
  const recordErrors: Partial<Record<'month'|'cutoff'|'days',string>> = {};
  if(records?.errors.month) recordErrors.month=records.errors.month;
  if(records?.errors.cutoff) recordErrors.cutoff=records.errors.cutoff;
  if(records?.errors.days&&!basic.errors.days) recordErrors.days=records.errors.days;
  const recordDatesValid=options.mode==='records'&&Object.keys(recordErrors).length===0;
  const periodLabel=options.mode!=='records'?'Quick illustration; no historical observation period claimed.':recordDatesValid
    ? `Entered record period: ${fields.month}; help afterward reviewed through ${fields.cutoff}. Dates pass format and chronology checks; the underlying records are not independently verified. Paid-job and recovery outcomes remain assumptions.`
    : 'Provisional quick illustration. Record dates or counted days are incomplete or invalid; correct them below before treating this as an entered record period. The numerical scenario remains visible.';
  return {basic,range,rangeErrors,rangeStatus,cost,costErrors,costStatus,recordErrors,recordDatesValid,periodLabel};
}
