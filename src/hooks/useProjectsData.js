import { useState, useEffect } from 'react';

export function useProjectsData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isUnlockForced = () => {
    try {
      const search = window.location.search;
      if (search.includes('unlock=1')) return true;
      const hash = window.location.hash;
      if (hash.includes('unlock=1')) return true;
    } catch (e) {
      // ignore
    }
    return false;
  };

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.BASE_URL || '/';
        const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
        const res = await fetch(`${cleanBase}data/projects.json`);
        if (!res.ok) {
          throw new Error(`Failed to load projects: HTTP ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return {
    data,
    loading,
    error,
    isUnlockedBypass: isUnlockForced()
  };
}
