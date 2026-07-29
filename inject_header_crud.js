const fs = require('fs');
let c = fs.readFileSync('src/app/admin/page.js', 'utf8');

const crudStr = `
  // Header CRUD
  const updateHeaderLogo = (val) => setHeaderData(d => ({ ...d, logo: val }));
  const updateHeaderLink = (i, key, val) => setHeaderData(d => { const l = [...d.links]; l[i] = { ...l[i], [key]: val }; return { ...d, links: l }; });
  const addHeaderLink = () => setHeaderData(d => ({ ...d, links: [...d.links, { id: Date.now(), label: "New Link", url: "#" }] }));
  const deleteHeaderLink = (i) => setHeaderData(d => ({ ...d, links: d.links.filter((_, idx) => idx !== i) }));
  const saveHeader = () => {
    localStorage.setItem("clarity_header", JSON.stringify(headerData));
    setHeaderSaveSuccess(true);
    setTimeout(() => setHeaderSaveSuccess(false), 2500);
  };
  const resetHeader = () => { if (confirm("Reset Header to defaults?")) { setHeaderData(DEFAULT_HEADER); localStorage.setItem("clarity_header", JSON.stringify(DEFAULT_HEADER)); } };
`;

const marker = '  // Footer CRUD';
if (c.includes(marker)) {
  c = c.replace(marker, crudStr + '\\n' + marker);
  fs.writeFileSync('src/app/admin/page.js', c);
  console.log('Successfully injected CRUD');
} else {
  console.log('Marker not found');
}
