import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageIntro } from './RevivalPages';
import CalculatorNumber from '../components/CalculatorNumber';
import CalculatorRate from '../components/CalculatorRate';
import { OpportunityFields, OpportunityOptions } from '../tools/opportunity';
import { calculateOutputs } from '../tools/calculatorOutputs';
import { calculateRecovery } from '../tools/calculatorControls';
import { outOfTenToPercent, percentToOutOfTen, rateDescription, RateId } from '../tools/rateAdapters';
import { businessExamples, blankCalculatorState, updateCalculator, exampleLabel, contextChangeNote } from '../tools/businessExamples';

const money = (value:number) => value > 0 && value < 1 ? 'Less than $1' : new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value);
const exactMoney = (value:number) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(value);
const count = (value:number) => new Intl.NumberFormat('en-US',{maximumFractionDigits:3}).format(value);
const contexts: Record<string,string> = {
  Cleaning: "a customer's first cleaning job",
  Painting: "a customer's first painting job",
  'Auto detailing': "a customer's first detailing service",
  'Lawn care and landscaping': "a customer's first lawn-care or landscaping job",
  'Pressure washing': "a customer's first pressure-washing job",
  'Handyman services': "a customer's first handyman job",
  Plumbing: "a customer's first plumbing job",
  'Heating and cooling': "a customer's first heating or cooling service",
  'Electrical services': "a customer's first electrical job",
  'Pest control': "a customer's first pest-control visit",
  'Carpet and upholstery cleaning': "a customer's first carpet or upholstery cleaning job",
  'Junk removal': "a customer's first junk-removal job",
  'Other service business': "a customer's first job or service",
};
const labels: Partial<Record<keyof OpportunityFields,string>> = {dailyMissed:'daily missed calls',days:'working days to count',monthlyMissed:'monthly missed calls',prospect:'potential new customers',followedUp:'customers helped afterward',completion:'paying-customer estimate',value:'first-job revenue',month:'observation month',cutoff:'follow-up review date',low:'lower paying-customer estimate',high:'higher paying-customer estimate',cost:'monthly cost',margin:'contribution margin'};
const rateLabels = {
  prospect:'How many missed calls are from potential new customers?',
  followedUp:'How many did you help afterward?',
  completion:'How many would become paying customers?',
};
const rateHelp = {
  prospect:'Out of every 10 missed call attempts, how many represent different new customers asking about your service? Count each inquiry once. Leave out spam, repeat calls about the same inquiry and existing-customer support.',
  followedUp:'Out of every 10 genuine potential new customers from missed calls, how many had their inquiry handled later by phone, text, email or another route? Do not count unanswered callback attempts or conversations that left the inquiry unresolved.',
  completion:'Out of every 10 potential customers still waiting for help, estimate how many would complete and pay for a first job if their inquiry were handled. A booking or quote alone does not count.',
};
const rateUnits = {prospect:'out of 10 missed calls',followedUp:'out of 10 potential new customers',completion:'out of 10 still-unhandled inquiries'};

export default function RoiCalculatorPage() {
  const [calculator,setCalculator] = useState(blankCalculatorState);
  const {fields,rates,options,recoveryDraft,loadedExampleId,exampleEdited,advancedExamples} = calculator;
  const loadedExample = loadedExampleId ? businessExamples[loadedExampleId] : null;
  const provenanceLabel = exampleLabel(calculator);
  const selectionNote = contextChangeNote(calculator);
  const [announcement,setAnnouncement] = useState('Enter your numbers or explicitly load a fictional business example.');
  const outputs = calculateOutputs(fields,{...options,includeRange:false});
  const {errors,result} = outputs.basic;
  const recoveryPercent = outOfTenToPercent(recoveryDraft);
  const recovery = result && recoveryPercent !== null ? calculateRecovery(result.gross,recoveryPercent) : null;
  const jobPhrase = contexts[fields.businessType] || contexts['Other service business'];
  const missing = Object.keys(errors).filter(id=>!fields[id as keyof OpportunityFields]);
  const estimateAnnouncement = result
    ? `Estimate updated. Monthly revenue at risk ${money(result.gross)} from ${count(result.unhandled)} separate inquiries still needing help. ${recovery ? `Potential recoverable revenue ${money(recovery.recovered)}, assuming ${percentToOutOfTen(recoveryPercent!)} out of 10 parts, ${recoveryPercent} percent, of revenue at risk.` : 'Enter a recovery assumption out of 10 parts of revenue at risk.'}`
    : 'Estimate incomplete. Enter the required values and check input messages.';
  const optionalAnnouncement = `${outputs.costStatus?' Optional cost coverage needs attention.':''}${options.mode==='records'&&!outputs.recordDatesValid?' Provisional quick illustration; record dates or counted days need attention.':''}`;
  const announcementText = `${provenanceLabel}. ${selectionNote} ${estimateAnnouncement}${loadedExample?' Starting values are invented assumptions.':''}${optionalAnnouncement}`;
  useEffect(()=>{const timer=window.setTimeout(()=>setAnnouncement(announcementText),650);return()=>window.clearTimeout(timer);},[announcementText]);
  function edit(id:keyof OpportunityFields,value:string){setCalculator(previous=>updateCalculator(previous,{type:'field',id,value}));}
  function editRate(id:RateId,value:string){setCalculator(previous=>updateCalculator(previous,{type:'rate',id,value}));}
  function changeOptions(value:Partial<OpportunityOptions>){setCalculator(previous=>updateCalculator(previous,{type:'options',value}));}
  function editRecovery(value:string){setCalculator(previous=>updateCalculator(previous,{type:'recovery',value}));}
  function reset(){setCalculator(previous=>updateCalculator(previous,{type:'clear'}));}
  function loadExample(){setCalculator(previous=>updateCalculator(previous,{type:'load'}));}
  function loadCostExample(){setCalculator(previous=>updateCalculator(previous,{type:'costExample'}));}
  function number(id:keyof OpportunityFields,label:string,help:string,unit:string,max:number,step=1){
    return <CalculatorNumber key={id} id={`scenario-${id}`} label={label} help={help} unit={unit} value={fields[id]} max={max} step={step} error={fields[id]?(id==='cost'||id==='margin'?outputs.costErrors[id]:errors[id]):undefined} onChange={value=>edit(id,value)}/>;
  }
  function rate(id:'prospect'|'followedUp'|'completion'){
    return <CalculatorRate key={id} id={`scenario-${id}`} label={rateLabels[id]} help={rateHelp[id]} unit={rateUnits[id]} value={rates[id]} onChange={raw=>editRate(id,raw)}/>;
  }
  function date(id:'month'|'cutoff',label:string,type:string){
    const error=outputs.recordErrors[id];
    return <div className="field"><label htmlFor={`scenario-${id}`}>{label}</label><input id={`scenario-${id}`} type={type} value={fields[id]} onInput={event=>edit(id,event.currentTarget.value)} onChange={event=>edit(id,event.target.value)} aria-invalid={!!error} aria-describedby={`date-${id}`}/><p id={`date-${id}`} className={error?'field-error':'small'}>{error||(id==='cutoff'?'On or after the final day of the observation month.':'Use one month of call records.')}</p></div>;
  }
  return <><PageIntro label="Free tool · no email needed" title="What could better call handling mean for your business?"><p>Enter a few numbers to explore missed-call opportunities. The results estimate monthly revenue before expenses; they are not a sales forecast.</p></PageIntro>
    <section className="section wrap visual-calculator" aria-label="Missed-call opportunity calculator">
      <div className="calc-toolbar"><div><p className="eyebrow">Your business. Your assumptions.</p><p className="small">Inputs stay in this page’s temporary memory.</p></div><button className="button" type="button" onClick={reset}>Clear all values</button></div>
      {loadedExample&&<div className="notice calc-example"><p>Fictional {loadedExampleId} example loaded: {loadedExample.scenario}, with {exactMoney(Number(loadedExample.value))} collected before expenses. All starting values are invented. Replace them with your records or assumptions.</p>{exampleEdited&&<p>You started from invented values. Any unchanged example values remain assumptions.</p>}</div>}
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
      <div className="calc-workspace">
        <form className="calc-inputs" aria-label="Your calculator assumptions" onSubmit={event=>event.preventDefault()}>
          <div className="field"><label htmlFor="scenario-businessType">What type of business do you run? <span className="small">(optional)</span></label><select id="scenario-businessType" value={fields.businessType} onChange={event=>edit('businessType',event.target.value)} aria-describedby="business-help"><option value="">Choose your business type</option>{Object.keys(contexts).map(name=><option key={name}>{name}</option>)}</select><p className="small" id="business-help">Your selection changes the wording. Your numbers change only when you load an example or edit them.</p></div>
          <div className="calc-business-example"><button className="button ink" type="button" disabled={!fields.businessType} onClick={loadExample} aria-describedby="example-load-help">Load example for this business</button><p id="example-load-help" className="small">{fields.businessType?'Loads invented numbers for one example job and replaces your calculator inputs. These are not industry averages, recommended prices or expected results.':'Choose a business above, or choose Other service business for a general example.'}</p></div>
          {selectionNote&&<p className="calc-context-note">{selectionNote}</p>}
          <h2>1. Count missed calls</h2>
          <fieldset className="calculator-choice"><legend>Count one way</legend><label><input type="radio" name="call-count" checked={options.countMode==='daily'} onChange={()=>changeOptions({countMode:'daily'})}/> Daily average</label><label><input type="radio" name="call-count" checked={options.countMode==='monthly'} onChange={()=>changeOptions({countMode:'monthly'})}/> Monthly total</label></fieldset>
          <div className="calc-control-grid">{options.countMode==='daily'?<>{number('dailyMissed','How many calls do you miss per day?','Use an average for the days you count below. Include after-hours calls from those days once.','calls per day',10000,0.01)}{number('days','How many working days should we count this month?','Count the days included in your daily average. Leave out Sundays or weekends when your business is closed; include them if you operate then. For a total covering all days, use Monthly total instead.','days per month',31)}</>:number('monthlyMissed','How many calls did you miss this month?','Enter one monthly total, including after-hours and closed-day calls if they are in your records. Count each missed attempt once.','calls per month',100000)}</div>
          <h2>2. Identify the inquiries still needing help</h2>
          <p className="calc-rate-instruction">Use a number out of 10. Decimals are allowed: 2.5 out of 10 means 25%.</p>
          <div className="calc-control-grid">{rate('prospect')}{rate('followedUp')}</div>
          <h2>3. Estimate first-job revenue</h2>
          <div className="calc-control-grid">{rate('completion')}{number('value','What does a new customer usually spend on their first job?',`Use the amount actually collected for ${jobPhrase}, before business expenses. Exclude sales tax, refunded amounts, repeat work and future customer value.`,'dollars per first job',1000000,0.01)}</div>
          <details className="calculator-advanced" open={options.includeCost} onToggle={event=>{if(event.currentTarget.open!==options.includeCost) changeOptions({includeCost:event.currentTarget.open});}}>
            <summary>Could this cover my monthly cost?</summary>
            {options.includeCost&&<div className="calc-advanced-part"><p className="small">Optional: compare your full monthly cost with what is left from each paid first job after job-variable costs. This does not promise additional jobs will occur. Missing or invalid cost inputs do not erase the main revenue estimate.</p><button className="button calc-example-button" type="button" onClick={loadCostExample} aria-describedby="cost-example-help">Load fictional cost example</button><p id="cost-example-help" className="small">Replaces only monthly cost with $300 and contribution margin with 50%. Both are fictional inputs; no service price is inserted or justified.</p><div className="calc-control-grid">{number('cost','Total monthly solution cost','Include service, usage, staffing and allocated setup cost once. Enter dollars from 0 to 1,000,000.','USD',1000000,0.01)}{number('margin','Contribution margin (%)','Enter 0–100%. For example, 50% means $50 left per $100 of revenue after job-variable costs, before this solution cost. It is not net profit.','%',100,0.01)}</div>{advancedExamples.cost&&<p className="calc-optional-note">Cost coverage started from an explicitly loaded fictional $300 / 50% example. Current values may include your edits.</p>}</div>}
          </details>
          <details className="calculator-advanced"><summary>Add dates from my call records (optional)</summary><p className="small">Add a month and review date if you are using records. These checks do not verify the records or turn the revenue scenario into measured lost sales.</p>
            <fieldset className="calculator-choice"><legend>Scenario basis</legend><label><input type="radio" name="scenario-basis" checked={options.mode==='quick'} onChange={()=>changeOptions({mode:'quick'})}/> Quick illustration</label><label><input type="radio" name="scenario-basis" checked={options.mode==='records'} onChange={()=>changeOptions({mode:'records'})}/> Monthly records</label></fieldset>
            {options.mode==='records'&&<><div className="calc-control-grid">{date('month','Observation month','month')}{date('cutoff','Follow-up review date','date')}</div>{outputs.recordErrors.days&&<p className="field-error">{outputs.recordErrors.days} Correct the counted days above or the observation month for record-period use.</p>}<p className="calc-optional-note">{outputs.periodLabel}</p></>}
          </details>
          {missing.length>0&&<p className="small">Still needed: {missing.map(id=>labels[id as keyof OpportunityFields]).join(', ')}.</p>}
        </form>
        <aside id="calculator-results" className="calc-results" aria-label="Live monthly scenario" tabIndex={-1}>
          <p className="eyebrow">Live monthly scenario</p><p className="small calc-provenance-label">{provenanceLabel}</p>
          {loadedExample&&<div className="calc-provenance"><p>{loadedExample.scenario}. Starting first-job receipt: {exactMoney(Number(loadedExample.value))} before expenses. All starting values are invented.</p>{exampleEdited&&<p>You started from invented values. Any unchanged example values remain assumptions.</p>}</div>}
          {selectionNote&&<p className="calc-context-note">{selectionNote}</p>}
          {options.mode==='records'&&!outputs.recordDatesValid&&<p className="calc-provisional" data-testid="provisional-period">Provisional quick illustration. Record dates or counted days need attention; the numbers below are not presented as verified records.</p>}
          <article className="calc-metric calc-risk"><h2>Estimated monthly revenue at risk</h2><p className="calc-money" data-testid="revenue-at-risk">{result?money(result.gross):'$—'}</p><p>A scenario based on inquiries still needing help—not measured lost sales.</p></article>
          <article className="calc-metric calc-recovery"><h2>How much of this opportunity could better call handling recover?</h2><p className="calc-result-label">Potential recoverable revenue per month</p><p className="calc-money" data-testid="recoverable-revenue">{recovery&&recovery.recovered>0?'+':''}{recovery?money(recovery.recovered):'$—'}</p><p>If better handling recovers {recoveryPercent===null?'…':percentToOutOfTen(recoveryPercent)} out of 10 parts ({recoveryPercent??'…'}%) of that opportunity.</p>
            <CalculatorRate id="scenario-recovery" label="How much of the missed opportunity might you recover?" help="Think of the red revenue estimate as 10 equal parts. How many parts might better call handling recover? For example, 2 out of 10 means 20%. Use results from your own trial if available; otherwise, try a hypothetical assumption." unit="out of 10 parts of the revenue at risk" value={recoveryDraft} onChange={editRecovery}/>
            <p className="calc-capacity">Recovery also depends on customer interest, response timing and your capacity to do the work.</p>
          </article>
          {result&&<p className="small calc-unhandled">Your inputs leave about {count(result.unhandled)} separate inquiries still needing help each month.</p>}
          <p className="calc-remaining">Opportunity remaining under this scenario <strong>{recovery?money(recovery.remaining):'$—'}</strong></p><p className="small">The green amount is part of the red opportunity. Do not add them together.</p>
          <div className="calc-assumptions"><h3>Assumptions in view</h3><dl>
            <div><dt>Missed attempts</dt><dd>{options.countMode==='daily'?`${fields.dailyMissed||'…'} per day × ${fields.days||'…'} counted days`:`${fields.monthlyMissed||'…'} per month`}</dd></div>
            <div><dt>Different new inquiries</dt><dd>{rateDescription(rates.prospect)} of missed attempts</dd></div>
            <div><dt>Helped afterward</dt><dd>{rateDescription(rates.followedUp)} of genuine prospects removed</dd></div>
            <div><dt>Paying-customer estimate</dt><dd>{rateDescription(rates.completion)} of still-unhandled inquiries</dd></div>
            <div><dt>First-job revenue</dt><dd>{fields.value?errors.value?'Check value input':exactMoney(Number(fields.value)):'Not entered'}</dd></div>
            <div><dt>Recovery assumption</dt><dd>{rateDescription(recoveryDraft)} of revenue at risk</dd></div>
          </dl><p className="small">{outputs.periodLabel}</p><p className="small">Only inquiries actually handled afterward are removed. Reaching someone or attempting a callback alone does not count. Decimals describe proportions, not part of an individual person.</p></div>
          {!result&&<p className="calc-incomplete">Complete the visible inputs and check any input messages to see the risk estimate. Recovery also needs its own assumption. No missing input is treated as zero.</p>}
          {result&&<details className="calc-math" open><summary>See the arithmetic</summary><ol>
            <li>{options.countMode==='daily'?`${fields.dailyMissed} calls/day × ${fields.days} counted days`:`${fields.monthlyMissed} calls/month`} = {count(result.monthlyMissed)} missed attempts.</li>
            <li>× {rateDescription(rates.prospect)} of missed attempts = {count(result.unique)} distinct genuine prospects.</li>
            <li>Remove {rateDescription(rates.followedUp)} of genuine prospects whose inquiry was handled afterward ({count(result.alreadyFollowed)}). {count(result.unhandled)} still need help.</li>
            <li>× {rateDescription(rates.completion)} of still-unhandled inquiries = {count(result.jobs)} modeled completed and paid first jobs. Bookings and quotes alone do not count.</li>
            <li>× {exactMoney(Number(fields.value))} first-job revenue = {exactMoney(result.gross)} estimated revenue at risk, before business expenses.</li>
            <li>{recovery?`${exactMoney(result.gross)} × ${rateDescription(recoveryDraft)} of revenue at risk = ${exactMoney(recovery.recovered)} potentially recoverable; ${exactMoney(recovery.remaining)} remaining.`:'Enter a recovery assumption out of 10 parts of revenue at risk.'}</li>
          </ol><p className="small">Calculations keep unrounded intermediate values. Large amounts display whole dollars; this arithmetic shows cents. Fractional expected jobs are scenario values, not appointments. These estimates do not establish actual savings, profit or return on investment.</p></details>}
          {options.includeCost&&<div className="calc-extra" data-testid="cost-output"><h3>Cost coverage, separately</h3>{outputs.cost?<><p>{exactMoney(Number(fields.cost))}/month entered cost; {fields.margin}% contribution margin leaves {exactMoney(outputs.cost.contribution)} per additional paid first job after job-variable costs.</p><p>{outputs.cost.noCost?'No monthly cost to cover.':outputs.cost.jobs===null?'No finite cost coverage under these inputs.':`${outputs.cost.jobs} additional completed paid jobs would cover that cost.`}</p><p className="small">Round up(cost ÷ exact contribution per job). Independent of the call/recovery estimate; no guarantee of additional jobs, net profit or true ROI.</p></>:<p className="calc-optional-note">Cost coverage unavailable: {outputs.costStatus} The main revenue estimate is separate.</p>}{advancedExamples.cost&&<p className="small">Started from a fictional $300 / 50% cost example; current values may include your edits.</p>}</div>}
          <div className="actions"><button className="button" type="button" onClick={()=>window.print()}>Print scenario</button><Link to="/book-demo">Discuss assumptions</Link></div><p className="small">Print opens your local browser dialog. No email is sent or file saved automatically.</p>
        </aside>
      </div>
    </section>
  </>;
}
