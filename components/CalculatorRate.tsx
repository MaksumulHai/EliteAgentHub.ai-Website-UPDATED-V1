import { outOfTenToPercent, percentToOutOfTen } from '../tools/rateAdapters';

type Props = { id:string; label:string; help:string; unit:string; value:string; error?:string; onChange:(value:string)=>void };

export default function CalculatorRate({id, label, help, unit, value, error, onChange}: Props) {
  const percent = outOfTenToPercent(value);
  const canonical = percent === null ? null : percentToOutOfTen(percent);
  const message = value !== '' && percent === null ? 'Enter a number from 0 to 10 with up to three decimal places.' : error;
  const describedBy = `${id}-unit ${id}-equivalent ${id}-help${message ? ` ${id}-error` : ''}`;
  return <div className="calc-number calc-rate">
    <label htmlFor={id}>{label}</label>
    <p className="calc-rate-unit" id={`${id}-unit`}>{unit}</p>
    <div className="calc-number-entry"><div><input id={id} type="text" inputMode="decimal" value={value} placeholder="Enter 0–10" onChange={event=>onChange(event.target.value)} onBlur={()=>{if(canonical !== null && canonical !== value) onChange(canonical);}} aria-describedby={describedBy} aria-invalid={!!message}/></div></div>
    <p id={`${id}-equivalent`} className="calc-rate-equivalent">{percent === null ? 'No rate entered' : `${canonical} out of 10 · ${percent}%`}</p>
    <input className="calc-slider" type="range" min="0" max="10" step="0.001" value={canonical ?? '0'} aria-label={`${label} slider`} aria-valuetext={canonical === null ? 'Not entered; adjust to choose a value' : `${canonical} out of 10, ${percent} percent`} aria-describedby={describedBy} onChange={event=>onChange(event.target.value)}/>
    <p id={`${id}-help`} className="small">{help}</p>
    {message && <p id={`${id}-error`} className="field-error">{message}</p>}
  </div>;
}
