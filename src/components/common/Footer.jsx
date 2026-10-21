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

          {/* Column 2: Navigation Links */}
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
        </div>

        <div className="footer-bottom-bar">
          <div>FOSS TKMCE. Open-source initiative.</div>
          <div>Organized at T.K.M. College of Engineering, Kollam.</div>
        </div>
      </div>

      <style>{`
        .site-footer {
          margin-top: 5rem;
          padding: 3.5rem 0 2.5rem 0;
        }
        .footer-main-grid {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 3rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }
        .footer-brand-col {
          max-width: 480px;
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
          border-radius: var(--radius-sm);
          border: 1px solid var(--theme-border);
          background: rgba(255, 255, 255, 0.02);
          transition: border-color 0.15s ease, color 0.15s ease;
        }
        .footer-social-link:hover {
          color: var(--theme-primary);
          border-color: var(--theme-border-hover);
        }
        .footer-nav-col {
          min-width: 280px;
        }
        .footer-col-header {
          color: var(--color-white);
          font-weight: 600;
          margin-bottom: 0.85rem;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.06em;
        }
        .footer-nav-links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.6rem 2rem;
        }
        .footer-link {
          color: var(--color-text-muted);
          text-decoration: none;
          font-size: 0.84rem;
          line-height: 1.4;
          transition: color 0.15s ease;
        }
        .footer-link:hover {
          color: var(--theme-primary);
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

        @media (max-width: 640px) {
          .site-footer {
            margin-top: 3rem !important;
            padding: 2.25rem 0 2rem 0 !important;
          }
          .footer-main-grid {
            flex-direction: column !important;
            gap: 2rem !important;
            margin-bottom: 1.75rem !important;
          }
          .footer-nav-links {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.65rem 1rem !important;
          }
          .footer-bottom-bar {
            padding-top: 1.25rem !important;
            font-size: 0.72rem !important;
            gap: 0.4rem !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
}
