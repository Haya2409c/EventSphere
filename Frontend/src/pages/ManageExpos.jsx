import React, { useState, useMemo } from 'react';

const initialExpos = [
  {
    id: 'exp-1',
    name: 'Global Tech & AI Summit 2026',
    tagline: 'Enterprise cloud, autonomous systems, and next-gen developer infrastructure.',
    category: 'Technology & AI',
    banner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80',
    startDate: '2026-12-12',
    endDate: '2026-12-14',
    venue: 'Expo Center Karachi • Halls A–C',
    city: 'Karachi',
    halls: 'Hall A (Main), Hall B (AI Lab), Hall C (Startups)',
    boothCount: 120,
    registered: 3420,
    capacity: 4000,
    passTiers: 'General ($49), VIP Lounge ($199), Exhibitor Booth ($1,400)',
    status: 'Live',
  },
  {
    id: 'exp-2',
    name: 'FinTech & Digital Commerce Expo',
    tagline: 'Payments, open banking APIs, and cross-border retail innovation.',
    category: 'Finance & Retail',
    banner: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80',
    startDate: '2027-01-20',
    endDate: '2027-01-22',
    venue: 'Convention Plaza • Grand Pavilion',
    city: 'Lahore',
    halls: 'Grand Pavilion, North Wing',
    boothCount: 85,
    registered: 1850,
    capacity: 2500,
    passTiers: 'Visitor Pass ($35), Executive Pass ($150)',
    status: 'Upcoming',
  },
  {
    id: 'exp-3',
    name: 'Sustainable Design & Architecture Week',
    tagline: 'Eco-materials, modular urban spaces, and smart living showcases.',
    category: 'Design & Architecture',
    banner: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
    startDate: '2027-03-08',
    endDate: '2027-03-10',
    venue: 'Arts & Design Atrium',
    city: 'Islamabad',
    halls: 'Atrium Hall 1, Gallery Hall 2',
    boothCount: 60,
    registered: 0,
    capacity: 1800,
    passTiers: 'Standard ($25), Studio Pass ($95)',
    status: 'Draft',
  },
  {
    id: 'exp-4',
    name: 'CloudNative & DevOps Con 2026',
    tagline: 'Kubernetes, platform engineering, and observability workshops.',
    category: 'Software Engineering',
    banner: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=900&q=80',
    startDate: '2026-09-14',
    endDate: '2026-09-16',
    venue: 'Tech Park Auditorium',
    city: 'Karachi',
    halls: 'Main Arena, Workshop Rooms 1–4',
    boothCount: 70,
    registered: 2190,
    capacity: 2200,
    passTiers: 'Developer ($40), Team Bundle ($290)',
    status: 'Completed',
  },
];

const statusStyles = {
  Draft: 'bg-[#f3f0e9] text-[#7a5f35] border-[#dfd5c3]',
  Published: 'bg-[#eef1f8] text-[#192334] border-[#cbd5e1]',
  Upcoming: 'bg-[#5145CD]/10 text-[#5145CD] border-[#5145CD]/30',
  Live: 'bg-[#edf3ed] text-[#2f573b] border-[#b7d4bf]',
  Completed: 'bg-slate-100 text-slate-700 border-slate-300',
  Archived: 'bg-amber-50 text-amber-800 border-amber-200',
};

const wizardSteps = [
  'Basic Details',
  'Date & Venue',
  'Halls & Capacity',
  'Registration & Passes',
  'Review & Publish',
];

const emptyForm = {
  id: null,
  name: '',
  tagline: '',
  category: 'Technology & AI',
  banner: '',
  startDate: '',
  endDate: '',
  venue: '',
  city: '',
  halls: '',
  boothCount: 50,
  registered: 0,
  capacity: 1500,
  passTiers: 'General Pass ($39), VIP Pass ($149)',
  status: 'Draft',
};

const ManageExpos = () => {
  const [expos, setExpos] = useState(initialExpos);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [yearFilter, setYearFilter] = useState('All');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  // Wizard Modal State
  const [wizardOpen, setWizardOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(emptyForm);

  // Preview & Delete Modals
  const [previewExpo, setPreviewExpo] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3200);
  };

  // Summary Counts
  const stats = useMemo(() => {
    const total = expos.length;
    const published = expos.filter((e) =>
      ['Published', 'Upcoming', 'Live'].includes(e.status)
    ).length;
    const draft = expos.filter((e) => e.status === 'Draft').length;
    const completed = expos.filter((e) => e.status === 'Completed').length;
    return { total, published, draft, completed };
  }, [expos]);

  // Filtered Expos
  const filteredExpos = useMemo(() => {
    return expos.filter((expo) => {
      const matchesSearch =
        expo.name.toLowerCase().includes(search.toLowerCase()) ||
        expo.venue.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === 'All' || expo.status === statusFilter;
      const matchesYear =
        yearFilter === 'All' || expo.startDate.startsWith(yearFilter);
      return matchesSearch && matchesStatus && matchesYear;
    });
  }, [expos, search, statusFilter, yearFilter]);

  const openCreateWizard = () => {
    setFormData(emptyForm);
    setCurrentStep(0);
    setWizardOpen(true);
  };

  const openEditWizard = (expo) => {
    setFormData(expo);
    setCurrentStep(0);
    setWizardOpen(true);
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, banner: url }));
  };

  const saveExpo = (targetStatus) => {
    if (!formData.name.trim()) {
      setCurrentStep(0);
      return;
    }

    const finalRecord = {
      ...formData,
      status: targetStatus,
      banner:
        formData.banner ||
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80',
    };

    if (formData.id) {
      setExpos((prev) =>
        prev.map((item) => (item.id === formData.id ? finalRecord : item))
      );
      showToast(
        targetStatus === 'Draft'
          ? 'Changes saved to Draft'
          : `Expo "${finalRecord.name}" updated & published`
      );
    } else {
      setExpos((prev) => [{ ...finalRecord, id: `exp-${Date.now()}` }, ...prev]);
      showToast(
        targetStatus === 'Draft'
          ? 'Expo saved as Draft'
          : `Expo "${finalRecord.name}" published live`
      );
    }

    setWizardOpen(false);
  };

  const handleArchive = (id) => {
    setExpos((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, status: e.status === 'Archived' ? 'Draft' : 'Archived' }
          : e
      )
    );
    showToast('Expo archive status updated');
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setExpos((prev) => prev.filter((e) => e.id !== deleteTarget.id));
    setDeleteTarget(null);
    showToast('Expo permanently deleted');
  };

  const inputClass =
    'w-full rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3.5 py-2.5 text-sm text-[#192334] placeholder:text-[#687078] outline-none transition focus:border-[#192334] focus:bg-white focus:ring-3 focus:ring-[#192334]/10';

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

      {/* Top Editorial Header + Prominent Create Expo CTA */}
      <div className="rounded-2xl bg-[#192334] px-6 py-5 text-white shadow-[0_12px_28px_rgba(25,35,52,0.12)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="inline-block rounded-full border border-[#e2bd82]/35 bg-[#e2bd82]/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e2bd82]">
            Organizer Control Center
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
            Manage <span className="font-serif italic text-[#e2bd82]">Expos</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            Create, schedule, publish, and monitor capacity across all exhibitions from one place.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateWizard}
          className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-[#e2bd82] px-5 py-3 text-xs sm:text-sm font-bold text-[#192334] shadow-md transition hover:bg-[#edd09f] focus:outline-none focus:ring-3 focus:ring-[#e2bd82]/40"
        >
          <span>+ Create Expo</span>
        </button>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-white/10 bg-[#192334] p-5 text-white shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Total Expos
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">{stats.total}</p>
          <p className="mt-1 text-xs text-slate-300">All managed events</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#192334] p-5 text-white shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Published & Active
          </p>
          <p className="mt-2 text-2xl font-semibold text-[#e2bd82]">{stats.published}</p>
          <p className="mt-1 text-xs text-slate-300">Live & upcoming listings</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#192334] p-5 text-white shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Drafts
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">{stats.draft}</p>
          <p className="mt-1 text-xs text-slate-300">Awaiting review & publish</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#192334] p-5 text-white shadow-xs">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Completed
          </p>
          <p className="mt-2 text-2xl font-semibold text-[#e2bd82]">{stats.completed}</p>
          <p className="mt-1 text-xs text-slate-300">Wrapped exhibitions</p>
        </div>
      </div>

      {/* Search, Filters & View Toggle Bar */}
      <div className="rounded-2xl border border-[#e6e5e0] bg-white p-4 shadow-[0_6px_22px_rgba(25,35,52,0.04)] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex flex-1 flex-col sm:flex-row gap-3 min-w-0">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by expo name or venue..."
            className="flex-1 min-w-0 rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3.5 py-2 text-xs sm:text-sm text-[#192334] placeholder:text-[#687078] outline-none focus:border-[#192334] focus:bg-white"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
            className="rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3.5 py-2 text-xs sm:text-sm font-medium text-[#192334] outline-none focus:border-[#192334]"
          >
            <option value="All">Status: All</option>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Live">Live</option>
            <option value="Completed">Completed</option>
            <option value="Archived">Archived</option>
          </select>

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            aria-label="Filter by year"
            className="rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3.5 py-2 text-xs sm:text-sm font-medium text-[#192334] outline-none focus:border-[#192334]"
          >
            <option value="All">Date: All Years</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>

        {/* Cards vs Table Switcher */}
        <div className="inline-flex self-start lg:self-auto rounded-xl border border-[#e6e5e0] bg-[#fafaf8] p-1">
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              viewMode === 'cards'
                ? 'bg-[#192334] text-[#e2bd82]'
                : 'text-[#525b65] hover:text-[#192334]'
            }`}
          >
            Cards
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              viewMode === 'table'
                ? 'bg-[#192334] text-[#e2bd82]'
                : 'text-[#525b65] hover:text-[#192334]'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filteredExpos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#c9bea9] bg-white py-14 px-6 text-center">
          <p className="text-base font-semibold text-[#192334]">No expos match your filters</p>
          <p className="mt-1 text-xs text-[#687078]">
            Try clearing your search or create a new exhibition to get started.
          </p>
          <button
            type="button"
            onClick={openCreateWizard}
            className="mt-4 rounded-xl bg-[#192334] px-4 py-2 text-xs font-semibold text-[#e2bd82]"
          >
            + Create New Expo
          </button>
        </div>
      ) : viewMode === 'cards' ? (
        /* CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExpos.map((expo) => {
            const fillPercent = Math.min(
              100,
              Math.round((expo.registered / (expo.capacity || 1)) * 100)
            );

            return (
              <div
                key={expo.id}
                className="rounded-2xl border border-[#e6e5e0] bg-white overflow-hidden shadow-[0_8px_24px_rgba(25,35,52,0.04)] flex flex-col justify-between transition hover:border-[#192334]/25"
              >
                <div>
                  {/* Banner + Status Badge */}
                  <div className="relative h-44 w-full bg-[#192334] overflow-hidden">
                    <img
                      src={expo.banner}
                      alt={expo.name}
                      className="h-full w-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#192334]/80 via-transparent to-transparent" />
                    <span
                      className={`absolute top-3.5 right-3.5 rounded-full border px-3 py-1 text-[11px] font-semibold shadow-xs ${
                        statusStyles[expo.status] || statusStyles.Draft
                      }`}
                    >
                      {expo.status}
                    </span>
                    <span className="absolute bottom-3 left-4 rounded-lg bg-[#192334]/85 px-2.5 py-1 text-[11px] font-medium text-[#e2bd82]">
                      {expo.startDate} → {expo.endDate}
                    </span>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 space-y-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#7a5f35]">
                        {expo.category}
                      </p>
                      <h2 className="mt-1 text-lg font-semibold text-[#192334]">{expo.name}</h2>
                      <p className="mt-1 text-xs text-[#525b65]">{expo.venue}</p>
                    </div>

                    {/* Capacity Bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-[#525b65] font-medium">Registered Attendees</span>
                        <span className="font-semibold text-[#192334]">
                          {expo.registered.toLocaleString()} / {expo.capacity.toLocaleString()} ({fillPercent}%)
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[#efefeb] overflow-hidden">
                        <div
                          style={{ width: `${fillPercent}%` }}
                          className="h-full rounded-full bg-[#192334]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Separated Action Footer */}
                <div className="px-5 py-3.5 border-t border-[#efefeb] bg-[#fafaf8] flex flex-wrap items-center justify-between gap-2">
                  {/* Primary Edit / Preview */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditWizard(expo)}
                      className="rounded-lg bg-[#192334] px-3.5 py-1.5 text-xs font-semibold text-[#e2bd82] transition hover:bg-[#24324a]"
                    >
                      Edit Expo
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewExpo(expo)}
                      className="rounded-lg border border-[#e6e5e0] bg-white px-3 py-1.5 text-xs font-semibold text-[#192334] transition hover:border-[#192334]"
                    >
                      Preview
                    </button>
                  </div>

                  {/* Visually Separated Archive / Delete */}
                  <div className="flex items-center gap-2 pl-2 border-l border-[#e6e5e0]">
                    <button
                      type="button"
                      onClick={() => handleArchive(expo.id)}
                      className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#687078] hover:bg-[#efefeb] hover:text-[#192334]"
                    >
                      {expo.status === 'Archived' ? 'Unarchive' : 'Archive'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(expo)}
                      className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="rounded-2xl border border-[#e6e5e0] bg-white shadow-[0_8px_24px_rgba(25,35,52,0.04)] overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[780px]">
            <thead>
              <tr className="border-b border-[#e6e5e0] bg-[#fafaf8] text-[11px] font-bold uppercase tracking-wider text-[#687078]">
                <th className="py-3.5 px-5">Expo & Venue</th>
                <th className="py-3.5 px-4">Dates</th>
                <th className="py-3.5 px-4">Attendance</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#efefeb] text-sm">
              {filteredExpos.map((expo) => (
                <tr key={expo.id} className="hover:bg-[#fafaf8]/80 transition">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={expo.banner}
                        alt=""
                        className="h-11 w-16 rounded-lg object-cover border border-[#e6e5e0] shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-[#192334]">{expo.name}</p>
                        <p className="text-xs text-[#687078]">{expo.venue}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs font-medium text-[#192334] whitespace-nowrap">
                    {expo.startDate} – {expo.endDate}
                  </td>
                  <td className="py-4 px-4 text-xs text-[#192334] whitespace-nowrap">
                    <span className="font-semibold">{expo.registered.toLocaleString()}</span> /{' '}
                    {expo.capacity.toLocaleString()}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                        statusStyles[expo.status] || statusStyles.Draft
                      }`}
                    >
                      {expo.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditWizard(expo)}
                        className="rounded-lg bg-[#192334] px-3 py-1.5 text-xs font-semibold text-[#e2bd82]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewExpo(expo)}
                        className="rounded-lg border border-[#e6e5e0] px-2.5 py-1.5 text-xs font-semibold text-[#192334]"
                      >
                        Preview
                      </button>
                      <span className="h-4 w-px bg-[#e6e5e0] mx-1" />
                      <button
                        type="button"
                        onClick={() => handleArchive(expo.id)}
                        className="text-xs font-medium text-[#687078] hover:text-[#192334]"
                      >
                        {expo.status === 'Archived' ? 'Restore' : 'Archive'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(expo)}
                        className="text-xs font-semibold text-red-600 hover:underline ml-1"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MULTI-STEP CREATE / EDIT EXPO WIZARD MODAL */}
      {wizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#192334]/65 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl border border-[#e6e5e0] bg-white shadow-2xl overflow-hidden my-auto">
            {/* Wizard Header + Progress Indicator */}
            <div className="bg-[#192334] px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e2bd82]">
                    Step {currentStep + 1} of {wizardSteps.length}
                  </span>
                  <h2 className="text-lg font-semibold mt-0.5">
                    {formData.id ? `Edit: ${formData.name}` : 'Create New Expo'}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setWizardOpen(false)}
                  className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-200 hover:bg-white/20"
                >
                  ✕
                </button>
              </div>

              {/* Progress Stepper */}
              <div className="mt-4 grid grid-cols-5 gap-1.5">
                {wizardSteps.map((stepLabel, idx) => {
                  const isDone = idx <= currentStep;
                  return (
                    <button
                      key={stepLabel}
                      type="button"
                      onClick={() => setCurrentStep(idx)}
                      className="text-left group"
                    >
                      <div
                        className={`h-1.5 rounded-full transition-all ${
                          isDone ? 'bg-[#e2bd82]' : 'bg-white/15'
                        }`}
                      />
                      <span
                        className={`mt-1.5 block text-[10px] font-medium truncate ${
                          idx === currentStep ? 'text-[#e2bd82]' : 'text-slate-300'
                        }`}
                      >
                        {idx + 1}. {stepLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step Body */}
            <div className="p-6 space-y-4 min-h-[270px]">
              {currentStep === 0 && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                      Expo Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Future Health & BioTech Expo 2027"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                        Industry Category
                      </label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                        Cover Banner
                      </label>
                      <label className="flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-[#c9bea9] bg-[#fafaf8] px-3.5 py-2.5 text-xs font-semibold text-[#192334] hover:border-[#192334]">
                        {formData.banner ? '✓ Banner Selected (Change)' : 'Upload Banner Image'}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleBannerUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                      Short Description / Tagline
                    </label>
                    <textarea
                      rows={3}
                      placeholder="What makes this exhibition unmissable?"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                        Venue Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Expo Center Hall A–C"
                        value={formData.venue}
                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Karachi"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                      Exhibition Halls & Zones
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Hall A (Main Floor), Hall B (Startup Pavilion)"
                      value={formData.halls}
                      onChange={(e) => setFormData({ ...formData, halls: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                        Total Booth Slots
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={formData.boothCount}
                        onChange={(e) =>
                          setFormData({ ...formData, boothCount: Number(e.target.value) })
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                        Max Attendee Capacity
                      </label>
                      <input
                        type="number"
                        min={10}
                        value={formData.capacity}
                        onChange={(e) =>
                          setFormData({ ...formData, capacity: Number(e.target.value) })
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                      Pass Tiers & Pricing Summary
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. General Pass ($49), VIP Lounge ($199), Exhibitor Booth ($1,200)"
                      value={formData.passTiers}
                      onChange={(e) => setFormData({ ...formData, passTiers: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#192334] mb-1.5">
                      Initial Lifecycle Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className={inputClass}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Live">Live</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </>
              )}

              {currentStep === 4 && (
                <div className="rounded-2xl border border-[#e6e5e0] bg-[#fafaf8] p-5 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-[#e6e5e0] pb-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#7a5f35]">
                        Ready to Publish
                      </p>
                      <h3 className="text-base font-semibold text-[#192334] mt-0.5">
                        {formData.name || 'Untitled Expo'}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPreviewExpo(formData)}
                      className="rounded-lg border border-[#192334] px-3 py-1.5 text-xs font-semibold text-[#192334] hover:bg-[#192334] hover:text-[#e2bd82] transition"
                    >
                      Preview Public Card
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[#525b65]">
                    <p>
                      <strong className="text-[#192334]">Dates:</strong>{' '}
                      {formData.startDate || 'TBD'} → {formData.endDate || 'TBD'}
                    </p>
                    <p>
                      <strong className="text-[#192334]">Venue:</strong>{' '}
                      {formData.venue || 'TBD'}
                    </p>
                    <p>
                      <strong className="text-[#192334]">Halls & Booths:</strong>{' '}
                      {formData.boothCount} booths • {formData.halls || 'Standard Floor'}
                    </p>
                    <p>
                      <strong className="text-[#192334]">Capacity:</strong>{' '}
                      {formData.capacity.toLocaleString()} attendees
                    </p>
                  </div>
                  <p className="text-[#525b65] pt-1">
                    <strong className="text-[#192334]">Passes:</strong> {formData.passTiers}
                  </p>
                </div>
              )}
            </div>

            {/* Wizard Footer Controls */}
            <div className="px-6 py-4 border-t border-[#e6e5e0] bg-[#fafaf8] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => s - 1)}
                    className="rounded-xl border border-[#e6e5e0] bg-white px-4 py-2 text-xs font-semibold text-[#192334]"
                  >
                    ← Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => saveExpo('Draft')}
                  className="rounded-xl border border-[#dfd5c3] bg-[#f3f0e9] px-4 py-2 text-xs font-semibold text-[#7a5f35] hover:bg-[#e2bd82]/30"
                >
                  Save Draft
                </button>
              </div>

              {currentStep < wizardSteps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s + 1)}
                  className="rounded-xl bg-[#192334] px-5 py-2.5 text-xs font-semibold text-[#e2bd82] hover:bg-[#24324a]"
                >
                  Next: {wizardSteps[currentStep + 1]} →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    saveExpo(
                      formData.status === 'Draft' ? 'Published' : formData.status
                    )
                  }
                  className="rounded-xl bg-[#192334] px-5 py-2.5 text-xs font-semibold text-[#e2bd82] hover:bg-[#24324a]"
                >
                  Publish Expo
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PUBLIC LISTING PREVIEW MODAL */}
      {previewExpo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#192334]/65 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#e2bd82]/50 bg-[#192334] text-white overflow-hidden shadow-2xl">
            <div className="relative h-44 bg-slate-900">
              <img
                src={
                  previewExpo.banner ||
                  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80'
                }
                alt=""
                className="h-full w-full object-cover opacity-85"
              />
              <span className="absolute top-3 left-3 rounded-full bg-[#192334]/90 border border-[#e2bd82]/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#e2bd82]">
                Public Attendee Preview
              </span>
            </div>
            <div className="p-6 space-y-3">
              <p className="text-xs font-semibold text-[#e2bd82]">
                {previewExpo.startDate || 'Date TBD'} • {previewExpo.venue || 'Venue TBD'}
              </p>
              <h3 className="text-xl font-semibold">{previewExpo.name || 'Untitled Expo'}</h3>
              <p className="text-xs leading-relaxed text-slate-300">
                {previewExpo.tagline || 'Exhibition details will appear here for attendees.'}
              </p>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span>Capacity: {previewExpo.capacity?.toLocaleString()}</span>
                <button
                  type="button"
                  onClick={() => setPreviewExpo(null)}
                  className="rounded-xl bg-[#e2bd82] px-4 py-2 text-xs font-bold text-[#192334]"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#192334]/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm rounded-2xl border border-[#e6e5e0] bg-white p-6 shadow-xl">
            <h3 className="text-base font-semibold text-[#192334]">
              Delete "{deleteTarget.name}"?
            </h3>
            <p className="mt-2 text-xs leading-5 text-[#525b65]">
              This will permanently remove the exhibition and its pass configurations. If you want to keep records, use <strong>Archive</strong> instead.
            </p>
            <div className="mt-5 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-xl border border-[#e6e5e0] px-4 py-2 text-xs font-semibold text-[#192334]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageExpos;