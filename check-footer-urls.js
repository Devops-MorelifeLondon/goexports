const fs = require('fs');

// 1. Spices check
const l1 = JSON.parse(fs.readFileSync('data/goexports-data-spices-level-1.json', 'utf8').replace(/:\s*NaN\b/g, ': null'));
const l2 = JSON.parse(fs.readFileSync('data/data-level-2.json', 'utf8').replace(/:\s*NaN\b/g, ': null'));

const spiceCategories = [
  { label: "Spices Directory Overview", href: "/spices", badge: "Directory" },
  { label: "Red Chilli (Guntur & Byadagi)", href: "/spices/red-chilli" },
  { label: "Turmeric (Curcumin Rich)", href: "/spices/turmeric" },
  { label: "Cumin Seeds (Jeera)", href: "/spices/cumin" },
  { label: "Black Pepper (Malabar / Tellicherry)", href: "/spices/black-pepper" },
  { label: "Green Cardamom (Alleppey)", href: "/spices/green-cardamom" },
  { label: "Dry Ginger (Cochin)", href: "/spices/dry-ginger" },
  { label: "Coriander Seeds (Dhania)", href: "/spices/coriander-seeds" },
  { label: "Fennel Seeds (Saunf)", href: "/spices/fennel-seeds" },
  { label: "Fenugreek Seeds (Methi)", href: "/spices/fenugreek-seeds" },
  { label: "Cloves & Whole Spices", href: "/spices/cloves" },
];

const featuredVarieties = [
  { label: "Guntur Teja S17 Chilli", href: "/spices/red-chilli/guntur-teja-s17" },
  { label: "Byadagi 5531 Wrinkled Chilli", href: "/spices/red-chilli/byadagi" },
  { label: "Salem Turmeric Fingers", href: "/spices/turmeric/salem-fingers" },
  { label: "Nizamabad Turmeric Fingers", href: "/spices/turmeric/nizamabad-fingers" },
  { label: "Tellicherry TGSEB Black Pepper", href: "/spices/black-pepper/tellicherry-tgseb" },
  { label: "Malabar MG1 Black Pepper", href: "/spices/black-pepper/malabar-mg1" },
  { label: "Alleppey Extra Bold Cardamom", href: "/spices/green-cardamom/ageb" },
  { label: "Cochin Bleached Dry Ginger", href: "/spices/dry-ginger/cochin-bleached" },
  { label: "Eagle Quality Coriander Seeds", href: "/spices/coriander/eagle-quality" },
  { label: "Gujarat Bold Cumin Seeds", href: "/spices/cumin/gujarat-bold-cumin" },
];

function checkL1(slug) {
  const norm = slug.toLowerCase().replace(/^\/+|\/+$/g, '');
  return l1.find(s => 
    (s.slug && s.slug.toLowerCase() === norm) ||
    (s.category_name && s.category_name.toLowerCase().replace(/\s+/g, '-') === norm)
  );
}

function checkL2(catSlug, varSlug, fullSlug) {
  const normCat = catSlug.toLowerCase().trim();
  const normVar = varSlug.toLowerCase().trim();
  const normFull = fullSlug.toLowerCase().replace(/^\/+|\/+$/g, '');
  
  return l2.find(item => {
    const slugRaw = String(item.slug || '').trim().replace(/^\/+|\/+$/g, '');
    const parts = slugRaw.split('/');
    const cSlug = parts.length >= 3 ? parts[1] : parts[0];
    const vSlug = parts.length >= 3 ? parts[2] : parts[1];
    
    if (slugRaw === normFull) return true;
    if (vSlug.toLowerCase() === normVar) {
      if (cSlug.toLowerCase() === normCat || item.category.toLowerCase().replace(/[\s&()]+/g, '-') === normCat) return true;
    }
    return false;
  });
}

console.log('=== L1 CATEGORIES ===');
for (const item of spiceCategories) {
  if (item.href === '/spices') {
    console.log(item.href, 'OK');
    continue;
  }
  const slug = item.href.replace('/spices/', '');
  const found = checkL1(slug);
  console.log(item.href, '->', found ? 'OK: ' + found.category_name : 'ERROR (404)');
}

console.log('\n=== L2 VARIETIES ===');
for (const item of featuredVarieties) {
  const parts = item.href.replace('/spices/', '').split('/');
  const cat = parts[0];
  const variety = parts[1];
  const found = checkL2(cat, variety, item.href);
  console.log(item.href, '->', found ? 'OK: ' + found.variety : 'ERROR (404)');
}

// 2. Industries check
function toSlug(name) {
  return name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const indText = fs.readFileSync('data/industries.ts', 'utf8');
const nameMatches = [...indText.matchAll(/"name":\s*"([^"]+)"/g)].map(m => m[1]);
const indSlugs = nameMatches.map(toSlug);

const exportIndustries = [
  { label: "Food & Beverages", href: "/food-and-beverages" },
  { label: "Agriculture & Farming", href: "/agriculture-and-farming" },
  { label: "Chemicals, Dyes & Solvents", href: "/chemicals-dyes-and-solvents" },
  { label: "Health Products & Medicine", href: "/health-products-drug-and-medicine" },
  { label: "Packaging Machines & Goods", href: "/packaging-machines-and-goods" },
  { label: "Industrial Plants & Machinery", href: "/industrial-plants-and-machinery" },
  { label: "Building & Construction", href: "/building-and-construction" },
  { label: "Consumer Electronics", href: "/consumer-electronics" },
  { label: "Textiles, Yarn & Fabrics", href: "/textiles-yarn-and-fabrics" },
  { label: "Automobile Parts & Spares", href: "/automobile-parts-and-spares" },
];

console.log('\n=== INDUSTRIES ===');
for (const item of exportIndustries) {
  const s = item.href.replace('/', '');
  const found = indSlugs.includes(s);
  console.log(item.href, '->', found ? 'OK' : 'ERROR (404)');
}
