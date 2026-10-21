import { useState, useEffect } from 'react';

export function useWinnersData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWinners() {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.BASE_URL || '/';
        const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
        const res = await fetch(`${cleanBase}data/winners.json`);
        if (!res.ok) {
          throw new Error(`Failed to load winners: HTTP ${res.status}`);
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

    fetchWinners();
  }, []);

  return { data, loading, error };
}

export function useTeamData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTeam() {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.BASE_URL || '/';
        const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
        const res = await fetch(`${cleanBase}data/team.json`);
        if (!res.ok) {
          throw new Error(`Failed to load team: HTTP ${res.status}`);
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

    fetchTeam();
  }, []);

  return { data, loading, error };
}
