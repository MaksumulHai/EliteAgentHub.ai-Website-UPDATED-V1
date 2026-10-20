import {test} from 'node:test';
import assert from 'node:assert/strict';
import {checkContent,literalMatches} from '../tools/content-check.ts';
const finding=(report,id)=>report.findings.find(f=>f.id===id);
test('S01–S03: empty/oversize and script/comment/empty-element bait',()=>{
  assert.throws(()=>checkContent('', 'html',''),/Paste/);
  assert.throws(()=>checkContent('é'.repeat(524289),'text',''),/1 MiB/);
  const r=checkContent('<!-- <title>Cleaning</title><a href="tel:123">Phone</a> --><script>booking = "<form>services</form>"</script><style>.service{}</style><template><a href="tel:123">Phone</a></template><title> </title><meta name="description" content=" "><form></form>','html','booking');
  for(const id of ['phone','booking','title','description','services'])assert.equal(finding(r,id).status,'Not detected in supplied input');
  assert.match(finding(r,'forms').evidence,/0 controls/);assert.match(finding(r,'forms').implication,/empty form/);
  assert.equal(r.phrases[0].locations.reduce((n,l)=>n+l.count,0),0);
});
test('S04/S07: real markers are observations, unsafe markup stays inert data',()=>{
  globalThis.__contentCheckExecuted=false;
  const r=checkContent('<title>Cleaning service</title><meta name="description" content="Office cleaning"><h1>Office cleaning</h1><a href="tel:+18040000000">Call</a><a href="javascript:globalThis.__contentCheckExecuted=true">Book</a><img src="https://invalid.example/track" onerror="globalThis.__contentCheckExecuted=true"><iframe src="https://invalid.example/calendar"></iframe><form><label for="email">Reply address</label><input id="email" name="email" type="email"><button>Send</button></form><meta name="viewport" content="width=device-width"><script type="application/ld+json">{"@type":"LocalBusiness","@context":"https://invalid.example/schema"}</script>','html','cleaning');
  for(const id of ['title','description','headings','phone','actions','forms','booking','viewport','jsonld'])assert.equal(finding(r,id).status,'Detected');
  for(const id of ['delivery','appointment','seo','geo'])assert.equal(finding(r,id).status,'Not assessed');
  assert.match(finding(r,'actions').evidence,/javascript:/);assert.match(finding(r,'forms').evidence,/label=Reply address/);
  assert.equal(globalThis.__contentCheckExecuted,false);assert.ok(r.phrases[0].locations.every(l=>l.count===1));
});
test('S05/S06/S08: text/source limits and literal normalized phrase counts',()=>{
  const r=checkContent('Our cleaning services serve your county. FAQ and reviews.','text','Cleaning\ncleaning\nCounty');
  assert.equal(r.phrases.length,2);assert.equal(finding(r,'title').status,'Not assessed');assert.equal(finding(r,'services').status,'Detected');
  assert.ok(checkContent('<div id="root"></div><script src="app.js"></script>','html','').notes.some(n=>n.includes('JavaScript')));
  assert.equal(literalMatches('Cart art ART. artisan','art').count,2);
  assert.equal(literalMatches('Roofing  \n repair roofing repair','roofing repair').count,2);
  assert.equal(literalMatches('C++ and c++ a+b','C++').count,2);assert.equal(literalMatches('a+b','a+b').count,1);
  assert.equal(literalMatches('CAFÉ café xCAFÉy','café').count,2);
  assert.throws(()=>checkContent('text','text','a\nb\nc\nd\ne\nf'),/five/);
  assert.throws(()=>checkContent('text','text','x'.repeat(81)),/80/);
});
test('S09: malformed source and JSON errors retain explicit limits',()=>{
  const r=checkContent('<h1>Services<h2>Questions<form><label><input name="name">Your name</label></form><script type="application/ld+json">{broken}</script>','html','');
  assert.equal(finding(r,'headings').status,'Detected');assert.match(finding(r,'jsonld').evidence,/1 JSON parse errors/);
  assert.match(finding(r,'forms').evidence,/label=Your name/);
  const labeled=checkContent('<form><span id="label">Your reply</span><input name="email" aria-labelledby="label"></form>','html','');
  assert.match(finding(labeled,'forms').evidence,/label=Your reply/);
});
test('RC1: inline formatting preserves words; block and line breaks separate them',()=>{
  const formatted=checkContent('<h1>Office clean<strong>ing</strong></h1><p>Roof<span>ing</span> repair</p>','html','cleaning\nroofing repair');
  const plain=checkContent('<h1>Office cleaning</h1><p>Roofing repair</p>','html','cleaning\nroofing repair');
  assert.deepEqual(formatted.phrases,plain.phrases);
  const count=(phrase,location)=>formatted.phrases.find(p=>p.phrase===phrase).locations.find(l=>l.location===location).count;
  assert.equal(count('cleaning','headings'),1);assert.equal(count('cleaning','source body text'),1);
  assert.equal(count('roofing repair','source body text'),1);assert.match(finding(formatted,'services').evidence,/cleaning: 1/);
  const blocks=checkContent('<p>clean</p><p>ing</p><div>roof</div><section>ing repair</section><span>paint</span><br><span>ing</span>','html','cleaning\nroofing repair\npainting');
  assert.ok(blocks.phrases.every(p=>p.locations.every(l=>l.count===0)));
  const excluded=checkContent('<h1>cl<!-- cleaning bait -->ean<strong>ing</strong></h1><script>bait</script><style>bait</style><template>bait</template>','html','cleaning\nbait');
  assert.equal(excluded.phrases[0].locations.find(l=>l.location==='source body text').count,1);
  assert.ok(excluded.phrases[1].locations.every(l=>l.count===0));
});
test('RC2: document-wide labels and explicit form owners override ancestry once',()=>{
  const fixtures=['<label for="mail">Reply email</label><form><input id="mail" name="email" type="email"></form>','<form id="contact"></form><label for="mail">Reply email</label><input form="contact" id="mail" name="email" type="email">'];
  for(const html of fixtures){const ev=finding(checkContent(html,'html',''),'forms').evidence;assert.match(ev,/1 controls/);assert.match(ev,/label=Reply email/);}
  const override=finding(checkContent('<form id="first"><label for="mail">Reply email</label><input id="mail" form="second" name="email" type="email"></form><form id="second"></form>','html',''),'forms').evidence;
  assert.ok(override.includes('0 controls (form id=first)'));assert.ok(override.includes('1 controls (form id=second)'));assert.equal(override.match(/name=email/g).length,1);
  for(const owner of ['missing','', 'notform']){
    const html=`<div id="notform"></div><form id="ancestor"><input form="${owner}" name="email" type="email"></form>`;
    const ev=finding(checkContent(html,'html',''),'forms').evidence;
    assert.ok(ev.includes('0 controls (form id=ancestor)'));assert.match(ev,/1 controls have no resolved form owner; 1 explicit form references are unresolved/);
  }
  const foreign=finding(checkContent('<svg><form id="foreign"></form></svg><form id="ancestor"><input name="email" form="foreign"></form>','html',''),'forms').evidence;
  assert.ok(foreign.includes('1 form tags. 0 controls (form id=ancestor)'));assert.match(foreign,/1 explicit form references are unresolved/);
  const aria=finding(checkContent('<span id="label">Reply email</span><form id="contact"></form><input form="contact" name="email" aria-labelledby="label" aria-label="Other name">','html',''),'forms').evidence;
  assert.match(aria,/label=Reply email/);assert.ok(!aria.includes('Other name'));
  const wrapping=finding(checkContent('<form><label>Reply <strong>email</strong><input name="email"></label></form>','html',''),'forms').evidence;
  assert.match(wrapping,/label=Reply email/);
  const duplicates=checkContent('<div id="contact"></div><form id="contact"><input form="contact" name="email"></form>','html','');
  assert.ok(duplicates.notes.some(n=>n.includes('duplicate ID')));assert.match(finding(duplicates,'forms').evidence,/1 explicit form references are unresolved/);
});
test('RC3: Unicode combining marks continue a word without executable phrase regex',()=>{
  assert.equal(literalMatches('कला','कल').count,0);
  assert.equal(literalMatches('कल कला','कल').count,1);
  assert.equal(literalMatches('cart art ART artisan','art').count,2);
  assert.equal(literalMatches('CAFÉ cafe\u0301 xCAFÉy','café').count,2);
  assert.equal(literalMatches('a+b a+b','a+b').count,2);
});
