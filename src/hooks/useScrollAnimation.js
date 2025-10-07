import { useCallback } from 'react';

export const useScrollAnimation = () => {
  const scrollToCenter = useCallback((element) => {
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  }, []);

  const scrollWithOffset = useCallback((element, offset = 0) => {
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }, []);

  return {
    scrollToCenter,
    scrollWithOffset
  };
};