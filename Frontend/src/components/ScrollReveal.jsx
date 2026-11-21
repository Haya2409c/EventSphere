import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  y = 36,
  duration = 0.8,
  delay = 0,
  stagger = 0,
  className = '',
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const target = stagger > 0 ? containerRef.current.children : containerRef.current;

      gsap.fromTo(
        target,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [y, duration, delay, stagger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;