import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const exhibitorsData = [
  { id: 1, name: 'TechNova Solutions', booth: 'A1', zone: 'Tech Zone', industry: 'Cloud & AI', description: 'Enterprise cloud automation and AI workflow tools.' },
  { id: 2, name: 'Gourmet Bites', booth: 'B2', zone: 'Retail Zone', industry: 'Food & Beverage', description: 'Artisanal packaged foods and smart catering tech.' },
  { id: 3, name: 'PixelCraft Studio', booth: 'C6', zone: 'Startup Hub', industry: 'Design & 3D', description: 'Interactive 3D branding and spatial web experiences.' },
  { id: 4, name: 'FinEdge Systems', booth: 'A4', zone: 'Tech Zone', industry: 'FinTech', description: 'Next-gen payment gateways for global merchants.' },
  { id: 5, name: 'EcoWear Apparel', booth: 'B5', zone: 'Retail Zone', industry: 'Fashion', description: 'Sustainable fabrics and smart retail supply chains.' },
];

const zones = ['All', 'Tech Zone', 'Retail Zone', 'Startup Hub'];
const zoneCounts = {
  All: exhibitorsData.length,
  ...exhibitorsData.reduce((counts, exhibitor) => ({
    ...counts,
    [exhibitor.zone]: (counts[exhibitor.zone] || 0) + 1,
  }), {}),
};
const zoneStyles = {
  'Tech Zone': { avatar: 'bg-[#5145CD]/10 text-[#5145CD]', label: 'text-[#5145CD]' },
  'Retail Zone': { avatar: 'bg-[#7C3AED]/10 text-[#7C3AED]', label: 'text-[#7C3AED]' },
  'Startup Hub': { avatar: 'bg-[#F5A623]/15 text-[#9A5A00]', label: 'text-[#9A5A00]' },
};

const Exhibitors = () => {
  const [search, setSearch] = useState('');
  const [selectedZone, setSelectedZone] = useState('All');
  const [savedIds, setSavedIds] = useState([]);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const filteredExhibitors = exhibitorsData.filter((exhibitor) => {
    const matchesZone = selectedZone === 'All' || exhibitor.zone === selectedZone;
    const searchableDetails = `${exhibitor.name} ${exhibitor.booth} ${exhibitor.industry} ${exhibitor.zone}`.toLowerCase();
    const matchesSearch = searchableDetails.includes(search.trim().toLowerCase());
    const matchesSaved = !showSavedOnly || savedIds.includes(exhibitor.id);
    return matchesZone && matchesSearch && matchesSaved;
  });

  const toggleSaved = (id) => {
    setSavedIds((currentIds) => (
      currentIds.includes(id)
        ? currentIds.filter((savedId) => savedId !== id)
        : [...currentIds, id]
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
                Meet the people behind the ideas
              </p>
              <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                The exhibitor <span className="font-serif font-normal italic text-[#e2bd82]">directory.</span>
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-6 text-slate-300 sm:text-base">
                Get to know the teams, makers, and brands bringing the exhibition floor to life.
              </p>
            </div>
            <div className="flex items-center gap-4 border-t border-white/15 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-4xl font-semibold tracking-tight">{exhibitorsData.length.toString().padStart(2, '0')}</p>
              <div>
                <p className="text-sm font-semibold text-white">Featured exhibitors</p>
                <p className="mt-1 text-xs text-slate-400">Across 3 exhibition zones</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Find an exhibitor" className="mb-8 rounded-2xl border border-[#e6e5e0] bg-white p-4 shadow-[0_8px_30px_rgba(25,35,52,0.04)] sm:p-5">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#192334]">Who would you like to meet?</p>
                <p className="mt-1 text-xs text-[#737980]">Search a company, industry, or booth number</p>
              </div>
              <div className="relative block w-full md:max-w-sm">
                <label htmlFor="exhibitor-search" className="sr-only">Search exhibitors</label>
                <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777d83]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.7" />
                  <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                <input
                  id="exhibitor-search"
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Try “FinTech” or “A1”"
                  className="w-full rounded-xl border border-[#e7e7e3] bg-[#fafaf8] py-3 pl-11 pr-11 text-sm text-[#192334] outline-none transition placeholder:text-[#969a9e] focus:border-[#a78a58] focus:ring-2 focus:ring-[#d5a35b]/20"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-lg leading-none text-[#777d83] transition hover:bg-[#ecece8] hover:text-[#192334] focus:outline-none focus:ring-2 focus:ring-[#5145CD]"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2" aria-label="Filter by exhibition zone">
              {zones.map((zone) => (
                <button
                  key={zone}
                  type="button"
                  aria-pressed={selectedZone === zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                    selectedZone === zone
                      ? 'bg-[#5145CD] text-white'
                      : 'bg-[#f3f3f0] text-[#62686e] hover:bg-[#e9e9e4] hover:text-[#192334]'
                  }`}
                >
                  {zone} ({zoneCounts[zone]})
                </button>
              ))}
              <button
                type="button"
                aria-pressed={showSavedOnly}
                onClick={() => setShowSavedOnly((isShowingSaved) => !isShowingSaved)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                  showSavedOnly
                    ? 'bg-[#5145CD] text-white'
                    : 'bg-[#f3f3f0] text-[#62686e] hover:bg-[#e9e9e4] hover:text-[#192334]'
                }`}
              >
                Saved ({savedIds.length})
              </button>
            </div>
          </div>
        </section>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-[#192334]">On the show floor</h2>
          <p className="text-xs text-[#777d83]">{filteredExhibitors.length} {filteredExhibitors.length === 1 ? 'exhibitor' : 'exhibitors'}</p>
        </div>

        {filteredExhibitors.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#d8d8d1] bg-white px-6 py-16 text-center">
            <p className="font-medium text-[#192334]">No exhibitors found</p>
            <p className="mt-2 text-sm text-[#737980]">
              {showSavedOnly && savedIds.length === 0
                ? 'Save an exhibitor to build your shortlist.'
                : 'Try another search or select a different zone.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setSelectedZone('All');
                setShowSavedOnly(false);
              }}
              className="mt-5 rounded-full border border-[#d8d8d1] px-4 py-2 text-xs font-semibold text-[#192334] transition hover:bg-[#f3f3f0]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredExhibitors.map((exhibitor, index) => {
              const zoneStyle = zoneStyles[exhibitor.zone];
              const isSaved = savedIds.includes(exhibitor.id);
              return (
                <article key={exhibitor.id} className="group relative flex h-full min-h-64 flex-col justify-between overflow-hidden rounded-2xl border border-[#e6e5e0] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#5145CD]/40 hover:shadow-md">
                  <div className="mb-7 flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-semibold tracking-tight ${zoneStyle.avatar}`}>
                      {exhibitor.name.split(' ').map((word) => word[0]).slice(0, 2).join('')}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleSaved(exhibitor.id)}
                        aria-label={isSaved ? `Remove ${exhibitor.name} from saved exhibitors` : `Save ${exhibitor.name}`}
                        aria-pressed={isSaved}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-[#5145CD] ${
                          isSaved
                            ? 'border-[#5145CD]/30 bg-[#5145CD]/10 text-[#5145CD]'
                            : 'border-[#e6e5e0] text-[#777d83] hover:border-[#5145CD]/40 hover:text-[#5145CD]'
                        }`}
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} aria-hidden="true">
                          <path d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-3.75L6 21V4.75Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <div className="rounded-xl bg-[#192334] px-3 py-2 text-right">
                        <p className="text-[9px] font-medium uppercase tracking-[0.16em] text-slate-400">Booth</p>
                        <p className="mt-0.5 text-sm font-semibold tracking-wide text-[#e2bd82]">{exhibitor.booth}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] ${zoneStyle.label}`}>{exhibitor.zone} <span className="px-1 text-[#c7c5bd]">/</span> {String(index + 1).padStart(2, '0')}</p>
                    <h3 className="text-xl font-semibold tracking-tight text-[#192334]">{exhibitor.name}</h3>
                    <p className="mt-1 text-sm font-medium text-[#7d8286]">{exhibitor.industry}</p>
                    <p className="mt-4 text-sm leading-6 text-[#687078]">{exhibitor.description}</p>
                  </div>
                  <Link
                    to={`/?booth=${encodeURIComponent(exhibitor.booth)}#floor-plan`}
                    className="mt-5 flex items-center justify-between border-t border-[#efefeb] pt-4 text-xs text-[#777d83] transition-colors group-hover:text-[#5145CD]"
                  >
                    <span>Find them on the show floor</span>
                    <span aria-hidden="true" className="text-base transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
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

export default Exhibitors;
