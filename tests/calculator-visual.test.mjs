import {test} from 'node:test';
import assert from 'node:assert/strict';
import {calculateOpportunity, exampleOpportunity, blankOpportunity} from '../tools/opportunity.ts';
import {calculateRecovery, stepValue} from '../tools/calculatorControls.ts';
const options={mode:'quick',countMode:'daily',includeRange:false,includeCost:false};
const run=(overrides={})=>calculateOpportunity({...exampleOpportunity,...overrides},options).result;
test('Recovery is bounded within at-risk revenue and partitions it, never adds another loss',()=>{
 for(const prospect of ['0','12.5','40','100']) for(const followedUp of ['0','50','100']) for(const share of ['0','12.5','40','100']) {
  const risk=run({prospect,followedUp}).gross, out=calculateRecovery(risk,share);
  assert.ok(out.recovered>=0 && out.recovered<=risk);
  assert.ok(Math.abs(out.recovered+out.remaining-risk)<1e-6);
 }
 assert.deepEqual(calculateRecovery(2500,'50'),{recovered:1250,remaining:1250});
});
test('Zero inputs and 100 percent already helped leave no modeled risk or recovery',()=>{
 for(const field of ['dailyMissed','days','prospect','completion','value']) {
  const risk=run({[field]:'0'}).gross;
  assert.equal(risk,0);assert.deepEqual(calculateRecovery(risk,'100'),{recovered:0,remaining:0});
 }
 assert.equal(run({followedUp:'100'}).gross,0);
});
test('No invented recovery default and no silent clamping of invalid direct entry',()=>{
 assert.equal(calculateOpportunity(blankOpportunity,options).result,null);
 for(const raw of ['', '-1','101','Infinity','1e2','0.001',' ']) assert.equal(calculateRecovery(2500,raw),null);
 assert.equal(calculateOpportunity({...exampleOpportunity,prospect:''},options).result,null);
});
test('Buttons preserve decimals, respect boundaries and use only explicit activation',()=>{
 assert.equal(stepValue('12.5',1,1,100),'13.5');
 assert.equal(stepValue('0',-1,1,100),'0');assert.equal(stepValue('100',1,1,100),'100');
 assert.equal(stepValue('500',1,25,1000000),'525');assert.equal(stepValue('',1,1,100),'1');
});
test('Conditional shares applied once before recovery',()=>{
 const result=run({dailyMissed:'5',days:'20',prospect:'40',followedUp:'50',completion:'25',value:'500'});
 assert.equal(result.unique,40);assert.equal(result.alreadyFollowed,20);assert.equal(result.unhandled,20);
 assert.equal(result.gross,2500);assert.equal(calculateRecovery(result.gross,'40').recovered,1000);
});
