import { useState, useEffect, useRef } from 'react';

export const useInView = (options = { threshold: 0.15, triggerOnce: true }) => {
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const target = elementRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.triggerOnce) {
          observer.unobserve(target);
        }
      } else if (!options.triggerOnce) {
        setIsInView(false);
      }
    }, options);

    observer.observe(target);
    return () => observer.disconnect();
  }, [options.threshold, options.triggerOnce]);

  return [elementRef, isInView];
};
