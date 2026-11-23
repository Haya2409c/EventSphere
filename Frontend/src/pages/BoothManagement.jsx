import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';

const initialBooths = [
  { code: 'A12', hall: 'Hall A • Tech Zone', size: '20×20 ft', status: 'Assigned', price: '$4,800', x: '24%', y: '34%', note: 'Your current active corner booth near main aisle.' },
  { code: 'A13', hall: 'Hall A • Tech Zone', size: '15×15 ft', status: 'Available', price: '$2,900', x: '44%', y: '34%', note: 'Includes 20A power drop and dual spotlights.' },
  { code: 'A14', hall: 'Hall A • Tech Zone', size: '15×15 ft', status: 'Reserved', price: '$2,900', x: '64%', y: '34%', note: 'Temporarily held for another exhibitor.' },
  { code: 'B02', hall: 'Hall B • AI & Cloud', size: '20×20 ft', status: 'Available', price: '$4,500', x: '34%', y: '66%', note: 'High-visibility lounge-adjacent space.' },
  { code: 'B04', hall: 'Hall B • AI & Cloud', size: '15×15 ft', status: 'Available', price: '$2,750', x: '58%', y: '66%', note: 'Ideal for live product demos and kiosks.' },
  { code: 'B06', hall: 'Hall B • AI & Cloud', size: '25×25 ft', status: 'Reserved', price: '$6,200', x: '78%', y: '66%', note: 'Island showcase under review.' },
];

const statusBadge = {
  Assigned: 'bg-[#5145CD]/10 text-[#5145CD] border-[#5145CD]/30',
  Available: 'bg-[#edf3ed] text-[#42664d] border-[#42664d]/30',
  Reserved: 'bg-[#f3f0e9] text-[#80643a] border-[#80643a]/30',
};

const BoothManagement = () => {
  const [booths, setBooths] = useState(initialBooths);
  const [selectedCode, setSelectedCode] = useState('A12');
  const [zoom, setZoom] = useState(1);
  const [toast, setToast] = useState('');

  const selectedBooth = booths.find((b) => b.code === selectedCode) || booths[0];
  const currentBooth = booths.find((b) => b.status === 'Assigned') || booths[0];

  const handleRequestBooth = (code) => {
    setBooths((prev) =>
      prev.map((b) => (b.code === code ? { ...b, status: 'Reserved' } : b))
    );
    setToast(`Booth ${code} reservation request submitted`);
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="space-y-6 pb-12 sm:space-y-8">
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 rounded-xl border border-white/10 bg-[#192334] px-5 py-3 text-xs font-semibold text-[#e2bd82] shadow-xl"
        >
          ✓ {toast}
        </div>
      )}

      {/* Page Hero */}
      <ScrollReveal y={18}>
        <section className="relative overflow-hidden rounded-2xl bg-[#192334] px-5 py-5 text-white shadow-[0_12px_30px_rgba(25,35,52,0.14)] sm:px-6 sm:py-6">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#e2bd82]/15 blur-2xl" />
          <div className="pointer-events-none absolute bottom-0 right-20 h-24 w-24 rounded-full border border-white/10" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <span className="inline-flex items-center rounded-full border border-[#e2bd82]/35 bg-[#e2bd82]/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e2bd82]">
                Booth Operations
              </span>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Floor Map &amp;{' '}
                <span className="font-serif italic font-normal text-[#e2bd82]">Booth Space</span>
              </h2>
              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-300">
                Review your assigned booth, inspect nearby spaces, and request available spots directly from the interactive hall map.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200">
                <span className="mr-2 h-2 w-2 rounded-full bg-[#42664d]" aria-hidden="true" />
                Booth {currentBooth.code} assigned
              </span>
              <span className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200">
                {booths.filter((b) => b.status === 'Available').length} open nearby
              </span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Summary Cards */}
      <ScrollReveal stagger={0.08} y={24} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#192334] p-5 text-white shadow-[0_10px_28px_rgba(25,35,52,0.12)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Assigned Booth</p>
          <p className="mt-2 text-2xl font-semibold text-white">Booth {currentBooth.code}</p>
          <p className="mt-1 text-xs text-slate-300">{currentBooth.hall}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#192334] p-5 text-white shadow-[0_10px_28px_rgba(25,35,52,0.12)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Dimensions</p>
          <p className="mt-2 text-2xl font-semibold text-[#e2bd82]">{currentBooth.size}</p>
          <p className="mt-1 text-xs text-slate-300">Corner visibility</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#192334] p-5 text-white shadow-[0_10px_28px_rgba(25,35,52,0.12)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Booking Status</p>
          <p className="mt-2 text-2xl font-semibold text-[#e2bd82]">Confirmed</p>
          <p className="mt-1 text-xs text-slate-300">Badge &amp; pass quota active</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#192334] p-5 text-white shadow-[0_10px_28px_rgba(25,35,52,0.12)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Open Spaces</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {booths.filter((b) => b.status === 'Available').length} Booths
          </p>
          <p className="mt-1 text-xs text-slate-300">Available for expansion</p>
        </div>
      </ScrollReveal>

      {/* Interactive Floor Map + Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <ScrollReveal y={28} className="lg:col-span-8">
          <section className="h-full rounded-2xl border border-[#e6e5e0] bg-white p-6 shadow-[0_8px_28px_rgba(25,35,52,0.04)] flex flex-col justify-between">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a8058]">
                  Interactive Floor Plan
                </p>
                <h3 className="text-xl font-semibold text-[#192334]">Select a Booth to Inspect</h3>
              </div>

              {/* Zoom & Reset */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Zoom out"
                  onClick={() => setZoom((z) => Math.max(0.85, +(z - 0.15).toFixed(2)))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e6e5e0] bg-[#fafaf8] text-sm font-bold text-[#192334] transition hover:bg-[#efefeb] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[#192334]/10"
                >
                  −
                </button>
                <span className="w-12 text-center text-xs font-semibold text-[#687078]">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  aria-label="Zoom in"
                  onClick={() => setZoom((z) => Math.min(1.4, +(z + 0.15).toFixed(2)))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e6e5e0] bg-[#fafaf8] text-sm font-bold text-[#192334] transition hover:bg-[#efefeb] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[#192334]/10"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => setZoom(1)}
                  className="h-9 rounded-lg border border-[#e6e5e0] bg-[#fafaf8] px-3 text-xs font-semibold text-[#192334] transition hover:bg-[#efefeb] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[#192334]/10"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-4 text-xs font-medium text-[#475569]">
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#5145CD]" /> Assigned (Yours)
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#42664d]" /> Available
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#e2bd82]" /> Reserved
              </span>
            </div>

            {/* Canvas */}
            <div className="relative h-72 sm:h-80 rounded-2xl border border-[#e6e5e0] bg-[#fafaf8] overflow-hidden">
              <div
                style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
                className="w-full h-full relative transition-transform duration-200"
              >
                <div
                  className="absolute inset-0 opacity-45"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, #e6e5e0 1px, transparent 1px), linear-gradient(to bottom, #e6e5e0 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                  }}
                />
                <span className="absolute top-3 left-3 rounded-md bg-white border border-[#e6e5e0] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#192334]">
                  Hall A • Tech Zone
                </span>
                <span className="absolute bottom-3 left-3 rounded-md bg-white border border-[#e6e5e0] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#192334]">
                  Hall B • AI & Cloud
                </span>

                {booths.map((booth) => {
                  const isSelected = booth.code === selectedCode;
                  const pinClasses =
                    booth.status === 'Assigned'
                      ? 'bg-[#5145CD] text-white'
                      : booth.status === 'Available'
                      ? 'bg-[#42664d] text-white'
                      : 'bg-[#e2bd82] text-[#192334]';

                  return (
                    <button
                      key={booth.code}
                      type="button"
                      onClick={() => setSelectedCode(booth.code)}
                      aria-label={`Select booth ${booth.code}, ${booth.status}`}
                      aria-pressed={isSelected}
                      style={{ left: booth.x, top: booth.y }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-xl px-3.5 py-2 text-xs font-bold shadow-sm transition hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#192334]/20 ${pinClasses} ${
                        isSelected ? 'z-10 scale-110 ring-4 ring-[#192334]/20' : ''
                      }`}
                    >
                      {booth.code}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Details Panel */}
        <ScrollReveal y={28} delay={0.1} className="lg:col-span-4">
          <div className="h-full rounded-2xl border border-[#e6e5e0] bg-white p-6 shadow-[0_8px_28px_rgba(25,35,52,0.04)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a8058]">
                  Booth Specification
                </span>
                <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusBadge[selectedBooth.status]}`}>
                  {selectedBooth.status}
                </span>
              </div>

              <h4 className="mt-3 text-2xl font-semibold text-[#192334]">Booth {selectedBooth.code}</h4>
              <p className="text-xs font-medium text-[#687078] mt-0.5">{selectedBooth.hall}</p>

              <dl className="mt-5 space-y-3 border-t border-[#efefeb] pt-4 text-xs">
                <div className="flex justify-between">
                  <dt className="text-[#737980]">Dimensions</dt>
                  <dd className="font-semibold text-[#192334]">{selectedBooth.size}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#737980]">Package Rate</dt>
                  <dd className="font-semibold text-[#192334]">{selectedBooth.price}</dd>
                </div>
              </dl>

              <p className="mt-4 rounded-xl bg-[#fafaf8] border border-[#e6e5e0] p-3.5 text-xs leading-5 text-[#475569]">
                {selectedBooth.note}
              </p>
            </div>

            <div className="mt-6">
              {selectedBooth.status === 'Available' ? (
                <button
                  type="button"
                  onClick={() => handleRequestBooth(selectedBooth.code)}
                  className="w-full rounded-xl bg-[#192334] py-3 text-xs font-semibold text-white transition hover:bg-[#5145CD] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[#5145CD]/30"
                >
                  Request Booth {selectedBooth.code} →
                </button>
              ) : (
                <div className="rounded-xl bg-[#f7f7f5] py-3 text-center text-xs font-semibold text-[#687078]">
                  {selectedBooth.status === 'Assigned'
                    ? 'Currently assigned to your company'
                    : 'Not available for booking'}
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default BoothManagement;