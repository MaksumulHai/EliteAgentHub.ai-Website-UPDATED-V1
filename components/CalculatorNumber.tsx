import { stepValue } from '../tools/calculatorControls';
type Props = { id: string; label: string; help: string; value: string; unit: string; max: number; sliderMax?: number; step?: number; error?: string; onChange: (value: string) => void };
export default function CalculatorNumber({ id, label, help, value, unit, max, sliderMax = max, step = 1, error, onChange }: Props) {
  const number = Number(value);
  const valid = value.trim() !== '' && Number.isFinite(number) && number >= 0 && number <= max;
  const rangeMax = Math.min(max, Math.max(sliderMax, valid ? number : 0));
  const describedBy = `${id}-help${error ? ` ${id}-error` : ''}`;
  const buttonStep = unit === 'USD' || unit === 'dollars per first job' ? 25 : 1;
  return <div className="calc-number"><label htmlFor={id}>{label}</label><div className="calc-number-entry">
    {unit !== '%' && <button type="button" aria-label={`Decrease ${label}`} onClick={() => onChange(stepValue(value, -1, buttonStep, max))}>−</button>}
    <div><input id={id} type="text" inputMode={step === 1 ? 'numeric' : 'decimal'} value={value} placeholder="Enter value" onChange={event => onChange(event.target.value)} aria-describedby={describedBy} aria-invalid={!!error}/><span aria-hidden="true">{unit}</span></div>
    {unit !== '%' && <button type="button" aria-label={`Increase ${label}`} onClick={() => onChange(stepValue(value, 1, buttonStep, max))}>+</button>}</div>
    {unit === '%' && <input className="calc-slider" type="range" min="0" max={rangeMax} step={step} value={valid ? number : 0} aria-label={`${label} slider`} aria-valuetext={valid ? `${value} ${unit}` : 'Not entered; adjust to choose a value'} aria-describedby={describedBy} onChange={event => onChange(event.target.value)}/>}
    <p id={`${id}-help`} className="small">{help}</p>{error && <p id={`${id}-error`} className="field-error">{error}</p>}</div>;
}
