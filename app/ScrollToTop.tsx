'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll the window to top
    window.scrollTo(0, 0);

    // Some layouts use a fixed height with scrollable main container
    const scrollableElements = document.querySelectorAll('main, article, .fd-scrollable, [data-scrollable]');
    scrollableElements.forEach(el => {
      el.scrollTo(0, 0);
    });
  }, [pathname]);

  return null;
}
