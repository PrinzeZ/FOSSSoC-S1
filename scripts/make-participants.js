// node scripts/make-participants.js data/registrations.csv
// Export ONLY these columns from the Google Sheet: github,name,department,year
import fs from 'node:fs';
const [h, ...rows] = fs.readFileSync(process.argv[2], 'utf8').trim().split(/\r?\n/);
const cols = h.split(',').map((s) => s.trim().toLowerCase());
const out = rows.map((r) => {
  const v = r.split(',');
  const o = Object.fromEntries(cols.map((c, i) => [c, (v[i] || '').trim()]));
  return {
    github: o.github.replace(/^@|^https:\/\/github\.com\//g, '').replace(/\/$/, ''),
    name: o.name, department: o.department, year: +o.year || null,
  };
}).filter((p) => p.github);
fs.writeFileSync('data/participants.json', JSON.stringify(out, null, 2));
console.log(`${out.length} participants written`);