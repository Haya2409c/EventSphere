import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const getScrollParent = (node) => {
  if (typeof window === 'undefined' || !node) return window;

  let current = node.parentElement;
  while (current && current !== document.body) {
    const style = window.getComputedStyle(current);
    const overflowY = style.overflowY;
    const isScrollable = /(auto|scroll|overlay)/.test(overflowY);
    if (isScrollable && current.scrollHeight > current.clientHeight) {
      return current;
    }
    current = current.parentElement;
  }

  return window;
};

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
    const element = containerRef.current;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!element) return undefined;
    if (prefersReducedMotion) {
      gsap.set(element, { opacity: 1, y: 0, clearProps: 'transform' });
      return undefined;
    }

    const scroller = getScrollParent(element);
    const ctx = gsap.context(() => {
      const target = stagger > 0 ? element.children : element;

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
            trigger: element,
            scroller,
            start: 'top 92%',
            once: true,
          },
        }
      );
    }, containerRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [y, duration, delay, stagger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;