// Event settings. Empty values are hidden or shown as 'To be announced'.
export const CONFIG = {
  NAME: 'FOSSSoC-S1',
  FULL_NAME: 'FOSS Season of Commit, Season 1',
  ORGANIZER: 'FOSS TKMCE',
  COLLEGE: 'T.K.M. College of Engineering, Kollam',
  GITHUB_ORG: 'tkmfoss',
  GITHUB_ORG_URL: 'https://github.com/tkmfoss',
  ORG_SITE_URL: 'https://tkmfoss.github.io',
  TEMPLATE_REPO_URL: 'https://github.com/tkmfoss/portfolio-template',

  // Date only for now (midnight IST). Set the real start time when known,
  // for example '2026-10-24T10:00:00+05:30'.
  KICKOFF_ISO: '2026-10-24T00:00:00+05:30',
  KICKOFF_TIME_LABEL: '',        // for example '10:00 AM'
  VENUE: '',                     // for example 'Seminar Hall, TKMCE'
  PORTFOLIO_DEADLINE_ISO: '2026-10-31T23:59:00+05:30',

  REG_FORM_URL: 'https://forms.gle/ycXoN7u5ZqvhG3WHA', // Google Form link (button is disabled while empty)
  COMMUNITY_URL: 'https://chat.whatsapp.com/DWRu3c963z609pKafC4qJD?s=cl&p=a&mlu=4&ilr=4',             // WhatsApp or Discord invite link
  CONTACT: '+91 7012794016',                   // public contact only, for example an email address

  PRIZES: '',                    // empty means 'To be announced'
};

export const {
  NAME,
  FULL_NAME,
  ORGANIZER,
  COLLEGE,
  GITHUB_ORG,
  GITHUB_ORG_URL,
  ORG_SITE_URL,
  TEMPLATE_REPO_URL,
  KICKOFF_ISO,
  KICKOFF_TIME_LABEL,
  VENUE,
  PORTFOLIO_DEADLINE_ISO,
  REG_FORM_URL,
  COMMUNITY_URL,
  CONTACT,
  PRIZES
} = CONFIG;

export default CONFIG;