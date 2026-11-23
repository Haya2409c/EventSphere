import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 50;

const drawCoverFrame = (ctx, canvas, img) => {
  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;

  if (!cw || !ch || !iw || !ih) return;

  // Math.max fills the viewport (no letterboxing) while keeping the frame centered.
  const scale = Math.max(cw / iw, ch / ih);
  const drawWidth = iw * scale;
  const drawHeight = ih * scale;
  const offsetX = (cw - drawWidth) / 2;
  const offsetY = (ch - drawHeight) / 2;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
};

const Hero3D = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const context = canvas.getContext('2d');
    if (!context) return undefined;

    const images = Array.from({ length: frameCount }, () => new Image());
    const playhead = { frame: 0 };

    const renderFrame = () => {
      const image = images[playhead.frame];
      if (!image?.complete || !image.naturalWidth) return;
      drawCoverFrame(context, canvas, image);
    };

    const resizeCanvas = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      renderFrame();
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
      className="relative isolate h-[100svh] min-h-[100svh] overflow-hidden bg-slate-950 sm:h-screen sm:min-h-[38rem]"
      aria-label="EventSphere exhibition introduction"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b101d]/80 via-[#0b101d]/45 to-[#0b101d]/85" />

      <div className="relative z-10 mx-auto flex h-full min-h-[100svh] max-w-7xl flex-col justify-between px-5 pb-8 pt-24 sm:min-h-0 sm:px-10 lg:px-16">
        <div className="flex flex-1 items-center">
          <div className="max-w-3xl text-white">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-300" />
              A new way to experience expos
            </p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Good ideas deserve a bigger room.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
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
              <span className="text-sm text-white/80">Scroll to explore the venue</span>
            </div>
          </div>
        </div>

        <div className="hidden items-center justify-end gap-3 text-xs font-medium uppercase tracking-[0.18em] text-white/75 sm:flex">
          Scroll to explore
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-base"
            aria-hidden="true"
          >
            ↓
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero3D;
