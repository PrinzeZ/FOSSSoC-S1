import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { CONFIG } from '../../config';
import { useTheme } from '../../context/ThemeContext';
import { Menu, X, ExternalLink } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, themes } = useTheme();
  const currentTheme = themes[theme] || themes.october;

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
        background: 'rgba(9, 9, 11, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--theme-border)',
        height: '4.5rem',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          width: '100%'
        }}
      >
        {/* Brand Logo & Name - Strictly nowrap */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.2rem 0.35rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--theme-border)',
              background: 'rgba(255, 255, 255, 0.03)'
            }}
          >
            <img
              src={`${(import.meta.env.BASE_URL || '/').replace(/\/$/, '')}/logos/foss.jpeg`}
              alt="FOSS TKMCE"
              style={{ width: '24px', height: '24px', borderRadius: '2px', objectFit: 'cover' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <img
              src={`${(import.meta.env.BASE_URL || '/').replace(/\/$/, '')}/logos/tkm.png`}
              alt="TKMCE"
              style={{ width: '24px', height: '24px', borderRadius: '2px', objectFit: 'contain' }}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', whiteSpace: 'nowrap' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '1.15rem',
                color: 'var(--color-white)',
                lineHeight: 1,
                whiteSpace: 'nowrap'
              }}
            >
              FOSSSoC-S1
            </span>
            <span
              className="navbar-brand-sub"
              style={{
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-subtle)',
                whiteSpace: 'nowrap'
              }}
            >
              / tkmfoss
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links - Perfectly centered, nowrap */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.4rem',
            whiteSpace: 'nowrap'
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                fontSize: '0.84rem',
                fontFamily: 'var(--font-mono)',
                color: isActive ? 'var(--theme-primary)' : 'var(--color-text-muted)',
                padding: '0.45rem 0.7rem',
                borderRadius: 'var(--radius-sm)',
                whiteSpace: 'nowrap',
                background: isActive ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                borderBottom: isActive ? '2px solid var(--theme-primary)' : '2px solid transparent',
                transition: 'color 0.15s ease, border-color 0.15s ease'
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Action: Theme Board Badge + Register CTA */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '0.75rem',
            flexShrink: 0,
            whiteSpace: 'nowrap'
          }}
          className="desktop-nav"
        >
          {/* Theme Board Badge */}
          <div
            className="navbar-theme-board"
            title={`Active seasonal theme: ${currentTheme.themeName} (${currentTheme.name})`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.28rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--theme-border)',
              background: 'rgba(255, 255, 255, 0.03)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              color: 'var(--color-text-muted)'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--theme-primary)',
                boxShadow: '0 0 6px var(--theme-primary)',
                display: 'inline-block'
              }}
            />
            <span style={{ color: 'var(--color-text-subtle)' }}>theme:</span>
            <span style={{ color: 'var(--color-white)', fontWeight: 600 }}>{currentTheme.themeName}</span>
          </div>

          {CONFIG.REG_FORM_URL ? (
            <a
              href={CONFIG.REG_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}
            >
              <span>[ Register ]</span>
              <ExternalLink size={13} />
            </a>
          ) : (
            <button
              disabled
              className="btn btn-disabled btn-sm"
              style={{
                whiteSpace: 'nowrap',
                fontSize: '0.78rem'
              }}
              title="Registration link will be announced soon"
            >
              [ Registration: Soon ]
            </button>
          )}
        </div>

        {/* Mobile Header: Theme Pill + Hamburger Button */}
        <div
          className="mobile-toggle-wrapper"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem'
          }}
        >
          {/* Mobile Theme Pill */}
          <div
            className="mobile-theme-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.22rem 0.55rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--theme-border)',
              background: 'rgba(255, 255, 255, 0.03)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--color-text-muted)',
              whiteSpace: 'nowrap'
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'var(--theme-primary)',
                display: 'inline-block'
              }}
            />
            <span style={{ color: 'var(--color-white)', fontWeight: 600 }}>{currentTheme.themeName}</span>
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
              border: '1px solid var(--theme-border)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '4.5rem',
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.2rem',
            background: 'var(--theme-bg)',
            borderBottom: '1px solid var(--theme-border)',
            gap: '0.5rem',
            zIndex: 60,
            boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
          }}
        >
          {/* Theme Indicator in Mobile Menu */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.45rem 0.65rem',
              marginBottom: '0.4rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--theme-border)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem'
            }}
          >
            <span style={{ color: 'var(--color-text-subtle)' }}>ACTIVE THEME:</span>
            <span style={{ color: 'var(--theme-primary)', fontWeight: 600 }}>{currentTheme.themeName}</span>
          </div>

          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                fontSize: '0.9rem',
                fontFamily: 'var(--font-mono)',
                color: isActive ? 'var(--theme-primary)' : 'var(--color-text-muted)',
                padding: '0.6rem 0.8rem',
                borderRadius: 'var(--radius-sm)',
                background: isActive ? 'rgba(255, 255, 255, 0.04)' : 'transparent'
              })}
            >
              {link.label}
            </NavLink>
          ))}
          <div style={{ marginTop: '0.6rem', borderTop: '1px solid var(--theme-border)', paddingTop: '0.8rem' }}>
            {CONFIG.REG_FORM_URL ? (
              <a
                href={CONFIG.REG_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>[ Register ]</span>
                <ExternalLink size={14} />
              </a>
            ) : (
              <button
                disabled
                className="btn btn-disabled btn-sm"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                [ Registration: Soon ]
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 1040px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle-wrapper { display: none !important; }
        }
        @media (max-width: 1039px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle-wrapper { display: flex !important; }
        }
        @media (max-width: 440px) {
          .navbar-brand-sub { display: none !important; }
        }
      `}</style>
    </header>
  );
}
