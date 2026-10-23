import {test} from 'node:test';
import assert from 'node:assert/strict';
import {calculateOutputs,rangeExampleValues} from '../tools/calculatorOutputs.ts';
import {blankCalculatorState,updateCalculator} from '../tools/businessExamples.ts';
import {calculateRecovery} from '../tools/calculatorControls.ts';
import {outOfTenToPercent,percentToOutOfTen} from '../tools/rateAdapters.ts';
const carpet=()=>updateCalculator(updateCalculator(blankCalculatorState(),{type:'field',id:'businessType',value:'Carpet and upholstery cleaning'}),{type:'load'});
const evaluate=(state)=>calculateOutputs(state.fields,state.options);
function optional(margin='500'){
 const state=carpet();state.options={...state.options,includeRange:true,includeCost:true};state.fields={...state.fields,low:'30',high:'30',cost:'300',margin};state.rates={...state.rates,low:'3',high:'3'};return state;
}
function basicReceipt(state,out){assert.equal(out.basic.result.gross,1250);assert.deepEqual(calculateRecovery(out.basic.result.gross,outOfTenToPercent(state.recoveryDraft)),{recovered:250,remaining:1000});assert.deepEqual(out.basic.errors,{});}
test('Reported 3/3 range and500percent margin preserve main1250/250 and hide only invalid optional outputs',()=>{
 const state=optional(),snapshot=JSON.stringify(state),out=evaluate(state);basicReceipt(state,out);
 assert.equal(out.range,null);assert.equal(out.cost,null);assert.match(out.rangeErrors.low,/main estimate of 2.5/);assert.match(out.costErrors.margin,/0 to 100%/);assert.equal(JSON.stringify(state),snapshot);
});
test('Exact followup regression: valid60percent cost shows2jobs despite invalid3/3 range',()=>{
 const state=optional('60'),out=evaluate(state);basicReceipt(state,out);assert.equal(out.range,null);
 assert.deepEqual(out.cost,{contribution:150,noCost:false,jobs:'2'});assert.deepEqual(out.costErrors,{});
});
test('Blank optional comparisons, cost and record dates do not erase a complete numerical illustration',()=>{
 const state=carpet();state.options={...state.options,mode:'records',includeRange:true,includeCost:true};const out=evaluate(state);basicReceipt(state,out);
 assert.equal(out.range,null);assert.equal(out.cost,null);assert.ok(out.rangeErrors.low&&out.rangeErrors.high&&out.costErrors.cost&&out.costErrors.margin);
 assert.equal(out.recordDatesValid,false);assert.ok(out.recordErrors.month&&out.recordErrors.cutoff);assert.match(out.periodLabel,/Provisional quick illustration/);
});
test('Record chronology and month-length errors stay provisional, while valid dates never claim independently verified records',()=>{
 const state=carpet();state.options.mode='records';state.fields.month='2026-09';state.fields.cutoff='2026-09-01';let out=evaluate(state);basicReceipt(state,out);assert.ok(out.recordErrors.cutoff);assert.equal(out.recordDatesValid,false);
 state.fields.cutoff='2026-10-07';out=evaluate(state);basicReceipt(state,out);assert.equal(out.recordDatesValid,true);assert.match(out.periodLabel,/not independently verified/);
 state.fields.month='2026-02';state.fields.cutoff='2026-03-01';state.fields.days='31';out=evaluate(state);assert.equal(out.basic.result.gross,1937.5);assert.ok(out.recordErrors.days);assert.equal(out.recordDatesValid,false);
});
test('Valid optional range and valid cost render independently from one another and from main result',()=>{
 const state=optional('60');state.fields.low='10';state.fields.high='40';const out=evaluate(state);basicReceipt(state,out);assert.deepEqual(out.range,{low:500,high:2000});assert.equal(out.cost.jobs,'2');assert.equal(out.basic.result.range,null);assert.equal(out.basic.result.cost,null);
 state.fields.cost='';const next=evaluate(state);assert.deepEqual(next.range,{low:500,high:2000});assert.equal(next.cost,null);basicReceipt(state,next);
});
test('Main invalid or blank stays truthfully unavailable, while independent cost can remain available',()=>{
 const state=optional('60');state.fields.completion='';let out=evaluate(state);assert.equal(out.basic.result,null);assert.ok(out.basic.errors.completion);assert.equal(out.range,null);assert.equal(out.cost.jobs,'2');
 state.fields.value='invalid';out=evaluate(state);assert.equal(out.basic.result,null);assert.equal(out.cost,null);assert.ok(out.costErrors.value);
});
test('Explicit fictional range examples bound the current main rate including0/10 and exact thousandths',()=>{
 const cases=[['0','0','1'],['100','9','10'],['25','1.5','3.5'],['25.37','1.537','3.537']];
 for(const [main,low,high] of cases){let state=carpet();state.fields.completion=main;state.rates.completion=percentToOutOfTen(main);state=updateCalculator(state,{type:'rangeExample'});assert.equal(state.rates.low,low);assert.equal(state.rates.high,high);assert.ok(evaluate(state).range);assert.equal(state.recoveryDraft,'2');assert.equal(state.advancedExamples.range,true);}
 assert.equal(rangeExampleValues(''),null);assert.equal(rangeExampleValues('25.371'),null);
 const state=carpet();state.fields.completion='';assert.equal(updateCalculator(state,{type:'rangeExample'}),state);
});
test('Explicit fictional cost example changes only cost/margin and retains20percent recovery',()=>{
 const state=carpet(),next=updateCalculator(state,{type:'costExample'});assert.equal(next.fields.cost,'300');assert.equal(next.fields.margin,'50');assert.equal(next.fields.value,'250');assert.equal(next.recoveryDraft,'2');assert.equal(next.advancedExamples.cost,true);assert.deepEqual(evaluate(next).cost,{contribution:125,noCost:false,jobs:'3'});basicReceipt(next,evaluate(next));
 const reset=updateCalculator(next,{type:'load'});assert.deepEqual(reset.advancedExamples,{range:false,cost:false});assert.equal(reset.fields.cost,'');assert.equal(reset.fields.margin,'');
});
test('Zero cost, zero contribution and zero main conversion keep distinct exact cost outcomes',()=>{
 const state=optional('0');assert.equal(evaluate(state).cost.jobs,null);state.fields.cost='0';assert.equal(evaluate(state).cost.noCost,true);assert.equal(evaluate(state).cost.jobs,'0');state.fields.completion='0';assert.equal(evaluate(state).basic.result.gross,0);
});
