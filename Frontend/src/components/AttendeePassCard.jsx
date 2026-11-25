import React from 'react';

const AttendeePassCard = ({ stall, isVip, onToggleVip, onClearSelection }) => {
  if (!stall) {
    return (
      <div className="rounded-2xl border border-dashed border-[#c9bea9] bg-white p-6 text-center space-y-2">
        <p className="text-sm font-semibold text-[var(--es-navy)]">
          No Booth Visit Spot Selected Yet
        </p>
        <p className="text-xs text-[#525b65]">
          Click any zone to fly into the 3D hall, then pick a <strong>Red (Free)</strong> stall to generate your Attendee Expo &amp; Booth Visit Pass.
        </p>
      </div>
    );
  }

  const passCode = `ES-VISIT-${stall.row.replace(/\s+/g, '')}-${stall.stallNumber.replace('#', '')}`;

  return (
    <div className="pass-perspective w-full">
      <div className={`pass-card-3d relative w-full ${isVip ? 'is-vip' : ''}`}>
        {/* FRONT FACE: Attendee Expo & Booth Visit Pass */}
        <div className="pass-face rounded-2xl border border-[var(--es-gold)]/70 bg-[var(--es-navy)] p-5 text-white shadow-xl space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-block rounded-full bg-[var(--es-gold)]/15 border border-[var(--es-gold)]/40 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--es-gold)]">
                Attendee Expo &amp; Booth Visit Pass
              </span>
              <h3 className="mt-2 text-lg font-semibold leading-snug">
                Global Tech &amp; AI Summit 2026
              </h3>
            </div>
            <span className="rounded-full bg-[#edf3ed] px-2.5 py-0.5 text-[10px] font-bold text-[#2f573b] shrink-0">
              Confirmed
            </span>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 space-y-2 text-xs">
            <div className="flex justify-between gap-2">
              <span className="text-slate-300">Zone / Block:</span>
              <strong className="text-white text-right">{stall.zoneName}</strong>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-slate-300">Selected Booth:</span>
              <strong className="text-[var(--es-gold)]">
                {stall.row}, Stall {stall.stallNumber}
              </strong>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-slate-300">Booking Type:</span>
              <strong className="text-white">1-on-1 Exhibitor Meeting / Priority Visit</strong>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-slate-300">Date &amp; Slot:</span>
              <strong className="text-white">Dec 12, 2026 • 02:30 PM</strong>
            </div>
            <div className="flex justify-between gap-2 pt-1 border-t border-white/10">
              <span className="text-slate-300">Pass / Access Code:</span>
              <span className="font-mono font-bold text-[var(--es-gold)]">{passCode}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              onClick={onClearSelection}
              className="rounded-xl border border-white/20 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10"
            >
              Change Stall
            </button>
            <button
              type="button"
              onClick={onToggleVip}
              className="flex-1 rounded-xl bg-[var(--es-gold)] px-4 py-2.5 text-xs font-bold text-[var(--es-navy)] shadow-md transition hover:bg-[#edd09f]"
            >
              ✦ Upgrade to VIP
            </button>
          </div>
        </div>

        {/* BACK FACE (FLIPPED): VIP Lounge & Glass-Front Viewing Box Pass */}
        <div className="pass-face pass-face-back absolute inset-0 rounded-2xl border-2 border-[var(--es-gold)] bg-gradient-to-br from-[#192334] via-[#1f2f48] to-[#2c2519] p-5 text-white shadow-2xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[var(--es-gold)] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--es-navy)]">
                VIP Box Upgraded
              </span>
              <span className="font-mono text-[11px] font-bold text-[var(--es-gold)]">
                VIP-BOX-01
              </span>
            </div>

            <h3 className="text-lg font-semibold text-[var(--es-gold)]">
              VIP Lounge &amp; Glass-Front Viewing Box Pass
            </h3>
            <p className="text-xs leading-relaxed text-slate-200">
              Elevated glass-front viewing deck overlooking the main expo floor with direct sightline to{' '}
              <strong className="text-white">
                {stall.row}, Stall {stall.stallNumber}
              </strong>{' '}
              and priority 1-on-1 exhibitor entry.
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-white/15">
            <button
              type="button"
              onClick={onToggleVip}
              className="w-full rounded-xl bg-white/10 border border-white/20 py-2 text-xs font-semibold text-white hover:bg-white/15"
            >
              ↺ Flip Back to Visit Pass
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeePassCard;