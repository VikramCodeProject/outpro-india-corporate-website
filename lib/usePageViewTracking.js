/**
 * usePageViewTracking Hook
 * Automatically tracks page views on route changes
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { trackPageView } from './ga4-analytics';

export function usePageViewTracking() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      // Track page view with current pathname and document title
      trackPageView(window.location.pathname, document.title);
    };

    // Listen for route changes (Next.js 13+ App Router)
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [router]);
}

export default usePageViewTracking;
