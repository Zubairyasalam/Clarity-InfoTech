const fs = require('fs');

const files = [
  { path: 'src/app/page.js', activeLabel: 'Home' },
  { path: 'src/app/about/page.js', activeLabel: 'About Us' },
  { path: 'src/app/services/page.js', activeLabel: 'Our Projects' },
  { path: 'src/app/our-services/page.js', activeLabel: 'Our Services' },
  { path: 'src/app/contact/page.js', activeLabel: 'Contact' }
];

const stateReplacement = `
  const DEFAULT_HEADER = {
    logo: "/logo.png",
    links: [
      { id: 1, label: "Home", url: "/" },
      { id: 2, label: "About Us", url: "/about" },
      { id: 3, label: "Our Projects", url: "/services" },
      { id: 4, label: "Our Services", url: "/our-services" },
      { id: 5, label: "Contact", url: "/contact" }
    ]
  };
  const [headerData, setHeaderData] = useState(DEFAULT_HEADER);
  useEffect(() => {
    const stored = localStorage.getItem("clarity_header");
    if (stored) {
      try { setHeaderData(JSON.parse(stored)); } catch { }
    }
  }, []);
`;

files.forEach(({ path, activeLabel }) => {
  let c = fs.readFileSync(path, 'utf8');

  // 1. Replace navItems definition
  // Looking for: const navItems = ["Home", "About Us", "Our Projects", "Our Services", "Contact"];
  const navItemsRegex = /const\s+navItems\s*=\s*\[[^\]]+\];/g;
  c = c.replace(navItemsRegex, stateReplacement.trim());

  // 2. Replace logo src
  // Looking for src="/logo.png" or src="/logo.png?v=..."
  c = c.replace(/src="\/logo\.png"/g, 'src={headerData.logo}');

  // 3. Replace navItems.map desktop
  // We'll use a string replacement strategy because the regex for the entire map block is complex.
  const desktopMapStart = `{navItems.map((item) => {`;
  const mobileMapStart = `{navItems.map((item) => (`;
  
  if (c.includes(desktopMapStart)) {
    // We need to replace the destkop map block. We know it ends with `})}`
    // Let's replace the top part of the map
    const regex1 = /\{navItems\.map\(\(item\)\s*=>\s*\{[\s\S]*?return\s*\(/;
    
    c = c.replace(regex1, `{headerData.links.map((link) => {
              const isActive = link.label === "${activeLabel}";
              return (`);
              
    // Also replace key={item} -> key={link.id}
    c = c.replace(/key=\{item\}/g, 'key={link.id}');
    // Replace href={href} -> href={link.url}
    c = c.replace(/href=\{href\}/g, 'href={link.url}');
    // Replace >\s*{item}\s*<\/a>/ -> >{link.label}</a>
    c = c.replace(/>\s*\{item\}\s*<\/a>/g, '>{link.label}</a>');
  }

  // 4. Replace mobile menu map block
  if (c.includes(mobileMapStart)) {
    const regex2 = /\{navItems\.map\(\(item\)\s*=>\s*\(/;
    c = c.replace(regex2, `{headerData.links.map((link) => {
                  const isActive = link.label === "${activeLabel}";
                  return (`);
    
    // We need to close the return statement for the mobile block
    // The mobile block used to be an implicit return `=> (`
    // So it ends with `))}`
    // Since we changed it to `=> { ... return (` we need to change `))}` to `); })}`
    // Let's just find the closing `</button>` or `</a>` and the following `))}`
    // Actually, mobile menu links might be `<a>` tags inside the mobile menu block.
    // Let's replace `))}` with `); })}` BUT only the ones that match our mobile map!
    // This is tricky. Let's do it manually using indices or specific strings.
    // The mobile menu map usually looks like:
    /*
                {navItems.map((item) => (
                  <a
                    key={item}
                    ...
                  >
                    {item}
                  </a>
                ))}
    */
    // We already replaced key={item} and >{item}</a>.
    c = c.replace(/<\/a>\s*\)\)\}/g, '</a>\n                  );\n                })}');
  }

  fs.writeFileSync(path, c);
  console.log('Updated frontend file:', path);
});
