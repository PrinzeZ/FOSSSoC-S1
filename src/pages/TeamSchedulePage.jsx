import React, { useState } from 'react';
import { useTeamData } from '../hooks/useExtraData';
import { REG_FORM_URL, VENUE, KICKOFF_TIME, DATES, CONTACT } from '../config';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github
} from 'lucide-react';

export default function TeamSchedulePage() {
  const { data: teamData } = useTeamData();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const scheduleItems = [
    {
      date: 'Sat 24 Oct 2026',
      title: 'Kickoff Workshop',
      desc: `Venue: ${VENUE || 'To be announced'} | Time: ${KICKOFF_TIME || 'To be announced'}`
    },
    {
      date: '24 to 31 Oct 2026',
      title: 'Portfolio Week',
      desc: 'Fork tkmfoss/portfolio-template, edit profile.json, 3+ commits, enable GitHub Pages, submit showcase PR. Deadline: 31 Oct, 11:59 PM IST.'
    },
    {
      date: '1 to 3 Nov 2026',
      title: 'Judging & Mentor Review',
      desc: 'Mentor rubric evaluation up to 20 points for live portfolios.'
    },
    {
      date: '4 Nov 2026',
      title: 'October Winners',
      desc: 'Announcement of Portfolio Week sprint champions.'
    },
    {
      date: '1 to 30 Nov 2026',
      title: 'Build Month',
      desc: 'Open-source contribution sprint. First-week bonus (+5 pts) for earliest-opened scored PR per repo from 1 to 7 Nov.'
    },
    {
      date: '3 Dec 2026',
      title: 'November Winners',
      desc: 'Announcement of Build Month winners.'
    },
    {
      date: '1 to 24 Dec 2026',
      title: 'Christmas Eve Month',
      desc: 'Final contribution sprint. First-week bonus (+5 pts) for earliest-opened scored PR per repo from 1 to 7 Dec.'
    },
    {
      date: '20 Dec 2026 (proposed)',
      title: 'Last Day to Open PRs (proposed)',
      desc: 'Cutoff for opening new pull requests for Season 1.'
    },
    {
      date: '24 Dec 2026 (proposed)',
      title: 'Final Merge Deadline (proposed)',
      desc: 'All pending PRs must be merged by maintainers to be credited.'
    },
    {
      date: '27 Dec 2026 (proposed)',
      title: 'Results and Demo Day (proposed)',
      desc: 'Closing presentation and final leaderboard prize announcements.'
    }
  ];

  const faqs = [
    {
      q: 'Who can participate in FOSSSoC-S1?',
      a: 'Students of T.K.M. College of Engineering across all departments, as well as students and contributors outside TKMCE. Anyone can participate.'
    },
    {
      q: 'How does Portfolio Week scoring work?',
      a: 'Total 50 points: fork template (5), 3+ commits (5), live GitHub Pages site (10), showcase PR merged (10), mentor rubric (up to 20).'
    },
    {
      q: 'How do project month contributions work?',
      a: 'Issues are tagged Easy (10 pts), Medium (25 pts), and Hard (50 pts). First-week bonus gives +5 on your earliest scored PR per repo in 1-7 Nov and 1-7 Dec. Quality bonus adds +5 on maintainer label. Only the first 5 scored PRs per repo count. Points credit strictly after merge.'
    },
    {
      q: 'What does "Not prize-eligible" mean?',
      a: '"Not prize-eligible" is not "disqualified". It only means you have not met the minimum thresholds required to claim seasonal physical prizes. All contributions remain recorded and valid.'
    },
    {
      q: 'What happens if no one qualifies for a prize category?',
      a: 'If nobody qualifies according to the threshold rules, no winner is awarded for that category.'
    }
  ];

  const leads = teamData?.leads || [];
  const mentors = teamData?.mentors || [];
  const hasTeamEntries = leads.length > 0 || mentors.length > 0;

  return (
    <div className="section-spacing" style={{ position: 'relative', zIndex: 1 }}>
      <div className="container">
        {/* Schedule */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--theme-primary)', marginBottom: '0.4rem' }}>
            # timeline
          </div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Schedule</h1>
          <p style={{ maxWidth: '640px', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Official dates for FOSSSoC Season 1. Proposed dates are subject to maintainer consensus.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {scheduleItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '1.2rem',
                  border: '1px solid var(--theme-border)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--theme-card-bg)',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1.5rem',
                  flexWrap: 'wrap'
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: 'var(--theme-primary)',
                    minWidth: '200px',
                    fontWeight: 700
                  }}
                >
                  {item.date}
                </div>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-white)', marginBottom: '0.2rem' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section (Only displayed when teamData has entries) */}
        {hasTeamEntries && (
          <div style={{ marginBottom: '4.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Team</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem'
              }}
            >
              {[...leads, ...mentors].map((member, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1.2rem',
                    border: '1px solid var(--theme-border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--theme-card-bg)'
                  }}
                >
                  <div style={{ fontWeight: 700, color: 'var(--color-white)' }}>{member.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--theme-primary)' }}>{member.role}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{member.department}</div>
                  {member.github && (
                    <a
                      href={`https://github.com/${member.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.78rem',
                        color: 'var(--color-text-muted)',
                        marginTop: '0.5rem',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      <Github size={13} />
                      <span>@{member.github}</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        <div style={{ marginBottom: '4.5rem', maxWidth: '800px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    border: '1px solid var(--theme-border)',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--theme-card-bg)',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '1rem 1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      color: 'var(--color-white)',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: '0 1.2rem 1rem 1.2rem',
                        fontSize: '0.85rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.6
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

        {/* Register Section */}
        <div
          style={{
            padding: '2rem',
            border: '1px solid var(--theme-border)',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--theme-card-bg)',
            maxWidth: '650px'
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--theme-primary)', marginBottom: '0.3rem' }}>
            # registration
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Join FOSSSoC-S1</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '1.2rem', lineHeight: 1.6 }}>
            Open to students of TKM College of Engineering and external participants worldwide. Free registration.
          </p>
          {REG_FORM_URL ? (
            <a
              href={REG_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
            >
              <span>Register</span>
              <ExternalLink size={14} />
            </a>
          ) : (
            <button
              disabled
              className="btn btn-secondary"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', opacity: 0.6, cursor: 'not-allowed' }}
            >
              Registration link coming soon
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
