import React, { useState, useMemo, useEffect } from 'react';

const initialApplications = [
  {
    id: 'APP-1042',
    companyName: 'Aether Robotics',
    initials: 'AR',
    industry: 'Autonomous Systems',
    submittedAt: '2026-11-23',
    submittedLabel: '2 hours ago',
    isNew: true,
    isPriority: true,
    requestedBooth: 'A04 • Corner 20×20 ft',
    backupBooth: 'A08 • Standard 15×15 ft',
    status: 'Pending',
    contactName: 'Dr. Kamran Siddiqui',
    contactEmail: 'kamran@aetherrobotics.io',
    contactPhone: '+92 300 8214490',
    website: 'https://aetherrobotics.io',
    description:
      'Industrial warehouse AMR fleets and vision-guided sorting arms engineered for high-throughput logistics hubs.',
    boothNotes: 'Requires dedicated 3-phase 30A power drop and 4m ceiling clearance for live arm demo.',
    products: [
      { name: 'AetherNav X4 AMR', category: 'Warehouse Robotics', summary: 'LiDAR-guided autonomous pallet mover with 800kg payload.' },
      { name: 'OptiPick Vision Arm', category: 'AI Sorting', summary: 'Sub-millimeter bin-picking robotic manipulator.' },
    ],
    documents: [
      { name: 'SECP_Incorporation_Cert.pdf', size: '1.4 MB', verified: true },
      { name: 'Booth_Safety_Compliance_2026.pdf', size: '890 KB', verified: true },
      { name: 'Electrical_Load_Diagram.pdf', size: '2.1 MB', verified: false },
    ],
    history: [
      { time: 'Nov 23, 2026 • 05:10 AM', actor: 'Aether Robotics', action: 'Submitted priority exhibitor application for Hall A.' },
      { time: 'Nov 23, 2026 • 05:12 AM', actor: 'System', action: 'Auto-verified business registration number.' },
    ],
  },
  {
    id: 'APP-1041',
    companyName: 'PayPulse Financial',
    initials: 'PP',
    industry: 'FinTech & Payments',
    submittedAt: '2026-11-22',
    submittedLabel: 'Yesterday',
    isNew: true,
    isPriority: true,
    requestedBooth: 'B01 • Island 25×25 ft',
    backupBooth: 'B03 • Corner 20×20 ft',
    status: 'Pending',
    contactName: 'Sara Mahmood',
    contactEmail: 'sara@paypulse.pk',
    contactPhone: '+92 321 4491023',
    website: 'https://paypulse.pk',
    description:
      'Instant B2B settlement rails, Raast merchant APIs, and embedded treasury infrastructure for enterprises.',
    boothNotes: 'Planning 2 interactive kiosk stations and a VIP investor meeting pod.',
    products: [
      { name: 'PulseCheckout API', category: 'Payment Gateway', summary: 'One-click split settlement & instant merchant payouts.' },
      { name: 'TreasuryFlow OS', category: 'B2B Finance', summary: 'Automated vendor reconciliation and multi-currency ledger.' },
    ],
    documents: [
      { name: 'SBP_EMI_License_Copy.pdf', size: '3.2 MB', verified: true },
      { name: 'Brand_Guidelines_2026.pdf', size: '4.6 MB', verified: true },
    ],
    history: [
      { time: 'Nov 22, 2026 • 04:40 PM', actor: 'Sara Mahmood', action: 'Submitted application with Island Booth request.' },
    ],
  },
  {
    id: 'APP-1039',
    companyName: 'GreenGrid Energy',
    initials: 'GG',
    industry: 'CleanTech & Solar',
    submittedAt: '2026-11-20',
    submittedLabel: '3 days ago',
    isNew: false,
    isPriority: false,
    requestedBooth: 'C12 • Standard 15×15 ft',
    backupBooth: 'C14 • Standard 15×15 ft',
    status: 'Info Requested',
    contactName: 'Bilal Tariq',
    contactEmail: 'bilal@greengrid.co',
    contactPhone: '+92 333 9182736',
    website: 'https://greengrid.co',
    description:
      'Commercial microgrid inverters and AI-driven peak-shaving battery storage systems for industrial parks.',
    boothNotes: 'Bringing 1 display inverter unit (non-energized hardware model).',
    products: [
      { name: 'GridCore 150kW Inverter', category: 'Hardware', summary: 'High-efficiency hybrid commercial solar inverter.' },
    ],
    documents: [
      { name: 'Company_Tax_NTN.pdf', size: '640 KB', verified: true },
    ],
    history: [
      { time: 'Nov 20, 2026 • 11:20 AM', actor: 'Bilal Tariq', action: 'Application submitted.' },
      { time: 'Nov 21, 2026 • 02:15 PM', actor: 'Admin (You)', action: 'Requested battery unit weight specs for Hall C floor load clearance.' },
    ],
  },
  {
    id: 'APP-1036',
    companyName: 'NexaHealth Diagnostics',
    initials: 'NH',
    industry: 'HealthTech & AI',
    submittedAt: '2026-11-18',
    submittedLabel: '5 days ago',
    isNew: false,
    isPriority: true,
    requestedBooth: 'A10 • Corner 20×20 ft',
    backupBooth: 'B09 • Standard 15×15 ft',
    status: 'Approved',
    contactName: 'Dr. Ayesha Noor',
    contactEmail: 'ayesha@nexahealth.ai',
    contactPhone: '+92 301 5529810',
    website: 'https://nexahealth.ai',
    description:
      'Point-of-care retinal screening devices and clinical triage assistants for diagnostic networks.',
    boothNotes: 'Approved for Hall A Health & AI cluster.',
    products: [
      { name: 'RetinaScan Pro', category: 'Medical Device', summary: 'Portable AI-assisted fundus camera with 30-sec screening.' },
    ],
    documents: [
      { name: 'DRAP_Registration.pdf', size: '1.9 MB', verified: true },
      { name: 'ISO_13485_Certificate.pdf', size: '1.1 MB', verified: true },
    ],
    history: [
      { time: 'Nov 18, 2026 • 09:00 AM', actor: 'Dr. Ayesha Noor', action: 'Application submitted.' },
      { time: 'Nov 19, 2026 • 03:30 PM', actor: 'Admin (You)', action: 'Approved application and assigned Booth A10.' },
    ],
  },
  {
    id: 'APP-1033',
    companyName: 'Veloce Cloud Hosting',
    initials: 'VC',
    industry: 'Cloud & DevOps',
    submittedAt: '2026-11-16',
    submittedLabel: '7 days ago',
    isNew: false,
    isPriority: false,
    requestedBooth: 'B14 • Standard 15×15 ft',
    backupBooth: 'B16 • Standard 15×15 ft',
    status: 'Pending',
    contactName: 'Usman Ghani',
    contactEmail: 'usman@velocecloud.dev',
    contactPhone: '+92 345 7712098',
    website: 'https://velocecloud.dev',
    description:
      'Low-latency regional bare-metal Kubernetes clusters and managed PostgreSQL hosting.',
    boothNotes: 'Standard power and high-speed wired Ethernet drop requested.',
    products: [
      { name: 'VeloceKube Edge', category: 'Cloud Infrastructure', summary: 'Zero-config multi-region Kubernetes control plane.' },
    ],
    documents: [
      { name: 'Company_Profile_2026.pdf', size: '2.4 MB', verified: true },
    ],
    history: [
      { time: 'Nov 16, 2026 • 06:45 PM', actor: 'Usman Ghani', action: 'Application submitted.' },
    ],
  },
  {
    id: 'APP-1029',
    companyName: 'Apex Promo Merchandise',
    initials: 'AP',
    industry: 'Retail & Swag',
    submittedAt: '2026-11-14',
    submittedLabel: '9 days ago',
    isNew: false,
    isPriority: false,
    requestedBooth: 'C02 • Standard 15×15 ft',
    backupBooth: 'None',
    status: 'Rejected',
    contactName: 'Hamza Sheikh',
    contactEmail: 'hamza@apexpromo.pk',
    contactPhone: '+92 312 6640912',
    website: 'https://apexpromo.pk',
    description: 'Wholesale corporate merchandise and print giveaways.',
    boothNotes: 'Rejected due to non-alignment with expo B2B tech & enterprise theme.',
    products: [
      { name: 'Custom Lanyards & Totes', category: 'Merchandise', summary: 'Bulk event giveaways.' },
    ],
    documents: [
      { name: 'Catalog_2026.pdf', size: '5.1 MB', verified: false },
    ],
    history: [
      { time: 'Nov 14, 2026 • 01:10 PM', actor: 'Hamza Sheikh', action: 'Application submitted.' },
      { time: 'Nov 15, 2026 • 10:05 AM', actor: 'Admin (You)', action: 'Rejected: Category does not match 2026 exhibition tracks.' },
    ],
  },
];

const statusBadge = {
  Pending: 'bg-[#f3f0e9] text-[#7a5f35] border-[#dfd5c3]',
  'Info Requested': 'bg-[#5145CD]/10 text-[#5145CD] border-[#5145CD]/30',
  Approved: 'bg-[#edf3ed] text-[#2f573b] border-[#b7d4bf]',
  Rejected: 'bg-red-50 text-red-700 border-red-200',
};

const rejectionPresets = [
  'Industry or product category does not align with expo tracks',
  'Incomplete regulatory or business registration documents',
  'Requested booth size/power requirements unavailable in target hall',
  'Duplicate application from the same organization',
];

const PAGE_SIZE = 4;

const ExhibitorApprovals = () => {
  const [applications, setApplications] = useState(initialApplications);
  const [loading, setLoading] = useState(true);

  // Filter, Sort & Pagination State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [industryFilter, setIndustryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('priority'); // 'priority' | 'newest' | 'oldest' | 'company'
  const [page, setPage] = useState(1);

  // Selected Drawer State
  const [selectedId, setSelectedId] = useState(null);

  // Action Modal State ('approve' | 'info' | 'reject' | null)
  const [actionModal, setActionModal] = useState(null);
  const [actionNote, setActionNote] = useState('');
  const [rejectionPreset, setRejectionPreset] = useState(rejectionPresets[0]);
  const [formError, setFormError] = useState('');

  // Feedback Toast
  const [toast, setToast] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3200);
  };

  const selectedApp = useMemo(
    () => applications.find((a) => a.id === selectedId) || null,
    [applications, selectedId]
  );

  const industries = useMemo(() => {
    const set = new Set(applications.map((a) => a.industry));
    return ['All', ...Array.from(set)];
  }, [applications]);

  // Summary Counts
  const stats = useMemo(() => {
    return {
      pending: applications.filter((a) => a.status === 'Pending').length,
      newlySubmitted: applications.filter((a) => a.isNew && a.status === 'Pending').length,
      priority: applications.filter((a) => a.isPriority && a.status === 'Pending').length,
      approved: applications.filter((a) => a.status === 'Approved').length,
    };
  }, [applications]);

  // Filtered & Sorted List
  const processedApps = useMemo(() => {
    const filtered = applications.filter((app) => {
      const q = search.toLowerCase();
      const matchesSearch =
        app.companyName.toLowerCase().includes(q) ||
        app.industry.toLowerCase().includes(q) ||
        app.requestedBooth.toLowerCase().includes(q) ||
        app.id.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
      const matchesIndustry = industryFilter === 'All' || app.industry === industryFilter;
      return matchesSearch && matchesStatus && matchesIndustry;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'priority') {
        const scoreA = (a.status === 'Pending' ? 10 : 0) + (a.isPriority ? 5 : 0) + (a.isNew ? 2 : 0);
        const scoreB = (b.status === 'Pending' ? 10 : 0) + (b.isPriority ? 5 : 0) + (b.isNew ? 2 : 0);
        return scoreB - scoreA;
      }
      if (sortBy === 'newest') return b.submittedAt.localeCompare(a.submittedAt);
      if (sortBy === 'oldest') return a.submittedAt.localeCompare(b.submittedAt);
      return a.companyName.localeCompare(b.companyName);
    });
  }, [applications, search, statusFilter, industryFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(processedApps.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginatedApps = processedApps.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const openActionModal = (type, app) => {
    setSelectedId(app.id);
    setActionModal(type);
    setActionNote('');
    setRejectionPreset(rejectionPresets[0]);
    setFormError('');
  };

  const handleConfirmAction = (e) => {
    e.preventDefault();
    if (!selectedApp) return;

    if (actionModal === 'reject') {
      const fullReason = `${rejectionPreset}${actionNote.trim() ? ` — ${actionNote.trim()}` : ''}`;
      if (!rejectionPreset && !actionNote.trim()) {
        setFormError('Please provide a clear rejection reason before proceeding.');
        return;
      }
      updateApplicationStatus(
        selectedApp.id,
        'Rejected',
        `Rejected: ${fullReason}`
      );
      showToast(`Application for ${selectedApp.companyName} rejected`);
    } else if (actionModal === 'info') {
      if (!actionNote.trim()) {
        setFormError('Please specify what additional documents or details are needed.');
        return;
      }
      updateApplicationStatus(
        selectedApp.id,
        'Info Requested',
        `Requested info: ${actionNote.trim()}`
      );
      showToast(`Information request sent to ${selectedApp.companyName}`);
    } else if (actionModal === 'approve') {
      const note = actionNote.trim()
        ? `Approved & assigned ${selectedApp.requestedBooth} (${actionNote.trim()})`
        : `Approved & assigned ${selectedApp.requestedBooth}`;
      updateApplicationStatus(selectedApp.id, 'Approved', note);
      showToast(`${selectedApp.companyName} approved for ${selectedApp.requestedBooth}`);
    }

    setActionModal(null);
    setActionNote('');
    setFormError('');
  };

  const updateApplicationStatus = (id, nextStatus, logMessage) => {
    const nowLabel = 'Just now';
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status: nextStatus,
              isNew: false,
              history: [
                { time: nowLabel, actor: 'Admin (You)', action: logMessage },
                ...app.history,
              ],
            }
          : app
      )
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

      {/* Editorial Header */}
      <div className="rounded-2xl bg-[#192334] px-6 py-5 text-white shadow-[0_12px_28px_rgba(25,35,52,0.12)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-block rounded-full border border-[#e2bd82]/35 bg-[#e2bd82]/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e2bd82]">
            Exhibitor Vetting Desk
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
            Exhibitor <span className="font-serif italic text-[#e2bd82]">Approvals</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            Review company credentials, verify booth allocations, and onboard qualified exhibitors.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setStatusFilter('Pending');
            setSortBy('priority');
            setPage(1);
          }}
          className="shrink-0 rounded-xl bg-[#e2bd82] px-4 py-2.5 text-xs font-bold text-[#192334] transition hover:bg-[#edd09f]"
        >
          Focus Pending Queue ({stats.pending})
        </button>
      </div>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#192334] p-5 text-white shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Pending Review
          </p>
          <p className="mt-2 text-2xl font-semibold text-[#e2bd82]">{stats.pending}</p>
          <p className="mt-1 text-xs text-slate-300">Awaiting organizer decision</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#192334] p-5 text-white shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Newly Submitted
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">{stats.newlySubmitted}</p>
          <p className="mt-1 text-xs text-slate-300">Arrived in last 24 hours</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#192334] p-5 text-white shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Priority Booths
          </p>
          <p className="mt-2 text-2xl font-semibold text-[#e2bd82]">{stats.priority}</p>
          <p className="mt-1 text-xs text-slate-300">Corner & Island requests</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#192334] p-5 text-white shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Approved Exhibitors
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">{stats.approved}</p>
          <p className="mt-1 text-xs text-slate-300">Confirmed on floor plan</p>
        </div>
      </div>

      {/* Search, Filters & Sorting Controls */}
      <div className="rounded-2xl border border-[#e6e5e0] bg-white p-4 shadow-[0_6px_22px_rgba(25,35,52,0.04)] flex flex-col lg:flex-row lg:items-center gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search company, ID, booth, or industry..."
          className="flex-1 min-w-0 rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3.5 py-2 text-xs sm:text-sm text-[#192334] placeholder:text-[#687078] outline-none focus:border-[#192334] focus:bg-white"
        />

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            aria-label="Filter by status"
            className="rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3 py-2 text-xs font-medium text-[#192334] outline-none focus:border-[#192334]"
          >
            <option value="All">Status: All</option>
            <option value="Pending">Pending</option>
            <option value="Info Requested">Info Requested</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={industryFilter}
            onChange={(e) => {
              setIndustryFilter(e.target.value);
              setPage(1);
            }}
            aria-label="Filter by industry"
            className="rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3 py-2 text-xs font-medium text-[#192334] outline-none focus:border-[#192334]"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind === 'All' ? 'Industry: All' : ind}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort applications"
            className="rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3 py-2 text-xs font-medium text-[#192334] outline-none focus:border-[#192334]"
          >
            <option value="priority">Sort: Priority & Pending</option>
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="company">Sort: Company (A–Z)</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="rounded-2xl border border-[#e6e5e0] bg-white shadow-[0_8px_24px_rgba(25,35,52,0.04)] overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[1, 2, 3, 4].map((row) => (
              <div key={row} className="h-14 rounded-xl bg-[#fafaf8] animate-pulse" />
            ))}
          </div>
        ) : paginatedApps.length === 0 ? (
          <div className="py-14 px-6 text-center">
            <p className="text-base font-semibold text-[#192334]">No matching exhibitor applications</p>
            <p className="mt-1 text-xs text-[#687078]">
              Adjust your search terms or reset filters to inspect all submissions.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setStatusFilter('All');
                setIndustryFilter('All');
              }}
              className="mt-4 rounded-xl bg-[#192334] px-4 py-2 text-xs font-semibold text-[#e2bd82]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[860px]">
                <thead>
                  <tr className="border-b border-[#e6e5e0] bg-[#fafaf8] text-[11px] font-bold uppercase tracking-wider text-[#687078]">
                    <th className="py-3.5 px-5">Company</th>
                    <th className="py-3.5 px-4">Industry</th>
                    <th className="py-3.5 px-4">Submitted</th>
                    <th className="py-3.5 px-4">Requested Booth</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-5 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#efefeb] text-sm">
                  {paginatedApps.map((app) => {
                    const isPending = app.status === 'Pending';
                    const isSelected = app.id === selectedId;

                    return (
                      <tr
                        key={app.id}
                        onClick={() => setSelectedId(app.id)}
                        className={`cursor-pointer transition ${
                          isSelected
                            ? 'bg-[#f3f0e9]'
                            : isPending
                            ? 'bg-[#fafaf8]/70 hover:bg-[#f3f0e9]/50'
                            : 'hover:bg-[#fafaf8]'
                        }`}
                      >
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 shrink-0 rounded-xl bg-[#192334] text-[#e2bd82] font-bold text-xs flex items-center justify-center">
                              {app.initials}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-[#192334] truncate">
                                  {app.companyName}
                                </p>
                                {app.isNew && (
                                  <span className="rounded-md bg-[#192334] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#e2bd82]">
                                    New
                                  </span>
                                )}
                                {app.isPriority && (
                                  <span className="rounded-md bg-[#f3f0e9] border border-[#e2bd82] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#7a5f35]">
                                    Priority
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-[#687078]">{app.id} • {app.contactName}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-xs font-medium text-[#525b65] whitespace-nowrap">
                          {app.industry}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <p className="text-xs font-medium text-[#192334]">{app.submittedAt}</p>
                          <p className="text-[11px] text-[#687078]">{app.submittedLabel}</p>
                        </td>

                        <td className="py-4 px-4 text-xs font-semibold text-[#192334] whitespace-nowrap">
                          {app.requestedBooth}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                              statusBadge[app.status] || statusBadge.Pending
                            }`}
                          >
                            {app.status}
                          </span>
                        </td>

                        <td
                          className="py-4 px-5 text-right whitespace-nowrap"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedId(app.id)}
                              className="rounded-lg border border-[#e6e5e0] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#192334] hover:border-[#192334]"
                            >
                              Inspect
                            </button>
                            {app.status !== 'Approved' && (
                              <button
                                type="button"
                                onClick={() => openActionModal('approve', app)}
                                className="rounded-lg bg-[#192334] px-2.5 py-1.5 text-xs font-semibold text-[#e2bd82] hover:bg-[#24324a]"
                              >
                                Approve
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="px-5 py-3.5 border-t border-[#e6e5e0] bg-[#fafaf8] flex flex-wrap items-center justify-between gap-3 text-xs">
              <p className="text-[#525b65]">
                Showing{' '}
                <strong className="text-[#192334]">
                  {(safePage - 1) * PAGE_SIZE + 1}–
                  {Math.min(safePage * PAGE_SIZE, processedApps.length)}
                </strong>{' '}
                of <strong className="text-[#192334]">{processedApps.length}</strong> applications
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-lg border border-[#e6e5e0] bg-white px-3 py-1.5 font-semibold text-[#192334] disabled:opacity-40"
                >
                  ← Prev
                </button>
                <span className="px-2 font-semibold text-[#192334]">
                  Page {safePage} of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-lg border border-[#e6e5e0] bg-white px-3 py-1.5 font-semibold text-[#192334] disabled:opacity-40"
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* SLIDE-OVER APPLICATION DETAIL PANEL (Preserves Table Context) */}
      {selectedApp && (
        <div
          className="fixed inset-0 z-40 flex justify-end bg-[#192334]/45 backdrop-blur-[2px]"
          onClick={() => setSelectedId(null)}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full max-w-xl flex-col justify-between overflow-hidden border-l border-t-0 border-[#e6e5e0] bg-white shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="bg-[#192334] px-6 py-5 text-white flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="h-12 w-12 shrink-0 rounded-xl bg-[#e2bd82] text-[#192334] font-bold text-base flex items-center justify-center">
                  {selectedApp.initials}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#e2bd82]">
                      {selectedApp.id}
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
                        statusBadge[selectedApp.status]
                      }`}
                    >
                      {selectedApp.status}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold truncate mt-0.5">
                    {selectedApp.companyName}
                  </h2>
                  <p className="text-xs text-slate-300 truncate">
                    {selectedApp.industry} • Submitted {selectedApp.submittedAt}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-200 hover:bg-white/20"
              >
                ✕
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Company Information */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a5f35]">
                  Company Information
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-[#525b65]">
                  {selectedApp.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-xl border border-[#e6e5e0] bg-[#fafaf8] p-4 text-xs">
                  <div>
                    <span className="text-[#687078] block">Primary Contact</span>
                    <span className="font-semibold text-[#192334]">{selectedApp.contactName}</span>
                  </div>
                  <div>
                    <span className="text-[#687078] block">Email</span>
                    <span className="font-semibold text-[#192334]">{selectedApp.contactEmail}</span>
                  </div>
                  <div>
                    <span className="text-[#687078] block">Phone</span>
                    <span className="font-semibold text-[#192334]">{selectedApp.contactPhone}</span>
                  </div>
                  <div>
                    <span className="text-[#687078] block">Website</span>
                    <span className="font-semibold text-[#5145CD]">{selectedApp.website}</span>
                  </div>
                </div>
              </section>

              {/* Booth Preferences */}
              <section className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a5f35]">
                  Booth Preferences
                </h3>
                <div className="rounded-xl border border-[#e2bd82]/60 bg-[#f3f0e9]/60 p-4 space-y-2 text-xs">
                  <div className="flex justify-between gap-2">
                    <span className="text-[#525b65]">Primary Choice:</span>
                    <span className="font-bold text-[#192334]">{selectedApp.requestedBooth}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-[#525b65]">Backup Choice:</span>
                    <span className="font-semibold text-[#192334]">{selectedApp.backupBooth}</span>
                  </div>
                  <p className="pt-2 border-t border-[#e2bd82]/40 text-[#525b65]">
                    <strong className="text-[#192334]">Setup Requirements:</strong>{' '}
                    {selectedApp.boothNotes}
                  </p>
                </div>
              </section>

              {/* Products to Showcase */}
              <section className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a5f35]">
                  Products & Demos ({selectedApp.products.length})
                </h3>
                <div className="space-y-2">
                  {selectedApp.products.map((prod) => (
                    <div
                      key={prod.name}
                      className="rounded-xl border border-[#e6e5e0] bg-white p-3.5 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-[#192334]">{prod.name}</span>
                        <span className="rounded-full bg-[#f3f0e9] px-2 py-0.5 text-[10px] font-semibold text-[#7a5f35]">
                          {prod.category}
                        </span>
                      </div>
                      <p className="mt-1 text-[#525b65]">{prod.summary}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Submitted Documents */}
              <section className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a5f35]">
                  Submitted Documents ({selectedApp.documents.length})
                </h3>
                <div className="space-y-2">
                  {selectedApp.documents.map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center justify-between gap-3 rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3.5 py-2.5 text-xs"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-[#192334] truncate">📄 {doc.name}</p>
                        <p className="text-[11px] text-[#687078]">{doc.size}</p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                          doc.verified
                            ? 'bg-[#edf3ed] text-[#2f573b]'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {doc.verified ? 'Verified' : 'Needs Check'}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Application History */}
              <section className="space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-[#7a5f35]">
                  Application History
                </h3>
                <div className="border-l-2 border-[#e2bd82] pl-4 space-y-3">
                  {selectedApp.history.map((item, idx) => (
                    <div key={idx} className="text-xs">
                      <p className="text-[11px] font-semibold text-[#687078]">
                        {item.time} • {item.actor}
                      </p>
                      <p className="text-[#192334] mt-0.5">{item.action}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sticky Review Action Bar */}
            <div className="p-4 border-t border-[#e6e5e0] bg-[#fafaf8] flex flex-wrap items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={() => openActionModal('reject', selectedApp)}
                className="rounded-xl border border-red-200 bg-white px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
              >
                Reject
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openActionModal('info', selectedApp)}
                  className="rounded-xl border border-[#e6e5e0] bg-white px-4 py-2.5 text-xs font-semibold text-[#192334] transition hover:border-[#192334]"
                >
                  Request More Info
                </button>
                <button
                  type="button"
                  onClick={() => openActionModal('approve', selectedApp)}
                  className="rounded-xl bg-[#192334] px-5 py-2.5 text-xs font-semibold text-[#e2bd82] transition hover:bg-[#24324a]"
                >
                  ✓ Approve Exhibitor
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* CONFIRMATION / REASON DIALOGS */}
      {actionModal && selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#192334]/60 backdrop-blur-[2px] p-4">
          <form
            onSubmit={handleConfirmAction}
            className="w-full max-w-md space-y-4 rounded-2xl border border-t-0 border-[#e6e5e0] bg-white p-6 shadow-2xl"
          >
            {actionModal === 'approve' && (
              <>
                <span className="inline-block rounded-full bg-[#edf3ed] px-3 py-0.5 text-[11px] font-semibold text-[#2f573b]">
                  Confirm Approval
                </span>
                <h3 className="text-lg font-semibold text-[#192334]">
                  Approve {selectedApp.companyName}?
                </h3>
                <p className="text-xs leading-5 text-[#525b65]">
                  This will activate their Exhibitor Portal access and lock{' '}
                  <strong className="text-[#192334]">{selectedApp.requestedBooth}</strong> on the floor plan.
                </p>
                <div>
                  <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                    Optional Onboarding Note
                  </label>
                  <input
                    type="text"
                    value={actionNote}
                    onChange={(e) => setActionNote(e.target.value)}
                    placeholder="e.g. Welcome to Hall A! Power drop scheduled."
                    className="w-full rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3.5 py-2.5 text-sm outline-none focus:border-[#192334]"
                  />
                </div>
              </>
            )}

            {actionModal === 'info' && (
              <>
                <span className="inline-block rounded-full bg-[#5145CD]/10 px-3 py-0.5 text-[11px] font-semibold text-[#5145CD]">
                  Request Clarification
                </span>
                <h3 className="text-lg font-semibold text-[#192334]">
                  Request More Info from {selectedApp.companyName}
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                    What details or documents are required? *
                  </label>
                  <textarea
                    rows={3}
                    value={actionNote}
                    onChange={(e) => {
                      setActionNote(e.target.value);
                      setFormError('');
                    }}
                    placeholder="e.g. Please upload your electrical load certificate for Booth A04."
                    className="w-full rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3.5 py-2.5 text-sm outline-none focus:border-[#192334]"
                  />
                </div>
              </>
            )}

            {actionModal === 'reject' && (
              <>
                <span className="inline-block rounded-full bg-red-50 px-3 py-0.5 text-[11px] font-semibold text-red-700">
                  Reject Application
                </span>
                <h3 className="text-lg font-semibold text-[#192334]">
                  Reject {selectedApp.companyName}?
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                    Primary Rejection Reason *
                  </label>
                  <select
                    value={rejectionPreset}
                    onChange={(e) => setRejectionPreset(e.target.value)}
                    className="w-full rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3.5 py-2.5 text-xs font-medium text-[#192334] outline-none focus:border-[#192334]"
                  >
                    {rejectionPresets.map((reason) => (
                      <option key={reason} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                    Additional Feedback for Applicant
                  </label>
                  <textarea
                    rows={2}
                    value={actionNote}
                    onChange={(e) => {
                      setActionNote(e.target.value);
                      setFormError('');
                    }}
                    placeholder="Optional constructive context..."
                    className="w-full rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3.5 py-2.5 text-sm outline-none focus:border-[#192334]"
                  />
                </div>
              </>
            )}

            {formError && (
              <p className="text-xs font-semibold text-red-600">{formError}</p>
            )}

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setActionModal(null)}
                className="rounded-xl border border-[#e6e5e0] px-4 py-2 text-xs font-semibold text-[#192334]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`rounded-xl px-5 py-2 text-xs font-semibold text-white ${
                  actionModal === 'reject'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-[#192334] text-[#e2bd82] hover:bg-[#24324a]'
                }`}
              >
                {actionModal === 'approve'
                  ? 'Confirm Approval'
                  : actionModal === 'info'
                  ? 'Send Request'
                  : 'Confirm Rejection'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ExhibitorApprovals;