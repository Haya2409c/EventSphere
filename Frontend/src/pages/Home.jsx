import React from 'react';
import { Link } from 'react-router-dom';
import Hero3D from '../components/Hero3D';
import BoothFloorPlan from '../components/BoothFloorPlan';
import Footer from '../components/Footer';

const expos = [
  {
    category: 'Technology',
    title: 'Global Tech Summit 2026',
    description: 'Meet the teams building what comes next in technology.',
    image: '/assets/frames/ezgif-frame-008.jpg',
    imageAlt: 'A modern exhibition hall with interactive technology booths',
  },
  {
    category: 'Retail & commerce',
    title: 'Retail & E-commerce Expo',
    description: 'Discover fresh ideas from the people reshaping retail.',
    image: '/assets/frames/ezgif-frame-025.jpg',
    imageAlt: 'Exhibition booths and visitors inside a bright expo venue',
  },
  {
    category: 'Arts & design',
    title: 'Creative Arts & Design Fair',
    description: 'Find new perspectives across design, branding, and culture.',
    image: '/assets/frames/ezgif-frame-043.jpg',
    imageAlt: 'A wide view of the EventSphere exhibition floor',
  },
];

const Home = () => (
  <div className="w-full bg-white">
    <Hero3D />

    <section id="upcoming" className="scroll-mt-24 bg-[#f7f8fb] py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mb-12 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">
              Find your next experience
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Make room for what&apos;s next.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Explore gatherings built for sharing ideas, discovering new work,
              and meeting the right people.
            </p>
          </div>
          <Link
            to="/expos"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-violet-700"
          >
            View all expos <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {expos.map((expo) => (
            <article
              key={expo.title}
              className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={expo.image}
                  alt={expo.imageAlt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-800 backdrop-blur">
                  {expo.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                  {expo.title}
                </h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
                  {expo.description}
                </p>
                <Link
                  to="/expos"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet-700 transition group-hover:gap-3"
                >
                  Explore event <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    {/* 3. Interactive Booth Floor Plan */}
      <BoothFloorPlan />

      {/* 4. Footer */}
      <Footer />
  </div>
);

export default Home;
