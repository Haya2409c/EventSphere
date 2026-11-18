import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 50;

const Hero3D = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const images = Array.from({ length: frameCount }, () => new Image());
    const playhead = { frame: 0 };

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      renderFrame();
    };

    const renderFrame = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const image = images[playhead.frame];

      if (!image?.complete || !image.naturalWidth) return;

      const scale = Math.max(
        canvas.width / image.naturalWidth,
        canvas.height / image.naturalHeight,
      );
      const x = (canvas.width - image.naturalWidth * scale) / 2;
      const y = (canvas.height - image.naturalHeight * scale) / 2;

      context.drawImage(
        image,
        x,
        y,
        image.naturalWidth * scale,
        image.naturalHeight * scale,
      );
    };

    images.forEach((image, index) => {
      image.onload = () => {
        if (images[playhead.frame] === image) renderFrame();
      };
      image.onerror = () => {
        console.error(`Unable to load hero frame: ${image.src}`);
      };
      image.src = `/assets/frames/ezgif-frame-${String(index + 1).padStart(3, '0')}.jpg`;
    });

    resizeCanvas();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=140%',
        scrub: 0.8,
        pin: true,
      },
    });

    timeline.to(playhead, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: renderFrame,
      duration: 1,
    });

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative isolate h-screen min-h-[38rem] overflow-hidden bg-slate-950"
      aria-label="EventSphere exhibition introduction"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/40 to-slate-950/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-slate-950/10" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 pb-16 pt-28 sm:px-10 lg:px-16">
        <div className="max-w-3xl text-white">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
            A new way to experience expos
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Good ideas deserve a bigger room.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Discover inspiring exhibitions, meet the people shaping what&apos;s next,
            and turn a great conversation into your next opportunity.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#upcoming"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Explore upcoming expos
              <span className="ml-2" aria-hidden="true">→</span>
            </a>
            <span className="text-sm text-white/70">Scroll to explore the venue</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 right-6 z-10 hidden items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-white/70 sm:flex lg:right-12">
        Scroll to explore
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-base" aria-hidden="true">
          ↓
        </span>
      </div>
    </section>
  );
};

export default Hero3D;
