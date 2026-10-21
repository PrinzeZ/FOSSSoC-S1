import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const THEMES = {
  october: {
    id: 'october',
    name: 'October',
    subtitle: 'Halloween Fog & Spirits',
    icon: '🎃',
    primary: '#FF7700'
  },
  november: {
    id: 'november',
    name: 'November',
    subtitle: 'Build & Circuit Matrix',
    icon: '⚡',
    primary: '#00F5D4'
  },
  december: {
    id: 'december',
    name: 'December',
    subtitle: 'Winter Frost & Snow',
    icon: '❄️',
    primary: '#EF233C'
  }
};

export function getAutoThemeByDate() {
  const month = new Date().getMonth(); // 0 = Jan, 9 = Oct, 10 = Nov, 11 = Dec
  if (month === 10) return 'november';
  if (month === 11) return 'december';
  return 'october'; // default to October
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    // 1. Check URL query override (?theme=...)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const queryTheme = urlParams.get('theme')?.toLowerCase();
      if (queryTheme && THEMES[queryTheme]) {
        return queryTheme;
      }
      // Also check hash query params if using HashRouter (e.g. #/?theme=november)
      const hash = window.location.hash;
      if (hash.includes('?')) {
        const hashQuery = new URLSearchParams(hash.substring(hash.indexOf('?')));
        const hashTheme = hashQuery.get('theme')?.toLowerCase();
        if (hashTheme && THEMES[hashTheme]) {
          return hashTheme;
        }
      }
    } catch (e) {
      // ignore
    }

    // 2. Check localStorage
    try {
      const saved = localStorage.getItem('fosssoc_theme');
      if (saved && THEMES[saved]) {
        return saved;
      }
    } catch (e) {
      // ignore
    }

    // 3. Auto by calendar date
    return getAutoThemeByDate();
  });

  const setTheme = (newTheme) => {
    if (THEMES[newTheme]) {
      setThemeState(newTheme);
      try {
        localStorage.setItem('fosssoc_theme', newTheme);
      } catch (e) {
        // ignore
      }
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
