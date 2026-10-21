export const POINTS = {
    portfolio: { fork: 5, commits: 5, liveSite: 10, showcasePR: 10, rubricMax: 20, total: 50, minCommits: 3 },
    levels: { easy: 10, medium: 25, hard: 50 },
    firstWeekBonus: 5,   // on the earliest-opened scored PR in each repo, if opened in that month's first week
    qualityBonus: 5,     // maintainer's quality:excellent label
    repoCap: 5,          // only the first 5 scored PRs per repo count
};

export const ELIGIBILITY = {
    october: { totalMin: 35, rubricMin: 10, needs: ['merged showcase PR', 'working live site'] },
    month: { pointsMin: 50, mergedPRsMin: 2, mediumOrHardMin: 1 },
    overall: { pointsMin: 120, activeMonthsMin: 2, reposMin: 2 },
};

export const TIERS = [
    { id: 'participant', label: 'Participant', rule: 'A merged showcase PR, or one merged scored PR' },
    { id: 'contributor', label: 'Contributor', min: 50 },
    { id: 'core', label: 'Core Contributor', min: 150 },
];

export const TIER_CONFIG = {
  none: { label: 'Novice', color: 'var(--color-text-muted)' },
  participant: { label: 'Participant', color: 'var(--theme-primary)' },
  contributor: { label: 'Contributor', color: 'var(--theme-accent)' },
  core: { label: 'Core Contributor', color: '#FFD166' }
};