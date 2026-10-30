import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from './SmoothScroll';

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  const { scrollTo } = useLenis();

  useEffect(() => {
    scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, scrollTo]);

  return null;
};
