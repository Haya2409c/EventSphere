import React, { useState, useMemo } from 'react';

const analyticsDataset = [
  {
    id: 'rec-1',
    expo: 'Global Tech & AI Summit 2026',
    hall: 'Hall A • Main Floor',
    passType: 'General',
    range: '30d',
    registrations: 1680,
    prevRegistrations: 1420,
    sales: 82320,
    prevSales: 68100,
    boothsBooked: 46,
    boothsTotal: 50,
    checkIns: 1490,
    prevCheckIns: 1210,
  },
  {
    id: 'rec-2',
    expo: 'Global Tech & AI Summit 2026',
    hall: 'Hall B • AI Lab',
    passType: 'VIP',
    range: '30d',
    registrations: 640,
    prevRegistrations: 510,
    sales: 127360,
    prevSales: 98400,
    boothsBooked: 33,
    boothsTotal: 35,
    checkIns: 605,
    prevCheckIns: 470,
  },
  {
    id: 'rec-3',
    expo: 'Global Tech & AI Summit 2026',
    hall: 'Hall C • Startups',
    passType: 'Exhibitor',
    range: '7d',
    registrations: 520,
    prevRegistrations: 460,
    sales: 145000,
    prevSales: 124000,
    boothsBooked: 28,
    boothsTotal: 35,
    checkIns: 488,
    prevCheckIns: 410,
  },
  {
    id: 'rec-4',
    expo: 'FinTech & Digital Commerce Expo',
    hall: 'Hall A • Main Floor',
    passType: 'General',
    range: '7d',
    registrations: 980,
    prevRegistrations: 860,
    sales: 34300,
    prevSales: 29900,
    boothsBooked: 38,
    boothsTotal: 45,
    checkIns: 840,
    prevCheckIns: 730,
  },
  {
    id: 'rec-5',
    expo: 'FinTech & Digital Commerce Expo',
    hall: 'Hall B • AI Lab',
    passType: 'VIP',
    range: '90d',
    registrations: 410,
    prevRegistrations: 350,
    sales: 61500,
    prevSales: 51000,
    boothsBooked: 22,
    boothsTotal: 25,
    checkIns: 382,
    prevCheckIns: 315,
  },
  {
    id: 'rec-6',
    expo: 'Global Tech & AI Summit 2026',
    hall: 'Hall C • Startups',
    passType: 'Student',
    range: '90d',
    registrations: 580,
    prevRegistrations: 490,
    sales: 11600,
    prevSales: 9800,
    boothsBooked: 15,
    boothsTotal: 20,
    checkIns: 530,
    prevCheckIns: 440,
  },
];

const trendLabels = ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6'];
const trendWeightsCurrent = [0.11, 0.14, 0.16, 0.19, 0.18, 0.22];
const trendWeightsPrev = [0.13, 0.15, 0.16, 0.18, 0.18, 0.20];

const hourlyEngagement = [
  { hour: '09 AM', scans: 420, dwell: '38m' },
  { hour: '11 AM', scans: 890, dwell: '52m' },
  { hour: '01 PM', scans: 760, dwell: '44m' },
  { hour: '03 PM', scans: 1040, dwell: '61m' },
  { hour: '05 PM', scans: 810, dwell: '47m' },
  { hour: '07 PM', scans: 490, dwell: '34m' },
];

const sessionPopularityList = [
  { title: 'Opening Keynote: Autonomous Systems', hall: 'Hall A • Main Floor', expo: 'Global Tech & AI Summit 2026', attendees: 1180, capacity: 1200 },
  { title: 'Real-Time Enterprise Telemetry', hall: 'Hall B • AI Lab', expo: 'Global Tech & AI Summit 2026', attendees: 620, capacity: 700 },
  { title: 'Instant Settlement & Open Banking', hall: 'Hall A • Main Floor', expo: 'FinTech & Digital Commerce Expo', attendees: 845, capacity: 950 },
  { title: 'Live Edge Vision & Robotics Demo', hall: 'Hall C • Startups', expo: 'Global Tech & AI Summit 2026', attendees: 460, capacity: 550 },
];

const AdminDashboard = () => {
  const [dateRange, setDateRange] = useState('All');
  const [expoFilter, setExpoFilter] = useState('All Expos');
  const [hallFilter, setHallFilter] = useState('All Halls');
  const [passFilter, setPassFilter] = useState('All Passes');

  const [hoveredTrendIdx, setHoveredTrendIdx] = useState(null);
  const [hoveredHourIdx, setHoveredHourIdx] = useState(null);
  const [drillDownModal, setDrillDownModal] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const hasActiveFilters =
    dateRange !== 'All' ||
    expoFilter !== 'All Expos' ||
    hallFilter !== 'All Halls' ||
    passFilter !== 'All Passes';

  const resetFilters = () => {
    setDateRange('All');
    setExpoFilter('All Expos');
    setHallFilter('All Halls');
    setPassFilter('All Passes');
    showToast('Analytics filters reset');
  };

  // Filtered Records
  const filteredRecords = useMemo(() => {
    return analyticsDataset.filter((item) => {
      const matchDate = dateRange === 'All' || item.range === dateRange;
      const matchExpo = expoFilter === 'All Expos' || item.expo === expoFilter;
      const matchHall = hallFilter === 'All Halls' || item.hall === hallFilter;
      const matchPass = passFilter === 'All Passes' || item.passType === passFilter;
      return matchDate && matchExpo && matchHall && matchPass;
    });
  }, [dateRange, expoFilter, hallFilter, passFilter]);

  // Aggregated KPIs + Deltas
  const kpis = useMemo(() => {
    const reg = filteredRecords.reduce((acc, r) => acc + r.registrations, 0);
    const prevReg = filteredRecords.reduce((acc, r) => acc + r.prevRegistrations, 0);

    const sales = filteredRecords.reduce((acc, r) => acc + r.sales, 0);
    const prevSales = filteredRecords.reduce((acc, r) => acc + r.prevSales, 0);

    const booked = filteredRecords.reduce((acc, r) => acc + r.boothsBooked, 0);
    const totalBooths = filteredRecords.reduce((acc, r) => acc + r.boothsTotal, 0);
    const occupancy = totalBooths ? Math.round((booked / totalBooths) * 100) : 0;

    const checkIns = filteredRecords.reduce((acc, r) => acc + r.checkIns, 0);
    const prevCheckIns = filteredRecords.reduce((acc, r) => acc + r.prevCheckIns, 0);

    const calcDelta = (curr, prev) => {
      if (!prev) return '+0.0%';
      const pct = (((curr - prev) / prev) * 100).toFixed(1);
      return `${Number(pct) >= 0 ? '+' : ''}${pct}%`;
    };

    return {
      reg,
      regDelta: calcDelta(reg, prevReg),
      sales,
      salesDelta: calcDelta(sales, prevSales),
      booked,
      totalBooths,
      occupancy,
      checkIns,
      checkInsDelta: calcDelta(checkIns, prevCheckIns),
      checkInRate: reg ? Math.round((checkIns / reg) * 100) : 0,
    };
  }, [filteredRecords]);

  // Registration Trend Series
  const trendSeries = useMemo(() => {
    const baseCurr = Math.max(120, kpis.reg);
    const basePrev = Math.max(100, Math.round(kpis.reg * 0.84));
    return trendLabels.map((label, idx) => ({
      label,
      current: Math.round(baseCurr * trendWeightsCurrent[idx]),
      previous: Math.round(basePrev * trendWeightsPrev[idx]),
    }));
  }, [kpis.reg]);

  // Pass Category Breakdown
  const passBreakdown = useMemo(() => {
    const categories = [
      { key: 'General', color: '#192334' },
      { key: 'VIP', color: '#e2bd82' },
      { key: 'Exhibitor', color: '#5145CD' },
      { key: 'Student', color: '#42664d' },
    ];
    const total = Math.max(1, kpis.reg);
    return categories.map((cat) => {
      const count = filteredRecords
        .filter((r) => r.passType === cat.key)
        .reduce((sum, r) => sum + r.registrations, 0);
      return {
        ...cat,
        count,
        percent: Math.round((count / total) * 100),
      };
    });
  }, [filteredRecords, kpis.reg]);

  // Hall Occupancy Breakdown
  const hallBreakdown = useMemo(() => {
    const halls = ['Hall A • Main Floor', 'Hall B • AI Lab', 'Hall C • Startups'];
    return halls.map((hallName) => {
      const rows = filteredRecords.filter((r) => r.hall === hallName);
      const booked = rows.reduce((s, r) => s + r.boothsBooked, 0);
      const total = rows.reduce((s, r) => s + r.boothsTotal, 0);
      const pct = total ? Math.round((booked / total) * 100) : 0;
      return { hallName, booked, total, pct };
    });
  }, [filteredRecords]);

  // Filtered Session Popularity
  const visibleSessions = useMemo(() => {
    return sessionPopularityList.filter((s) => {
      const matchExpo = expoFilter === 'All Expos' || s.expo === expoFilter;
      const matchHall = hallFilter === 'All Halls' || s.hall === hallFilter;
      return matchExpo && matchHall;
    });
  }, [expoFilter, hallFilter]);

  // Export CSV Report
  const handleExportCSV = () => {
    const headers = ['Expo,Hall,Pass Type,Registrations,Pass Sales ($),Booths Booked,Total Booths,Check-Ins'];
    const rows = filteredRecords.map(
      (r) =>
        `"${r.expo}","${r.hall}",${r.passType},${r.registrations},${r.sales},${r.boothsBooked},${r.boothsTotal},${r.checkIns}`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EventSphere_Analytics_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Analytics CSV report exported');
  };

  // SVG Trend Geometry
  const maxTrendVal = Math.max(...trendSeries.map((d) => Math.max(d.current, d.previous)), 10);
  const svgW = 540;
  const svgH = 190;
  const padX = 28;
  const padY = 20;

  const getCoords = (val, index) => {
    const x = padX + (index * (svgW - padX * 2)) / (trendSeries.length - 1);
    const y = svgH - padY - (val / maxTrendVal) * (svgH - padY * 2);
    return { x, y };
  };

  const currentPoints = trendSeries.map((d, i) => getCoords(d.current, i));
  const prevPoints = trendSeries.map((d, i) => getCoords(d.previous, i));
  const currentPath = currentPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const prevPath = prevPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${currentPath} L ${currentPoints[currentPoints.length - 1].x} ${svgH - padY} L ${currentPoints[0].x} ${svgH - padY} Z`;

  // SVG Donut Ring
  let cumulativePct = 0;
  const radius = 54;
  const circumference = 2 * Math.PI * radius;

  const selectClass =
    'rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3 py-2 text-xs font-medium text-[#192334] outline-none transition focus:border-[#192334] focus:bg-white';

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

      {/* Editorial Executive Header + Export Action */}
      <div className="rounded-2xl bg-[#192334] px-6 py-5 text-white shadow-[0_12px_28px_rgba(25,35,52,0.12)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-block rounded-full border border-[#e2bd82]/35 bg-[#e2bd82]/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e2bd82]">
            Executive Intelligence
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
            Admin Overview &amp; <span className="font-serif italic text-[#e2bd82]">Analytics</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            Real-time registration velocity, pass revenue, floor occupancy, and session check-in insights.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-[#e2bd82] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#192334] shadow-md transition hover:bg-[#edd09f]"
        >
          <span>↓ Export Report (CSV)</span>
        </button>
      </div>

      {/* Global Filter Bar */}
      <div className="rounded-2xl border border-[#e6e5e0] bg-white p-4 shadow-[0_6px_22px_rgba(25,35,52,0.04)] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            aria-label="Filter by date range"
            className={selectClass}
          >
            <option value="All">Date Range: All Time</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>

          <select
            value={expoFilter}
            onChange={(e) => setExpoFilter(e.target.value)}
            aria-label="Filter by expo"
            className={selectClass}
          >
            <option value="All Expos">Expo: All Events</option>
            <option value="Global Tech & AI Summit 2026">Global Tech &amp; AI Summit 2026</option>
            <option value="FinTech & Digital Commerce Expo">FinTech &amp; Digital Commerce Expo</option>
          </select>

          <select
            value={hallFilter}
            onChange={(e) => setHallFilter(e.target.value)}
            aria-label="Filter by hall"
            className={selectClass}
          >
            <option value="All Halls">Hall: All Zones</option>
            <option value="Hall A • Main Floor">Hall A • Main Floor</option>
            <option value="Hall B • AI Lab">Hall B • AI Lab</option>
            <option value="Hall C • Startups">Hall C • Startups</option>
          </select>

          <select
            value={passFilter}
            onChange={(e) => setPassFilter(e.target.value)}
            aria-label="Filter by pass type"
            className={selectClass}
          >
            <option value="All Passes">Pass Type: All Tiers</option>
            <option value="General">General Pass</option>
            <option value="VIP">VIP Lounge</option>
            <option value="Exhibitor">Exhibitor Booth</option>
            <option value="Student">Student Pass</option>
          </select>
        </div>

        <button
          type="button"
          disabled={!hasActiveFilters}
          onClick={resetFilters}
          className="shrink-0 rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-4 py-2 text-xs font-semibold text-[#192334] transition hover:border-[#192334] disabled:opacity-40"
        >
          Reset Filters
        </button>
      </div>

      {/* Empty Filter State */}
      {filteredRecords.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#c9bea9] bg-white py-14 px-6 text-center">
          <p className="text-base font-semibold text-[#192334]">No analytics records match these filters</p>
          <p className="mt-1 text-xs text-[#687078]">
            Try broadening your hall, pass tier, or date range selection.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 rounded-xl bg-[#192334] px-4 py-2 text-xs font-semibold text-[#e2bd82]"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <>
          {/* TOP 4 KPI CARDS (Strong Hierarchy + Comparison Badges + Drill-Down) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-white/10 bg-[#192334] p-5 text-white shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Total Registrations
                </p>
                <span className="rounded-full bg-[#e2bd82]/15 border border-[#e2bd82]/30 px-2 py-0.5 text-[10px] font-bold text-[#e2bd82]">
                  {kpis.regDelta}
                </span>
              </div>
              <p className="mt-3 text-3xl font-semibold text-white tabular-nums">
                {kpis.reg.toLocaleString()}
              </p>
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-slate-300">vs. prior period</span>
                <button
                  type="button"
                  onClick={() =>
                    setDrillDownModal({
                      title: 'Registration Breakdown by Segment',
                      subtitle: 'Detailed attendee sign-ups across selected halls & pass tiers',
                      rows: filteredRecords.map((r) => ({
                        label: `${r.expo} (${r.hall})`,
                        meta: `${r.passType} Pass`,
                        value: `${r.registrations.toLocaleString()} attendees`,
                      })),
                    })
                  }
                  className="font-semibold text-[#e2bd82] hover:underline"
                >
                  Drill down →
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#192334] p-5 text-white shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Pass Sales Revenue
                </p>
                <span className="rounded-full bg-[#e2bd82]/15 border border-[#e2bd82]/30 px-2 py-0.5 text-[10px] font-bold text-[#e2bd82]">
                  {kpis.salesDelta}
                </span>
              </div>
              <p className="mt-3 text-3xl font-semibold text-[#e2bd82] tabular-nums">
                ${kpis.sales.toLocaleString()}
              </p>
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-slate-300">Net ticket &amp; booth volume</span>
                <button
                  type="button"
                  onClick={() =>
                    setDrillDownModal({
                      title: 'Pass & Booth Revenue Ledger',
                      subtitle: 'Gross sales attribution by pass tier and exhibition hall',
                      rows: filteredRecords.map((r) => ({
                        label: `${r.passType} Tier • ${r.hall}`,
                        meta: r.expo,
                        value: `$${r.sales.toLocaleString()}`,
                      })),
                    })
                  }
                  className="font-semibold text-[#e2bd82] hover:underline"
                >
                  Drill down →
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#192334] p-5 text-white shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Booth Occupancy
                </p>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-slate-200">
                  {kpis.booked}/{kpis.totalBooths} Slots
                </span>
              </div>
              <p className="mt-3 text-3xl font-semibold text-white tabular-nums">
                {kpis.occupancy}%
              </p>
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-slate-300">{kpis.totalBooths - kpis.booked} booths open</span>
                <button
                  type="button"
                  onClick={() =>
                    setDrillDownModal({
                      title: 'Floor Plan Occupancy by Hall',
                      subtitle: 'Allocated exhibitor spaces vs. total hall capacity',
                      rows: hallBreakdown.map((h) => ({
                        label: h.hallName,
                        meta: `${h.booked} of ${h.total} booths assigned`,
                        value: `${h.pct}% Full`,
                      })),
                    })
                  }
                  className="font-semibold text-[#e2bd82] hover:underline"
                >
                  Drill down →
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#192334] p-5 text-white shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Session Check-Ins
                </p>
                <span className="rounded-full bg-[#e2bd82]/15 border border-[#e2bd82]/30 px-2 py-0.5 text-[10px] font-bold text-[#e2bd82]">
                  {kpis.checkInsDelta}
                </span>
              </div>
              <p className="mt-3 text-3xl font-semibold text-[#e2bd82] tabular-nums">
                {kpis.checkIns.toLocaleString()}
              </p>
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-slate-300">{kpis.checkInRate}% badge scan rate</span>
                <button
                  type="button"
                  onClick={() =>
                    setDrillDownModal({
                      title: 'Session Check-In & Attendance Audit',
                      subtitle: 'Live badge scans recorded across auditoriums and stages',
                      rows: visibleSessions.map((s) => ({
                        label: s.title,
                        meta: s.hall,
                        value: `${s.attendees} / ${s.capacity} scanned`,
                      })),
                    })
                  }
                  className="font-semibold text-[#e2bd82] hover:underline"
                >
                  Drill down →
                </button>
              </div>
            </div>
          </div>

          {/* ROW 2: REGISTRATION TRENDS (8 Cols) + PASS CATEGORIES DONUT (4 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Registration Trends Area/Line Chart */}
            <section className="lg:col-span-8 rounded-2xl border border-[#e6e5e0] bg-white p-6 shadow-[0_8px_24px_rgba(25,35,52,0.04)] flex flex-col justify-between">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#7a5f35]">
                    Growth Trajectory
                  </p>
                  <h2 className="text-lg font-semibold text-[#192334]">
                    Registration Trends (Current vs. Prior Cycle)
                  </h2>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 text-xs font-medium text-[#525b65]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#192334]" /> Current
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#e2bd82]" /> Prior Cycle
                  </span>
                </div>
              </div>

              <div className="relative w-full">
                <svg
                  viewBox={`0 0 ${svgW} ${svgH}`}
                  className="w-full h-52 overflow-visible"
                  role="img"
                  aria-label="Registration trends chart"
                >
                  <defs>
                    <linearGradient id="navyArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#192334" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#192334" stopOpacity="0.01" />
                    </linearGradient>
                  </defs>

                  {[0.25, 0.5, 0.75, 1].map((step) => {
                    const y = svgH - padY - step * (svgH - padY * 2);
                    return (
                      <line
                        key={step}
                        x1={padX}
                        x2={svgW - padX}
                        y1={y}
                        y2={y}
                        stroke="#efefeb"
                        strokeDasharray="4 4"
                      />
                    );
                  })}

                  <path d={areaPath} fill="url(#navyArea)" />
                  <path
                    d={prevPath}
                    fill="none"
                    stroke="#e2bd82"
                    strokeWidth="2.5"
                    strokeDasharray="5 4"
                  />
                  <path
                    d={currentPath}
                    fill="none"
                    stroke="#192334"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {trendSeries.map((pt, idx) => {
                    const c = currentPoints[idx];
                    const isHovered = hoveredTrendIdx === idx;
                    return (
                      <g
                        key={pt.label}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredTrendIdx(idx)}
                        onMouseLeave={() => setHoveredTrendIdx(null)}
                      >
                        <circle
                          cx={c.x}
                          cy={c.y}
                          r={isHovered ? 6.5 : 4.5}
                          fill={isHovered ? '#e2bd82' : '#192334'}
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                        <text
                          x={c.x}
                          y={svgH - 2}
                          textAnchor="middle"
                          className="fill-[#687078] text-[11px] font-medium"
                        >
                          {pt.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Interactive Hover Tooltip */}
                {hoveredTrendIdx !== null && (
                  <div className="mt-2 rounded-xl border border-[#e2bd82]/60 bg-[#192334] px-4 py-2 text-xs text-white flex items-center justify-between">
                    <span className="font-semibold text-[#e2bd82]">
                      {trendSeries[hoveredTrendIdx].label} Snapshot
                    </span>
                    <span>
                      Current:{' '}
                      <strong>{trendSeries[hoveredTrendIdx].current.toLocaleString()}</strong> • Prior:{' '}
                      <strong>{trendSeries[hoveredTrendIdx].previous.toLocaleString()}</strong>
                    </span>
                  </div>
                )}
              </div>
            </section>

            {/* Pass Categories Donut Chart */}
            <section className="lg:col-span-4 rounded-2xl border border-[#e6e5e0] bg-white p-6 shadow-[0_8px_24px_rgba(25,35,52,0.04)] flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#7a5f35]">
                  Ticket Mix
                </p>
                <h2 className="text-lg font-semibold text-[#192334]">Pass Categories</h2>
              </div>

              <div className="my-4 flex items-center justify-center">
                <svg width="144" height="144" viewBox="0 0 144 144">
                  <circle
                    cx="72"
                    cy="72"
                    r={radius}
                    fill="none"
                    stroke="#efefeb"
                    strokeWidth="16"
                  />
                  {passBreakdown.map((seg) => {
                    const dash = (seg.percent / 100) * circumference;
                    const offset = -(cumulativePct / 100) * circumference;
                    cumulativePct += seg.percent;
                    if (!seg.percent) return null;
                    return (
                      <circle
                        key={seg.key}
                        cx="72"
                        cy="72"
                        r={radius}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="16"
                        strokeDasharray={`${dash} ${circumference}`}
                        strokeDashoffset={offset}
                        transform="rotate(-90 72 72)"
                      />
                    );
                  })}
                  <text
                    x="72"
                    y="69"
                    textAnchor="middle"
                    className="fill-[#192334] text-base font-bold"
                  >
                    {kpis.reg.toLocaleString()}
                  </text>
                  <text
                    x="72"
                    y="85"
                    textAnchor="middle"
                    className="fill-[#687078] text-[10px] font-semibold uppercase"
                  >
                    Total Passes
                  </text>
                </svg>
              </div>

              <div className="space-y-2 border-t border-[#efefeb] pt-3 text-xs">
                {passBreakdown.map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 font-medium text-[#192334]">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.key}
                    </span>
                    <span className="font-semibold text-[#525b65] tabular-nums">
                      {item.count.toLocaleString()} ({item.percent}%)
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ROW 3: BOOTH OCCUPANCY (4 Cols) + ATTENDEE ENGAGEMENT (4 Cols) + SESSION POPULARITY (4 Cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Booth Occupancy by Hall */}
            <section className="lg:col-span-4 rounded-2xl border border-[#e6e5e0] bg-white p-6 shadow-[0_8px_24px_rgba(25,35,52,0.04)] flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#7a5f35]">
                  Floor Utilization
                </p>
                <h2 className="text-lg font-semibold text-[#192334]">Booth Occupancy</h2>
                <p className="text-xs text-[#687078] mt-0.5">
                  Allocated exhibitor booths across exhibition halls
                </p>
              </div>

              <div className="my-5 space-y-4">
                {hallBreakdown.map((hall) => (
                  <div key={hall.hallName}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-[#192334]">{hall.hallName}</span>
                      <span className="font-semibold text-[#525b65] tabular-nums">
                        {hall.booked}/{hall.total} ({hall.pct}%)
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-[#efefeb] overflow-hidden">
                      <div
                        style={{ width: `${hall.pct}%` }}
                        className="h-full rounded-full bg-[#192334] transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-[#f3f0e9]/70 border border-[#e2bd82]/50 p-3 text-xs text-[#192334] flex items-center justify-between">
                <span>Overall Hall Fill Rate</span>
                <strong className="text-[#7a5f35]">{kpis.occupancy}% Occupied</strong>
              </div>
            </section>

            {/* Attendee Engagement Hourly Bar Chart */}
            <section className="lg:col-span-4 rounded-2xl border border-[#e6e5e0] bg-white p-6 shadow-[0_8px_24px_rgba(25,35,52,0.04)] flex flex-col justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#7a5f35]">
                  Floor Activity
                </p>
                <h2 className="text-lg font-semibold text-[#192334]">Attendee Engagement</h2>
                <p className="text-xs text-[#687078] mt-0.5">
                  QR badge scans &amp; booth interactions by hour
                </p>
              </div>

              <div className="my-5 grid grid-cols-6 gap-2 items-end h-36 pt-4">
                {hourlyEngagement.map((slot, idx) => {
                  const heightPct = Math.round((slot.scans / 1100) * 100);
                  const isActive = hoveredHourIdx === idx;
                  return (
                    <div
                      key={slot.hour}
                      onMouseEnter={() => setHoveredHourIdx(idx)}
                      onMouseLeave={() => setHoveredHourIdx(null)}
                      className="flex flex-col items-center h-full justify-end cursor-pointer"
                    >
                      <div
                        style={{ height: `${heightPct}%` }}
                        className={`w-full rounded-t-lg transition-all ${
                          isActive ? 'bg-[#e2bd82]' : 'bg-[#192334]'
                        }`}
                      />
                      <span className="mt-2 text-[10px] font-semibold text-[#687078]">
                        {slot.hour.replace(' ', '')}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-xl bg-[#fafaf8] border border-[#e6e5e0] px-3.5 py-2.5 text-xs flex items-center justify-between">
                {hoveredHourIdx !== null ? (
                  <>
                    <span className="font-semibold text-[#192334]">
                      {hourlyEngagement[hoveredHourIdx].hour}
                    </span>
                    <span className="text-[#525b65]">
                      <strong>{hourlyEngagement[hoveredHourIdx].scans}</strong> scans • Avg dwell{' '}
                      <strong>{hourlyEngagement[hoveredHourIdx].dwell}</strong>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[#687078]">Peak Activity Window</span>
                    <strong className="text-[#192334]">03:00 PM (1,040 scans)</strong>
                  </>
                )}
              </div>
            </section>

            {/* Session Popularity */}
            <section className="lg:col-span-4 rounded-2xl border border-[#e6e5e0] bg-white p-6 shadow-[0_8px_24px_rgba(25,35,52,0.04)] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#7a5f35]">
                    Stage Demand
                  </p>
                  <h2 className="text-lg font-semibold text-[#192334]">Session Popularity</h2>
                </div>
              </div>

              <div className="my-4 space-y-3.5">
                {visibleSessions.map((ses) => {
                  const fill = Math.round((ses.attendees / ses.capacity) * 100);
                  return (
                    <div key={ses.title} className="space-y-1">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <p className="font-semibold text-[#192334] truncate">{ses.title}</p>
                        <span className="shrink-0 font-bold text-[#7a5f35] tabular-nums">
                          {fill}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[#efefeb] overflow-hidden">
                        <div
                          style={{ width: `${fill}%` }}
                          className="h-full rounded-full bg-[#e2bd82]"
                        />
                      </div>
                      <p className="text-[10px] text-[#687078]">
                        {ses.hall} • {ses.attendees.toLocaleString()} / {ses.capacity.toLocaleString()} seats
                      </p>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() =>
                  setDrillDownModal({
                    title: 'Full Session Attendance Ranking',
                    subtitle: 'Capacity fill rate across all filtered auditoriums',
                    rows: visibleSessions.map((s) => ({
                      label: s.title,
                      meta: `${s.expo} • ${s.hall}`,
                      value: `${s.attendees} / ${s.capacity} (${Math.round(
                        (s.attendees / s.capacity) * 100
                      )}%)`,
                    })),
                  })
                }
                className="w-full rounded-xl border border-[#e6e5e0] bg-[#fafaf8] py-2 text-xs font-semibold text-[#192334] transition hover:border-[#192334]"
              >
                View All Session Metrics →
              </button>
            </section>
          </div>
        </>
      )}

      {/* DRILL-DOWN DETAIL MODAL */}
      {drillDownModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#192334]/60 backdrop-blur-xs p-4"
          onClick={() => setDrillDownModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-[#e6e5e0] bg-white shadow-2xl overflow-hidden"
          >
            <div className="bg-[#192334] px-6 py-4 text-white flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e2bd82]">
                  Detailed Breakdown
                </span>
                <h3 className="text-lg font-semibold mt-0.5">{drillDownModal.title}</h3>
                <p className="text-xs text-slate-300 mt-0.5">{drillDownModal.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setDrillDownModal(null)}
                className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-200 hover:bg-white/20"
              >
                ✕
              </button>
            </div>

            <div className="p-6 divide-y divide-[#efefeb] max-h-80 overflow-y-auto">
              {drillDownModal.rows.map((row, i) => (
                <div key={i} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="min-w-0">
                    <p className="font-semibold text-[#192334] truncate">{row.label}</p>
                    <p className="text-[#687078] truncate">{row.meta}</p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-[#f3f0e9] px-2.5 py-1 font-bold text-[#192334]">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="px-6 py-3.5 border-t border-[#e6e5e0] bg-[#fafaf8] flex justify-end">
              <button
                type="button"
                onClick={() => setDrillDownModal(null)}
                className="rounded-xl bg-[#192334] px-4 py-2 text-xs font-semibold text-[#e2bd82]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;