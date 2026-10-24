// Usage: node scripts/make-participants.js [data/registrations.csv]
// Parses Google Forms CSV exports (or raw participant tables) and outputs clean data/participants.json
import fs from 'node:fs';

const inputFile = process.argv[2] || 'data/registrations.csv';

if (!fs.existsSync(inputFile)) {
  console.error(`File not found: ${inputFile}`);
  process.exit(1);
}

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  const rows = [];
  for (const line of lines) {
    const row = [];
    let inQuote = false;
    let field = '';
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') {
        inQuote = !inQuote;
      } else if (c === ',' && !inQuote) {
        row.push(field);
        field = '';
      } else {
        field += c;
      }
    }
    row.push(field);
    rows.push(row.map((s) => s.trim().replace(/^"|"$/g, '').trim()));
  }
  return rows;
}

function cleanGithub(raw) {
  if (!raw) return null;
  let s = raw.trim();

  // Exclude placeholder and invalid values
  if (/^(nil|nill|none|no id|no-id|xxxxx|\.\.|id|n\/a|-)$/i.test(s)) return null;
  if (/^https?:\/\/(share\.google|drive\.google)/i.test(s)) return null;

  // If a student entered a purely numeric KTU / student register number instead of GitHub username
  if (/^\d+$/.test(s)) return null;

  // Strip URLs and path components
  s = s.replace(/^https?:\/\/github\.com\/users\//i, '');
  s = s.replace(/^https?:\/\/github\.com\//i, '');
  s = s.split('/')[0];

  // Strip trailing notes or metadata (e.g. '@user · github.com')
  s = s.replace(/·.*$/g, '').replace(/github\.com/gi, '').trim();

  // Strip leading '@' and trailing slashes
  s = s.replace(/^@+/, '').replace(/\/+$/, '').trim();

  // Validate GitHub username pattern: 1-39 alphanumeric / hyphen characters, cannot start/end with hyphen
  if (/^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(s)) {
    return s;
  }
  return null;
}

function parseYear(raw) {
  if (!raw) return null;
  const s = String(raw).trim().toLowerCase();
  if (/^(1|1st|first|1st year|first year|2026-2030|2030)$/i.test(s)) return 1;
  if (/^(2|2nd|second|ii|2nd year|2nd yr|2025-2029)$/i.test(s)) return 2;
  if (/^(3|3rd|third|3rd year|third year|2024|2026)$/i.test(s)) return 3;
  if (/^(4|4th|fourth|4th year)$/i.test(s)) return 4;
  const num = parseInt(s, 10);
  if (!isNaN(num) && num >= 1 && num <= 5) return num;
  return null;
}

function cleanDepartment(raw) {
  if (!raw) return '';
  return String(raw).trim().replace(/\s+/g, ' ');
}

function cleanCollege(raw) {
  if (!raw) return 'TKMCE';
  const s = String(raw).trim();
  const low = s.toLowerCase();

  if (/tkm|thangal kunju|t\.k\.m/i.test(low)) return 'TKMCE';
  if (/nit\s*c|calicut/i.test(low)) return 'NIT Calicut';
  if (/bits/i.test(low)) return 'BITS Pilani (Goa)';
  if (/kanpur/i.test(low)) return 'IIT Kanpur';
  if (/delhi/i.test(low)) return 'IIT Delhi';
  if (/chengannur/i.test(low)) return 'CE Chengannur';
  if (/trivandrum|cet/i.test(low)) return 'CET Trivandrum';
  if (/srm/i.test(low)) return 'SRMIST';
  if (/model engineering|mec/i.test(low)) return 'Model Engineering College';
  if (/cusat/i.test(low)) return 'CUSAT';
  if (/kariavattom/i.test(low)) return 'UCE Kariavattom';
  if (/^(er3|r1b)$/i.test(low)) return 'TKMCE';

  return s.replace(/\s+/g, ' ');
}

const content = fs.readFileSync(inputFile, 'utf8');
const [headers, ...rows] = parseCSV(content);

const colMap = {};
headers.forEach((h, i) => {
  const norm = h.toLowerCase().trim();
  if (/name/i.test(norm)) colMap.name = i;
  else if (/github/i.test(norm)) colMap.github = i;
  else if (/college/i.test(norm)) colMap.college = i;
  else if (/dep/i.test(norm)) colMap.department = i;
  else if (/year/i.test(norm)) colMap.year = i;
  else if (/email/i.test(norm)) colMap.email = i;
});

const byEmail = new Map();
const skipped = [];

for (const [idx, r] of rows.entries()) {
  const email = (r[colMap.email] || `row-${idx}`).toLowerCase().trim();
  const rawGithub = r[colMap.github] || '';
  const name = r[colMap.name] || 'Anonymous';
  const college = cleanCollege(r[colMap.college]);
  const department = cleanDepartment(r[colMap.department]);
  const year = parseYear(r[colMap.year]);

  const github = cleanGithub(rawGithub);
  const record = { row: idx + 2, email, name, rawGithub, github, college, department, year };

  if (!byEmail.has(email)) {
    byEmail.set(email, []);
  }
  byEmail.get(email).push(record);
}

const participants = new Map();

for (const [email, entries] of byEmail.entries()) {
  // If a student registered multiple times, prefer the entry with a valid GitHub username
  const validEntry = entries.slice().reverse().find((e) => e.github) || entries[entries.length - 1];

  if (!validEntry.github) {
    skipped.push({
      name: validEntry.name,
      email: validEntry.email,
      submitted: validEntry.rawGithub,
      reason: /^\d+$/.test(validEntry.rawGithub)
        ? 'Entered register number instead of GitHub username'
        : 'Missing or invalid GitHub username',
    });
    continue;
  }

  const key = validEntry.github.toLowerCase();
  participants.set(key, {
    github: validEntry.github,
    name: validEntry.name,
    college: validEntry.college,
    department: validEntry.department,
    year: validEntry.year,
  });
}

const out = Array.from(participants.values()).sort((a, b) =>
  a.github.localeCompare(b.github, undefined, { sensitivity: 'base' })
);

fs.writeFileSync('data/participants.json', JSON.stringify(out, null, 2));

console.log(`\n========================================`);
console.log(`✓ Processed ${rows.length} total registration rows.`);
console.log(`✓ Generated data/participants.json with ${out.length} unique participants.`);
console.log(`========================================\n`);

if (skipped.length > 0) {
  console.log(`⚠ The following ${skipped.length} participants need to provide their real GitHub username:`);
  console.table(skipped);
}