import React, { useState } from 'react';
import { useTeamData } from '../hooks/useExtraData';
import { REG_FORM_URL } from '../constants/config';
import {
  Calendar,
  Users,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github,
  Clock,
  Sparkles,
  CheckCircle2,
  Terminal
} from 'lucide-react';

export default function TeamSchedulePage() {
  const { data: teamData, loading: teamLoading } = useTeamData();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const scheduleItems = [
    {
      period: 'Oct 24 – Oct 31, 2026',
      badge: 'Month 1',
      title: 'Portfolio Week & Kickoff',
      desc: 'Official kickoff. Students fork the responsive portfolio template, customize bio and skills, deploy to GitHub Pages, and submit showcase PRs.'
    },
    {
      period: 'Nov 1 – Nov 7, 2026',
      badge: 'Bonus Week',
      title: 'November Sprint Kickoff & First-Week Bonus',
      desc: 'Repositories unlock for Campus & Community utilities. Earliest-opened scored PRs on each repository earn +5 first-week bonus points.'
    },
    {
      period: 'Nov 8 – Nov 30, 2026',
      badge: 'Month 2',
      title: 'Campus Projects Contribution Sprint',
      desc: 'Collaborate with mentors across web portals, bus trackers, and lab inventory tools. Up to 5 scored PRs per repo.'
    },
    {
      period: 'Dec 1 – Dec 7, 2026',
      badge: 'Bonus Week',
      title: 'December Sprint Kickoff & First-Week Bonus',
      desc: 'Deep tech, AI/ML, and IoT repos unlock. Earliest-opened PRs during the first week earn +5 first-week bonus points.'
    },
    {
      period: 'Dec 8 – Dec 24, 2026',
      badge: 'Month 3',
      title: 'Deep Tech Sprint & Mentor Reviews',
      desc: 'Final hack sprint and code reviews. Finalize contributions to meet the 120-point overall prize eligibility threshold.'
    },
    {
      period: 'Dec 27, 2026',
      badge: 'Grand Finale',
      title: 'Season 1 Grand Finale & Awards',
      desc: 'Closing ceremony at TKMCE. Presentation of winners, distribution of physical certificates, swags, and prizes.'
    }
  ];

  const faqs = [
    {
      q: 'Who is eligible to participate in FOSSSoC-S1?',
      a: 'Any student enrolled at TKM College of Engineering across any department and any semester (1st through 4th year) is eligible to participate.'
    },
    {
      q: 'I have never made an open-source commit before. Can I participate?',
      a: 'Absolutely! Month 1 (Portfolio Week) is specifically designed as a guided onboarding experience to teach you forking, cloning, committing, and creating pull requests with mentor guidance.'
    },
    {
      q: 'What does "capped, 0 pts" mean on a pull request?',
      a: 'To encourage learning across multiple tools and repositories, only the first 5 scored pull requests per repository count towards points. Subsequent PRs are still merged and praised, but labeled as capped.'
    },
    {
      q: 'What if I open a PR in late November, but it gets merged in December?',
      a: 'Points are credited based on the month the pull request was opened, as long as it gets merged before the final season deadline.'
    },
    {
      q: 'Does "Not prize-eligible" mean I am disqualified?',
      a: 'No! Prize-eligibility only reflects whether you currently meet the criteria to win top physical prizes. Every participant who contributes receives an official verified certificate.'
    },
    {
      q: 'Are projects done in teams or individually?',
      a: 'All contributions, pull requests, and portfolio submissions are made individually from your personal GitHub account.'
    }
  ];

  const leads = teamData?.leads || [];
  const mentors = teamData?.mentors || [];

  return (
    <div className="section-spacing" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Section 1: Season Schedule */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="chip" style={{ marginBottom: '1rem', padding: '0.45rem 1.1rem' }}>
              <Calendar size={15} />
              <span>Event Timeline</span>
            </div>
            <h1 style={{ marginBottom: '1rem' }}>Season Schedule</h1>
            <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem' }}>
              Key dates and milestones from kickoff through Portfolio Week to the Grand Finale.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem',
              maxWidth: '850px',
              margin: '0 auto'
            }}
          >
            {scheduleItems.map((item, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '1.6rem 1.8rem',
                  background: 'var(--theme-card-bg)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.5rem',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ minWidth: '150px' }}>
                  <span className="chip" style={{ fontSize: '0.75rem', marginBottom: '0.4rem' }}>
                    {item.badge}
                  </span>
                  <div style={{ fontSize: '0.85rem', color: 'var(--theme-primary)', fontWeight: 600 }}>
                    {item.period}
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: '240px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Team & Mentors */}
        <div style={{ marginBottom: '5.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="chip" style={{ marginBottom: '1rem', padding: '0.45rem 1.1rem' }}>
              <Users size={15} />
              <span>Organizing Committee & Mentors</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Meet the Team</h2>
            <p style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1rem' }}>
              Faculty advisors, community coordinators, and technical mentors supporting your open-source voyage.
            </p>
          </div>

          {/* Leads */}
          <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem', color: 'var(--color-white)', textAlign: 'center' }}>
            Organizing Leads
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}
          >
            {leads.map((lead) => (
              <div
                key={lead.name}
                className="glass-panel"
                style={{
                  padding: '1.8rem',
                  background: 'var(--theme-card-bg)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '0.8rem'
                }}
              >
                <img
                  src={`https://github.com/${lead.github}.png?size=100`}
                  alt={lead.name}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    border: '2px solid var(--theme-border)'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{lead.name}</h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--theme-primary)', fontWeight: 600 }}>
                    {lead.role}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                    {lead.department}
                  </div>
                </div>

                <a
                  href={`https://github.com/${lead.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.82rem',
                    color: 'var(--color-text-muted)',
                    marginTop: 'auto'
                  }}
                >
                  <Github size={14} />
                  <span>@{lead.github}</span>
                </a>
              </div>
            ))}
          </div>

          {/* Mentors */}
          <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem', color: 'var(--color-white)', textAlign: 'center' }}>
            Technical Mentors
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {mentors.map((mentor) => (
              <div
                key={mentor.name}
                className="glass-panel"
                style={{
                  padding: '1.8rem',
                  background: 'var(--theme-card-bg)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '0.8rem'
                }}
              >
                <img
                  src={`https://github.com/${mentor.github}.png?size=100`}
                  alt={mentor.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: '2px solid var(--theme-border)'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div>
                  <h4 style={{ fontSize: '1.05rem', marginBottom: '0.2rem' }}>{mentor.name}</h4>
                  <div style={{ fontSize: '0.82rem', color: 'var(--theme-secondary)', fontWeight: 600 }}>
                    {mentor.role}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                    {mentor.department}
                  </div>
                </div>

                <a
                  href={`https://github.com/${mentor.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.82rem',
                    color: 'var(--color-text-muted)',
                    marginTop: 'auto'
                  }}
                >
                  <Github size={14} />
                  <span>@{mentor.github}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: FAQ Accordion */}
        <div style={{ marginBottom: '5rem', maxWidth: '850px', margin: '0 auto 5rem auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="chip" style={{ marginBottom: '1rem', padding: '0.45rem 1.1rem' }}>
              <HelpCircle size={15} />
              <span>Got Questions?</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '0.8rem' }}>Frequently Asked Questions</h2>
            <p style={{ fontSize: '1rem' }}>
              Find quick answers to common questions about eligibility, scoring, and workflow.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    background: 'var(--theme-card-bg)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: isOpen ? '1px solid var(--theme-primary)' : '1px solid var(--theme-border)'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      padding: '1.2rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      textAlign: 'left',
                      color: 'var(--color-white)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--theme-primary)" /> : <ChevronDown size={18} />}
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 1.5rem 1.4rem 1.5rem',
                        fontSize: '0.92rem',
                        lineHeight: 1.6,
                        color: 'var(--color-text-muted)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Final Register Callout */}
        <div
          className="glass-panel"
          style={{
            padding: '3.5rem 2rem',
            textAlign: 'center',
            background: 'var(--theme-card-bg)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--theme-border-hover)'
          }}
        >
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>
            Ready to Build Your Open Source Legacy?
          </h2>
          <p style={{ maxWidth: '620px', margin: '0 auto 2rem auto', fontSize: '1rem' }}>
            Registrations are completely free. Sign up to get matched with repositories, attend kickoff sessions,
            and participate in Portfolio Week.
          </p>
          <a
            href={REG_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}
          >
            <span>Register for FOSSSoC-S1</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
