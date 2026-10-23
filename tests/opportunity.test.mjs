import {test} from 'node:test';
import assert from 'node:assert/strict';
import {calculateScenario,illustrativeScenario,blankScenario} from '../tools/opportunity.ts';
const run=(overrides={},cost=false)=>calculateScenario({...illustrativeScenario,...overrides},cost);
test('C01–C06: monthly opportunity, fractional jobs, dedup and zero factors',()=>{
  assert.deepEqual(run().result,{unique:40,unhandled:20,jobs:5,gross:2500,cost:null});
  const f=run({missed:'37',unhandled:'65',value:'480'}).result;
  assert.equal(f.jobs,2.405);assert.equal(f.gross,1154.4);
  assert.equal(run({missed:'10',prospect:'40',unhandled:'50',completion:'50',value:'200'}).result.gross,200);
  for(const k of ['missed','prospect','unhandled','completion'])assert.equal(run({[k]:'0'}).result.gross,0);
  assert.equal(run({value:'0'}).result.jobs,5);
  assert.equal(run({prospect:'100',unhandled:'100',completion:'100'}).result.gross,50000);
});
test('C07: invalid raw input and dates never substitute defaults',()=>{
  assert.equal(calculateScenario(blankScenario).result,null);
  for(const value of ['', '-1','101','Infinity','1e2','<script>','1.','0.001'])assert.ok(run({prospect:value}).errors.prospect);
  assert.ok(run({missed:'2.5'}).errors.missed);assert.ok(run({value:'1000001'}).errors.value);
  assert.ok(run({cutoff:'2026-09-29'}).errors.cutoff);assert.ok(run({cutoff:'2026-09-31'}).errors.cutoff);
  assert.deepEqual(run({cutoff:'2026-09-30'}).errors,{});
});
test('C09–C11: decimal-safe contribution cost coverage including exact and zero cases',()=>{
  assert.deepEqual(run({},true).result.cost,{contribution:200,noCost:false,jobs:'2'});
  assert.equal(run({cost:'600',value:'250',margin:'40'},true).result.cost.jobs,'6');
  assert.equal(run({cost:'0'},true).result.cost.noCost,true);
  for(const k of ['value','margin'])assert.equal(run({[k]:'0'},true).result.cost.jobs,null);
  assert.equal(run({cost:'0.30',value:'0.10',margin:'100'},true).result.cost.jobs,'3');
});

const {calculateOpportunity,blankOpportunity,exampleOpportunity}=await import('../tools/opportunity.ts');
const quick={mode:'quick',countMode:'daily',includeRange:false,includeCost:false};
const opportunity=(fields={},options={})=>calculateOpportunity({...exampleOpportunity,...fields},{...quick,...options});
test('Daily and monthly counting agree; already-followed-up prospects are removed',()=>{
  const daily=opportunity().result;
  assert.equal(daily.monthlyMissed,100);assert.equal(daily.unique,40);assert.equal(daily.alreadyFollowed,20);assert.equal(daily.unhandled,20);assert.equal(daily.jobs,5);assert.equal(daily.gross,2500);
  assert.deepEqual(opportunity({}, {countMode:'monthly'}).result,daily);
  assert.equal(opportunity({followedUp:'100'}).result.gross,0);
  assert.equal(opportunity({followedUp:'0'}).result.gross,5000);
});
test('Daily decimal averages and fractional follow-up shares retain unrounded arithmetic',()=>{
  const value=opportunity({dailyMissed:'2.5',days:'12',prospect:'40',followedUp:'50',completion:'25',value:'500'}).result;
  assert.equal(value.monthlyMissed,30);assert.equal(value.jobs,1.5);assert.equal(value.gross,750);
  const fractional=opportunity({dailyMissed:'1',days:'1',prospect:'100',followedUp:'12.5',completion:'100',value:'100'}).result;
  assert.equal(fractional.unhandled,0.875);assert.equal(fractional.gross,87.5);
});
test('No silent defaults for unknown percentages, counts or values',()=>{
  assert.equal(calculateOpportunity(blankOpportunity,quick).result,null);
  for(const field of ['dailyMissed','days','prospect','followedUp','completion','value'])assert.ok(opportunity({[field]:''}).errors[field]);
  for(const bad of ['101','-1','Infinity','1e2','0.001'])assert.ok(opportunity({followedUp:bad}).errors.followedUp);
  assert.ok(opportunity({days:'2.5'}).errors.days);
  assert.ok(opportunity({monthlyMissed:'1.5'},{countMode:'monthly'}).errors.monthlyMissed);
  assert.ok(opportunity({dailyMissed:'10000',days:'31'}).errors.dailyMissed);
});
test('Quick mode needs no dates; records mode validates dates and actual counted days',()=>{
  assert.equal(opportunity({month:'',cutoff:''}).result.gross,2500);
  assert.ok(opportunity({month:'',cutoff:''},{mode:'records'}).errors.month);
  assert.ok(opportunity({cutoff:'2026-09-29'},{mode:'records'}).errors.cutoff);
  assert.ok(opportunity({month:'2026-02',cutoff:'2026-03-01',days:'31'},{mode:'records'}).errors.days);
  assert.ok(opportunity({month:'2026-02',cutoff:'2026-03-01',days:'28'},{mode:'records'}).result);
});
test('Editable assumption range uses the same follow-up share; rejects inconsistent ends',()=>{
  assert.deepEqual(opportunity({}, {includeRange:true}).result.range,{low:1000,high:4000});
  assert.deepEqual(opportunity({followedUp:'100'}, {includeRange:true}).result.range,{low:0,high:0});
  assert.ok(opportunity({low:'30'},{includeRange:true}).errors.low);
  assert.ok(opportunity({high:'20'},{includeRange:true}).errors.low);
  assert.ok(opportunity({low:''},{includeRange:true}).errors.low);
  assert.equal(opportunity({low:'',high:''}).result.range,null);
});
test('Optional cost uses contribution, not gross revenue or a hidden plan price',()=>{
  assert.deepEqual(opportunity({}, {includeCost:true}).result.cost,{contribution:200,noCost:false,jobs:'2'});
  assert.equal(opportunity({cost:'0.30',value:'0.10',margin:'100'},{includeCost:true}).result.cost.jobs,'3');
  assert.equal(opportunity({margin:'0'},{includeCost:true}).result.cost.jobs,null);
  assert.equal(opportunity({cost:'0'},{includeCost:true}).result.cost.jobs,'0');
  assert.equal(opportunity({cost:'',margin:''}).result.cost,null);
});
test('Business context never injects industry assumptions',()=>{
  assert.deepEqual(opportunity({businessType:'Painting'}).result,opportunity({businessType:'Cleaning'}).result);
});
