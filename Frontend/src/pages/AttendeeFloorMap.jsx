import React, { useState, useCallback } from 'react';
import '../styles/expo3d.css';
import ExpoHall3DCanvas from '../components/ExpoHall3DCanvas';
import AttendeePassCard from '../components/AttendeePassCard';


const AttendeeFloorMap = () => {
  const [cameraMode, setCameraMode] = useState('overhead'); // 'overhead' | 'zone' | 'booth' | 'vip'
  const [activeZoneId, setActiveZoneId] = useState(null);
  const [selectedStall, setSelectedStall] = useState(null);
  const [isVip, setIsVip] = useState(false);

  const handleZoneDive = useCallback((zoneId) => {
    setActiveZoneId(zoneId);
    setCameraMode('zone');
  }, []);

  const handleSelectStall = useCallback((stall) => {
    setSelectedStall(stall);
    setIsVip(false);
    setCameraMode('booth');
  }, []);

  const handleBackToHall = useCallback(() => {
    setIsVip(false);
    setCameraMode('overhead');
  }, []);

  const handleBackToBooth = useCallback(() => {
    setIsVip(false);
    setCameraMode('booth');
  }, []);

  const handleUpgradeToVip = useCallback(() => {
    setIsVip((prev) => {
      const next = !prev;
      setCameraMode(next ? 'vip' : 'booth');
      return next;
    });
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedStall(null);
    setIsVip(false);
    setCameraMode('zone');
  }, []);

  return (
    <div className="space-y-6 pb-12 w-full min-w-0">
      {/* Header Banner */}
      <div className="rounded-2xl bg-[var(--es-navy)] px-6 py-5 text-white shadow-[0_12px_28px_rgba(25,35,52,0.12)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-block rounded-full border border-[var(--es-gold)]/40 bg-[var(--es-gold)]/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--es-gold)]">
            Interactive 3D Floor Map
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
            Expo Hall &amp; <span className="font-serif italic text-[var(--es-gold)]">Booth Picker</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            Hover any zone to inspect availability, click to dive in, and pick a free stall to book your 1-on-1 visit spot.
          </p>
        </div>

        <div className="rounded-xl border border-white/15 bg-white/8 px-3.5 py-2 text-xs">
          <span className="text-slate-300 block">Current Camera View</span>
          <strong className="font-bold uppercase tracking-wider text-[var(--es-gold)]">
            {cameraMode}
          </strong>
        </div>
      </div>

      {/* Main Centerpiece: 3D Hall (8 Cols) + Slide-In Pass Card (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 min-w-0">
          <ExpoHall3DCanvas
            selectedStall={selectedStall}
            onSelectStall={handleSelectStall}
            cameraMode={cameraMode}
            activeZoneId={activeZoneId}
            onZoneDive={handleZoneDive}
            onBackToHall={handleBackToHall}
            onBackToBooth={handleBackToBooth}
          />
        </div>

        <div className="lg:col-span-4 min-w-0 space-y-4">
          <AttendeePassCard
            stall={selectedStall}
            isVip={isVip}
            onToggleVip={handleUpgradeToVip}
            onClearSelection={handleClearSelection}
          />

          {cameraMode === 'vip' && selectedStall && (
            <button
              type="button"
              onClick={handleBackToBooth}
              className="w-full rounded-xl bg-[var(--es-navy)] py-2.5 text-xs font-semibold text-[var(--es-gold)] shadow-sm transition hover:opacity-95"
            >
              Back to My Expo Booth ({selectedStall.row}, {selectedStall.stallNumber})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendeeFloorMap;