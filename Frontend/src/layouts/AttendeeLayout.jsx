import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navSections = [
  {
    label: 'My Visit',
    items: [
      {
        to: '/attendee',
        label: 'Attendee Passes',
        end: true,
        icon: 'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V7z M13 5v14',
      },
      {
        to: '/attendee/schedule',
        label: 'Attendee Schedule',
        icon: 'M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
      },
    ],
  },
];

const AttendeeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const contentRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollContentToTop = useCallback(() => {
    contentRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    scrollContentToTop();
  }, [location.pathname, scrollContentToTop]);

  const handleNavigationClick = () => {
    setSidebarOpen(false);
    scrollContentToTop();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const displayName = user?.name || 'Attendee';

  return (
    <div className="flex min-h-screen bg-[#f7f7f5] font-sans text-[#192334] lg:h-screen lg:overflow-hidden">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close attendee sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-[#192334]/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col justify-between bg-[#192334] text-white transition-transform duration-300 lg:inset-y-auto lg:left-auto lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:sticky lg:top-0 lg:h-screen lg:shrink-0 lg:self-start`}
      >
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-6">
            <img
              src="/footer-logo-transparent.png"
              alt="EventSphere"
              className="h-10 w-32 object-contain drop-shadow-[0_2px_5px_rgba(147,112,219,0.55)]"
            />
            <span className="rounded-full border border-[#e2bd82]/40 bg-[#e2bd82]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#e2bd82]">
              Attendee
            </span>
          </div>

          <nav
            className="flex min-h-0 flex-1 flex-col justify-start space-y-6 overflow-y-auto p-4"
            aria-label="Attendee Navigation"
          >
            {navSections.map((section) => (
              <section key={section.label} aria-label={section.label}>
                <h2 className="mb-2 px-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {section.label}
                </h2>
                <div className="space-y-1.5">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={handleNavigationClick}
                      className={({ isActive }) =>
                        `flex items-center rounded-xl border px-4 py-3 text-sm font-medium transition ${
                          isActive
                            ? 'border-white/10 bg-white/10 text-[#e2bd82]'
                            : 'border-transparent text-slate-300 hover:bg-white/5 hover:text-white'
                        }`
                      }
                    >
                      <svg
                        className="mr-3 h-4 w-4 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d={item.icon} />
                      </svg>
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              </section>
            ))}
          </nav>
        </div>

        <div className="shrink-0 space-y-3 border-t border-white/10 p-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#e2bd82]">Pass Status</p>
            <p className="mt-1 text-sm font-semibold text-white">Passes ready</p>
            <p className="text-xs text-slate-400">View your QR &amp; event details</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-red-400/40 hover:bg-red-500/20 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div ref={contentRef} className="flex min-w-0 flex-1 flex-col lg:h-screen lg:overflow-y-auto">
        <header className="sticky top-0 z-20 border-b border-[#e6e5e0]/80 bg-[#f7f7f5]/85 px-4 py-3 backdrop-blur-md sm:px-8">
          <div className="flex min-h-[3.5rem] items-center justify-between gap-3 sm:gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e6e5e0] bg-white text-[#192334] shadow-sm transition hover:border-[#d8d4cc] hover:bg-[#fafaf8] lg:hidden"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="inline-flex items-center rounded-full border border-[#e2bd82]/35 bg-[#f3f0e9] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7a5f35]">
                    Attendee Portal
                  </span>
                  <span className="hidden items-center gap-1.5 text-[11px] font-medium text-[#687078] sm:inline-flex">
                    <span className="h-1 w-1 rounded-full bg-[#c9bea9]" aria-hidden="true" />
                    Passes &amp; schedule
                  </span>
                </div>
                <div className="mt-1 flex min-w-0 items-baseline gap-2">
                  <h1 className="truncate text-lg font-semibold tracking-tight text-[#192334] sm:text-xl">
                    <span className="mr-1.5 text-sm font-medium text-[#687078] sm:text-base">Welcome back,</span>
                    {displayName}
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <span className="hidden items-center gap-2 rounded-full border border-[#dfe9e2] bg-white px-3 py-1.5 text-xs font-semibold text-[#42664d] shadow-sm md:inline-flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#42664d]/40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#42664d]" />
                </span>
                Passes ready
              </span>

              <div className="hidden h-8 w-px bg-[#e6e5e0] sm:block" aria-hidden="true" />

              <div className="flex items-center gap-2 rounded-2xl border border-[#e6e5e0] bg-white/90 py-1 pl-1 pr-2.5 shadow-sm sm:pr-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#192334] text-sm font-bold text-[#e2bd82] ring-1 ring-[#e2bd82]/20">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div className="hidden min-w-0 sm:block">
                  <p className="max-w-[10rem] truncate text-xs font-semibold text-[#192334]">{displayName}</p>
                  <p className="text-[11px] font-medium text-[#687078]">Attendee account</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AttendeeLayout;
