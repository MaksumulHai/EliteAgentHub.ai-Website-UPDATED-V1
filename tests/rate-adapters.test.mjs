import {test} from 'node:test';
import assert from 'node:assert/strict';
import {outOfTenToPercent,percentToOutOfTen,rateDescription} from '../tools/rateAdapters.ts';
import {calculateOpportunity,exampleOpportunity} from '../tools/opportunity.ts';
import {calculateRecovery} from '../tools/calculatorControls.ts';
const options={mode:'quick',countMode:'daily',includeRange:false,includeCost:false};
const rateFields=raw=>Object.fromEntries(Object.entries(raw).map(([k,v])=>[k,outOfTenToPercent(v)??'']));
const run=(raw={},overrides={},opts={})=>calculateOpportunity({...exampleOpportunity,...rateFields({prospect:'4',followedUp:'5',completion:'2.5',...raw}),...overrides},{...options,...opts});
test('Exact fixed-decimal out-of-ten adapter round trips every supported rate',()=>{
 assert.equal(outOfTenToPercent('2.537'),'25.37');assert.equal(percentToOutOfTen('25.37'),'2.537');
 assert.equal(outOfTenToPercent('0.001'),'0.01');assert.equal(percentToOutOfTen('0.01'),'0.001');
 assert.equal(outOfTenToPercent('10'),'100');assert.equal(outOfTenToPercent('0'),'0');
 assert.equal(percentToOutOfTen('25.00'),'2.5');assert.equal(outOfTenToPercent('2.500'),'25');
 for(let hundredths=0;hundredths<=10000;hundredths++){
  const percent=`${Math.floor(hundredths/100)}.${String(hundredths%100).padStart(2,'0')}`;
  assert.equal(Number(outOfTenToPercent(percentToOutOfTen(percent))),Number(percent));
 }
});
test('Blank, excess precision and invalid direct entries never round or clamp',()=>{
 for(const raw of ['', ' ', '-0.1','10.001','11','2.5371','1e1','NaN','Infinity','2.']) assert.equal(outOfTenToPercent(raw),null,raw);
 assert.equal(percentToOutOfTen('25.371'),null);
 assert.equal(run({prospect:'2.5371'}).result,null);
 assert.equal(run({prospect:''}).result,null);
});
test('Reviewed invented example preserves cohorts and yields 2500 / 500 / 2000',()=>{
 const result=run().result;
 assert.equal(result.monthlyMissed,100);assert.equal(result.unique,40);assert.equal(result.alreadyFollowed,20);
 assert.equal(result.unhandled,20);assert.equal(result.jobs,5);assert.equal(result.gross,2500);
 assert.deepEqual(calculateRecovery(result.gross,outOfTenToPercent('2')),{recovered:500,remaining:2000});
});
test('Out-of-ten edge cases preserve follow-up and conversion denominators once',()=>{
 assert.equal(run({followedUp:'10'}).result.gross,0);assert.equal(run({followedUp:'0'}).result.gross,5000);
 assert.equal(run({prospect:'0'}).result.gross,0);assert.equal(run({completion:'0'}).result.gross,0);
 assert.equal(run({prospect:'10',followedUp:'0',completion:'10'}).result.gross,50000);
 assert.equal(calculateRecovery(2500,outOfTenToPercent('0')).recovered,0);
 assert.equal(calculateRecovery(2500,outOfTenToPercent('10')).recovered,2500);
 assert.equal(run({completion:'2.537'}).result.gross,2537);
});
test('Optional out-of-ten low/high bounds and monthly alternative retain the core',()=>{
 assert.deepEqual(run({},rateFields({low:'1',high:'4'}),{includeRange:true}).result.range,{low:1000,high:4000});
 assert.ok(run({},rateFields({low:'3',high:'4'}),{includeRange:true}).errors.low);
 assert.ok(run({},rateFields({low:'1',high:'2'}),{includeRange:true}).errors.low);
 assert.equal(run({}, {},{countMode:'monthly'}).result.gross,2500);assert.equal(run({}, {days:'0'}).result.gross,0);
});
test('Human-readable assumptions keep displayed and internal units together',()=>{
 assert.equal(rateDescription('2.537'),'2.537 out of 10 (25.37%)');
 assert.equal(rateDescription('0.001'),'0.001 out of 10 (0.01%)');assert.equal(rateDescription(''),'Not entered');
});
