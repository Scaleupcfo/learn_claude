import { useState, useEffect } from 'react';

export type OS = 'mac' | 'windows' | 'linux' | 'unknown';

function detect(): OS {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('mac')) return 'mac';
  if (ua.includes('win')) return 'windows';
  if (ua.includes('linux')) return 'linux';
  return 'unknown';
}

const STORAGE = 'learn-claude.os';

export function useOS(): [OS, (os: OS) => void] {
  const [os, setOS] = useState<OS>(() => {
    if (typeof window === 'undefined') return 'unknown';
    return (localStorage.getItem(STORAGE) as OS | null) ?? detect();
  });
  useEffect(() => {
    localStorage.setItem(STORAGE, os);
  }, [os]);
  return [os, setOS];
}
