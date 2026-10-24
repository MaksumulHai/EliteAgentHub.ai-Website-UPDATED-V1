import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {catalog,catalogVersion,foundingWebsiteCapacity,foundingWebsiteAvailability,websiteOfferDetails,websiteSharedDetails,site} from '../site-config.ts';
import {faqs} from '../content.ts';
const source=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
test('Three locked website choices share bounded founding capacity and no competing care option',()=>{
 assert.equal(catalogVersion,'2026-10-23-locked-three-website-options-v2');
 assert.deepEqual(catalog.filter(o=>o.founding).map(o=>[o.id,o.once,o.monthly,o.preparing,o.interest]),[['page',650,undefined,false,'websites'],['website',1250,undefined,false,'websites'],['managed-website',999,250,false,'websites']]);
 assert.equal(catalog.some(o=>o.id==='care'),false);
 assert.deepEqual(foundingWebsiteCapacity,{initialCustomers:2,maxActiveBuilds:2,reviewBeforeTotalExtension:5});assert.match(foundingWebsiteAvailability,/all three website options/);
});
test('Installments sum to exact build prices and care starts only on verified authorized launch',()=>{
 for(const [id,half] of [['page',325],['website',625],['managed-website',499.50]]){
  assert.equal(half*2,catalog.find(o=>o.id===id).once);const pay=websiteOfferDetails[id].payment;
  assert.equal((pay.match(new RegExp('\\$'+String(half).replace('.','\\.'),'g'))||[]).length,2);
  assert.match(pay,/after complete order acceptance and before work/);assert.match(pay,/after written preview acceptance, before publication or final handoff/);
 }
 const m=websiteOfferDetails['managed-website'];assert.match(m.payment,/successfully verified launch date with written recurring authorization/);assert.match(m.payment,/No care charge starts merely/);assert.match(m.total,/\$3,999: \$999 setup \+ \$3,000 care/);assert.equal(999+250*12,3999);assert.match(m.total,/not an annual minimum/);
});
test('Managed limits distinguish edits, corrections, hosting and provider continuity',()=>{
 const m=websiteOfferDetails['managed-website'];assert.match(m.careIncludes.join(' '),/30 minutes total per month across the whole site/);assert.match(m.careIncludes.join(' '),/No rollover/);assert.match(m.careExamples,/Correcting our own errors does not consume/);assert.match(m.ongoing,/Domain registration\/renewal, applicable tax/);assert.match(m.ongoing,/not charged a second time/);assert.match(websiteSharedDetails['Connected forms and calendars'],/active supporting service/);assert.match(websiteSharedDetails['Connected forms and calendars'],/\$97\/month/);assert.match(websiteSharedDetails['Editing and ownership'],/coded templates/);
 for(const o of catalog.filter(o=>o.founding)){assert.match(o.includes.join(' '),/one.*form/i);assert.match(o.includes.join(' '),/or one agreed booking route/i);assert.match(o.includes.join(' '),/one staff member and appointment type/);assert.match(o.includes.join(' '),/One consolidated revision/);}
});
test('Inquiry-led gates and proposed agents stay distinct across shared pricing surfaces',()=>{
 assert.equal(site.privateReview,false);assert.equal(site.payment.status,'held');assert.deepEqual(site.payment.approvedOrders,[]);assert.equal(site.agent.status,'preparing');assert.equal(site.chat.status,'preparing');assert.equal(site.sms.status,'preparing');
 assert.deepEqual(catalog.filter(o=>o.preparing).map(o=>[o.id,o.once,o.monthly]),[['chat',699,349],['voice-chat',999,549],['text',299,149],['review',297,undefined]]);
 const pages=source('pages/RevivalPages.tsx');assert.match(pages,/\['chat','voice-chat','text'\]\.includes\(c.id\)/);assert.match(pages,/A clear website\. A clear plan for keeping it running\./);assert.match(pages,/websiteSharedDetails/);
 for(const id of ['range','scope','platform','rights','hosting','managed-edits','rare-edits','website-exit','support','price','website-payments','billing','care','refund'])assert.ok(faqs.find(f=>f.id===id));
 assert.match(faqs.find(f=>f.id==='refund').answer,/itemize agreed completed work/);assert.match(faqs.find(f=>f.id==='care').answer,/Do not assume one includes the other/);assert.match(source('components/OfferCatalogue.tsx'),/website\?\.button/);assert.match(source('App.tsx'),/site.privateReview && <aside/);
});
