const fs = require('fs');
let c = fs.readFileSync('src/app/admin/page.js', 'utf8');

// Container backgrounds
c = c.replace(/bg-\[\#0c0e2b\]/g, 'bg-white');
c = c.replace(/bg-\[\#07091e\]/g, 'bg-white');
c = c.replace(/bg-\[\#08091f\]/g, 'bg-white');

// Borders
c = c.replace(/border-white\/10/g, 'border-slate-200');
c = c.replace(/border-white\/15/g, 'border-slate-200');

// Text Colors
c = c.replace(/text-white\/40/g, 'text-slate-500');
c = c.replace(/text-white\/60/g, 'text-slate-500');
c = c.replace(/text-white\/30/g, 'text-slate-400');
c = c.replace(/text-indigo-300/g, 'text-indigo-600');
// Some text-white needs to be text-slate-800, but we have to be careful not to replace text-white in buttons.
// Let's replace 'text-white' when it is next to text-sm or text-lg or text-xs
c = c.replace(/text-white rounded-lg/g, 'text-slate-800 rounded-lg');
c = c.replace(/text-white font-bold/g, 'text-slate-800 font-bold');
c = c.replace(/text-lg font-black text-white/g, 'text-lg font-black text-slate-800');
c = c.replace(/text-sm font-bold text-white/g, 'text-sm font-bold text-slate-800');

// Specifically for FAQ manager text colors
c = c.replace(/text-white\/70/g, 'text-slate-600');
c = c.replace(/text-emerald-300/g, 'text-emerald-600');

fs.writeFileSync('src/app/admin/page.js', c);
console.log('Styles replaced successfully.');
