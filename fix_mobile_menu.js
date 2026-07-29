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

  // Look for the mobile menu map block which starts with {navItems.map((item) => {
  // and has the old href logic.
  const regex = /\{navItems\.map\(\(item\)\s*=>\s*\{[\s\S]*?const href = [^\n]*\n\s*return\s*\(/g;
  
  c = c.replace(regex, `{headerData.links.map((link) => {
                  return (`);

  fs.writeFileSync(path, c);
  console.log('Fixed mobile menu in:', path);
});
