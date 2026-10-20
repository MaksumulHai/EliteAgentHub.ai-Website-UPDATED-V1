export type ScenarioFields = Record<'month' | 'cutoff' | 'missed' | 'prospect' | 'unhandled' | 'completion' | 'value' | 'cost' | 'margin', string>;
export const blankScenario: ScenarioFields = {month:'',cutoff:'',missed:'',prospect:'',unhandled:'',completion:'',value:'',cost:'',margin:''};
export const illustrativeScenario: ScenarioFields = {month:'2026-09',cutoff:'2026-10-07',missed:'100',prospect:'40',unhandled:'50',completion:'25',value:'500',cost:'300',margin:'40'};
export function parseFixed(raw: string, max: number, whole = false): bigint | null {
  if (!(whole ? /^\d+$/ : /^\d+(?:\.\d{1,2})?$/).test(raw) || raw.length > 16) return null;
  const [integer,fraction=''] = raw.split('.');
  const n = BigInt(integer) * (whole ? 1n : 100n) + (whole ? 0n : BigInt(fraction.padEnd(2,'0')));
  return n <= BigInt(max) * (whole ? 1n : 100n) ? n : null;
}
export function calculateScenario(fields: ScenarioFields, includeCost = false) {
  const errors: Partial<Record<keyof ScenarioFields,string>> = {};
  const specs = [['missed',100000,true],['prospect',100,false],['unhandled',100,false],['completion',100,false],['value',1000000,false],...(includeCost ? [['cost',1000000,false],['margin',100,false]] : [])] as [keyof ScenarioFields,number,boolean][];
  const values: Partial<Record<keyof ScenarioFields,bigint>> = {};
  for (const [id,max,whole] of specs) {
    const n = parseFixed(fields[id],max,whole);
    if(n === null) errors[id] = `Enter ${whole ? 'a whole number' : 'a number with at most two decimal places'} from 0 to ${max.toLocaleString('en-US')}.`;
    else values[id] = n;
  }
  if (!/^[1-9]\d{3}-(0[1-9]|1[0-2])$/.test(fields.month)) errors.month = 'Choose a valid observation month.';
  const date = /^\d{4}-\d{2}-\d{2}$/.test(fields.cutoff) ? new Date(`${fields.cutoff}T00:00:00Z`) : null;
  if (!date || !Number.isFinite(date.valueOf()) || date.toISOString().slice(0,10) !== fields.cutoff) errors.cutoff = 'Choose a valid follow-up review date.';
  else if (!errors.month) {
    const [y,m] = fields.month.split('-').map(Number);
    const last = new Date(Date.UTC(y,m,0)).toISOString().slice(0,10);
    if(fields.cutoff < last) errors.cutoff = 'The review cutoff cannot precede the end of the observation month.';
  }
  if(Object.keys(errors).length) return {errors,result:null};
  const M=values.missed!,p=values.prospect!,u=values.unhandled!,b=values.completion!,V=values.value!;
  const jobsNumerator=M*p*u*b;
  const result = {unique:Number(M*p)/10000,unhandled:Number(M*p*u)/100000000,jobs:Number(jobsNumerator)/1e12,gross:Number(jobsNumerator*V)/1e14,cost:null as null | {contribution:number;jobs:string|null;noCost:boolean}};
  if(includeCost) {
    const C=values.cost!,g=values.margin!,contribution=V*g;
    result.cost={contribution:Number(contribution)/1e6,noCost:C===0n,jobs:C===0n?'0':contribution===0n?null:((C*10000n+contribution-1n)/contribution).toString()};
  }
  return {errors,result};
}
