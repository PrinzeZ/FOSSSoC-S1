import React from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../../config';
import { Github, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="site-footer"
      style={{
        borderTop: '1px solid var(--theme-border)',
        background: 'var(--theme-bg)',
        position: 'relative',
        zIndex: 10,
        fontFamily: 'var(--font-mono)'
      }}
    >
      <div className="container">
        <div className="footer-main-grid">
          {/* Column 1: Brand & Organization Info */}
          <div className="footer-brand-col">
            <div className="footer-brand-title">
              {CONFIG.NAME}
            </div>
            <p className="footer-brand-desc">
              {CONFIG.FULL_NAME}. Organized by {CONFIG.ORGANIZER}, {CONFIG.COLLEGE}.
            </p>
            <div className="footer-social-links">
              {CONFIG.GITHUB_ORG_URL && (
                <a
                  href={CONFIG.GITHUB_ORG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
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
                  className="footer-social-link"
                >
                  <Globe size={13} />
                  <span>{CONFIG.ORG_SITE_URL.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Two Columns (Navigation & Timeline) */}
          <div className="footer-links-grid">
            {/* Sub-col 1: Navigation */}
            <div className="footer-nav-col">
              <div className="footer-col-header">
                Navigation
              </div>
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/portfolio" className="footer-link">Portfolio Week</Link>
              <Link to="/projects" className="footer-link">Projects</Link>
              <Link to="/leaderboard" className="footer-link">Leaderboard</Link>
              <Link to="/rules" className="footer-link">Rules & Points</Link>
              <Link to="/winners" className="footer-link">Winners</Link>
              <Link to="/team" className="footer-link">Schedule</Link>
            </div>

            {/* Sub-col 2: Timeline Overview */}
            <div className="footer-timeline-col">
              <div className="footer-col-header">
                Timeline Overview
              </div>
              <div className="footer-timeline-item">
                <div className="footer-timeline-title">Portfolio Week</div>
                <div className="footer-timeline-date">24 to 31 Oct 2026</div>
              </div>
              <div className="footer-timeline-item">
                <div className="footer-timeline-title">Build Month</div>
                <div className="footer-timeline-date">1 to 30 Nov 2026</div>
              </div>
              <div className="footer-timeline-item">
                <div className="footer-timeline-title">Christmas Eve Month</div>
                <div className="footer-timeline-date">1 to 24 Dec 2026</div>
              </div>
              <div className="footer-timeline-item">
                <div className="footer-timeline-title finale">Grand Finale</div>
                <div className="footer-timeline-date finale">27 Dec 2026 (proposed)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div>FOSS TKMCE. Open-source initiative.</div>
          <div>Organized at T.K.M. College of Engineering, Kollam.</div>
        </div>
      </div>

      <style>{`
        .site-footer {
          margin-top: 6rem;
          padding: 3rem 0 2rem 0;
        }
        .footer-main-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2.5rem;
          margin-bottom: 2.5rem;
        }
        .footer-brand-title {
          font-weight: 700;
          color: var(--color-white);
          font-size: 1.05rem;
          margin-bottom: 0.4rem;
        }
        .footer-brand-desc {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          line-height: 1.6;
          margin-bottom: 0.9rem;
          max-width: 420px;
        }
        .footer-social-links {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
        }
        .footer-social-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--color-text-muted);
          font-size: 0.78rem;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .footer-social-link:hover {
          color: var(--theme-primary);
        }
        .footer-links-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1.5rem;
        }
        .footer-nav-col {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          font-size: 0.82rem;
        }
        .footer-col-header {
          color: var(--color-white);
          font-weight: 600;
          margin-bottom: 0.3rem;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.04em;
        }
        .footer-link {
          color: var(--color-text-muted);
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .footer-link:hover {
          color: var(--theme-primary);
        }
        .footer-timeline-col {
          font-size: 0.82rem;
          color: var(--color-text-muted);
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }
        .footer-timeline-item {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }
        .footer-timeline-title {
          color: var(--color-text-main);
          font-size: 0.8rem;
          font-weight: 500;
        }
        .footer-timeline-title.finale {
          color: var(--theme-primary);
          font-weight: 600;
        }
        .footer-timeline-date {
          font-size: 0.73rem;
          color: var(--color-text-subtle);
        }
        .footer-timeline-date.finale {
          color: var(--theme-primary);
          opacity: 0.85;
        }
        .footer-bottom-bar {
          border-top: 1px solid var(--theme-border);
          padding-top: 1.2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          color: var(--color-text-subtle);
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        /* Compact Mobile View */
        @media (max-width: 640px) {
          .site-footer {
            margin-top: 2rem !important;
            padding: 1.25rem 0 1rem 0 !important;
          }
          .footer-main-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
            margin-bottom: 1rem !important;
          }
          .footer-brand-title {
            font-size: 0.95rem !important;
            margin-bottom: 0.2rem !important;
          }
          .footer-brand-desc {
            font-size: 0.74rem !important;
            line-height: 1.4 !important;
            margin-bottom: 0.45rem !important;
          }
          .footer-social-links {
            gap: 0.65rem !important;
          }
          .footer-social-link {
            font-size: 0.72rem !important;
          }
          .footer-links-grid {
            gap: 0.75rem !important;
          }
          .footer-col-header {
            font-size: 0.68rem !important;
            margin-bottom: 0.2rem !important;
          }
          .footer-nav-col {
            gap: 0.22rem !important;
          }
          .footer-link {
            font-size: 0.72rem !important;
            line-height: 1.3 !important;
          }
          .footer-timeline-col {
            gap: 0.35rem !important;
          }
          .footer-timeline-item {
            gap: 0.05rem !important;
          }
          .footer-timeline-title {
            font-size: 0.72rem !important;
            line-height: 1.2 !important;
          }
          .footer-timeline-date {
            font-size: 0.66rem !important;
            line-height: 1.2 !important;
          }
          .footer-bottom-bar {
            padding-top: 0.65rem !important;
            font-size: 0.67rem !important;
            gap: 0.2rem !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            line-height: 1.3 !important;
          }
        }
      `}</style>
    </footer>
  );
}
