import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../config';
import { useLeaderboardData } from '../hooks/useLeaderboardData';
import Counter from '../components/common/Counter';
import GitBranchCalendar from '../components/common/GitBranchCalendar';
import Countdown from '../components/common/Countdown';
import { ExternalLink, Copy, Check, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const { stats } = useLeaderboardData();
  const [copied, setCopied] = useState(false);

  const cloneCommand = `git clone ${CONFIG.TEMPLATE_REPO_URL}.git`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    {
      code: '01/PORTFOLIO_WEEK',
      title: 'Portfolio Week',
      dates: '24 to 31 Oct 2026',
      desc: 'Fork tkmfoss/portfolio-template, edit profile.json, make 3+ commits, enable GitHub Pages, and open one showcase PR by 31 Oct 11:59 PM IST.',
      link: '/portfolio',
      action: 'rules and template'
    },
    {
      code: '02/BUILD_MONTH',
      title: 'Build Month',
      dates: '1 to 30 Nov 2026',
      desc: 'Open-source project contributions. Issues are tagged Easy (10), Medium (25), or Hard (50). Earn +5 first-week bonus for early PRs opened in 1-7 Nov.',
      link: '/projects',
      action: 'browse repositories'
    },
    {
      code: '03/CHRISTMAS_EVE',
      title: 'Christmas Eve Month',
      dates: '1 to 24 Dec 2026',
      desc: 'Second contribution sprint. +5 first-week bonus in 1-7 Dec. Quality bonus (+5) on maintainer label. Max 5 scored PRs per repository. Last PRs open 20 Dec (proposed).',
      link: '/rules',
      action: 'points breakdown'
    },
    {
      code: '04/DEMO_DAY',
      title: 'Results and Demo Day',
      dates: '27 Dec 2026 (proposed)',
      desc: 'Final merge deadline 24 Dec (proposed). Closing ceremony and winners presentation at TKMCE. Threshold qualifiers receive seasonal awards.',
      link: '/leaderboard',
      action: 'live standings'
    }
  ];

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Center-Aligned Hero Section */}
      <section style={{ padding: '4.5rem 0 3.5rem 0', borderBottom: '1px solid var(--theme-border)' }}>
        <div className="container">
          <div
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Eyebrow Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.35rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--theme-border)',
                background: 'rgba(255, 255, 255, 0.03)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--color-text-muted)',
                marginBottom: '1.25rem',
                letterSpacing: '0.04em'
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--theme-primary)',
                  boxShadow: '0 0 8px var(--theme-primary)'
                }}
              />
              <span>{CONFIG.ORGANIZER} // {CONFIG.NAME} // 24 OCT – 27 DEC 2026</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
                lineHeight: 1.12,
                marginBottom: '1.2rem',
                color: 'var(--color-white)',
                letterSpacing: '-0.035em',
                textAlign: 'center',
                fontWeight: 800
              }}
            >
              {CONFIG.FULL_NAME}
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.65,
                color: 'var(--color-text-muted)',
                marginBottom: '2rem',
                maxWidth: '680px',
                margin: '0 auto 2rem auto',
                textAlign: 'center'
              }}
            >
              A 9-week open source event organized by {CONFIG.ORGANIZER}, {CONFIG.COLLEGE}.
              Month 1 is Portfolio Week; Months 2 and 3 are project contributions across community repositories.
              Open to students of TKMCE and external participants worldwide.
            </p>

            {/* Hero Actions (Countdown Badge + Navigation Buttons) - Centered Stack */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '2.5rem',
                width: '100%'
              }}
            >
              {/* Countdown Badge */}
              <Countdown targetDate={CONFIG.KICKOFF_ISO} />

              {/* Action Buttons Row */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {CONFIG.REG_FORM_URL ? (
                  <a
                    href={CONFIG.REG_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <span>[ Register ]</span>
                    <ExternalLink size={13} />
                  </a>
                ) : (
                  <button
                    disabled
                    className="btn btn-disabled"
                    title="Registration link will be announced soon"
                  >
                    <span>[ Registration: Coming Soon ]</span>
                  </button>
                )}

                <Link to="/portfolio" className="btn btn-secondary">
                  <span>[ Portfolio Week ]</span>
                </Link>

                <Link to="/leaderboard" className="btn btn-secondary">
                  <span>[ Leaderboard ]</span>
                </Link>
              </div>
            </div>

            {/* Quickstart Command Bar for Month 1 */}
            <div
              style={{
                width: '100%',
                maxWidth: '640px',
                margin: '0 auto',
                padding: '0.65rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--theme-card-bg)',
                border: '1px solid var(--theme-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                boxSizing: 'border-box'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                  color: 'var(--color-text-main)'
                }}
              >
                <span style={{ color: 'var(--theme-primary)', fontWeight: 700 }}>$</span>
                <span>{cloneCommand}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
                <button
                  onClick={handleCopy}
                  aria-label="Copy clone command"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.35rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--theme-border)',
                    background: copied ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                    color: copied ? 'var(--color-success)' : 'var(--color-text-muted)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip: Monospace counters showing dash for 0 or missing */}
      <section style={{ padding: '2rem 0', borderBottom: '1px solid var(--theme-border)', background: 'var(--theme-card-bg)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              fontFamily: 'var(--font-mono)',
              textAlign: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Registered Participants
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-white)', marginTop: '0.2rem' }}>
                <Counter value={stats.participants} />
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Showcase Portfolios Merged
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-white)', marginTop: '0.2rem' }}>
                <Counter value={stats.showcasePrs} />
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Project PRs Merged
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--color-white)', marginTop: '0.2rem' }}>
                <Counter value={stats.projectPrs} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Git Branch Architecture Calendar */}
      <section style={{ padding: '3.5rem 0', borderBottom: '1px solid var(--theme-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--theme-primary)', marginBottom: '0.3rem' }}>
              # season_branch_topology
            </div>
            <h2 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '0.4rem' }}>Season Calendar</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', maxWidth: '580px', margin: '0 auto', textAlign: 'center' }}>
              Git branch visualization showing sprint merges and milestones from kickoff to demo day.
            </p>
          </div>

          <GitBranchCalendar />
        </div>
      </section>

      {/* 4-Step How It Works */}
      <section style={{ padding: '4rem 0 5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--theme-primary)', marginBottom: '0.3rem' }}>
              # workflow_phases
            </div>
            <h2 style={{ fontSize: '1.8rem', textAlign: 'center', marginBottom: '0.4rem' }}>How It Works</h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', maxWidth: '540px', margin: '0 auto', textAlign: 'center' }}>
              Four progressive phases across October, November, and December.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.2rem'
            }}
          >
            {steps.map((step) => (
              <div
                key={step.code}
                style={{
                  padding: '1.6rem',
                  border: '1px solid var(--theme-border)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--theme-card-bg)',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--theme-primary)', fontWeight: 700, fontSize: '0.82rem' }}>
                    {step.code}
                  </span>
                </div>

                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-subtle)', marginBottom: '0.4rem' }}>
                  {step.dates}
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--color-white)' }}>
                  {step.title}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.4rem', flex: 1 }}>
                  {step.desc}
                </p>

                <Link
                  to={step.link}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--theme-primary)',
                    marginTop: 'auto'
                  }}
                >
                  <span>[{step.action}]</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
