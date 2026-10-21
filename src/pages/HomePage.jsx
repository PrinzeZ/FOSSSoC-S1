import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../config';
import { useLeaderboardData } from '../hooks/useLeaderboardData';
import Counter from '../components/common/Counter';
import GitBranchCalendar from '../components/common/GitBranchCalendar';
import Countdown from '../components/common/Countdown';
import { ExternalLink, Copy, Check, ArrowRight, ChevronDown } from 'lucide-react';

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
      {/* Hero Cover Viewport - Clean, Focused, Heading & Actions */}
      <section
        className="hero-cover-section"
        style={{
          minHeight: 'calc(100svh - 4.5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2.5rem 0 3.5rem 0',
          borderBottom: '1px solid var(--theme-border)',
          position: 'relative',
          boxSizing: 'border-box'
        }}
      >
        <div
          className="container"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <div
            style={{
              maxWidth: '840px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            {/* Main Headline */}
            <h1
              className="hero-heading"
              style={{
                fontSize: 'clamp(2.4rem, 7vw, 4.2rem)',
                lineHeight: 1.12,
                marginBottom: '1.75rem',
                color: 'var(--color-white)',
                letterSpacing: '-0.035em',
                textAlign: 'center',
                fontWeight: 800,
                wordBreak: 'break-word'
              }}
            >
              {CONFIG.FULL_NAME}
            </h1>

            {/* Hero Primary Actions (Register CTA) */}
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
                  style={{ padding: '0.65rem 1.6rem', fontSize: '0.9rem' }}
                >
                  <span>Register Now</span>
                  <ExternalLink size={14} />
                </a>
              ) : (
                <button
                  disabled
                  className="btn btn-disabled"
                  style={{ padding: '0.65rem 1.6rem', fontSize: '0.9rem' }}
                  title="Registration link will be announced soon"
                >
                  <span>Registration: Coming Soon</span>
                </button>
              )}

              {/* Quick links shown alongside on wider screens */}
              <div style={{ display: 'inline-flex', gap: '0.75rem' }}>
                <Link to="/portfolio" className="btn btn-secondary" style={{ padding: '0.65rem 1.25rem' }}>
                  <span>Portfolio Week</span>
                </Link>
                <Link to="/leaderboard" className="btn btn-secondary" style={{ padding: '0.65rem 1.25rem' }}>
                  <span>Leaderboard</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip: Monospace verified counts */}
      <section style={{ padding: '2.5rem 0', borderBottom: '1px solid var(--theme-border)', background: 'var(--theme-card-bg)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              fontFamily: 'var(--font-mono)',
              textAlign: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Registered Participants
              </div>
              <div style={{ fontSize: '1.9rem', fontWeight: 700, color: 'var(--color-white)', marginTop: '0.25rem' }}>
                <Counter value={stats.participants} />
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Showcase Portfolios Merged
              </div>
              <div style={{ fontSize: '1.9rem', fontWeight: 700, color: 'var(--color-white)', marginTop: '0.25rem' }}>
                <Counter value={stats.showcasePrs} />
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Project PRs Merged
              </div>
              <div style={{ fontSize: '1.9rem', fontWeight: 700, color: 'var(--color-white)', marginTop: '0.25rem' }}>
                <Counter value={stats.projectPrs} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 01: About & Sprint Architecture (Replaced generic 3-box feature strip) */}
      <section
        id="about"
        className="section-spacing"
        style={{
          borderBottom: '1px solid var(--theme-border)'
        }}
      >
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', marginBottom: '0.75rem' }}>
              <span style={{ color: 'var(--theme-primary)', fontFamily: 'var(--font-mono)', marginRight: '0.5rem', fontWeight: 600 }}>01.</span>
              About the Initiative
            </h2>
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'var(--color-text-muted)',
                maxWidth: '780px'
              }}
            >
              FOSSSoC Season 1 is a structured 9-week developer initiative organized by {CONFIG.ORGANIZER} at {CONFIG.COLLEGE}. Participants build developer portfolios, work directly on production open-source repositories, and earn verified points on a live git-tracked leaderboard.
            </p>
          </div>

          {/* 4-Panel Architecture Matrix */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {/* Panel 1 */}
            <div
              className="tech-card"
              style={{
                padding: '1.6rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--theme-primary)', fontWeight: 600 }}>
                SPRINT 01 / PORTFOLIO WEEK
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-white)', fontWeight: 700 }}>
                Build & Deploy Your Profile
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                24 to 31 Oct 2026. Fork the official portfolio template, edit profile.json, make 3+ git commits, enable GitHub Pages, and open one showcase PR before the deadline.
              </p>
            </div>

            {/* Panel 2 */}
            <div
              className="tech-card"
              style={{
                padding: '1.6rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--theme-primary)', fontWeight: 600 }}>
                SPRINT 02 / OPEN SOURCE CONTRIBUTIONS
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-white)', fontWeight: 700 }}>
                Solve Real Repository Issues
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                1 Nov to 24 Dec 2026. Browse community projects curated by FOSS TKMCE. Issues are tiered by difficulty: Easy (10 pts), Medium (25 pts), and Hard (50 pts).
              </p>
            </div>

            {/* Panel 3 */}
            <div
              className="tech-card"
              style={{
                padding: '1.6rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--theme-primary)', fontWeight: 600 }}>
                RULES / BONUSES & CAPPING
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-white)', fontWeight: 700 }}>
                Fair Scoring Framework
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                Earn +5 first-week sprint bonus on early PRs. Earn +5 quality bonus on maintainer approval. Maximum 5 scored PRs per repository to encourage diverse contributions.
              </p>
            </div>

            {/* Panel 4 */}
            <div
              className="tech-card"
              style={{
                padding: '1.6rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--theme-primary)', fontWeight: 600 }}>
                FINALE / AWARDS & DEMO DAY
              </div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-white)', fontWeight: 700 }}>
                Demo Day & Recognition
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                Final merge deadline 24 Dec 2026. Grand Finale and closing presentation ceremony on 27 Dec 2026 at TKMCE. Top contributors receive seasonal awards and recognition.
              </p>
            </div>
          </div>

          {/* Countdown & Quickstart Clone Command Bar */}
          <div
            style={{
              marginTop: '3rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
              width: '100%'
            }}
          >
            <Countdown targetDate={CONFIG.KICKOFF_ISO} />

            <div
              style={{
                width: '100%',
                maxWidth: '640px',
                margin: '0 auto',
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-sm)',
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
                  flex: 1,
                  minWidth: 0,
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                  color: 'var(--color-text-main)',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                <span style={{ color: 'var(--theme-primary)', fontWeight: 700, flexShrink: 0 }}>$</span>
                <span style={{ whiteSpace: 'nowrap' }}>{cloneCommand}</span>
              </div>

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
                  transition: 'background-color 0.12s ease'
                }}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Git Branch Architecture Calendar */}
      <section className="section-spacing" style={{ borderBottom: '1px solid var(--theme-border)' }}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--theme-primary)', fontFamily: 'var(--font-mono)', marginRight: '0.5rem', fontWeight: 600 }}>02.</span>
              Season Branch Topology
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', maxWidth: '640px' }}>
              Git branch visualization showing sprint merges, milestone tags, and submission deadlines from kickoff to demo day.
            </p>
          </div>

          <GitBranchCalendar />
        </div>
      </section>

      {/* Section 03: 4-Step Progression Phases */}
      <section className="section-spacing">
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--theme-primary)', fontFamily: 'var(--font-mono)', marginRight: '0.5rem', fontWeight: 600 }}>03.</span>
              Progression Phases
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', maxWidth: '640px' }}>
              Four progressive phases across October, November, and December 2026.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {steps.map((step) => (
              <div
                key={step.code}
                className="tech-card"
                style={{
                  padding: '1.6rem',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--theme-primary)', fontWeight: 700, fontSize: '0.8rem' }}>
                    {step.code}
                  </span>
                </div>

                <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-subtle)', marginBottom: '0.5rem' }}>
                  {step.dates}
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--color-white)' }}>
                  {step.title}
                </h3>

                <p style={{ fontSize: '0.86rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                  {step.desc}
                </p>

                <Link
                  to={step.link}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--theme-primary)',
                    fontWeight: 600,
                    marginTop: 'auto'
                  }}
                >
                  <span>[{step.action}]</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
