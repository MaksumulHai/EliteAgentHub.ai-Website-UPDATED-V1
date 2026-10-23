export default function ArrowIcon({direction='right',chevron=false}: {direction?:'left'|'right';chevron?:boolean}) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={chevron?'m9 5 7 7-7 7':'M5 12h14m-6-6 6 6-6 6'} transform={direction==='left'?'rotate(180 12 12)':undefined}/></svg>;
}
