import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const exposData = [
  { id: 1, title: 'Global Tech Summit 2026', category: 'Technology', date: 'Dec 12–14, 2026', venue: 'Expo Center, Hall A', boothsLeft: 8, artwork: 'from-[#182943] via-[#345773] to-[#97b5a2]', mark: '01 / TECHNOLOGY' },
  { id: 2, title: 'Retail & E-Commerce Expo', category: 'Retail', date: 'Jan 05–07, 2027', venue: 'Grand Venue, Hall 3', boothsLeft: 14, artwork: 'from-[#bf7450] via-[#d89a68] to-[#f0cda0]', mark: '02 / RETAIL' },
  { id: 3, title: 'Creative Arts & Design Fair', category: 'Design', date: 'Jan 20–22, 2027', venue: 'Art Space, Level 2', boothsLeft: 5, artwork: 'from-[#554d7c] via-[#86789c] to-[#d4b8aa]', mark: '03 / DESIGN' },
  { id: 4, title: 'AI & Robotics Showcase', category: 'Technology', date: 'Feb 10–12, 2027', venue: 'Tech Arena, Hall B', boothsLeft: 3, artwork: 'from-[#1b4c52] via-[#3f8074] to-[#b4c49c]', mark: '04 / TECHNOLOGY' },
  { id: 5, title: 'Food & Hospitality Expo', category: 'Hospitality', date: 'Feb 24–26, 2027', venue: 'Convention Hall 1', boothsLeft: 11, artwork: 'from-[#915638] via-[#c17e50] to-[#e9c398]', mark: '05 / HOSPITALITY' },
];

const categories = ['All', 'Technology', 'Retail', 'Design', 'Hospitality'];

const Expos = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [registeredIds, setRegisteredIds] = useState([]);

  const filteredExpos = exposData.filter((expo) => {
    const matchesCategory = activeCategory === 'All' || expo.category === activeCategory;
    const query = search.trim().toLowerCase();
    const matchesSearch = `${expo.title} ${expo.venue} ${expo.category}`.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const handleRegister = (id) => {
    setRegisteredIds((currentIds) => (
      currentIds.includes(id) ? currentIds : [...currentIds, id]
    ));
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#f7f7f5] pt-24 sm:pt-28">
      <main className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <section className="relative mb-10 overflow-hidden rounded-[2rem] bg-[#192334] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-white/10 sm:right-8 sm:top-[-8rem] sm:h-[30rem] sm:w-[30rem]" />
          <div className="pointer-events-none absolute -right-4 top-12 h-48 w-48 rounded-full bg-[#d5a35b]/20 blur-3xl sm:right-28 sm:top-20 sm:h-64 sm:w-64" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#e2bd82]">
                <span className="h-px w-8 bg-[#e2bd82]" />
                The EventSphere calendar
              </p>
              <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Good ideas meet <span className="font-serif font-normal italic text-[#e2bd82]">their people.</span>
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-6 text-slate-300 sm:text-base">
                Find your next room to learn, build relationships, and discover what’s coming next.
              </p>
            </div>
            <div className="flex gap-8 border-t border-white/15 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div>
                <p className="text-3xl font-semibold tracking-tight">{exposData.length.toString().padStart(2, '0')}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-400">Upcoming events</p>
              </div>
              <div>
                <p className="text-3xl font-semibold tracking-tight">05</p>
                <p className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-400">Industries</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Find an expo" className="mb-8 rounded-2xl border border-[#e6e5e0] bg-white p-4 shadow-[0_8px_30px_rgba(25,35,52,0.04)] sm:p-5">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#192334]">Find your next event</p>
                <p className="mt-1 text-xs text-[#737980]">Search by event, venue, or industry</p>
              </div>
              <label className="relative block w-full md:max-w-sm">
                <span className="sr-only">Search expos</span>
                <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777d83]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.7" />
                  <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Try “design” or “Hall A”"
                  className="w-full rounded-xl border border-[#e7e7e3] bg-[#fafaf8] py-3 pl-11 pr-4 text-sm text-[#192334] outline-none transition placeholder:text-[#969a9e] focus:border-[#a78a58] focus:ring-2 focus:ring-[#d5a35b]/20"
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Filter by industry">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                    activeCategory === category
                      ? 'bg-[#5145CD] text-white'
                      : 'bg-[#f3f3f0] text-[#62686e] hover:bg-[#e9e9e4] hover:text-[#192334]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-[#192334]">On the calendar</h2>
          <p className="text-xs text-[#777d83]">{filteredExpos.length} {filteredExpos.length === 1 ? 'event' : 'events'}</p>
        </div>

        {filteredExpos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#d8d8d1] bg-white px-6 py-16 text-center">
            <p className="font-medium text-[#192334]">No events found</p>
            <p className="mt-2 text-sm text-[#737980]">Try a different search or choose another industry.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredExpos.map((expo) => {
              const isRegistered = registeredIds.includes(expo.id);
              return (
                <article key={expo.id} className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#e6e5e0] bg-white transition duration-200 hover:-translate-y-1 hover:border-[#d2c8b7] hover:shadow-[0_18px_40px_rgba(25,35,52,0.09)]">
                  <Link
                    to={`/expos/${expo.id}`}
                    aria-label={`View ${expo.title} details and schedule`}
                    className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5145CD]"
                  />
                  <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${expo.artwork}`}>
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 75% 20%, white 0 1px, transparent 1.5px)', backgroundSize: '18px 18px' }} />
                    <div className="absolute -right-5 -top-12 h-48 w-48 rounded-full border border-white/30" />
                    <div className="absolute -right-1 -top-5 h-36 w-36 rounded-full border border-white/30" />
                    <div className="absolute bottom-[-4rem] left-8 h-40 w-40 rotate-45 border border-white/30" />
                    <div className="absolute inset-x-5 bottom-4 flex items-end justify-between text-white">
                      <p className="text-[10px] font-semibold tracking-[0.2em] text-white/85">{expo.mark}</p>
                      <span className="rounded-full border border-white/40 bg-black/10 px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm">
                        {expo.boothsLeft} booths left
                      </span>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="rounded-full bg-[#f3f0e9] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#80643a]">{expo.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold leading-snug tracking-tight text-[#192334]">
                      {expo.title}
                    </h3>
                    <div className="mt-4 space-y-2 border-t border-[#efefeb] pt-4 text-sm text-[#687078]">
                      <p className="flex items-center gap-2.5">
                        <svg className="h-4 w-4 shrink-0 text-[#9a8058]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <rect x="3.5" y="5" width="17" height="15.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
                          <path d="M7.5 3.5v3M16.5 3.5v3M3.5 9.5h17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                        {expo.date}
                      </p>
                      <p className="flex items-center gap-2.5">
                        <svg className="h-4 w-4 shrink-0 text-[#9a8058]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.6" />
                          <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.6" />
                        </svg>
                        {expo.venue}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRegister(expo.id)}
                      disabled={isRegistered}
                      className={`relative z-20 mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#d5a35b] focus:ring-offset-2 ${
                        isRegistered
                          ? 'bg-[#edf3ed] text-[#42664d]'
                          : 'bg-[#192334] text-white hover:bg-[#2b3d55]'
                      }`}
                    >
                      {isRegistered ? 'Pass reserved' : 'Reserve your pass'}
                      {!isRegistered && <span aria-hidden="true">→</span>}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Expos;
