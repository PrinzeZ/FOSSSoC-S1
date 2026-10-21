# FOSSSoC-S1 (FOSS Season of Commit - Season 1)

Official web portal for **FOSSSoC Season 1**, an open-source initiative organized by **FOSS TKMCE** (GitHub organization [`tkmfoss`](https://github.com/tkmfoss)) from **October 24 to December 27, 2026**.

- **Month 1 (Oct 24 – Oct 31)**: Portfolio Week (fork portfolio template, deploy to GitHub Pages, submit showcase PR).
- **Months 2 & 3 (Nov 1 – Dec 27)**: Open-source project contributions across curated campus & deep-tech repositories.

---

## 🛠️ Technology Stack
- **Framework**: Vite + React 18
- **Routing**: `HashRouter` (clean static routing compatible with GitHub Pages)
- **Styling**: Modern CSS variables & tokens (`tokens.css`, `global.css`)
- **Animation**: `framer-motion` for page transitions, letter-by-letter hero reveals, and interactive slide-over drawers
- **Canvas Engine**: Hand-written, lightweight HTML5 2D Canvas seasonal particle system (Halloween fog/bats, Cyber matrix circuits, Winter snowfall)
  - Automatically pauses on tab blur (`document.hidden`)
  - Halves particle counts on mobile devices
  - Respects `prefers-reduced-motion`
- **Data Engine**: Pure static JSON located under `/data/*.json` in the `public/` directory (no backend required)

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Run Locally (Development)
```bash
# 1. Install dependencies
npm install

# 2. Start the Vite development server
npm run dev
```
Open your browser at `http://localhost:5173`.

### Production Build
```bash
npm run build
```
Production assets are generated in the `dist/` directory.

### Custom Base URL
When deploying to a sub-path (e.g. `https://<org>.github.io/<repo>/`), supply the `VITE_BASE` environment variable:
```bash
VITE_BASE="/FOSSSoC-S1/" npm run build
```

---

## 🧪 Testing Query Parameters
You can test various states directly via URL query parameters:
- `?demo=1`: Populates rich sample data with diverse edge cases (capped PRs, pending statuses, all tiers, prize-eligible flags).
- `?unlock=1`: Bypasses the locked month overlays on the Projects directory.
- `?theme=october`: Force October Halloween theme (orange/purple fog & bats).
- `?theme=november`: Force November Build theme (teal/blue circuits & code symbols).
- `?theme=december`: Force December Winter theme (festive crimson/gold snow & lights).

Example: `http://localhost:5173/#/leaderboard?demo=1` or `http://localhost:5173/#/projects?unlock=1`

---

## 📂 How to Edit Data Files

All event data lives inside static JSON files in `public/data/`. They can be edited directly without rebuilding the code:

### 1. `public/data/leaderboard.json`
Maintains participant standings, portfolio completion status, and project pull request scores.
```json
{
  "updated": "2026-10-21T10:30:00+05:30",
  "thresholds": {
    "october": { "total": 35, "rubric": 10 },
    "month": { "points": 50, "prs": 2, "mediumPlus": 1 },
    "overall": { "points": 120, "months": 2, "repos": 2 }
  },
  "users": [
    {
      "user": "github-username",
      "name": "Full Name",
      "department": "Computer Science & Engineering",
      "year": 3,
      "total": 135,
      "tier": "participant|contributor|core",
      "portfolio": {
        "fork": 5,
        "commits": 5,
        "live": 10,
        "showcase": 10,
        "auto": 30,
        "rubric": 18,
        "total": 48,
        "eligible": true
      },
      "projects": {
        "total": 87,
        "merged": 4,
        "pending": 1,
        "prs": [
          {
            "repo": "campus-connect",
            "number": 42,
            "title": "feat: add notifications",
            "url": "https://github.com/tkmfoss/campus-connect/pull/42",
            "level": "hard",
            "base": 50,
            "firstWeek": 5,
            "quality": 5,
            "capped": false,
            "points": 60,
            "opened": "2026-11-03",
            "merged": "2026-11-05",
            "month": "2026-11"
          }
        ]
      },
      "months": {
        "2026-10": { "points": 48, "prs": 1, "mediumPlus": 0, "eligible": true },
        "2026-11": { "points": 87, "prs": 2, "mediumPlus": 2, "eligible": true },
        "2026-12": { "points": 0, "prs": 0, "mediumPlus": 0, "eligible": false }
      },
      "overall": { "points": 135, "activeMonths": 2, "repos": 1, "eligible": false }
    }
  ],
  "hall": [
    {
      "github": "github-username",
      "name": "Full Name",
      "site": "https://username.github.io/portfolio",
      "department": "Computer Science & Engineering",
      "year": 3
    }
  ]
}
```
> **Security Note:** Only URLs beginning strictly with `https://` are rendered in the Hall of Portfolios. Never include emails or phone numbers.

### 2. `public/data/projects.json`
Contains repositories categorized by monthly sprints:
```json
{
  "october": {
    "theme": "Portfolio Week",
    "repos": [{ "name": "portfolio-template", "field": "Web Dev", "stack": ["HTML", "CSS"], "desc": "..." }]
  },
  "november": {
    "theme": "Campus & Utilities",
    "repos": [{ "name": "campus-connect", "field": "Web Dev", "stack": ["React", "FastAPI"], "desc": "..." }]
  },
  "december": {
    "theme": "Winter Hack & Deep Tech",
    "repos": [{ "name": "curriculum-ai", "field": "AI/ML", "stack": ["Python", "PyTorch"], "desc": "..." }]
  }
}
```

### 3. `public/data/winners.json`
Stores the seasonal prize recipients. If empty, the page automatically presents the friendly **"To be announced"** state:
```json
{
  "october": [],
  "november": [],
  "december": [],
  "overall": []
}
```

### 4. `public/data/team.json`
Defines community coordinators, faculty advisors, and mentors. Zero personal phone numbers or email addresses are stored or displayed.

---

## 🎨 Seasonal Theming
The website transitions through three custom seasonal color palettes:
1. **October (Halloween)**: Pumpkin orange & phantom purple with drifting fog and bat silhouettes.
2. **November (Build)**: Cyan & cobalt circuit grid with floating code glyphs.
3. **December (Winter)**: Festive crimson, pine mint, and warm gold with snowfall.

Users can toggle themes manually via the floating theme switcher at the bottom-right, and their choice is preserved across visits via `localStorage`.

---

## 📜 License & Organization
Maintained by **FOSS TKMCE** (TKM College of Engineering, Kollam, Kerala). Released under the MIT License.
- GitHub: [https://github.com/tkmfoss](https://github.com/tkmfoss)
- Website: [https://tkmfoss.github.io](https://tkmfoss.github.io)
