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
