import React from 'react';
import { Link } from 'react-router-dom';
import { ORG_GITHUB_URL, ORG_WEBSITE_URL } from '../../constants/config';
import { Github, Globe, Heart, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: '6rem',
        borderTop: '1px solid var(--theme-border)',
        background: 'rgba(5, 3, 10, 0.85)',
        backdropFilter: 'blur(16px)',
        padding: '3.5rem 0 2rem 0',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}
        >
          {/* Col 1: About FOSSSoC */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div
                style={{
                  background: 'var(--theme-primary)',
                  color: '#0b0813',
                  padding: '0.35rem',
                  borderRadius: '6px',
                  display: 'flex'
                }}
              >
                <Terminal size={18} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '1.25rem',
                  color: 'var(--color-white)'
                }}
              >
                FOSSSoC<span style={{ color: 'var(--theme-primary)' }}>-S1</span>
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>
              FOSS Season of Commit (Season 1) is a 9-week open source initiative organized by FOSS TKMCE,
              cultivating genuine git contributions, peer mentorship, and community code across college departments.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
              <a
                href={ORG_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--color-text-main)',
                  padding: '0.4rem 0.8rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--theme-border)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem'
                }}
              >
                <Github size={16} />
                <span>GitHub Org</span>
              </a>
              <a
                href={ORG_WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--color-text-main)',
                  padding: '0.4rem 0.8rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--theme-border)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem'
                }}
              >
                <Globe size={16} />
                <span>tkmfoss.github.io</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--color-white)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Navigation
            </h4>
            <Link to="/" style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>Home</Link>
            <Link to="/portfolio" style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>Portfolio Week (Oct 24-31)</Link>
            <Link to="/projects" style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>Projects (Nov & Dec)</Link>
            <Link to="/leaderboard" style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>Live Leaderboard</Link>
            <Link to="/rules" style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>Rules & Scoring</Link>
            <Link to="/winners" style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>Hall of Winners</Link>
          </div>

          {/* Col 3: Community & Season Dates */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--color-white)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Season Timeline
            </h4>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              <strong style={{ color: 'var(--color-text-main)' }}>Month 1:</strong> Oct 24 – Oct 31 (Portfolio Week)
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              <strong style={{ color: 'var(--color-text-main)' }}>Month 2:</strong> Nov 1 – Nov 30 (Campus Projects)
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              <strong style={{ color: 'var(--color-text-main)' }}>Month 3:</strong> Dec 1 – Dec 27 (Deep Tech & Grand Finale)
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--theme-primary)' }}>
              TKM College of Engineering, Kollam, Kerala
            </div>
          </div>
        </div>

        {/* Bottom copyright & signoff */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--color-text-subtle)'
          }}
        >
          <div>
            &copy; 2026 FOSS TKMCE. Released under MIT & Open Source licenses.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Crafted with</span>
            <Heart size={14} color="var(--theme-primary)" fill="var(--theme-primary)" />
            <span>by FOSS TKMCE community hackers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
