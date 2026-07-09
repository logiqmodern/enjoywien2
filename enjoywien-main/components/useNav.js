'use client';
import { useRouter } from 'next/navigation';
import { useRef, useCallback } from 'react';

const PATHS = { home: '/', experiences: '/experiences', about: '/about', reviews: '/reviews', contact: '/contact' };

export function useNav(lang) {
  const router = useRouter();
  const pendingExp = useRef(null);
  const base = lang === 'en' ? '/en' : '';

  const setSelectedExp = useCallback((id) => { pendingExp.current = id; }, []);
  const setPage = useCallback((p) => {
    if (p === 'detail') {
      router.push(`${base}/experiences/${pendingExp.current || 'mozart'}`);
      return;
    }
    const path = PATHS[p] || '/';
    router.push(path === '/' ? (base || '/') : base + path);
  }, [router, base]);

  return { setPage, setSelectedExp };
}

// Maps current path to the mirrored path in the other language
export function mirrorPath(pathname, targetLang) {
  const bare = pathname.replace(/^\/en/, '') || '/';
  return targetLang === 'en' ? ('/en' + (bare === '/' ? '' : bare) || '/en') : bare;
}
