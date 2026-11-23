import React, { useState, useMemo } from 'react';

const initialPasses = [
  {
    id: 'PASS-ES26-8841',
    expoName: 'Global Tech & AI Summit 2026',
    tagline: 'Enterprise AI, Autonomous Robotics & Cloud Infrastructure Expo',
    tier: 'VIP All-Access',
    category: 'Active',
    status: 'Active • Ready for Entry',
    holderName: 'Haya Shakil',
    holderEmail: 'haya@eventsphere.io',
    dateLabel: 'Dec 12 – Dec 14, 2026',
    entryTime: '09:00 AM Daily',
    venue: 'Expo Center Karachi • Halls A–C',
    address: 'Main University Road, Block 15, Gulshan-e-Iqbal, Karachi',
    entryGate: 'Gate 2 • VIP Fast-Track Lane',
    hallAccess: 'All Halls (A, B, C) + VIP Executive Lounge',
    seatZone: 'Front Reserved Keynote Seating',
    parkingInfo: 'Complimentary Valet & Gate 2 VIP Parking',
    qrPattern: [
      1,1,1,1,1,0,1,0,1,1,1,1,1,
      1,0,0,0,1,0,0,1,1,0,0,0,1,
      1,0,1,0,1,0,1,0,1,0,1,0,1,
      1,0,0,0,1,0,1,1,1,0,0,0,1,
      1,1,1,1,1,0,1,0,1,1,1,1,1,
      0,0,0,0,0,0,1,0,0,0,0,0,0,
      1,0,1,1,1,1,0,1,1,1,0,1,1,
      0,1,0,0,1,0,1,0,0,1,0,1,0,
      1,1,1,1,1,0,1,1,0,1,1,1,1,
      1,0,0,0,1,0,0,1,0,0,1,0,1,
      1,0,1,0,1,0,1,0,1,1,0,1,1,
      1,0,0,0,1,0,1,1,0,0,1,0,0,
      1,1,1,1,1,0,0,1,1,0,1,1,1,
    ],
  },
  {
    id: 'PASS-ES27-3190',
    expoName: 'FinTech & Digital Commerce Expo',
    tagline: 'Payments, Open Banking & Retail Innovation Showcase',
    tier: 'General Visitor Pass',
    category: 'Active',
    status: 'Upcoming • Confirmed',
    holderName: 'Haya Shakil',
    holderEmail: 'haya@eventsphere.io',
    dateLabel: 'Jan 20 – Jan 22, 2027',
    entryTime: '10:00 AM Daily',
    venue: 'Convention Plaza • Grand Pavilion',
    address: 'Main Boulevard, Gulberg III, Lahore',
    entryGate: 'Main Gate 1 • Visitor Check-In',
    hallAccess: 'Exhibition Halls 1 & 2, Open Demo Stage',
    seatZone: 'General Auditorium Seating',
    parkingInfo: 'North Plaza Public Parking Deck',
    qrPattern: [
      1,1,1,1,1,0,0,1,1,1,1,1,1,
      1,0,0,0,1,0,1,0,1,0,0,0,1,
      1,0,1,0,1,0,1,1,1,0,1,0,1,
      1,0,0,0,1,0,0,1,1,0,0,0,1,
      1,1,1,1,1,0,1,0,1,1,1,1,1,
      0,0,0,0,0,0,0,1,0,0,0,0,0,
      1,1,0,1,1,1,1,0,1,0,1,1,0,
      1,0,1,0,0,1,0,1,1,1,0,0,1,
      1,1,1,1,1,0,1,0,0,1,1,1,1,
      1,0,0,0,1,0,1,1,0,0,0,0,1,
      1,0,1,0,1,0,0,1,1,0,1,0,1,
      1,0,0,0,1,0,1,0,1,0,0,0,1,
      1,1,1,1,1,0,1,1,1,1,1,1,1,
    ],
  },
  {
    id: 'PASS-ES26-1104',
    expoName: 'CloudNative & DevOps Con 2026',
    tagline: 'Platform Engineering, Kubernetes & Observability Summit',
    tier: 'Developer Pass',
    category: 'Past',
    status: 'Completed • Checked In',
    holderName: 'Haya Shakil',
    holderEmail: 'haya@eventsphere.io',
    dateLabel: 'Sep 14 – Sep 16, 2026',
    entryTime: '09:30 AM Daily',
    venue: 'Tech Park Auditorium',
    address: 'Shahrah-e-Faisal, Karachi',
    entryGate: 'Gate A • Developer Desk',
    hallAccess: 'Main Arena & Workshop Rooms 1–4',
    seatZone: 'Standard Seating',
    parkingInfo: 'Basement Level P1',
    qrPattern: [
      1,1,1,1,1,0,1,1,1,1,1,1,1,
      1,0,0,0,1,0,0,0,1,0,0,0,1,
      1,0,1,0,1,0,1,0,1,0,1,0,1,
      1,0,0,0,1,0,1,1,1,0,0,0,1,
      1,1,1,1,1,0,0,1,1,1,1,1,1,
      0,0,0,0,0,0,1,0,0,0,0,0,0,
      0,1,1,0,1,1,0,1,1,0,1,1,0,
      1,0,0,1,0,0,1,0,0,1,0,0,1,
      1,1,1,1,1,0,1,1,0,1,1,1,1,
      1,0,0,0,1,0,0,1,0,0,0,0,1,
      1,0,1,0,1,0,1,0,1,0,1,0,1,
      1,0,0,0,1,0,1,1,0,0,0,0,1,
      1,1,1,1,1,0,1,0,1,1,1,1,1,
    ],
  },
];

const statusBadgeStyle = {
  'Active • Ready for Entry': 'bg-[#edf3ed] text-[#2f573b] border-[#b7d4bf]',
  'Upcoming • Confirmed': 'bg-[#f3f0e9] text-[#7a5f35] border-[#dfd5c3]',
  'Completed • Checked In': 'bg-slate-100 text-slate-600 border-slate-300',
};

const QrGraphic = ({ pattern, size = 'md' }) => {
  const dim = size === 'lg' ? 'h-40 w-40 p-3' : 'h-28 w-28 p-2';
  return (
    <div
      className={`${dim} rounded-2xl bg-white border-2 border-[#192334] shadow-xs grid grid-cols-13 gap-[1.5px] shrink-0`}
      aria-label="Scannable entry QR code"
    >
      {pattern.map((cell, i) => (
        <span
          key={i}
          className={`rounded-[1px] ${cell ? 'bg-[#192334]' : 'bg-white'}`}
        />
      ))}
    </div>
  );
};

const AttendeePasses = () => {
  const [activeTab, setActiveTab] = useState('Active'); // 'Active' | 'Past' | 'All'
  const [search, setSearch] = useState('');

  // Dedicated Modals
  const [viewPassModal, setViewPassModal] = useState(null);
  const [venueModal, setVenueModal] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3200);
  };

  const activeCount = useMemo(
    () => initialPasses.filter((p) => p.category === 'Active').length,
    []
  );
  const pastCount = useMemo(
    () => initialPasses.filter((p) => p.category === 'Past').length,
    []
  );

  const filteredPasses = useMemo(() => {
    return initialPasses.filter((pass) => {
      const matchesTab = activeTab === 'All' || pass.category === activeTab;
      const q = search.toLowerCase();
      const matchesSearch =
        pass.expoName.toLowerCase().includes(q) ||
        pass.tier.toLowerCase().includes(q) ||
        pass.venue.toLowerCase().includes(q) ||
        pass.id.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  const handleDownloadPass = (pass) => {
    const passText = [
      '========================================',
      '        EVENTSPHERE DIGITAL PASS        ',
      '========================================',
      `Pass ID     : ${pass.id}`,
      `Expo        : ${pass.expoName}`,
      `Pass Tier   : ${pass.tier}`,
      `Attendee    : ${pass.holderName} (${pass.holderEmail})`,
      `Dates       : ${pass.dateLabel}`,
      `Entry Time  : ${pass.entryTime}`,
      `Venue       : ${pass.venue}`,
      `Entry Gate  : ${pass.entryGate}`,
      `Access      : ${pass.hallAccess}`,
      '========================================',
      'Present this Pass ID or QR code at gate.',
    ].join('\n');

    const blob = new Blob([passText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${pass.id}_${pass.expoName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Downloaded pass ${pass.id}`);
  };

  return (
    <div className="space-y-6 pb-12 w-full min-w-0">
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 rounded-xl bg-[#192334] px-5 py-3 text-xs font-semibold text-[#e2bd82] shadow-xl border border-[#e2bd82]/30"
        >
          ✓ {toast}
        </div>
      )}

      {/* Editorial Attendee Header */}
      <div className="rounded-2xl bg-[#192334] px-6 py-5 text-white shadow-[0_12px_28px_rgba(25,35,52,0.12)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-block rounded-full border border-[#e2bd82]/35 bg-[#e2bd82]/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e2bd82]">
            Attendee Wallet
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
            My Event <span className="font-serif italic text-[#e2bd82]">Passes</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            Show your QR pass at the venue entrance for instant badge printing and hall access.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-xs">
          <div>
            <span className="text-slate-300 block">Active Passes</span>
            <strong className="text-lg font-bold text-[#e2bd82]">{activeCount}</strong>
          </div>
          <span className="h-8 w-px bg-white/15" />
          <div>
            <span className="text-slate-300 block">Past Events</span>
            <strong className="text-lg font-bold text-white">{pastCount}</strong>
          </div>
        </div>
      </div>

      {/* Tabs + Search Filter Bar */}
      <div className="rounded-2xl border border-[#e6e5e0] bg-white p-4 shadow-[0_6px_22px_rgba(25,35,52,0.04)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {/* Clear Active / Past Tabs */}
        <div className="inline-flex rounded-xl border border-[#e6e5e0] bg-[#fafaf8] p-1 self-start">
          {[
            { key: 'Active', label: `Active Passes (${activeCount})` },
            { key: 'Past', label: `Past Passes (${pastCount})` },
            { key: 'All', label: `All (${initialPasses.length})` },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                activeTab === tab.key
                  ? 'bg-[#192334] text-[#e2bd82]'
                  : 'text-[#525b65] hover:text-[#192334]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Simple Search */}
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by expo name, venue, or pass ID..."
          className="w-full sm:w-80 rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3.5 py-2 text-xs sm:text-sm text-[#192334] placeholder:text-[#687078] outline-none focus:border-[#192334] focus:bg-white"
        />
      </div>

      {/* Passes List */}
      {filteredPasses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#c9bea9] bg-white py-14 px-6 text-center">
          <p className="text-base font-semibold text-[#192334]">No passes found</p>
          <p className="mt-1 text-xs text-[#687078]">
            Try switching between Active and Past passes or clear your search.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveTab('Active');
              setSearch('');
            }}
            className="mt-4 rounded-xl bg-[#192334] px-4 py-2 text-xs font-semibold text-[#e2bd82]"
          >
            Show Active Passes
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredPasses.map((pass) => {
            const isPast = pass.category === 'Past';

            return (
              <article
                key={pass.id}
                className={`rounded-2xl border bg-white shadow-[0_8px_26px_rgba(25,35,52,0.05)] overflow-hidden transition ${
                  isPast
                    ? 'border-[#e6e5e0] opacity-90'
                    : 'border-[#e2bd82]/70 hover:shadow-[0_12px_32px_rgba(25,35,52,0.08)]'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left: Pass Details (8 Cols) */}
                  <div className="lg:col-span-8 p-6 flex flex-col justify-between space-y-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-full bg-[#192334] px-3 py-0.5 text-[11px] font-semibold text-[#e2bd82]">
                          {pass.tier}
                        </span>
                        <span
                          className={`rounded-full border px-3 py-0.5 text-[11px] font-semibold ${
                            statusBadgeStyle[pass.status] || statusBadgeStyle['Active • Ready for Entry']
                          }`}
                        >
                          {pass.status}
                        </span>
                      </div>

                      <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-[#192334]">
                        {pass.expoName}
                      </h2>
                      <p className="mt-1 text-xs sm:text-sm text-[#525b65]">{pass.tagline}</p>

                      {/* Date & Venue Info Grid */}
                      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl border border-[#e6e5e0] bg-[#fafaf8] p-4 text-xs">
                        <div>
                          <span className="text-[#687078] block">Event Date &amp; Entry</span>
                          <strong className="text-[#192334] text-sm mt-0.5 block">
                            📅 {pass.dateLabel}
                          </strong>
                          <span className="text-[#525b65]">{pass.entryTime}</span>
                        </div>

                        <div>
                          <span className="text-[#687078] block">Venue &amp; Gate</span>
                          <strong className="text-[#192334] text-sm mt-0.5 block">
                            📍 {pass.venue}
                          </strong>
                          <span className="text-[#7a5f35] font-medium">{pass.entryGate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Clear Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setViewPassModal(pass)}
                        className="rounded-xl bg-[#192334] px-4 py-2.5 text-xs font-semibold text-[#e2bd82] transition hover:bg-[#24324a]"
                      >
                        View Pass
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownloadPass(pass)}
                        className="rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-4 py-2.5 text-xs font-semibold text-[#192334] transition hover:border-[#192334] hover:bg-white"
                      >
                        ↓ Download Pass
                      </button>

                      <button
                        type="button"
                        onClick={() => setVenueModal(pass)}
                        className="rounded-xl border border-[#dfd5c3] bg-[#f3f0e9] px-4 py-2.5 text-xs font-semibold text-[#7a5f35] transition hover:bg-[#e2bd82]/30"
                      >
                        View Venue Details
                      </button>
                    </div>
                  </div>

                  {/* Right: Prominent QR Ticket Stub (4 Cols) */}
                  <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-dashed border-[#c9bea9] bg-[#f3f0e9]/65 p-6 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7a5f35] mb-3">
                      Scan at Entrance
                    </span>

                    <QrGraphic pattern={pass.qrPattern} size="md" />

                    <p className="mt-3 font-mono text-xs font-bold tracking-wider text-[#192334] bg-white px-3 py-1 rounded-lg border border-[#e6e5e0]">
                      {pass.id}
                    </p>
                    <p className="mt-1.5 text-[11px] text-[#525b65]">
                      Attendee: <strong className="text-[#192334]">{pass.holderName}</strong>
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* DEDICATED FULL ENTRY PASS MODAL (Large Scannable QR) */}
      {viewPassModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#192334]/65 backdrop-blur-xs p-4 overflow-y-auto"
          onClick={() => setViewPassModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl border border-[#e2bd82]/60 bg-white shadow-2xl overflow-hidden my-auto"
          >
            {/* Dark Navy Top Ticket Header */}
            <div className="bg-[#192334] px-6 py-5 text-white flex items-start justify-between gap-3">
              <div>
                <span className="inline-block rounded-full bg-[#e2bd82] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#192334]">
                  {viewPassModal.tier}
                </span>
                <h3 className="mt-2 text-lg font-semibold leading-snug">
                  {viewPassModal.expoName}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">{viewPassModal.dateLabel}</p>
              </div>
              <button
                type="button"
                onClick={() => setViewPassModal(null)}
                className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-200 hover:bg-white/20"
              >
                ✕
              </button>
            </div>

            {/* Large Centered QR Code */}
            <div className="p-6 bg-[#fafaf8] flex flex-col items-center text-center border-b border-dashed border-[#c9bea9]">
              <QrGraphic pattern={viewPassModal.qrPattern} size="lg" />
              <p className="mt-3 font-mono text-sm font-bold tracking-widest text-[#192334]">
                {viewPassModal.id}
              </p>
              <p className="text-xs text-[#525b65] mt-1">
                Hold screen brightness high at scanner gate
              </p>
            </div>

            {/* Complete Pass Details */}
            <div className="p-6 space-y-2.5 text-xs">
              <div className="flex justify-between gap-3">
                <span className="text-[#687078]">Attendee Name</span>
                <strong className="text-[#192334]">{viewPassModal.holderName}</strong>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#687078]">Entry Gate</span>
                <strong className="text-[#192334]">{viewPassModal.entryGate}</strong>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#687078]">Hall Access</span>
                <strong className="text-[#192334] text-right">{viewPassModal.hallAccess}</strong>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#687078]">Seating Zone</span>
                <strong className="text-[#192334]">{viewPassModal.seatZone}</strong>
              </div>

              <div className="pt-4 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleDownloadPass(viewPassModal)}
                  className="flex-1 rounded-xl bg-[#192334] py-2.5 text-xs font-semibold text-[#e2bd82] hover:bg-[#24324a]"
                >
                  ↓ Download Pass
                </button>
                <button
                  type="button"
                  onClick={() => setViewPassModal(null)}
                  className="rounded-xl border border-[#e6e5e0] px-4 py-2.5 text-xs font-semibold text-[#192334]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VENUE DETAILS MODAL */}
      {venueModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#192334]/60 backdrop-blur-xs p-4"
          onClick={() => setVenueModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-[#e6e5e0] bg-white shadow-2xl overflow-hidden"
          >
            <div className="bg-[#192334] px-6 py-4 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e2bd82]">
                  Venue &amp; Arrival Guide
                </span>
                <h3 className="text-base font-semibold mt-0.5">{venueModal.venue}</h3>
              </div>
              <button
                type="button"
                onClick={() => setVenueModal(null)}
                className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-200 hover:bg-white/20"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="rounded-xl bg-[#fafaf8] border border-[#e6e5e0] p-4 space-y-2.5">
                <div>
                  <span className="text-[#687078] block">Full Address</span>
                  <strong className="text-[#192334] text-sm">{venueModal.address}</strong>
                </div>
                <div>
                  <span className="text-[#687078] block">Recommended Gate</span>
                  <strong className="text-[#7a5f35]">{venueModal.entryGate}</strong>
                </div>
                <div>
                  <span className="text-[#687078] block">Doors Open</span>
                  <strong className="text-[#192334]">{venueModal.entryTime}</strong>
                </div>
                <div>
                  <span className="text-[#687078] block">Parking &amp; Drop-off</span>
                  <strong className="text-[#192334]">{venueModal.parkingInfo}</strong>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setVenueModal(null)}
                  className="rounded-xl bg-[#192334] px-5 py-2 text-xs font-semibold text-[#e2bd82]"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendeePasses;