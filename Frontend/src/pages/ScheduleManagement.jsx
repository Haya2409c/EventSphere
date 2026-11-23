import React, { useState, useMemo } from 'react';

const initialSessions = [
  {
    id: 'ses-101',
    expo: 'Global Tech & AI Summit 2026',
    title: 'Opening Keynote: Autonomous Systems at Scale',
    speaker: 'Dr. Kamran Siddiqui',
    hall: 'Main Stage • Hall A',
    date: '2026-12-12',
    startTime: '09:30',
    endTime: '11:00',
    category: 'Keynote',
    track: 'AI & Robotics',
  },
  {
    id: 'ses-102',
    expo: 'Global Tech & AI Summit 2026',
    title: 'Real-Time Enterprise Telemetry Architecture',
    speaker: 'Sara Mahmood',
    hall: 'AI Lab • Hall B',
    date: '2026-12-12',
    startTime: '10:30',
    endTime: '12:00',
    category: 'Workshop',
    track: 'Cloud & Data',
  },
  {
    id: 'ses-103',
    expo: 'Global Tech & AI Summit 2026',
    title: 'Founders & Investors Round: Next-Gen SaaS',
    speaker: 'Bilal Tariq',
    hall: 'Main Stage • Hall A',
    date: '2026-12-12',
    startTime: '10:15',
    endTime: '11:30',
    category: 'Panel',
    track: 'Venture & Growth',
  },
  {
    id: 'ses-104',
    expo: 'Global Tech & AI Summit 2026',
    title: 'Live Edge Vision Demo & Floor Walk',
    speaker: 'Dr. Ayesha Noor',
    hall: 'Startup Pavilion • Hall C',
    date: '2026-12-13',
    startTime: '14:00',
    endTime: '15:30',
    category: 'Demo',
    track: 'Hardware & Vision',
  },
  {
    id: 'ses-105',
    expo: 'FinTech & Digital Commerce Expo',
    title: 'Instant Settlement Rails & Open Banking',
    speaker: 'Sara Mahmood',
    hall: 'Grand Pavilion',
    date: '2026-12-14',
    startTime: '11:00',
    endTime: '12:30',
    category: 'Keynote',
    track: 'FinTech',
  },
  {
    id: 'ses-106',
    expo: 'Global Tech & AI Summit 2026',
    title: 'Evening Executive & Speaker Mixer',
    speaker: 'Usman Ghani',
    hall: 'VIP Lounge',
    date: '2026-12-13',
    startTime: '17:30',
    endTime: '19:30',
    category: 'Networking',
    track: 'Community',
  },
];

const exposList = [
  'All Expos',
  'Global Tech & AI Summit 2026',
  'FinTech & Digital Commerce Expo',
];

const hallsList = [
  'All Halls',
  'Main Stage • Hall A',
  'AI Lab • Hall B',
  'Startup Pavilion • Hall C',
  'Grand Pavilion',
  'VIP Lounge',
];

const categoriesList = ['All', 'Keynote', 'Panel', 'Workshop', 'Demo', 'Networking'];

const categoryBadge = {
  Keynote: 'bg-[#192334] text-[#e2bd82] border-[#192334]',
  Panel: 'bg-[#f3f0e9] text-[#7a5f35] border-[#dfd5c3]',
  Workshop: 'bg-[#5145CD]/10 text-[#5145CD] border-[#5145CD]/30',
  Demo: 'bg-[#edf3ed] text-[#2f573b] border-[#b7d4bf]',
  Networking: 'bg-amber-50 text-amber-800 border-amber-200',
};

const weekDates = [
  { date: '2026-12-12', label: 'Sat, Dec 12' },
  { date: '2026-12-13', label: 'Sun, Dec 13' },
  { date: '2026-12-14', label: 'Mon, Dec 14' },
];

const toMinutes = (hhmm) => {
  if (!hhmm || !hhmm.includes(':')) return 0;
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

const addMinutesToTime = (hhmm, minsToAdd) => {
  const total = Math.max(0, toMinutes(hhmm) + minsToAdd);
  const h = String(Math.floor(total / 60) % 24).padStart(2, '0');
  const m = String(total % 60).padStart(2, '0');
  return `${h}:${m}`;
};

const emptySession = {
  id: null,
  expo: 'Global Tech & AI Summit 2026',
  title: '',
  speaker: '',
  hall: 'Main Stage • Hall A',
  date: '2026-12-12',
  startTime: '13:00',
  endTime: '14:30',
  category: 'Workshop',
  track: 'AI & Robotics',
};

const ScheduleManagement = () => {
  const [sessions, setSessions] = useState(initialSessions);
  const [viewMode, setViewMode] = useState('day'); // 'day' | 'week' | 'agenda'

  // Filters
  const [expoFilter, setExpoFilter] = useState('All Expos');
  const [dateFilter, setDateFilter] = useState('2026-12-12');
  const [hallFilter, setHallFilter] = useState('All Halls');
  const [speakerFilter, setSpeakerFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Drawer & Drag State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState(emptySession);
  const [formError, setFormError] = useState('');
  const [draggedSessionId, setDraggedSessionId] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3200);
  };

  const speakersList = useMemo(() => {
    const set = new Set(sessions.map((s) => s.speaker));
    return ['All', ...Array.from(set)];
  }, [sessions]);

  // Detect overlapping sessions in the same hall on the same date
  const conflictingIds = useMemo(() => {
    const conflicts = new Set();
    for (let i = 0; i < sessions.length; i++) {
      for (let j = i + 1; j < sessions.length; j++) {
        const a = sessions[i];
        const b = sessions[j];
        if (a.date === b.date && a.hall === b.hall) {
          const startA = toMinutes(a.startTime);
          const endA = toMinutes(a.endTime);
          const startB = toMinutes(b.startTime);
          const endB = toMinutes(b.endTime);
          if (startA < endB && startB < endA) {
            conflicts.add(a.id);
            conflicts.add(b.id);
          }
        }
      }
    }
    return conflicts;
  }, [sessions]);

  // Filtered sessions
  const filteredSessions = useMemo(() => {
    return sessions
      .filter((s) => {
        const matchExpo = expoFilter === 'All Expos' || s.expo === expoFilter;
        const matchDate =
          viewMode !== 'day' || dateFilter === 'All' || s.date === dateFilter;
        const matchHall = hallFilter === 'All Halls' || s.hall === hallFilter;
        const matchSpeaker = speakerFilter === 'All' || s.speaker === speakerFilter;
        const matchCategory =
          categoryFilter === 'All' || s.category === categoryFilter;
        return matchExpo && matchDate && matchHall && matchSpeaker && matchCategory;
      })
      .sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return toMinutes(a.startTime) - toMinutes(b.startTime);
      });
  }, [sessions, expoFilter, dateFilter, hallFilter, speakerFilter, categoryFilter, viewMode]);

  // Live conflict check inside Add/Edit Drawer
  const drawerConflict = useMemo(() => {
    if (!formData.startTime || !formData.endTime) return null;
    const sStart = toMinutes(formData.startTime);
    const sEnd = toMinutes(formData.endTime);
    if (sEnd <= sStart) {
      return 'End time must be later than start time.';
    }
    const clash = sessions.find(
      (item) =>
        item.id !== formData.id &&
        item.date === formData.date &&
        item.hall === formData.hall &&
        sStart < toMinutes(item.endTime) &&
        toMinutes(item.startTime) < sEnd
    );
    if (clash) {
      return `Room Conflict: "${clash.title}" is booked in ${formData.hall} from ${clash.startTime} to ${clash.endTime}.`;
    }
    return null;
  }, [formData, sessions]);

  const openAddDrawer = (presetDate = null) => {
    setFormData({
      ...emptySession,
      date: presetDate || (dateFilter !== 'All' ? dateFilter : '2026-12-12'),
    });
    setFormError('');
    setDrawerOpen(true);
  };

  const openEditDrawer = (session) => {
    setFormData(session);
    setFormError('');
    setDrawerOpen(true);
  };

  const handleSaveSession = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.speaker.trim()) {
      setFormError('Please enter both a session title and speaker name.');
      return;
    }
    if (toMinutes(formData.endTime) <= toMinutes(formData.startTime)) {
      setFormError('Invalid time slot: End time must be after start time.');
      return;
    }
    if (drawerConflict) {
      setFormError(drawerConflict);
      return;
    }

    if (formData.id) {
      setSessions((prev) =>
        prev.map((s) => (s.id === formData.id ? formData : s))
      );
      showToast(`Session "${formData.title}" updated & saved`);
    } else {
      setSessions((prev) => [
        ...prev,
        { ...formData, id: `ses-${Date.now()}` },
      ]);
      showToast(`Session "${formData.title}" added to schedule`);
    }

    setDrawerOpen(false);
    setFormError('');
  };

  const handleDeleteSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    showToast('Session removed from schedule');
  };

  // Drag-and-drop rescheduling in Week / Day view
  const handleDropOnTarget = (targetDate, targetHall = null) => {
    if (!draggedSessionId) return;
    const moving = sessions.find((s) => s.id === draggedSessionId);
    if (!moving) return;

    const duration = Math.max(
      30,
      toMinutes(moving.endTime) - toMinutes(moving.startTime)
    );
    const nextHall = targetHall || moving.hall;
    const nextStart = moving.startTime;
    const nextEnd = addMinutesToTime(nextStart, duration);

    const hasConflict = sessions.some(
      (other) =>
        other.id !== moving.id &&
        other.date === targetDate &&
        other.hall === nextHall &&
        toMinutes(nextStart) < toMinutes(other.endTime) &&
        toMinutes(other.startTime) < toMinutes(nextEnd)
    );

    setSessions((prev) =>
      prev.map((s) =>
        s.id === moving.id
          ? { ...s, date: targetDate, hall: nextHall, endTime: nextEnd }
          : s
      )
    );
    setDraggedSessionId(null);

    if (hasConflict) {
      showToast(`Moved "${moving.title}" — Room conflict detected!`);
    } else {
      showToast(`Rescheduled "${moving.title}" to ${targetDate}`);
    }
  };

  const selectClass =
    'rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3 py-2 text-xs font-medium text-[#192334] outline-none focus:border-[#192334] focus:bg-white';

  const drawerInputClass =
    'w-full rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3.5 py-2.5 text-sm text-[#192334] placeholder:text-[#687078] outline-none transition focus:border-[#192334] focus:bg-white focus:ring-3 focus:ring-[#192334]/10';

  const renderSessionCard = (session, compact = false) => {
    const isConflict = conflictingIds.has(session.id);

    return (
      <div
        key={session.id}
        draggable
        onDragStart={() => setDraggedSessionId(session.id)}
        onDragEnd={() => setDraggedSessionId(null)}
        className={`group cursor-grab active:cursor-grabbing rounded-2xl border p-4 transition duration-200 ${
          isConflict
            ? 'border-red-400 bg-red-50/70 shadow-[0_6px_18px_rgba(220,38,38,0.10)]'
            : 'border-[#e6e5e0] bg-white hover:border-[#192334]/35 hover:shadow-[0_6px_18px_rgba(25,35,52,0.06)]'
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              categoryBadge[session.category] || categoryBadge.Panel
            }`}
          >
            {session.category}
          </span>

          <span className="text-[11px] font-semibold text-[#192334] tabular-nums">
            {session.startTime} – {session.endTime}
          </span>
        </div>

        {isConflict && (
          <div className="mt-2 rounded-lg bg-red-600/10 border border-red-300 px-2.5 py-1 text-[11px] font-semibold text-red-700 flex items-center justify-between gap-2">
            <span>⚠ Hall & Time Overlap</span>
            <button
              type="button"
              onClick={() => openEditDrawer(session)}
              className="underline font-bold"
            >
              Fix Slot
            </button>
          </div>
        )}

        <h3 className="mt-2.5 text-sm sm:text-base font-semibold text-[#192334] leading-snug">
          {session.title}
        </h3>

        <div className="mt-2 space-y-1 text-xs text-[#525b65]">
          <p className="font-medium text-[#192334]">🎤 {session.speaker}</p>
          <p className="text-[#7a5f35] font-medium">📍 {session.hall}</p>
          {!compact && (
            <p className="text-[11px] text-[#687078]">
              {session.date} • {session.track}
            </p>
          )}
        </div>

        <div className="mt-3.5 pt-3 border-t border-[#efefeb] flex items-center justify-between text-xs">
          <span className="text-[10px] font-medium text-[#687078] opacity-75 group-hover:opacity-100">
            ⋮⋮ Drag to reschedule
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openEditDrawer(session)}
              className="rounded-lg border border-[#e6e5e0] bg-[#fafaf8] px-2.5 py-1 text-xs font-semibold text-[#192334] hover:border-[#192334]"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => handleDeleteSession(session.id)}
              className="rounded-lg px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    );
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

      {/* Editorial Header + Add Session CTA + Day/Week/Agenda Switcher */}
      <div className="rounded-2xl bg-[#192334] px-6 py-5 text-white shadow-[0_12px_28px_rgba(25,35,52,0.12)] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <span className="inline-block rounded-full border border-[#e2bd82]/35 bg-[#e2bd82]/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e2bd82]">
            Program & Stage Planner
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
            Schedule <span className="font-serif italic text-[#e2bd82]">Management</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            Coordinate keynotes, panels, and workshops across halls with instant conflict detection.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode Switcher */}
          <div className="inline-flex rounded-xl border border-white/15 bg-white/8 p-1">
            {['day', 'week', 'agenda'].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold capitalize transition ${
                  viewMode === mode
                    ? 'bg-[#e2bd82] text-[#192334]'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => openAddDrawer()}
            className="rounded-xl bg-[#e2bd82] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#192334] shadow-md transition hover:bg-[#edd09f]"
          >
            + Add Session
          </button>
        </div>
      </div>

      {/* Conflict Alert Banner (Visible whenever overlaps exist) */}
      {conflictingIds.size > 0 && (
        <div className="rounded-2xl border border-red-300 bg-red-50 px-5 py-3.5 text-xs text-red-800 flex flex-wrap items-center justify-between gap-3">
          <p className="font-semibold">
            ⚠ {conflictingIds.size} scheduled sessions have overlapping times in the same hall. Highlighted cards need slot adjustment.
          </p>
          <span className="rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-bold text-white">
            Conflict Alert
          </span>
        </div>
      )}

      {/* Multi-Facet Filters Bar */}
      <div className="rounded-2xl border border-[#e6e5e0] bg-white p-4 shadow-[0_6px_22px_rgba(25,35,52,0.04)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <select
          value={expoFilter}
          onChange={(e) => setExpoFilter(e.target.value)}
          aria-label="Filter by event"
          className={selectClass}
        >
          {exposList.map((ex) => (
            <option key={ex} value={ex}>
              {ex}
            </option>
          ))}
        </select>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          aria-label="Filter by date"
          className={selectClass}
        >
          <option value="All">Date: All Days</option>
          {weekDates.map((d) => (
            <option key={d.date} value={d.date}>
              {d.label} ({d.date})
            </option>
          ))}
        </select>

        <select
          value={hallFilter}
          onChange={(e) => setHallFilter(e.target.value)}
          aria-label="Filter by hall"
          className={selectClass}
        >
          {hallsList.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <select
          value={speakerFilter}
          onChange={(e) => setSpeakerFilter(e.target.value)}
          aria-label="Filter by speaker"
          className={selectClass}
        >
          {speakersList.map((sp) => (
            <option key={sp} value={sp}>
              {sp === 'All' ? 'Speaker: All' : sp}
            </option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter by session category"
          className={selectClass}
        >
          {categoriesList.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'Category: All' : cat}
            </option>
          ))}
        </select>
      </div>

      {/* MAIN CALENDAR / TIMELINE / AGENDA VIEWS */}
      {viewMode === 'day' && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={() =>
            handleDropOnTarget(dateFilter !== 'All' ? dateFilter : '2026-12-12')
          }
          className="rounded-2xl border border-[#e6e5e0] bg-[#fafaf8] p-5 space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e6e5e0] pb-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7a5f35]">
                Daily Timeline
              </p>
              <h2 className="text-lg font-semibold text-[#192334]">
                {dateFilter === 'All' ? 'All Scheduled Days' : `Schedule for ${dateFilter}`}
              </h2>
            </div>
            <span className="text-xs font-semibold text-[#525b65]">
              {filteredSessions.length} sessions shown
            </span>
          </div>

          {filteredSessions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#c9bea9] bg-white py-12 text-center">
              <p className="text-sm font-semibold text-[#192334]">No sessions scheduled for this filter</p>
              <button
                type="button"
                onClick={() => openAddDrawer()}
                className="mt-3 rounded-xl bg-[#192334] px-4 py-2 text-xs font-semibold text-[#e2bd82]"
              >
                + Schedule a Session
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredSessions.map((ses) => renderSessionCard(ses))}
            </div>
          )}
        </div>
      )}

      {viewMode === 'week' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {weekDates.map((col) => {
            const dayItems = filteredSessions.filter((s) => s.date === col.date);
            return (
              <div
                key={col.date}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDropOnTarget(col.date)}
                className="rounded-2xl border border-[#e6e5e0] bg-[#fafaf8] p-4 flex flex-col justify-between min-h-[380px]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl bg-[#192334] px-4 py-3 text-white">
                    <div>
                      <p className="text-xs font-bold text-[#e2bd82]">{col.label}</p>
                      <p className="text-[10px] text-slate-300">{col.date}</p>
                    </div>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold">
                      {dayItems.length} slots
                    </span>
                  </div>

                  {dayItems.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#c9bea9] bg-white/70 p-6 text-center text-xs text-[#687078]">
                      Drop session card here or add a slot.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {dayItems.map((ses) => renderSessionCard(ses, true))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => openAddDrawer(col.date)}
                  className="mt-4 w-full rounded-xl border border-[#e6e5e0] bg-white py-2 text-xs font-semibold text-[#192334] hover:border-[#192334]"
                >
                  + Add to {col.label}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {viewMode === 'agenda' && (
        <div className="rounded-2xl border border-[#e6e5e0] bg-white p-5 shadow-[0_8px_24px_rgba(25,35,52,0.04)] space-y-3">
          <div className="border-b border-[#efefeb] pb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#192334]">Chronological Agenda</h2>
            <span className="text-xs font-medium text-[#687078]">
              {filteredSessions.length} total sessions
            </span>
          </div>

          {filteredSessions.length === 0 ? (
            <p className="py-10 text-center text-xs text-[#687078]">
              No sessions match current filters.
            </p>
          ) : (
            <div className="divide-y divide-[#efefeb]">
              {filteredSessions.map((ses) => {
                const isConflict = conflictingIds.has(ses.id);
                return (
                  <div
                    key={ses.id}
                    className={`py-4 px-3 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
                      isConflict ? 'bg-red-50/70' : 'hover:bg-[#fafaf8]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-[#192334] tabular-nums">
                          {ses.date} • {ses.startTime} – {ses.endTime}
                        </span>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
                            categoryBadge[ses.category]
                          }`}
                        >
                          {ses.category}
                        </span>
                        {isConflict && (
                          <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">
                            Overlap Conflict
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold text-[#192334]">
                        {ses.title}
                      </h3>
                      <p className="text-xs text-[#525b65]">
                        🎤 {ses.speaker} • 📍 <span className="text-[#7a5f35] font-medium">{ses.hall}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditDrawer(ses)}
                        className="rounded-lg bg-[#192334] px-3.5 py-1.5 text-xs font-semibold text-[#e2bd82]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSession(ses.id)}
                        className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ADD / EDIT SESSION SLIDE-OVER DRAWER */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-[#192334]/50 backdrop-blur-[2px]"
          onClick={() => setDrawerOpen(false)}
        >
          <form
            onSubmit={handleSaveSession}
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-lg flex-col justify-between overflow-hidden border-l border-t-0 border-[#e6e5e0] bg-white shadow-2xl"
          >
            <div>
              <div className="bg-[#192334] px-6 py-5 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e2bd82]">
                    Session Builder
                  </span>
                  <h2 className="text-lg font-semibold mt-0.5">
                    {formData.id ? 'Edit Session Slot' : 'Add New Session'}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-200 hover:bg-white/20"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4 overflow-y-auto max-h-[calc(100vh-165px)]">
                {/* Real-Time Room Conflict / Slot Validation Warning */}
                {(drawerConflict || formError) && (
                  <div className="rounded-xl border border-red-300 bg-red-50 p-3.5 text-xs font-semibold text-red-700">
                    ⚠ {formError || drawerConflict}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                    Session Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Keynote: Future of Edge AI"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      setFormError('');
                    }}
                    className={drawerInputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                      Speaker Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sana Farooq"
                      value={formData.speaker}
                      onChange={(e) => {
                        setFormData({ ...formData, speaker: e.target.value });
                        setFormError('');
                      }}
                      className={drawerInputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                      Session Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className={drawerInputClass}
                    >
                      {categoriesList
                        .filter((c) => c !== 'All')
                        .map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                      Exhibition Event
                    </label>
                    <select
                      value={formData.expo}
                      onChange={(e) =>
                        setFormData({ ...formData, expo: e.target.value })
                      }
                      className={drawerInputClass}
                    >
                      {exposList
                        .filter((ex) => ex !== 'All Expos')
                        .map((ex) => (
                          <option key={ex} value={ex}>
                            {ex}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                      Hall / Stage
                    </label>
                    <select
                      value={formData.hall}
                      onChange={(e) =>
                        setFormData({ ...formData, hall: e.target.value })
                      }
                      className={drawerInputClass}
                    >
                      {hallsList
                        .filter((h) => h !== 'All Halls')
                        .map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className={drawerInputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) =>
                        setFormData({ ...formData, startTime: e.target.value })
                      }
                      className={drawerInputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) =>
                        setFormData({ ...formData, endTime: e.target.value })
                      }
                      className={drawerInputClass}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#e6e5e0] bg-[#fafaf8] flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="rounded-xl border border-[#e6e5e0] bg-white px-4 py-2 text-xs font-semibold text-[#192334]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={Boolean(drawerConflict)}
                className="rounded-xl bg-[#192334] px-5 py-2.5 text-xs font-semibold text-[#e2bd82] transition hover:bg-[#24324a] disabled:opacity-45"
              >
                {formData.id ? 'Save Session Changes' : 'Add to Schedule'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ScheduleManagement;