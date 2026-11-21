import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const mapPins = [
  { id: 'A12', label: 'Your Booth (A12)', zone: 'Tech Zone', status: 'Your Booth', x: '34%', y: '38%', details: '20x20 ft Corner • Power & Fiber Active • 2m from Main Aisle' },
  { id: 'A14', label: 'FinEdge Systems', zone: 'Tech Zone', status: 'Neighbor', x: '58%', y: '34%', details: '15x15 ft Standard • Neighboring Exhibitor' },
  { id: 'B04', label: 'Retail Showcase', zone: 'Retail Zone', status: 'Open', x: '74%', y: '64%', details: '15x15 ft Available for Expansion' },
  { id: 'L1', label: 'Main Entrance', zone: 'Landmark', status: 'Landmark', x: '16%', y: '78%', details: 'Primary attendee entry gate — high foot traffic' },
  { id: 'L2', label: 'Keynote Stage', zone: 'Landmark', status: 'Landmark', x: '78%', y: '22%', details: 'Hall A Auditorium — 35m walk from Booth A12' },
];

const initialLeads = [
  { id: 1, name: 'Sarah Ahmed', company: 'CloudPeak Labs', time: 'Today, 2:00 PM', interest: 'Enterprise API Demo', status: 'Pending' },
  { id: 2, name: 'Omar Farooq', company: 'Nexa Retail', time: 'Today, 3:30 PM', interest: 'Partnership Inquiry', status: 'Confirmed' },
  { id: 3, name: 'Elena Vance', company: 'DesignGrid', time: 'Tomorrow, 11:00 AM', interest: 'Brochure & Pricing', status: 'Pending' },
];

const ExhibitorDashboard = () => {
  const [zoom, setZoom] = useState(1);
  const [selectedPin, setSelectedPin] = useState(mapPins[0]);
  const [leads, setLeads] = useState(initialLeads);
  const [actionToast, setActionToast] = useState('');

  const triggerQuickAction = (message) => {
    setActionToast(message);
    setTimeout(() => setActionToast(''), 2800);
  };

  const confirmLead = (id) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status: 'Confirmed' } : lead))
    );
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Quick Feedback Toast */}
      {actionToast && (
        <div
          role="status"
          className="fixed bottom-6 right-6 z-50 rounded-xl bg-[#192334] px-5 py-3 text-xs font-semibold text-[#e2bd82] shadow-xl border border-white/10"
        >
          ✓ {actionToast}
        </div>
      )}

      {/* 1. Editorial Hero Banner */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[#192334] p-6 sm:p-10 text-white">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute right-12 top-12 h-48 w-48 rounded-full bg-[#d5a35b]/20 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="rounded-full bg-[#e2bd82]/15 border border-[#e2bd82]/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e2bd82]">
                  Booth A12 • Featured
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-slate-200">
                  Global Tech Summit 2026
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold leading-tight tracking-tight">
                Your show floor is <span className="font-serif font-normal italic text-[#e2bd82]">ready for visitors.</span>
              </h2>
              <p className="mt-3 text-sm text-slate-300 leading-6">
                Track real-time booth traffic, manage meeting requests, and keep your digital brochure one tap away.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => triggerQuickAction('Exhibitor Badge QR ready to scan')}
                className="rounded-xl bg-[#e2bd82] px-5 py-3 text-xs font-semibold text-[#192334] transition hover:bg-[#ebd09f]"
              >
                Scan Visitor Badge
              </button>
              <Link
                to="/exhibitors"
                className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-xs font-semibold text-white transition hover:bg-white/10"
              >
                Preview Public Card →
              </Link>
            </div>
          </div>
      </section>

      {/* 2. Bento KPI Row (8-point spacing) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Booth Visits', value: '342', tag: '+18% today', accent: 'text-[#5145CD]' },
          { label: 'Saved Bookmarks', value: '89', tag: 'High interest', accent: 'text-[#80643a]' },
          { label: 'Brochure Downloads', value: '124', tag: 'PDF active', accent: 'text-[#42664d]' },
          { label: 'Pending Meetings', value: '02', tag: 'Action needed', accent: 'text-[#192334]' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#e6e5e0] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#d2c8b7] hover:shadow-[0_12px_28px_rgba(25,35,52,0.06)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#737980]">{stat.label}</p>
              <span className="rounded-full bg-[#f3f0e9] px-2.5 py-0.5 text-[10px] font-semibold text-[#80643a]">
                {stat.tag}
              </span>
            </div>
            <p className={`mt-4 text-3xl font-semibold tracking-tight ${stat.accent}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 3. Main Bento Grid: Interactive Floor Map (8 cols) + Quick Actions (4 cols) */}
      <div className="grid min-w-0 grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
        
        {/* Interactive Floor Map Card */}
        <div className="lg:col-span-8">
          <section className="flex h-full min-w-0 flex-col justify-between rounded-2xl border border-[#e6e5e0] bg-white p-4 shadow-[0_8px_28px_rgba(25,35,52,0.04)] sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a8058]">Live Wayfinding</p>
                <h3 className="text-xl font-semibold text-[#192334]">Hall A — Interactive Floor Map</h3>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Zoom out"
                  onClick={() => setZoom((z) => Math.max(0.85, +(z - 0.15).toFixed(2)))}
                  className="h-11 w-11 rounded-lg border border-[#e6e5e0] bg-[#fafaf8] text-sm font-bold text-[#192334] hover:bg-[#efefeb]"
                >
                  −
                </button>
                <span className="text-xs font-semibold text-[#687078] w-12 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  aria-label="Zoom in"
                  onClick={() => setZoom((z) => Math.min(1.45, +(z + 0.15).toFixed(2)))}
                  className="h-11 w-11 rounded-lg border border-[#e6e5e0] bg-[#fafaf8] text-sm font-bold text-[#192334] hover:bg-[#efefeb]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Map Canvas + Inline Context Sheet */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1">
              <div className="relative h-64 min-w-0 overflow-hidden rounded-xl border border-[#e6e5e0] bg-[#fafaf8] md:col-span-7">
                <div
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
                  className="w-full h-full relative transition-transform duration-200"
                >
                  {/* Subtle Architectural Grid */}
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, #e6e5e0 1px, transparent 1px), linear-gradient(to bottom, #e6e5e0 1px, transparent 1px)',
                      backgroundSize: '28px 28px',
                    }}
                  />

                  {/* Color-coded Zone Labels */}
                  <span className="absolute top-3 left-3 rounded-md bg-[#5145CD]/10 px-2 py-0.5 text-[10px] font-semibold text-[#5145CD]">
                    Tech Zone
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-md bg-[#f3f0e9] px-2 py-0.5 text-[10px] font-semibold text-[#80643a]">
                    Retail Zone
                  </span>

                  {/* Clickable Booth & Landmark Pins */}
                  {mapPins.map((pin) => {
                    const isSelected = selectedPin.id === pin.id;
                    const pinStyle =
                      pin.status === 'Your Booth'
                        ? 'bg-[#5145CD] text-white ring-4 ring-[#5145CD]/25'
                        : pin.status === 'Landmark'
                        ? 'bg-[#192334] text-[#e2bd82]'
                        : 'bg-white text-[#192334] border border-[#d2c8b7]';

                    return (
                      <button
                        key={pin.id}
                        type="button"
                        onClick={() => setSelectedPin(pin)}
                        style={{ left: pin.x, top: pin.y }}
                        className={`absolute min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 rounded-lg px-2.5 py-1 text-[11px] font-bold shadow-sm transition hover:scale-110 ${pinStyle} ${
                          isSelected ? 'scale-110 z-10' : ''
                        }`}
                      >
                        {pin.id}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Side Detail Sheet (No lost map context) */}
              <div className="md:col-span-5 rounded-xl border border-[#e6e5e0] bg-[#f7f7f5] p-4 flex flex-col justify-between">
                <div>
                  <span className="inline-block rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#80643a] border border-[#e6e5e0]">
                    {selectedPin.zone}
                  </span>
                  <h4 className="mt-2.5 text-base font-semibold text-[#192334]">{selectedPin.label}</h4>
                  <p className="mt-2 text-xs leading-5 text-[#687078]">{selectedPin.details}</p>
                </div>

                <Link
                  to="/exhibitor/booths"
                  className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#192334] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#2b3d55]"
                >
                  Manage Booth Space →
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Frictionless 1-Tap Actions Bento Card */}
        <div className="lg:col-span-4">
          <section className="h-full rounded-2xl border border-[#e6e5e0] bg-white p-6 shadow-[0_8px_28px_rgba(25,35,52,0.04)] flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a8058]">Quick Actions</p>
              <h3 className="text-xl font-semibold text-[#192334] mb-5">One-Tap Controls</h3>

              <div className="space-y-3">
                {[
                  { title: 'Download Booth Brochure PDF', desc: 'Shareable QR & digital catalog', msg: 'Brochure PDF downloaded' },
                  { title: 'Update Live Demo Schedule', desc: 'Notify bookmarked attendees', msg: 'Demo alert ready to publish' },
                  { title: 'Request Power / Wi-Fi Support', desc: 'Direct ping to Hall A ops team', msg: 'Support ticket sent to Organizer' },
                ].map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => triggerQuickAction(item.msg)}
                    className="w-full text-left rounded-xl border border-[#e6e5e0] bg-[#fafaf8] p-4 transition hover:border-[#5145CD]/40 hover:bg-white hover:shadow-xs group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#192334] group-hover:text-[#5145CD] transition">
                        {item.title}
                      </span>
                      <span className="text-xs text-[#9a8058] transition-transform group-hover:translate-x-1">→</span>
                    </div>
                    <p className="mt-1 text-xs text-[#737980]">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 4. Visitor Leads & Meeting Requests */}
      <section className="rounded-2xl border border-[#e6e5e0] bg-white p-6 shadow-[0_8px_28px_rgba(25,35,52,0.04)]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a8058]">Attendee Pipeline</p>
              <h3 className="text-xl font-semibold text-[#192334]">Upcoming Booth Meetings</h3>
            </div>
            <span className="text-xs font-medium text-[#737980]">{leads.length} active requests</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#efefeb] text-[11px] uppercase tracking-wider text-[#737980]">
                  <th className="pb-3 font-semibold">Attendee</th>
                  <th className="pb-3 font-semibold">Interest</th>
                  <th className="pb-3 font-semibold">Time Slot</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#efefeb] text-sm">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#fafaf8] transition">
                    <td className="py-4 pr-4">
                      <p className="font-semibold text-[#192334]">{lead.name}</p>
                      <p className="text-xs text-[#737980]">{lead.company}</p>
                    </td>
                    <td className="py-4 pr-4 text-[#475569]">{lead.interest}</td>
                    <td className="py-4 pr-4 text-xs font-medium text-[#192334]">{lead.time}</td>
                    <td className="py-4 pr-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold ${
                          lead.status === 'Confirmed'
                            ? 'bg-[#edf3ed] text-[#42664d]'
                            : 'bg-[#f3f0e9] text-[#80643a]'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      {lead.status === 'Pending' ? (
                        <button
                          type="button"
                          onClick={() => confirmLead(lead.id)}
                          className="rounded-lg bg-[#192334] px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-[#5145CD]"
                        >
                          Accept
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-[#42664d]">Scheduled ✓</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </section>

    </div>
  );
};

export default ExhibitorDashboard;