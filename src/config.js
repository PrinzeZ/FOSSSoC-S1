// Event Configuration
// All fields empty by default. If empty, UI hides them or displays 'To be announced'.
// If REG_FORM_URL is empty, register buttons are disabled with 'Registration link coming soon'.

export const KICKOFF_ISO = ""; // e.g. "2026-10-24T10:00:00+05:30"
export const KICKOFF_TIME = ""; // e.g. "10:00 AM IST"
export const VENUE = ""; // e.g. "TKMCE Campus, Kollam"
export const REG_FORM_URL = ""; // e.g. Google form or registration link
export const CONTACT = ""; // e.g. contact email or discord

export const DATES = {
  kickoffWorkshop: "Sat 24 Oct 2026",
  portfolioWeek: "24 to 31 Oct 2026",
  portfolioDeadline: "31 Oct 2026, 11:59 PM IST",
  judging: "1 to 3 Nov 2026",
  octoberWinners: "4 Nov 2026",
  buildMonth: "1 to 30 Nov 2026",
  novemberFirstWeekBonus: "1 to 7 Nov 2026",
  novemberWinners: "3 Dec 2026",
  decemberMonth: "1 to 24 Dec 2026",
  decemberFirstWeekBonus: "1 to 7 Dec 2026",
  lastDayOpenPRs: "20 Dec 2026 (proposed)",
  finalMergeDeadline: "24 Dec 2026 (proposed)",
  resultsDemoDay: "27 Dec 2026 (proposed)"
};

export const UNLOCK_DATES = {
  october: "2026-10-24T00:00:00+05:30",
  november: "2026-11-01T00:00:00+05:30",
  december: "2026-12-01T00:00:00+05:30"
};

export const PORTFOLIO_TEMPLATE_URL = "https://github.com/tkmfoss/portfolio-template";
export const ORG_GITHUB_URL = "https://github.com/tkmfoss";
export const ORG_WEBSITE_URL = "https://tkmfoss.github.io";

export const PORTFOLIO_POINTS = {
  fork: 5,
  commits: 5,
  live: 10,
  showcase: 10,
  rubricMax: 20,
  total: 50
};

export const PROJECT_RULES = {
  levels: {
    easy: 10,
    medium: 25,
    hard: 50
  },
  bonuses: {
    firstWeek: 5,
    quality: 5
  },
  maxScoredPrsPerRepo: 5
};

export const THRESHOLDS_DEFAULT = {
  october: { total: 35, rubric: 10 },
  month: { points: 50, prs: 2, mediumPlus: 1 },
  overall: { points: 120, months: 2, repos: 2 }
};

export const TIER_CONFIG = {
  none: { label: "Novice", color: "var(--color-text-muted)" },
  participant: { label: "Participant", color: "var(--theme-primary)" },
  contributor: { label: "Contributor", color: "var(--theme-accent)" },
  core: { label: "Core Hacker", color: "#FFD166" }
};
