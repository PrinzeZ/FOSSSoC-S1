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
                  <Github size={14} />
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
                  <Globe size={14} />
                  <span>{CONFIG.ORG_SITE_URL.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Navigation & Timeline */}
          <div className="footer-links-grid">
            {/* Sub-col 1: Navigation */}
            <div className="footer-nav-col">
              <div className="footer-col-header">
                Navigation
              </div>
              <div className="footer-nav-links">
                <Link to="/" className="footer-link">Home</Link>
                <Link to="/portfolio" className="footer-link">Portfolio Week</Link>
                <Link to="/projects" className="footer-link">Projects</Link>
                <Link to="/leaderboard" className="footer-link">Leaderboard</Link>
                <Link to="/rules" className="footer-link">Rules & Points</Link>
                <Link to="/winners" className="footer-link">Winners</Link>
                <Link to="/team" className="footer-link">Schedule</Link>
              </div>
            </div>

            {/* Sub-col 2: Timeline Overview */}
            <div className="footer-timeline-col">
              <div className="footer-col-header">
                Timeline Overview
              </div>
              <div className="footer-timeline-list">
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
                <div className="footer-timeline-item finale">
                  <div className="footer-timeline-title finale">Grand Finale</div>
                  <div className="footer-timeline-date finale">27 Dec 2026 (proposed)</div>
                </div>
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
          padding: 3.5rem 0 2.5rem 0;
        }
        .footer-main-grid {
          display: grid;
          grid-template-columns: 1.1fr 1.6fr;
          gap: 3rem;
          margin-bottom: 2.5rem;
        }
        .footer-brand-title {
          font-weight: 700;
          color: var(--color-white);
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }
        .footer-brand-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.65;
          margin-bottom: 1.25rem;
          max-width: 440px;
        }
        .footer-social-links {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .footer-social-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--color-text-muted);
          font-size: 0.8rem;
          text-decoration: none;
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          border: 1px solid var(--theme-border);
          background: rgba(255, 255, 255, 0.02);
          transition: all 0.15s ease;
        }
        .footer-social-link:hover {
          color: var(--theme-primary);
          border-color: var(--theme-primary);
          background: rgba(255, 255, 255, 0.05);
        }
        .footer-links-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 2.5rem;
        }
        .footer-col-header {
          color: var(--color-white);
          font-weight: 600;
          margin-bottom: 0.85rem;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.06em;
        }
        .footer-nav-col {
          display: flex;
          flex-direction: column;
        }
        .footer-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }
        .footer-link {
          color: var(--color-text-muted);
          text-decoration: none;
          font-size: 0.84rem;
          line-height: 1.4;
          transition: color 0.15s ease, transform 0.15s ease;
        }
        .footer-link:hover {
          color: var(--theme-primary);
          transform: translateX(2px);
        }
        .footer-timeline-col {
          display: flex;
          flex-direction: column;
        }
        .footer-timeline-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .footer-timeline-item {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .footer-timeline-title {
          color: var(--color-text-main);
          font-size: 0.82rem;
          font-weight: 500;
        }
        .footer-timeline-title.finale {
          color: var(--theme-primary);
          font-weight: 600;
        }
        .footer-timeline-date {
          font-size: 0.74rem;
          color: var(--color-text-subtle);
        }
        .footer-timeline-date.finale {
          color: var(--theme-primary);
          opacity: 0.85;
        }
        .footer-bottom-bar {
          border-top: 1px solid var(--theme-border);
          padding-top: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.78rem;
          color: var(--color-text-subtle);
          flex-wrap: wrap;
          gap: 0.75rem;
          line-height: 1.5;
        }

        /* Spacious & Clean Mobile View - No Congestion */
        @media (max-width: 640px) {
          .site-footer {
            margin-top: 3.5rem !important;
            padding: 2.25rem 0 2rem 0 !important;
          }
          .footer-main-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 2rem !important;
            margin-bottom: 1.75rem !important;
          }
          .footer-brand-title {
            font-size: 1.1rem !important;
            margin-bottom: 0.4rem !important;
          }
          .footer-brand-desc {
            font-size: 0.82rem !important;
            line-height: 1.6 !important;
            margin-bottom: 1rem !important;
            max-width: 100% !important;
          }
          .footer-social-links {
            gap: 0.65rem !important;
          }
          .footer-social-link {
            font-size: 0.78rem !important;
            padding: 0.42rem 0.75rem !important;
          }
          .footer-links-grid {
            display: flex !important;
            flex-direction: column !important;
            gap: 1.75rem !important;
          }
          .footer-col-header {
            font-size: 0.75rem !important;
            margin-bottom: 0.75rem !important;
            padding-bottom: 0.35rem !important;
            border-bottom: 1px solid var(--theme-border) !important;
            color: var(--color-white) !important;
            letter-spacing: 0.06em !important;
          }
          /* 2-column clean links grid for navigation on mobile */
          .footer-nav-links {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.65rem 1rem !important;
          }
          .footer-link {
            font-size: 0.82rem !important;
            line-height: 1.4 !important;
            padding: 0.2rem 0 !important;
          }
          /* Clean, spacious timeline list with distinct cards on mobile */
          .footer-timeline-list {
            display: flex !important;
            flex-direction: column !important;
            gap: 0.55rem !important;
          }
          .footer-timeline-item {
            padding: 0.65rem 0.85rem !important;
            background: rgba(255, 255, 255, 0.02) !important;
            border: 1px solid var(--theme-border) !important;
            border-radius: 6px !important;
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            flex-wrap: wrap !important;
            gap: 0.25rem 0.75rem !important;
          }
          .footer-timeline-item.finale {
            border-color: rgba(var(--theme-primary-rgb, 120, 119, 198), 0.4) !important;
            background: rgba(var(--theme-primary-rgb, 120, 119, 198), 0.05) !important;
          }
          .footer-timeline-title {
            font-size: 0.8rem !important;
            font-weight: 600 !important;
            line-height: 1.3 !important;
          }
          .footer-timeline-date {
            font-size: 0.74rem !important;
            line-height: 1.3 !important;
          }
          .footer-bottom-bar {
            padding-top: 1.25rem !important;
            font-size: 0.72rem !important;
            gap: 0.4rem !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            line-height: 1.5 !important;
          }
        }
      `}</style>
    </footer>
  );
}
