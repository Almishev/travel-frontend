import { useState, useEffect, useRef } from 'react';

/**
 * Компонент за lazy loading на секции
 * Зарежда детето само когато е близо до viewport
 */
export default function LazySection({ children, fallback = null, rootMargin = '200px' }) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Ако вече е зареден, не правим нищо
    if (hasLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            setHasLoaded(true);
            // Спираме да наблюдаваме след като е зареден
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin, // Зареждаме 200px преди да влезе в viewport
        threshold: 0.01, // Минимален процент за задействане
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [hasLoaded, rootMargin]);

  return (
    <div ref={containerRef}>
      {shouldLoad ? children : fallback}
    </div>
  );
}

