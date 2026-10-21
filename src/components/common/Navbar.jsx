import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { REG_FORM_URL } from '../../config';
import { Menu, X, ExternalLink } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/portfolio', label: 'Portfolio Week' },
    { to: '/projects', label: 'Projects' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/rules', label: 'Rules & Points' },
    { to: '/winners', label: 'Winners' },
    { to: '/team', label: 'Schedule' }
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        background: 'var(--theme-bg)',
        borderBottom: '1px solid var(--theme-border)',
        transition: 'border-color var(--transition-fast)'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4rem'
        }}
      >
        {/* Brand Logo & Name */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.2rem 0.4rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--theme-border)'
            }}
          >
            <img
              src="/logos/foss.jpeg"
              alt="FOSS TKMCE"
              style={{ width: '22px', height: '22px', borderRadius: '3px', objectFit: 'cover' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <img
              src="/logos/tkm.png"
              alt="TKMCE"
              style={{ width: '22px', height: '22px', borderRadius: '3px', objectFit: 'contain' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: 'var(--color-white)',
                lineHeight: 1
              }}
            >
              FOSSSoC-S1
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-muted)'
              }}
            >
              / tkmfoss
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                color: isActive ? 'var(--theme-primary)' : 'var(--color-text-muted)',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                borderBottom: isActive ? '2px solid var(--theme-primary)' : '2px solid transparent'
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Register CTA */}
        <div style={{ display: 'none', alignItems: 'center' }} className="desktop-nav">
          {REG_FORM_URL ? (
            <a
              href={REG_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}
            >
              <span>Register</span>
              <ExternalLink size={13} />
            </a>
          ) : (
            <button
              disabled
              className="btn btn-secondary btn-sm"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                opacity: 0.6,
                cursor: 'not-allowed'
              }}
              title="Registration link coming soon"
            >
              Registration link coming soon
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          className="mobile-toggle"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.45rem',
            color: 'var(--color-white)',
            border: '1px solid var(--theme-border)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer'
          }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem 1.2rem',
            background: 'var(--theme-bg)',
            borderBottom: '1px solid var(--theme-border)',
            gap: '0.4rem'
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                fontSize: '0.9rem',
                fontFamily: 'var(--font-mono)',
                color: isActive ? 'var(--theme-primary)' : 'var(--color-text-muted)',
                padding: '0.5rem 0.6rem'
              })}
            >
              {link.label}
            </NavLink>
          ))}
          <div style={{ marginTop: '0.5rem' }}>
            {REG_FORM_URL ? (
              <a
                href={REG_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Register</span>
                <ExternalLink size={14} />
              </a>
            ) : (
              <button
                disabled
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'center', opacity: 0.6, cursor: 'not-allowed' }}
              >
                Registration link coming soon
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 960px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
