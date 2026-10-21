import { useState, useEffect, useCallback } from 'react';
import { generateDemoLeaderboard } from '../services/mockData';

export function useLeaderboardData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const isDemo = () => {
    try {
      const search = window.location.search;
      if (search.includes('demo=1')) return true;
      const hash = window.location.hash;
      if (hash.includes('demo=1')) return true;
    } catch (e) {
      // ignore
    }
    return false;
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (isDemo()) {
        const demoData = generateDemoLeaderboard();
        setData(demoData);
        setLastRefreshed(new Date());
        setLoading(false);
        return;
      }

      const baseUrl = import.meta.env.BASE_URL || '/';
      const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      const res = await fetch(`${cleanBase}data/leaderboard.json?_t=${Date.now()}`);
      if (!res.ok) {
        throw new Error(`Failed to load leaderboard data: HTTP ${res.status}`);
      }
      const json = await res.json();
      setData(json);
      setLastRefreshed(new Date());
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    // Auto-refresh every 5 minutes (300000 ms)
    const interval = setInterval(() => {
      loadData();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [loadData]);

  // Derived high-level stats for the Home stats strip
  const stats = {
    participants: data?.users?.length || 0,
    showcasePrs: data?.users?.reduce((acc, u) => acc + (u.portfolio?.showcase > 0 ? 1 : 0), 0) || 0,
    projectPrs: data?.users?.reduce((acc, u) => acc + (u.projects?.merged || 0), 0) || 0
  };

  return {
    data,
    loading,
    error,
    lastRefreshed,
    refetch: loadData,
    stats,
    isDemoMode: isDemo()
  };
}
