import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const THEMES = {
  october: {
    id: 'october',
    name: 'October',
    themeName: 'Halloween',
    subtitle: 'ASCII Fog & Bats',
    code: 'OCT',
    primary: '#FF7700'
  },
  november: {
    id: 'november',
    name: 'November',
    themeName: 'Build Month',
    subtitle: 'Blueprint & Traces',
    code: 'NOV',
    primary: '#00F5D4'
  },
  december: {
    id: 'december',
    name: 'December',
    themeName: 'Christmas Eve',
    subtitle: 'ASCII Snow Grid',
    code: 'DEC',
    primary: '#EF233C'
  }
};

export function getAutoThemeByDate() {
  const month = new Date().getMonth();
  if (month === 10) return 'november';
  if (month === 11) return 'december';
  return 'october';
}

export function ThemeProvider({ children }) {
  const resolveTheme = () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const queryTheme = urlParams.get('theme')?.toLowerCase();
      if (queryTheme && THEMES[queryTheme]) {
        return queryTheme;
      }
      const hash = window.location.hash;
      if (hash.includes('?')) {
        const hashQuery = new URLSearchParams(hash.substring(hash.indexOf('?')));
        const hashTheme = hashQuery.get('theme')?.toLowerCase();
        if (hashTheme && THEMES[hashTheme]) {
          return hashTheme;
        }
      }
    } catch (e) {}

    return getAutoThemeByDate();
  };

  const [theme, setThemeState] = useState(resolveTheme);

  // Sync theme on navigation or popstate (e.g. if query param changes)
  useEffect(() => {
    const handleLocationChange = () => {
      setThemeState(resolveTheme());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const setTheme = (newTheme) => {
    if (THEMES[newTheme]) {
      setThemeState(newTheme);
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
