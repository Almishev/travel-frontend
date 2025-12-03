import { useEffect, useRef, useState } from 'react';

/**
 * Hook за scroll анимации
 * @param {Object} options - Опции за анимацията
 * @param {string} options.animation - Тип анимация: 'fadeIn', 'slideUp', 'slideLeft', 'slideRight', 'scale'
 * @param {number} options.delay - Забавяне в ms
 * @param {number} options.threshold - Процент от елемента който трябва да е видим (0-1)
 * @param {string} options.duration - Продължителност на анимацията (CSS duration)
 * @returns {Object} - { ref, isVisible }
 */
export function useScrollAnimation({
  animation = 'fadeIn',
  delay = 0,
  threshold = 0.1,
  duration = '0.6s',
} = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            // Спираме да наблюдаваме след като е станал видим
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Започва малко преди да влезе в viewport
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, delay]);

  const animationStyles = {
    fadeIn: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    },
    slideUp: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
    },
    slideLeft: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-40px)',
    },
    slideRight: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
    },
    scale: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'scale(1)' : 'scale(0.9)',
    },
  };

  const style = {
    transition: `opacity ${duration} ease-out, transform ${duration} ease-out`,
    ...animationStyles[animation],
  };

  return { ref: elementRef, isVisible, style };
}

