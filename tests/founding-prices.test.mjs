import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {catalog,catalogVersion,foundingWebsiteCapacity,site} from '../site-config.ts';
const source=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
test('Only the two approved one-time website offers have founding prices and shared capacity',()=>{
 assert.match(catalogVersion,/2026-10-21-approved-founding/);
 assert.deepEqual(catalog.filter(o=>o.founding).map(({id,once,monthly,preparing,interest})=>({id,once,monthly,preparing,interest})),[
  {id:'page',once:650,monthly:undefined,preparing:false,interest:'websites'},
  {id:'website',once:1250,monthly:undefined,preparing:false,interest:'websites'}]);
 assert.deepEqual(foundingWebsiteCapacity,{initialCustomers:2,maxActiveBuilds:2,reviewBeforeTotalExtension:5});
});
test('Approval preserves the bounded scope,14-day defect period and does not enable payment or agents',()=>{
 for(const offer of catalog.filter(o=>o.founding)){
  assert.match(offer.support,/14 calendar days/);assert.match(offer.includes.join(' '),/One consolidated revision/);
  assert.doesNotMatch(offer.process,/50\/50|325|625/);assert.match(offer.process,/payment/);
 }
 assert.match(catalog[0].includes.join(' '),/seven sections and 1,000/);assert.match(catalog[1].includes.join(' '),/three standard pages and 2,000/);
 assert.equal(site.privateReview,false);assert.equal(site.payment.status,'held');assert.deepEqual(site.payment.approvedOrders,[]);
 for(const id of ['chat','voice-chat','text','care','review']){const o=catalog.find(o=>o.id===id);assert.equal(o.preparing,true);assert.ok(!o.founding);}
 assert.deepEqual(catalog.filter(o=>o.monthly).map(o=>[o.id,o.once,o.monthly]),[['chat',699,349],['voice-chat',999,549],['text',299,149],['care',0,99]]);
});
test('Visitor pricing surfaces contain no former prices, conditional campaign pilot, or blanket proposal claim',()=>{
 const paths=['site-config.ts','components/OfferCatalogue.tsx','pages/RevivalPages.tsx','content.ts','App.tsx','routes.ts','index.html'];
 for(const path of paths){const text=source(path);assert.doesNotMatch(text,/\$950|\$1,?650|once:950|once:1650|Private pilot proposal|conditional pilot|Prices are proposed|prices here are private proposals/i,path);}
 const pages=source('pages/RevivalPages.tsx');assert.match(pages,/Founding customer website offers/);assert.match(pages,/\$650 once/);assert.match(pages,/\$1,250 once/);assert.match(pages,/two founding places are shared across both website offers/);
 const faq=source('content.ts');assert.match(faq,/founding website prices are \$650 once/);assert.match(faq,/\$1,250 once for up to three pages/);
 const cards=source('components/OfferCatalogue.tsx');assert.match(cards,/offer.founding \? 'Founding customer price' : 'Proposed price'/);assert.match(cards,/to=\{`\/contact\?interest=\$\{offer.interest\}`\}/);
});

test('Public display switch gates internal banner and price-approval or preview wording without enabling commerce',()=>{
 assert.match(source('App.tsx'),/site.privateReview && <aside className="private-review-banner"/);
 assert.match(source('pages/RevivalPages.tsx'),/site.privateReview \? 'These founding prices are approved/);
 assert.match(source('components/OfferCatalogue.tsx'),/site.privateReview && <>Payable on this preview/);
 assert.match(source('content.ts'),/site.privateReview \? 'approved ' : ''/);
 assert.equal(site.payment.status,'held');assert.equal(site.agent.status,'preparing');assert.equal(site.chat.status,'preparing');
});
