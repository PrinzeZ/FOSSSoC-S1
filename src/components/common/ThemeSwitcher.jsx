import React, { useState } from 'react';
import { useTheme, THEMES } from '../../context/ThemeContext';
import { Sparkles, Palette } from 'lucide-react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeList = Object.values(THEMES);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.5rem'
      }}
    >
      {isOpen && (
        <div
          role="dialog"
          aria-label="Seasonal Theme Selector"
          className="glass-panel"
          style={{
            padding: '0.6rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            background: 'var(--theme-card-bg)',
            backdropFilter: 'blur(16px)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--theme-border)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            minWidth: '190px'
          }}
        >
          <div
            style={{
              padding: '0.2rem 0.5rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--color-text-muted)'
            }}
          >
            Select Season Theme
          </div>
          {themeList.map((item) => {
            const isActive = theme === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setTheme(item.id);
                  setIsOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-white)' : 'var(--color-text-muted)',
                  background: isActive ? 'var(--theme-badge-bg)' : 'transparent',
                  border: isActive ? '1px solid var(--theme-border-hover)' : '1px solid transparent',
                  transition: 'all var(--transition-fast)',
                  textAlign: 'left',
                  width: '100%'
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>{item.name}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-subtle)' }}>
                    {item.id === 'october' ? 'Halloween Fog' : item.id === 'november' ? 'Cyber Build' : 'Winter Frost'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme selection modal"
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.55rem 0.95rem',
          background: 'var(--theme-surface)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--theme-border)',
          borderRadius: 'var(--radius-full)',
          color: 'var(--color-white)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), 0 0 15px var(--theme-glow)',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'transform var(--transition-fast), border-color var(--transition-fast)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <span style={{ fontSize: '1rem' }}>{THEMES[theme]?.icon || '🎨'}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <span>{THEMES[theme]?.name || 'Theme'}</span>
          <Palette size={14} style={{ opacity: 0.7 }} />
        </span>
      </button>
    </div>
  );
}
