const fs = require('fs');

const files = [
  'src/app/page.js',
  'src/app/about/page.js',
  'src/app/services/page.js',
  'src/app/our-services/page.js',
  'src/app/contact/page.js'
];

files.forEach((path) => {
  let c = fs.readFileSync(path, 'utf8');

  // Replace item.label with link.label
  c = c.replace(/item\.label/g, 'link.label');
  
  // Replace item.href with link.url
  c = c.replace(/item\.href/g, 'link.url');
  
  // Replace item.title with link.label (just in case)
  c = c.replace(/item\.title/g, 'link.label');

  // In page.js mobile menu, there was `>{item}</a>`, wait `page.js` had `>{link.label}</a>` already from my previous script, but let's check.
  
  fs.writeFileSync(path, c);
  console.log('Fixed item references in:', path);
});
