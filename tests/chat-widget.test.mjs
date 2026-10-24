import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import ts from 'typescript';
import {site,informationChatReady} from '../site-config.ts';
const code=readFileSync(new URL('../integrations/chat-widget.ts',import.meta.url),'utf8');
const config={enabled:true,status:'verified',scope:'information-only',widgetId:'6adc32899f0ad5b6ad1426dc',scriptUrl:'https://widgets.leadconnectorhq.com/loader.js',resourcesUrl:'https://widgets.leadconnectorhq.com/chat-widget/loader.js',knowledgeVersion:'owned-test-knowledge',evidence:'owned-test-evidence'};
function environment(existing){
 const scripts=[];const timers=new Map();let nextTimer=1;
 const document={querySelector:selector=>{assert.equal(selector,'script[data-eah-native-chat-loader="true"]');return scripts.find(s=>s.dataset.eahNativeChatLoader==='true')||null;},createElement:()=>new Script(),body:{append:s=>scripts.push(s)}};
 class Script {
  tagName='SCRIPT';dataset={};listeners=new Map();
  addEventListener(type,callback,options){this.listeners.set(type,{callback,once:options?.once});}
  removeEventListener(type,callback){if(this.listeners.get(type)?.callback===callback)this.listeners.delete(type);}
  dispatch(type){const l=this.listeners.get(type);if(l?.once)this.listeners.delete(type);l?.callback();}
  remove(){const index=scripts.indexOf(this);if(index>=0)scripts.splice(index,1);}
 }
 if(existing){const s=new Script();Object.assign(s,existing);scripts.push(s);}
 const window={setTimeout:fn=>{const id=nextTimer++;timers.set(id,fn);return id;},clearTimeout:id=>timers.delete(id)};
 const module={exports:{}};
 const compiled=ts.transpileModule(code,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 new Function('require','module','exports','document','window',compiled)(id=>{assert.equal(id,'../site-config');return {site};},module,module.exports,document,window);
 return {load:module.exports.loadInformationChat,scripts,timers,timeout:()=>[...timers.values()][0]()};
}
test('Chat loader rejects unavailable scope, missing evidence and unapproved source before injecting',async()=>{
 for(const invalid of [{enabled:false},{status:'preparing'},{scope:'booking'},{evidence:''},{knowledgeVersion:''},{widgetId:'wrong'},{scriptUrl:'https://example.com/loader.js'},{resourcesUrl:'https://example.com/loader.js'}]){
  const env=environment();await assert.rejects(env.load({...config,...invalid}));assert.equal(env.scripts.length,0);assert.equal(env.timers.size,0);
 }
});
test('Concurrent and repeated loads use one exact official script and remove temporary listeners',async()=>{
 const env=environment();const a=env.load(config);const b=env.load(config);assert.equal(a,b);assert.equal(env.scripts.length,1);
 const script=env.scripts[0];assert.equal(script.src,config.scriptUrl);assert.equal(script.id,undefined);assert.equal(script.dataset.eahNativeChatLoader,'true');assert.equal(script.dataset.resourcesUrl,config.resourcesUrl);assert.equal(script.dataset.widgetId,config.widgetId);assert.equal(script.listeners.size,2);
 script.dispatch('load');await a;assert.equal(script.listeners.size,0);assert.equal(env.timers.size,0);assert.equal(script.dataset.eahState,'loaded');await env.load(config);assert.equal(env.scripts.length,1);
});
test('Network error and timeout clean up and permit one safe retry without duplicate scripts',async()=>{
 for(const type of ['error','timeout']){
  const env=environment();const a=env.load(config);const rejected=assert.rejects(a,/Widget unavailable|Widget timeout/);const original=env.scripts[0];if(type==='error')original.dispatch('error');else env.timeout();await rejected;
  assert.equal(env.scripts.length,0);assert.equal(original.listeners.size,0);assert.equal(env.timers.size,0);
  const retry=env.load(config);assert.equal(env.scripts.length,1);env.scripts[0].dispatch('load');await retry;assert.equal(env.timers.size,0);
 }
});
test('A matching loaded embed is reused; a conflicting widget is rejected without alteration',async()=>{
 const loaded={src:config.scriptUrl,dataset:{eahNativeChatLoader:'true',widgetId:config.widgetId,resourcesUrl:config.resourcesUrl,eahState:'loaded'}};
 const a=environment(loaded);await a.load(config);assert.equal(a.scripts.length,1);assert.equal(a.scripts[0].listeners.size,0);
 const b=environment({...loaded,dataset:{...loaded.dataset,widgetId:'000000000000000000000000'}});await assert.rejects(b.load(config),/Conflicting/);assert.equal(b.scripts.length,1);assert.equal(b.timers.size,0);
});
test('Information chat does not grant booking voice SMS or payments or rely on an invented open API',()=>{
 assert.equal(site.chat.scope,'information-only');assert.equal(site.chat.widgetId,config.widgetId);assert.equal(site.chat.scriptUrl,config.scriptUrl);assert.equal(site.chat.resourcesUrl,config.resourcesUrl);
 assert.equal(informationChatReady,site.chat.enabled&&site.chat.status==='verified'&&!!site.chat.widgetId&&!!site.chat.knowledgeVersion&&!!site.chat.evidence);
 assert.equal(site.agent.status,'preparing');assert.equal(site.agentBooking.status,'preparing');assert.equal(site.sms.status,'preparing');assert.equal(site.payment.status,'held');assert.deepEqual(site.payment.approvedOrders,[]);
 assert.doesNotMatch(code,/leadConnector|openWidget|dispatchEvent/);
 const app=readFileSync(new URL('../App.tsx',import.meta.url),'utf8');assert.equal((app.match(/<NativeInformationChat\/>/g)||[]).length,1);
 const pages=readFileSync(new URL('../pages/RevivalPages.tsx',import.meta.url),'utf8');assert.match(pages,/Belle cannot check appointment availability, book, reschedule or cancel appointments, send SMS, make calls or take payments/);assert.match(pages,/Read the Privacy Policy/);
});
