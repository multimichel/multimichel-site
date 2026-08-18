#!/usr/bin/env node
// Cascade collision check.
//
// Catches the bug class that broke `.sechead .more` three times: two rules in
// the SAME context both setting the same property on the same selector, where
// the later one silently wins. Deliberate media-query overrides are expected
// and are not reported — only same-context collisions, plus longhand landing
// on top of a shorthand (padding-bottom after padding), which is silent
// wherever it happens.
//
//   node tools-cascade-check.mjs multimichel.css case-study.css tokens.css
import {readFileSync} from 'fs';

const SHORT = {
  padding:['padding-top','padding-right','padding-bottom','padding-left'],
  margin:['margin-top','margin-right','margin-bottom','margin-left'],
  background:['background-image','background-size','background-position','background-color','background-repeat'],
  font:['font-family','font-size','font-weight','line-height'],
  inset:['top','right','bottom','left'],
  flex:['flex-grow','flex-shrink','flex-basis'],
};

function rulesOf(file){
  const src = readFileSync(file,'utf8');
  const clean = src.replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g,' '));
  const out=[]; let ctx='base', depth=0, i=0, buf='';
  const lineAt = p => clean.slice(0,p).split('\n').length;
  while(i < clean.length){
    const ch = clean[i];
    if(ch === '{'){
      const head = buf.trim(); buf=''; depth++;
      if(head.startsWith('@')){ ctx = head; i++; continue; }
      // collect body
      let body='', d=1; i++;
      while(i<clean.length && d>0){
        if(clean[i]==='{') d++;
        else if(clean[i]==='}'){ d--; if(!d) break; }
        body+=clean[i]; i++;
      }
      depth--;
      const decls = body.split(';').map(s=>s.trim()).filter(Boolean)
        .map(s=>{const k=s.indexOf(':'); return k<0?null:[s.slice(0,k).trim().toLowerCase(), s.slice(k+1).trim()];})
        .filter(Boolean);
      for(const sel of head.split(',').map(s=>s.trim()).filter(Boolean))
        out.push({sel, ctx, decls, line: lineAt(i)});
      buf=''; i++; continue;
    }
    if(ch === '}'){ ctx='base'; buf=''; i++; continue; }
    buf+=ch; i++;
  }
  return out;
}

let total=0;
for(const file of process.argv.slice(2)){
  const rules = rulesOf(file);
  const seen = new Map();           // key: ctx|sel|prop -> {line, prop}
  const hits = [];
  for(const r of rules){
    for(const [prop] of r.decls){
      const key = `${r.ctx}|${r.sel}|`;
      const prev = seen.get(key+prop);
      if(prev && prev.line !== r.line)
        hits.push({sel:r.sel, ctx:r.ctx, a:prev, b:{line:r.line, prop}, kind:'same property'});
      // longhand landing on a shorthand set elsewhere (any context)
      for(const [sh, longs] of Object.entries(SHORT)){
        if(longs.includes(prop)){
          const p2 = seen.get(key+sh);
          if(p2 && p2.line !== r.line)
            hits.push({sel:r.sel, ctx:r.ctx, a:p2, b:{line:r.line, prop}, kind:'longhand over shorthand'});
        }
      }
      seen.set(key+prop, {line:r.line, prop});
    }
  }
  console.log(`\n${file}`);
  if(!hits.length){ console.log('  clean — no same-context collisions'); continue; }
  for(const h of hits){
    console.log(`  ${h.sel}   [${h.ctx === 'base' ? 'top level' : h.ctx}]`);
    console.log(`     ${h.a.prop} @${h.a.line}  ->  ${h.b.prop} @${h.b.line}   (${h.kind})`);
  }
  total += hits.length;
}
console.log(`\n${total} collision(s) needing a decision`);
process.exit(total ? 1 : 0);
