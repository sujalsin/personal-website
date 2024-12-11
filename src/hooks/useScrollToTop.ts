import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } catch (error) {
      // Fallback for older browsers
      window.scrollTo(0, 0);
    }
  }, [pathname]);
};

export const scrollToTop = () => {
  try {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  } catch (error) {
    // Fallback for older browsers
    window.scrollTo(0, 0);
  }
};
