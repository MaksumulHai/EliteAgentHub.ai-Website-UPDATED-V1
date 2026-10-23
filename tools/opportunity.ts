export type ScenarioFields = Record<'month' | 'cutoff' | 'missed' | 'prospect' | 'unhandled' | 'completion' | 'value' | 'cost' | 'margin', string>;
export const blankScenario: ScenarioFields = {month:'',cutoff:'',missed:'',prospect:'',unhandled:'',completion:'',value:'',cost:'',margin:''};
export const illustrativeScenario: ScenarioFields = {month:'2026-09',cutoff:'2026-10-07',missed:'100',prospect:'40',unhandled:'50',completion:'25',value:'500',cost:'300',margin:'40'};
export function parseFixed(raw: string, max: number, whole = false): bigint | null {
  if (!(whole ? /^\d+$/ : /^\d+(?:\.\d{1,2})?$/).test(raw) || raw.length > 16) return null;
  const [integer,fraction=''] = raw.split('.');
  const n = BigInt(integer) * (whole ? 1n : 100n) + (whole ? 0n : BigInt(fraction.padEnd(2,'0')));
  return n <= BigInt(max) * (whole ? 1n : 100n) ? n : null;
}
export function calculateScenario(fields: ScenarioFields, includeCost = false, options: { requireDates?: boolean; fractionalMissed?: boolean } = {}) {
  const errors: Partial<Record<keyof ScenarioFields,string>> = {};
  const specs = [['missed',100000,!options.fractionalMissed],['prospect',100,false],['unhandled',100,false],['completion',100,false],['value',1000000,false],...(includeCost ? [['cost',1000000,false],['margin',100,false]] : [])] as [keyof ScenarioFields,number,boolean][];
  const values: Partial<Record<keyof ScenarioFields,bigint>> = {};
  for (const [id,max,whole] of specs) {
    const n = parseFixed(fields[id],max,whole);
    if(n === null) errors[id] = `Enter ${whole ? 'a whole number' : 'a number with at most two decimal places'} from 0 to ${max.toLocaleString('en-US')}.`;
    else values[id] = n;
  }
  if (options.requireDates !== false) {
  if (!/^[1-9]\d{3}-(0[1-9]|1[0-2])$/.test(fields.month)) errors.month = 'Choose a valid observation month.';
  const date = /^\d{4}-\d{2}-\d{2}$/.test(fields.cutoff) ? new Date(`${fields.cutoff}T00:00:00Z`) : null;
  if (!date || !Number.isFinite(date.valueOf()) || date.toISOString().slice(0,10) !== fields.cutoff) errors.cutoff = 'Choose a valid follow-up review date.';
  else if (!errors.month) {
    const [y,m] = fields.month.split('-').map(Number);
    const last = new Date(Date.UTC(y,m,0)).toISOString().slice(0,10);
    if(fields.cutoff < last) errors.cutoff = 'The review cutoff cannot precede the end of the observation month.';
  }
  }
  if(Object.keys(errors).length) return {errors,result:null};
  const M=values.missed!,p=values.prospect!,u=values.unhandled!,b=values.completion!,V=values.value!;
  const jobsNumerator=M*p*u*b;
  const countScale=options.fractionalMissed ? 100 : 1;
  const result = {unique:Number(M*p)/(10000*countScale),unhandled:Number(M*p*u)/(100000000*countScale),jobs:Number(jobsNumerator)/(1e12*countScale),gross:Number(jobsNumerator*V)/(1e14*countScale),cost:null as null | {contribution:number;jobs:string|null;noCost:boolean}};
  if(includeCost) {
    const C=values.cost!,g=values.margin!,contribution=V*g;
    result.cost={contribution:Number(contribution)/1e6,noCost:C===0n,jobs:C===0n?'0':contribution===0n?null:((C*10000n+contribution-1n)/contribution).toString()};
  }
  return {errors,result};
}

export type OpportunityFields = Record<'businessType' | 'month' | 'cutoff' | 'dailyMissed' | 'days' | 'monthlyMissed' | 'prospect' | 'followedUp' | 'completion' | 'value' | 'low' | 'high' | 'cost' | 'margin', string>;
export type OpportunityOptions = { mode:'quick'|'records'; countMode:'daily'|'monthly'; includeRange:boolean; includeCost:boolean };
export const blankOpportunity: OpportunityFields = { businessType:'', month:'', cutoff:'', dailyMissed:'', days:'', monthlyMissed:'', prospect:'', followedUp:'', completion:'', value:'', low:'', high:'', cost:'', margin:'' };
export const exampleOpportunity: OpportunityFields = { ...blankOpportunity, businessType:'Illustrative service business', month:'2026-09', cutoff:'2026-10-07', dailyMissed:'5', days:'20', monthlyMissed:'100', prospect:'40', followedUp:'50', completion:'25', value:'500', low:'10', high:'40', cost:'300', margin:'40' };
const decimal = (hundredths: bigint) => `${hundredths / 100n}.${(hundredths % 100n).toString().padStart(2,'0')}`;
export function calculateOpportunity(fields: OpportunityFields, options: OpportunityOptions) {
  const errors: Partial<Record<keyof OpportunityFields,string>> = {};
  let monthly: bigint | null = null;
  const countId = options.countMode === 'daily' ? 'dailyMissed' : 'monthlyMissed';
  if (options.countMode === 'daily') {
    const daily = parseFixed(fields.dailyMissed,10000);
    const days = parseFixed(fields.days,31,true);
    if (daily === null) errors.dailyMissed = 'Enter daily missed calls from 0 to 10,000, with at most two decimal places.';
    if (days === null) errors.days = 'Enter a whole number of counted days from 0 to 31.';
    if (daily !== null && days !== null) monthly = daily * days;
    if (options.mode === 'records' && /^[1-9]\d{3}-(0[1-9]|1[0-2])$/.test(fields.month) && days !== null) {
      const [year,month] = fields.month.split('-').map(Number);
      if (days > BigInt(new Date(Date.UTC(year,month,0)).getUTCDate())) errors.days = 'Counted days cannot exceed the days in your observation month.';
    }
  } else {
    const missed = parseFixed(fields.monthlyMissed,100000,true);
    if (missed === null) errors.monthlyMissed = 'Enter a whole monthly total from 0 to 100,000.';
    else monthly = missed * 100n;
  }
  if (monthly !== null && monthly > 10000000n) errors[countId] = 'The calculated monthly total must not exceed 100,000 missed calls.';
  const followed = parseFixed(fields.followedUp,100);
  if (followed === null) errors.followedUp = 'Enter the share already followed up, from 0 to 100%. Use an explicit assumption if you do not know.';
  const scenario: ScenarioFields = { month:fields.month, cutoff:fields.cutoff, missed:monthly === null ? '' : decimal(monthly), prospect:fields.prospect,
    unhandled:followed === null ? '' : decimal(10000n-followed), completion:fields.completion, value:fields.value, cost:fields.cost, margin:fields.margin };
  const coreOptions = { requireDates:options.mode === 'records', fractionalMissed:true };
  const outcome = calculateScenario(scenario,options.includeCost,coreOptions);
  for (const [key,message] of Object.entries(outcome.errors)) {
    if (key === 'missed') { if (!errors[countId]) errors[countId] = message; }
    else if (key !== 'unhandled') errors[key as keyof OpportunityFields] = message;
  }
  let range: {low:number;high:number} | null = null;
  if (options.includeRange) {
    const low = parseFixed(fields.low,100), high = parseFixed(fields.high,100), base = parseFixed(fields.completion,100);
    if (low === null) errors.low = 'Enter a lower paid-job assumption from 0 to 100%.';
    if (high === null) errors.high = 'Enter a higher paid-job assumption from 0 to 100%.';
    if (low !== null && high !== null && base !== null && (low > base || high < base)) errors.low = 'The lower assumption must be at or below your main assumption, and the higher assumption at or above it.';
    if (low !== null && high !== null) {
      const lower = calculateScenario({...scenario,completion:fields.low},false,coreOptions).result;
      const upper = calculateScenario({...scenario,completion:fields.high},false,coreOptions).result;
      if (lower && upper) range = {low:lower.gross,high:upper.gross};
    }
  }
  if (Object.keys(errors).length || !outcome.result || monthly === null) return {errors,result:null};
  return {errors,result:{...outcome.result,monthlyMissed:Number(monthly)/100,alreadyFollowed:outcome.result.unique-outcome.result.unhandled,range}};
}
