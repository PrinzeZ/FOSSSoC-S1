import React from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../../config';
import { Github, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: '6rem',
        borderTop: '1px solid var(--theme-border)',
        background: 'var(--theme-bg)',
        padding: '3rem 0 2rem 0',
        position: 'relative',
        zIndex: 10,
        fontFamily: 'var(--font-mono)'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem'
          }}
        >
          {/* Column 1: Brand & Organization Info */}
          <div>
            <div style={{ fontWeight: 700, color: 'var(--color-white)', fontSize: '1.05rem', marginBottom: '0.4rem' }}>
              {CONFIG.NAME}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '0.9rem', maxWidth: '420px' }}>
              {CONFIG.FULL_NAME}. Organized by {CONFIG.ORGANIZER}, {CONFIG.COLLEGE}.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              {CONFIG.GITHUB_ORG_URL && (
                <a
                  href={CONFIG.GITHUB_ORG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: 'var(--color-text-muted)',
                    fontSize: '0.78rem',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--theme-primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                >
                  <Github size={13} />
                  <span>github/{CONFIG.GITHUB_ORG}</span>
                </a>
              )}
              {CONFIG.ORG_SITE_URL && (
                <a
                  href={CONFIG.ORG_SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    color: 'var(--color-text-muted)',
                    fontSize: '0.78rem',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--theme-primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                >
                  <Globe size={13} />
                  <span>{CONFIG.ORG_SITE_URL.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Two Columns (Navigation & Timeline) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '1.5rem'
            }}
          >
            {/* Sub-col 1: Navigation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.82rem' }}>
              <div style={{ color: 'var(--color-white)', fontWeight: 600, marginBottom: '0.3rem', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.04em' }}>
                Navigation
              </div>
              <Link to="/" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--theme-primary)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}>Home</Link>
              <Link to="/portfolio" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--theme-primary)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}>Portfolio Week</Link>
              <Link to="/projects" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--theme-primary)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}>Projects</Link>
              <Link to="/leaderboard" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--theme-primary)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}>Leaderboard</Link>
              <Link to="/rules" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--theme-primary)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}>Rules & Points</Link>
              <Link to="/winners" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--theme-primary)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}>Winners</Link>
              <Link to="/team" style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--theme-primary)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}>Schedule</Link>
            </div>

            {/* Sub-col 2: Timeline Overview */}
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              <div style={{ color: 'var(--color-white)', fontWeight: 600, marginBottom: '0.2rem', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.04em' }}>
                Timeline Overview
              </div>
              <div>
                <div style={{ color: 'var(--color-text-main)', fontSize: '0.8rem', fontWeight: 500 }}>Portfolio Week</div>
                <div style={{ fontSize: '0.73rem', color: 'var(--color-text-subtle)' }}>24 to 31 Oct 2026</div>
              </div>
              <div>
                <div style={{ color: 'var(--color-text-main)', fontSize: '0.8rem', fontWeight: 500 }}>Build Month</div>
                <div style={{ fontSize: '0.73rem', color: 'var(--color-text-subtle)' }}>1 to 30 Nov 2026</div>
              </div>
              <div>
                <div style={{ color: 'var(--color-text-main)', fontSize: '0.8rem', fontWeight: 500 }}>Christmas Eve Month</div>
                <div style={{ fontSize: '0.73rem', color: 'var(--color-text-subtle)' }}>1 to 24 Dec 2026</div>
              </div>
              <div>
                <div style={{ color: 'var(--theme-primary)', fontSize: '0.8rem', fontWeight: 600 }}>Grand Finale</div>
                <div style={{ fontSize: '0.73rem', color: 'var(--theme-primary)', opacity: 0.85 }}>27 Dec 2026 (proposed)</div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--theme-border)',
            paddingTop: '1.2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: 'var(--color-text-subtle)',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}
        >
          <div>FOSS TKMCE. Open-source initiative.</div>
          <div>Organized at T.K.M. College of Engineering, Kollam.</div>
        </div>
      </div>
    </footer>
  );
}
