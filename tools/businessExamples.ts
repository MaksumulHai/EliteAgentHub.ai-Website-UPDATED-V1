import { blankOpportunity, type OpportunityFields, type OpportunityOptions } from './opportunity.ts';
import { blankRates, outOfTenToPercent, percentToOutOfTen, type RateDrafts, type RateId } from './rateAdapters.ts';
import { rangeExampleValues } from './calculatorOutputs.ts';

// Fictional worked jobs and receipts, never industry averages or selling-price advice.
export const businessExamples: Record<string,{scenario:string;value:string}> = {
  "Cleaning": {
    "scenario": "One fictional standard home-cleaning visit",
    "value": "200"
  },
  "Painting": {
    "scenario": "One fictional interior painting project",
    "value": "2000"
  },
  "Auto detailing": {
    "scenario": "One fictional vehicle-detailing service",
    "value": "200"
  },
  "Lawn care and landscaping": {
    "scenario": "One fictional lawn-maintenance visit, rather than a landscaping installation",
    "value": "150"
  },
  "Pressure washing": {
    "scenario": "One fictional exterior surface-cleaning job",
    "value": "400"
  },
  "Handyman services": {
    "scenario": "One fictional small repair visit",
    "value": "250"
  },
  "Plumbing": {
    "scenario": "One fictional routine plumbing repair",
    "value": "300"
  },
  "Heating and cooling": {
    "scenario": "One fictional repair or service visit, rather than equipment replacement",
    "value": "350"
  },
  "Electrical services": {
    "scenario": "One fictional small electrical repair",
    "value": "300"
  },
  "Pest control": {
    "scenario": "One fictional first pest-treatment visit, excluding later visits",
    "value": "150"
  },
  "Carpet and upholstery cleaning": {
    "scenario": "One fictional carpet-cleaning visit",
    "value": "250"
  },
  "Junk removal": {
    "scenario": "One fictional small junk-removal pickup",
    "value": "350"
  },
  "Other service business": {
    "scenario": "One fictional first service job",
    "value": "300"
  }
};

export type CalculatorState = {
  fields:OpportunityFields; rates:RateDrafts; options:OpportunityOptions; recoveryDraft:string;
  loadedExampleId:string|null; exampleEdited:boolean;
  advancedExamples:{range:boolean;cost:boolean};
};
export const defaultCalculatorOptions: OpportunityOptions = {mode:'quick',countMode:'daily',includeRange:false,includeCost:false};
export function blankCalculatorState(): CalculatorState {
  return {fields:{...blankOpportunity},rates:{...blankRates},options:{...defaultCalculatorOptions},recoveryDraft:'',loadedExampleId:null,exampleEdited:false,advancedExamples:{range:false,cost:false}};
}
type Action =
  | {type:'field';id:keyof OpportunityFields;value:string}
  | {type:'rate';id:RateId;value:string}
  | {type:'recovery';value:string}
  | {type:'options';value:Partial<OpportunityOptions>}
  | {type:'load'} | {type:'clear'} | {type:'rangeExample'} | {type:'costExample'};

export function updateCalculator(state:CalculatorState,action:Action): CalculatorState {
  const edited = state.loadedExampleId !== null || state.exampleEdited;
  switch(action.type) {
    case 'field': return {...state,fields:{...state.fields,[action.id]:action.value},exampleEdited:action.id==='businessType'?state.exampleEdited:edited};
    case 'rate': return {...state,rates:{...state.rates,[action.id]:action.value},fields:{...state.fields,[action.id]:outOfTenToPercent(action.value)??''},exampleEdited:edited};
    case 'recovery': return {...state,recoveryDraft:action.value,exampleEdited:edited};
    case 'options': return {...state,options:{...state.options,...action.value},exampleEdited:edited};
    case 'clear': return blankCalculatorState();
    case 'rangeExample': {
      const range=rangeExampleValues(state.fields.completion);
      if(!range) return state;
      return {...state,fields:{...state.fields,...range},rates:{...state.rates,low:percentToOutOfTen(range.low)!,high:percentToOutOfTen(range.high)!},options:{...state.options,includeRange:true},advancedExamples:{...state.advancedExamples,range:true},exampleEdited:edited};
    }
    case 'costExample': return {...state,fields:{...state.fields,cost:'300',margin:'50'},options:{...state.options,includeCost:true},advancedExamples:{...state.advancedExamples,cost:true},exampleEdited:edited};
    case 'load': {
      const id=state.fields.businessType,example=Object.hasOwn(businessExamples,id)?businessExamples[id]:undefined;
      if(!example) return state;
      const next=blankCalculatorState();
      return {...next,fields:{...next.fields,businessType:id,dailyMissed:'5',days:'20',monthlyMissed:'100',prospect:'40',followedUp:'50',completion:'25',value:example.value},
        rates:{...next.rates,prospect:'4',followedUp:'5',completion:'2.5'},recoveryDraft:'2',loadedExampleId:id};
    }
  }
}

export function exampleLabel(state:CalculatorState) {
  return state.loadedExampleId ? `Fictional ${state.loadedExampleId} example${state.exampleEdited?' with your edits':''}` : 'Your entered numbers and assumptions';
}

export function contextChangeNote(state:CalculatorState) {
  return state.loadedExampleId && state.fields.businessType && state.fields.businessType!==state.loadedExampleId
    ? `You selected ${state.fields.businessType}. Your current numbers are unchanged; load its example to replace them.` : '';
}
