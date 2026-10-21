export const KICKOFF_ISO = "2026-10-24T10:00:00+05:30";
export const PORTFOLIO_DEADLINE_ISO = "2026-10-31T23:59:59+05:30";
export const SEASON_END_ISO = "2026-12-27T23:59:59+05:30";

export const UNLOCK_DATES = {
  october: "2026-10-24T00:00:00+05:30",
  november: "2026-11-01T00:00:00+05:30",
  december: "2026-12-01T00:00:00+05:30"
};

export const REG_FORM_URL = "https://forms.gle/tkmfoss-soc-s1-register";
export const ORG_GITHUB_URL = "https://github.com/tkmfoss";
export const ORG_WEBSITE_URL = "https://tkmfoss.github.io";
export const PORTFOLIO_TEMPLATE_URL = "https://github.com/tkmfoss/portfolio-template";

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
