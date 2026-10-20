import {parse} from 'parse5';
import type {DefaultTreeAdapterMap} from 'parse5';
type Node=DefaultTreeAdapterMap['node'];
type Element=DefaultTreeAdapterMap['element'];
export type Finding={id:string;label:string;status:'Detected'|'Not detected in supplied input'|'Not assessed';evidence:string;implication:string;next:string};
export type CheckReport={findings:Finding[];phrases:{phrase:string;locations:{location:string;count:number;excerpt:string}[]}[];notes:string[];mode:'html'|'text'};
const normalize=(s:string)=>s.normalize('NFKC').toLocaleLowerCase('en-US').replace(/\s+/gu,' ').trim();
const word=(s:string|undefined)=>!!s && /[\p{L}\p{N}\p{M}_]/u.test(s);
export function literalMatches(text:string,phrase:string){
  const hay=normalize(text),needle=normalize(phrase);let count=0,first=-1,start=0;
  if(!needle)return {count,excerpt:''};
  while(start<hay.length){const i=hay.indexOf(needle,start);if(i<0)break;const before=Array.from(hay.slice(Math.max(0,i-2),i)).at(-1),after=Array.from(hay.slice(i+needle.length,i+needle.length+2))[0];
    if((!word(Array.from(needle)[0])||!word(before))&&(!word(Array.from(needle).at(-1))||!word(after))){count++;if(first<0)first=i;}
    start=i+needle.length;
  }
  return {count,excerpt:first<0?'':hay.slice(Math.max(0,first-60),first+needle.length+100)};
}
const attr=(n:Element,k:string)=>n.attrs.find(a=>a.name===k)?.value || '';
const htmlNamespace='http://www.w3.org/1999/xhtml';
const excluded=new Set(['script','style','template']);
// Semantic block/line-break boundaries separate text; inline formatting preserves words.
const separated=new Set(['address','article','aside','blockquote','br','dd','details','div','dl','dt','fieldset','figcaption','figure','footer','form','h1','h2','h3','h4','h5','h6','header','hr','li','main','nav','ol','p','pre','section','summary','table','tbody','td','tfoot','th','thead','tr','ul']);
function textOf(root:Node){
  const stack:(Node|'boundary')[]=[root],pieces:string[]=[];let visited=0;
  while(stack.length){
    const n=stack.pop()!;
    if(n==='boundary'){pieces.push(' ');continue;}
    if(++visited>100000)throw Error('Supplied source is too complex. Try a smaller page section.');
    if('tagName'in n&&excluded.has(n.tagName))continue;
    if('tagName'in n&&separated.has(n.tagName)){pieces.push(' ');stack.push('boundary');}
    if(n.nodeName==='#text')pieces.push((n as DefaultTreeAdapterMap['textNode']).value);
    if('childNodes'in n)for(let i=n.childNodes.length-1;i>=0;i--)stack.push(n.childNodes[i]);
  }
  return pieces.join('').replace(/\s+/gu,' ').trim();
}
export function checkContent(input:string,mode:'html'|'text',phraseInput:string):CheckReport{
  if(!input.trim())throw Error('Paste page HTML or text before checking.');
  if(new TextEncoder().encode(input).length>1048576)throw Error('Input exceeds the 1 MiB UTF-8 limit. Paste a smaller section.');
  const rawPhrases=phraseInput.split(/\r?\n/).map(p=>p.trim()).filter(Boolean);
  if(rawPhrases.some(p=>Array.from(p).length>80))throw Error('Each target phrase must be 80 characters or fewer.');
  const phrases=[...new Map(rawPhrases.map(p=>[normalize(p),p])).values()];
  if(phrases.length>5)throw Error('Use up to five unique target phrases, one per line.');
  const findings:Finding[]=[];const notes:string[]=[];
  function finding(id:string,label:string,detected:boolean|null,evidence:string,implication:string,next:string){findings.push({id,label,status:detected===null?'Not assessed':detected?'Detected':'Not detected in supplied input',evidence:evidence.slice(0,1800),implication,next});}
  let title='',description='',headings:string[]=[],body=input;
  if(mode==='html'){
    let parseErrors=0;const tree=parse(input,{onParseError:()=>{parseErrors++;}});const nodes:Element[]=[];const ancestors=new Map<Element,Element|undefined>();const stack:[Node,Element|undefined][]=[[tree,undefined]];let visited=0;
    while(stack.length){const [n,parentForm]=stack.pop()!;let form=parentForm;if(++visited>50000)throw Error('Supplied source is too complex. Paste a smaller section.');if('tagName'in n){nodes.push(n);ancestors.set(n,parentForm);if(n.tagName==='form'&&n.namespaceURI===htmlNamespace)form=n;if(excluded.has(n.tagName))continue;}if('childNodes'in n)for(let i=n.childNodes.length-1;i>=0;i--)stack.push([n.childNodes[i],form]);}
    const named=(tag:string)=>nodes.filter(n=>n.tagName===tag);
    title=named('title').map(textOf).filter(Boolean).join(' | ');
    description=named('meta').filter(n=>attr(n,'name').toLowerCase()==='description').map(n=>attr(n,'content').trim()).filter(Boolean).join(' | ');
    const hn=nodes.filter(n=>/^h[1-6]$/.test(n.tagName));headings=hn.map(n=>`${n.tagName}: ${textOf(n)}`);
    body=named('body').map(textOf).join(' ');
    finding('title','Page title',!!title,title||'No nonempty title supplied.','A source declaration is not a ranking or index-status verdict.','Review whether the title accurately describes this page.');
    finding('description','Meta description',!!description,description||'No nonempty description supplied.','No length-based quality grade or search-display guarantee.','Review the page description against its actual scope.');
    finding('headings','Heading structure',hn.length>0,`${hn.length} headings; ${hn.filter(n=>n.tagName==='h1').length} H1 elements. ${headings.slice(0,20).join(' | ')}`,'Counts and source order do not prove visual hierarchy or rankings.','Inspect meaningful headings and reading order in the rendered page.');
    const canonical=named('link').filter(n=>attr(n,'rel').toLowerCase().split(/\s+/).includes('canonical')).map(n=>attr(n,'href')).filter(Boolean);
    const robots=named('meta').filter(n=>attr(n,'name').toLowerCase()==='robots').map(n=>attr(n,'content')).filter(Boolean);
    finding('canonical','Canonical declaration',canonical.length>0,canonical.join(' | ')||'No canonical URL declared.','The checker does not visit this URL or verify indexing.','Verify the intended canonical destination in your actual host/search setup.');
    finding('robots','Robots declaration',robots.length>0,robots.join(' | ')||'No meta-robots content declared.','Absence is not an indexing failure; robots.txt and actual index status are not assessed.','Review actual indexability using your authorized search tools.');
    const anchors=named('a'),tel=anchors.filter(n=>/^tel:/i.test(attr(n,'href'))),mail=anchors.filter(n=>/^mailto:/i.test(attr(n,'href')));
    for(const [id,label,list] of [['phone','Phone links',tel],['email','Email links',mail]] as const)finding(id,label,list.length>0,list.map(n=>`${textOf(n)} → ${attr(n,'href')}`).join(' | ')||'No matching contact link supplied.','A link does not prove ownership, routing or delivery.','Manually verify the destination and an authorized receipt path.');
    const actions=[...anchors,...named('button')].filter(n=>textOf(n).trim());
    finding('actions','Named links and buttons',actions.length>0,`${actions.length} named actions. ${actions.slice(0,20).map(n=>`${textOf(n)} → ${n.tagName==='a'?(attr(n,'href')||'(no destination)'):'button; behavior not assessed'}`).join(' | ')}`,'Source text and destinations are observations, not usable-action passes. Addresses are shown as text only and are not opened.','Test each intended action in the actual rendered page.');
    const forms=named('form').filter(n=>n.namespaceURI===htmlNamespace);const ids=new Map<string,Element>();let duplicateIds=0;
    for(const n of nodes){const id=attr(n,'id');if(id){if(ids.has(id))duplicateIds++;else ids.set(id,n);}}
    const labels=new Map<string,Element[]>();
    for(const n of named('label').filter(n=>n.namespaceURI===htmlNamespace)){const id=attr(n,'for');if(id){const list=labels.get(id)||[];list.push(n);labels.set(id,list);}}
    const owners=new Map<Element,Element[]>(forms.map(f=>[f,[]]));
    const controls=nodes.filter(n=>n.namespaceURI===htmlNamespace&&['input','textarea','select'].includes(n.tagName));
    const unowned:Element[]=[];let unresolvedExplicit=0;
    for(const control of controls){
      let owner:Element|undefined;
      if(control.attrs.some(a=>a.name==='form')){
        const explicit=ids.get(attr(control,'form'));
        owner=explicit?.tagName==='form'&&explicit.namespaceURI===htmlNamespace?explicit:undefined;
        if(!owner)unresolvedExplicit++;
      }else owner=ancestors.get(control);
      if(owner)owners.get(owner)?.push(control);else unowned.push(control);
    }
    function controlEvidence(n:Element){
      const id=attr(n,'id');
      const aria=attr(n,'aria-labelledby').split(/\s+/).filter(Boolean).map(id=>ids.get(id)).filter((x):x is Element=>!!x).map(textOf).filter(Boolean).join(' ');
      const explicit=id&&ids.get(id)===n?(labels.get(id)||[]).map(textOf).filter(Boolean).join(' '):'';
      let wrapping='';let parent:Node|undefined=n;
      while(parent&&'parentNode'in parent){parent=parent.parentNode||undefined;if(parent&&'tagName'in parent&&parent.tagName==='label'&&parent.namespaceURI===htmlNamespace&&!parent.attrs.some(a=>a.name==='for')){wrapping=textOf(parent);break;}}
      const label=aria||attr(n,'aria-label')||explicit||wrapping;
      return `name=${attr(n,'name')||'(missing)'}, type=${attr(n,'type')||n.tagName}, label=${label||'(not found; check manually)'}`;
    }
    const formEvidence=forms.map(f=>{const members=owners.get(f)||[];return `${members.length} controls (form id=${attr(f,'id')||'(unnamed)'}): ${members.slice(0,20).map(controlEvidence).join(' | ')}`;});
    const unownedEvidence=unowned.length?` ${unowned.length} controls have no resolved form owner; ${unresolvedExplicit} explicit form references are unresolved. ${unowned.slice(0,10).map(n=>`${controlEvidence(n)}, explicit form=${n.attrs.some(a=>a.name==='form')?(attr(n,'form')||'(empty)'):'(none)'}`).join(' | ')}`:'';
    finding('forms','Form controls and labels',forms.length>0,forms.length?`${forms.length} form tags. ${formEvidence.join(' / ')}${unownedEvidence}`:`No form tag supplied.${unownedEvidence}`,'An empty form is not contact readiness. Detected associations do not prove delivery, validation or full accessibility.','Run an authorized fictional inquiry and correlate durable record and intended receipt.');
    if(duplicateIds)notes.push(`${duplicateIds} duplicate ID declarations found. Associations use the first matching ID; inspect duplicates in the real page.`);
    const bookingLinks=[...anchors,...named('iframe')].filter(n=>literalMatches(`${textOf(n)} ${attr(n,'href')} ${attr(n,'src')}`,'booking').count||/\b(book|schedule|appointment|calendar)\b/i.test(`${textOf(n)} ${attr(n,'href')} ${attr(n,'src')}`));
    const bookingText=/\b(book|booking|schedule|appointment|calendar)\b/i.test(body);
    finding('booking','Booking references',bookingLinks.length>0||bookingText,bookingLinks.map(n=>`${textOf(n)} ${attr(n,'href')||attr(n,'src')}`).slice(0,12).join(' | ')||(bookingText?'Booking-related words in supplied source text.':'No booking reference supplied.'),'An embed or word is not a verified calendar, slot or appointment.','Test availability, timezone, persistence, conflicts and both receipts separately.');
    const viewport=named('meta').filter(n=>attr(n,'name').toLowerCase()==='viewport').map(n=>attr(n,'content')).filter(Boolean);
    finding('viewport','Viewport declaration',viewport.length>0,viewport.join(' | ')||'No nonempty viewport declaration.','A declaration does not prove responsive layout.','Inspect phone/tablet/desktop and zoom behavior.');
    const jsonScripts=nodes.filter(n=>n.tagName==='script'&&attr(n,'type').toLowerCase()==='application/ld+json');const types:string[]=[];let valid=0,invalid=0;
    for(const n of jsonScripts){const raw=n.childNodes.filter(x=>x.nodeName==='#text').map(x=>(x as DefaultTreeAdapterMap['textNode']).value).join('');try{const value=JSON.parse(raw);valid++;const objects=Array.isArray(value)?value:[value,...(Array.isArray(value?.['@graph'])?value['@graph']:[])];for(const o of objects.slice(0,50)){const t=o?.['@type'];if(typeof t==='string')types.push(t);else if(Array.isArray(t))types.push(...t.filter(x=>typeof x==='string'));}}catch{invalid++;}}
    finding('jsonld','JSON-LD declarations',valid>0,`${jsonScripts.length} blocks; ${valid} parse as JSON; ${invalid} JSON parse errors. Types: ${types.join(', ')||'(not declared)'}.`,'JSON syntax is not schema validation or eligibility for search/AI features. No remote contexts are fetched.','Validate the business facts and schema using an authorized validator.');
    if(parseErrors)notes.push(`HTML parser recovered from ${parseErrors} source issues (including declarations). This is not a rendered-browser or HTML-validity verdict.`);
    if(body.length<80)notes.push('Supplied source may omit content rendered by JavaScript. Supply rendered text or HTML; this source alone cannot diagnose the actual site.');
  }else{
    for(const [id,label] of [['title','Page title'],['description','Meta description'],['headings','Heading structure'],['canonical','Canonical declaration'],['robots','Robots declaration'],['phone','Phone links'],['email','Email links'],['actions','Named links and buttons'],['forms','Form controls and labels'],['booking','Booking references'],['viewport','Viewport declaration'],['jsonld','JSON-LD declarations']])finding(id,label,null,'Plain text does not supply structural evidence.','This structural check is not assessed in text mode.','Paste page HTML or inspect the rendered page for this structure.');
  }
  for(const [id,label,words] of [['services','Service references',['service','services','cleaning','painting','repair']],['area','Location or service-area references',['location','area','city','county','nationwide']],['help','FAQ / about / review references',['faq','question','questions','about','review','reviews']]] as const){const matches=words.map(w=>({word:w,...literalMatches(body,w)})).filter(v=>v.count);finding(id,label,matches.length>0,matches.map(v=>`${v.word}: ${v.count}; ${v.excerpt}`).join(' | ')||'No matching topic words found.','Literal topic markers do not establish meaning, geographic relevance, completeness or authentic reviews.','Review accurate services, area, help content and genuine source attribution manually.');}
  for(const [id,label] of [['delivery','Inquiry delivery'],['appointment','Confirmed booking'],['seo','Search rankings / index status'],['geo','AI citations / generative-engine visibility']])finding(id,label,null,'No live or provider test performed.','Source/text markers cannot prove this outcome.','Use the appropriate authorized live test or independently sourced measurement.');
  notes.push('Only supplied source/text was inspected; extracted text is not claimed to be visible under CSS. No link, embed, asset or form was loaded or followed.');
  const locations=mode==='html'?[['title',title],['meta description',description],['headings',headings.join(' ')],['source body text',body]]:[['supplied text',body]];
  return {mode,findings,notes,phrases:phrases.map(phrase=>({phrase,locations:locations.map(([location,text])=>({location,...literalMatches(text,phrase)}))}))};
}
