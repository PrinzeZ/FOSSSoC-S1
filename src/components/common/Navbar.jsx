import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { REG_FORM_URL } from '../../constants/config';
import { Menu, X, ExternalLink, Code2 } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/portfolio', label: 'Portfolio Week' },
    { to: '/projects', label: 'Projects' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/rules', label: 'Rules & Points' },
    { to: '/winners', label: 'Winners' },
    { to: '/team', label: 'Team & Schedule' }
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: 'rgba(11, 8, 19, 0.75)',
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
          height: '4.5rem'
        }}
      >
        {/* Brand Logo & Name */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--theme-border)'
            }}
          >
            <img
              src="/logos/foss.jpeg"
              alt="FOSS TKMCE"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                objectFit: 'cover'
              }}
              onError={(e) => {
                // Fallback to text icon if not loaded yet
                e.currentTarget.style.display = 'none';
              }}
            />
            <img
              src="/logos/tkm.png"
              alt="TKMCE"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                objectFit: 'contain'
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '1.25rem',
                letterSpacing: '-0.02em',
                color: 'var(--color-white)',
                lineHeight: 1.1
              }}
            >
              FOSSSoC<span style={{ color: 'var(--theme-primary)' }}>-S1</span>
            </span>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase'
              }}
            >
              FOSS TKMCE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.2rem'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                fontSize: '0.88rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--theme-primary)' : 'var(--color-text-muted)',
                padding: '0.4rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                transition: 'all var(--transition-fast)',
                borderBottom: isActive ? '2px solid var(--theme-primary)' : '2px solid transparent'
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Register CTA */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.8rem'
          }}
          className="desktop-nav"
        >
          <a
            href={REG_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
            style={{
              padding: '0.55rem 1.1rem',
              boxShadow: '0 0 15px var(--theme-glow)'
            }}
          >
            <span>Register</span>
            <ExternalLink size={14} />
          </a>
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
            padding: '0.5rem',
            color: 'var(--color-white)',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid var(--theme-border)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer'
          }}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1.2rem 1.5rem',
            background: 'var(--theme-card-bg)',
            borderBottom: '1px solid var(--theme-border)',
            gap: '0.6rem'
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                fontSize: '1rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--theme-primary)' : 'var(--color-text-muted)',
                padding: '0.6rem 0.8rem',
                borderRadius: 'var(--radius-sm)',
                background: isActive ? 'var(--theme-badge-bg)' : 'transparent'
              })}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            href={REG_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              marginTop: '0.5rem',
              width: '100%',
              justifyContent: 'center'
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>Register Now</span>
            <ExternalLink size={16} />
          </a>
        </div>
      )}

      {/* CSS helper for responsive navigation */}
      <style>{`
        @media (min-width: 960px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
