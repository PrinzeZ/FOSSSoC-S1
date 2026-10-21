import React, { useState } from 'react';
import { useTheme, THEMES } from '../../context/ThemeContext';
import { Terminal } from 'lucide-react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeList = Object.values(THEMES);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.2rem',
        right: '1.2rem',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.4rem',
        fontFamily: 'var(--font-mono)'
      }}
    >
      {isOpen && (
        <div
          role="dialog"
          aria-label="Theme selector"
          style={{
            padding: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.3rem',
            background: 'var(--theme-card-bg)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--theme-border)',
            minWidth: '180px'
          }}
        >
          <div
            style={{
              padding: '0.2rem 0.4rem',
              fontSize: '0.7rem',
              color: 'var(--color-text-subtle)',
              textTransform: 'uppercase'
            }}
          >
            Terminal Skin
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
                  justifyContent: 'space-between',
                  padding: '0.4rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  color: isActive ? '#000000' : 'var(--color-text-muted)',
                  background: isActive ? 'var(--theme-primary)' : 'transparent',
                  border: '1px solid ' + (isActive ? 'var(--theme-primary)' : 'transparent'),
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%'
                }}
              >
                <span>{item.name}</span>
                <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>[{item.code}]</span>
              </button>
            );
          })}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme selection"
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.45rem 0.8rem',
          background: 'var(--theme-card-bg)',
          border: '1px solid var(--theme-border)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--color-white)',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-mono)',
          cursor: 'pointer'
        }}
      >
        <Terminal size={13} color="var(--theme-primary)" />
        <span>skin: {theme}</span>
      </button>
    </div>
  );
}
