import {test} from 'node:test';
import assert from 'node:assert/strict';
import {businessExamples,blankCalculatorState,updateCalculator,exampleLabel,contextChangeNote} from '../tools/businessExamples.ts';
import {calculateOpportunity} from '../tools/opportunity.ts';
import {calculateRecovery} from '../tools/calculatorControls.ts';
import {outOfTenToPercent} from '../tools/rateAdapters.ts';
const fixtures=[['Cleaning',200,1000,200,800],['Painting',2000,10000,2000,8000],['Auto detailing',200,1000,200,800],['Lawn care and landscaping',150,750,150,600],['Pressure washing',400,2000,400,1600],['Handyman services',250,1250,250,1000],['Plumbing',300,1500,300,1200],['Heating and cooling',350,1750,350,1400],['Electrical services',300,1500,300,1200],['Pest control',150,750,150,600],['Carpet and upholstery cleaning',250,1250,250,1000],['Junk removal',350,1750,350,1400],['Other service business',300,1500,300,1200]];
const select=(state,id)=>updateCalculator(state,{type:'field',id:'businessType',value:id});
const load=id=>updateCalculator(select(blankCalculatorState(),id),{type:'load'});
for(const [id,value,risk,recovered,remaining] of fixtures)test(`Fictional ${id} fixture and shared cohort arithmetic`,()=>{
 const state=load(id), result=calculateOpportunity(state.fields,state.options).result;
 assert.equal(state.fields.value,String(value));assert.equal(state.loadedExampleId,id);assert.equal(state.exampleEdited,false);
 assert.equal(result.monthlyMissed,100);assert.equal(result.unique,40);assert.equal(result.alreadyFollowed,20);assert.equal(result.unhandled,20);assert.equal(result.jobs,5);assert.equal(result.gross,risk);
 assert.deepEqual(calculateRecovery(result.gross,outOfTenToPercent(state.recoveryDraft)),{recovered,remaining});
});
test('Cleaning edit then Painting selection preserves values and Cleaning provenance until explicit load',()=>{
 let state=load('Cleaning');state=updateCalculator(state,{type:'field',id:'value',value:'240'});const before={...state.fields};
 state=select(state,'Painting');assert.deepEqual(state.fields,{...before,businessType:'Painting'});
 assert.equal(state.loadedExampleId,'Cleaning');assert.equal(state.exampleEdited,true);assert.equal(exampleLabel(state),'Fictional Cleaning example with your edits');
 assert.equal(contextChangeNote(state),'You selected Painting. Your current numbers are unchanged; load its example to replace them.');
 let result=calculateOpportunity(state.fields,state.options).result;assert.equal(result.gross,1200);assert.equal(calculateRecovery(result.gross,'20').recovered,240);
 state=updateCalculator(state,{type:'load'});assert.equal(state.loadedExampleId,'Painting');assert.equal(state.exampleEdited,false);assert.equal(state.fields.value,'2000');assert.equal(contextChangeNote(state),'');
});
test('Blank selection does not load, selection does not insert numbers, and clearing removes origin',()=>{
 const initial=blankCalculatorState();assert.equal(updateCalculator(initial,{type:'load'}),initial);
 const chosen=select(initial,'Cleaning');assert.deepEqual(chosen.fields,{...initial.fields,businessType:'Cleaning'});
 const cleared=updateCalculator(load('Cleaning'),{type:'clear'});assert.deepEqual(cleared,initial);
 assert.equal(exampleLabel(cleared),'Your entered numbers and assumptions');
});
test('Reload atomically clears records, ranges, cost, margin and edited status',()=>{
 let state=load('Cleaning');
 for(const [id,value] of Object.entries({month:'2026-09',cutoff:'2026-10-07',low:'10',high:'40',cost:'300',margin:'40'}))state=updateCalculator(state,{type:'field',id,value});
 state=updateCalculator(state,{type:'options',value:{mode:'records',countMode:'monthly',includeRange:true,includeCost:true}});
 state=updateCalculator(state,{type:'load'});
 for(const id of ['month','cutoff','low','high','cost','margin'])assert.equal(state.fields[id],'');
 assert.equal(state.rates.low,'');assert.equal(state.rates.high,'');assert.deepEqual(state.options,{mode:'quick',countMode:'daily',includeRange:false,includeCost:false});
 assert.equal(state.fields.monthlyMissed,'100');assert.equal(state.exampleEdited,false);
});
test('Rate edit retains exact core contract and invalid raw draft without stale result',()=>{
 let state=load('Cleaning');state=updateCalculator(state,{type:'rate',id:'completion',value:'2.537'});
 assert.equal(state.fields.completion,'25.37');assert.equal(state.rates.completion,'2.537');assert.equal(state.exampleEdited,true);
 state=updateCalculator(state,{type:'rate',id:'completion',value:'2.5371'});assert.equal(state.fields.completion,'');assert.equal(state.rates.completion,'2.5371');assert.equal(calculateOpportunity(state.fields,state.options).result,null);
 state=updateCalculator(state,{type:'recovery',value:''});assert.equal(state.recoveryDraft,'');assert.equal(state.loadedExampleId,'Cleaning');
});
test('Context-only change preserves unedited origin; unknown keys never load a prototype value',()=>{
 const state=select(load('Cleaning'),'Painting');assert.equal(exampleLabel(state),'Fictional Cleaning example');assert.equal(state.exampleEdited,false);
 for(const key of ['unknown','constructor','__proto__']){const invalid=select(blankCalculatorState(),key);assert.equal(updateCalculator(invalid,{type:'load'}),invalid);}
 assert.deepEqual(Object.keys(businessExamples),fixtures.map(row=>row[0]));
});
