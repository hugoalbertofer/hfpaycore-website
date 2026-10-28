import {readFileSync, existsSync} from 'node:fs';
import assert from 'node:assert/strict';
const read = p => readFileSync(p,'utf8');
const app=read('src/main.jsx'), legal=read('public/legal.html'), index=read('index.html'), css=read('src/style.css');
const checks=[
 ['navigation anchors',()=>{for(const id of ['home','services','experience','about','contact'])assert.match(app,new RegExp('id="'+id+'"'));}],
 ['business contact links',()=>{assert.ok(app.includes('mailto:contact@hfpaycore.com'));assert.ok(app.includes('linkedin.com/in/hugoaf/'));}],
 ['bilingual interface',()=>{assert.ok(app.includes('hfpaycore-lang'));assert.ok(app.includes('Nawigacja główna'));assert.ok(legal.includes('content-en')&&legal.includes('content-pl'));}],
 ['registered legal details',()=>{for(const term of ['1133175590','542391423','Aleje Jerozolimskie 109'])assert.ok(legal.includes(term));}],
 ['legal footer link',()=>assert.ok(app.includes('href="/legal.html"'))],
 ['staging search protection',()=>{assert.ok(index.includes('noindex,nofollow'));assert.ok(legal.includes('noindex,nofollow'));}],
 ['accessible navigation',()=>{assert.ok(app.includes('skip-link'));assert.ok(app.includes('aria-expanded'));assert.ok(css.includes('focus-visible'));}],
 ['portrait asset',()=>assert.ok(existsSync('public/hugo-fernandes.jpg'))],
 ['compiled output',()=>{assert.ok(existsSync('dist/index.html'));assert.ok(existsSync('dist/legal.html'));}]
];
let errors=0;for(const [name,run] of checks){try{run();console.log('PASS',name)}catch(e){errors++;console.error('FAIL',name,e.message)}}if(errors)process.exit(1);console.log('Passed',checks.length,'smoke checks');
