import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navSections = [
  {
    label: 'Workspace',
    items: [
      {
        to: '/exhibitor',
        label: 'Overview',
        end: true,
        icon: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
      },
      {
        to: '/exhibitor/profile',
        label: 'Company & Products',
        icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21a8 8 0 0 1 16 0',
      },
    ],
  },
  {
    label: 'Booth Ops',
    items: [
      {
        to: '/exhibitor/booths',
        label: 'Booth & Floor Map',
        icon: 'M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z M9 3v15 M15 6v15',
      },
      {
        to: '/exhibitor/messages',
        label: 'Organizer Messages',
        icon: 'M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z',
      },
    ],
  },
];

const ExhibitorLayout = () => {
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

  return (
    <div className="flex min-h-screen bg-[#f7f7f5] text-[#192334] font-sans lg:h-screen lg:overflow-hidden">
      
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close exhibitor sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-[#192334]/50 backdrop-blur-xs lg:hidden"
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
              Exhibitor
            </span>
          </div>

          <nav className="flex min-h-0 flex-1 flex-col justify-start space-y-6 overflow-y-auto p-4" aria-label="Exhibitor Navigation">
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
                      <svg className="mr-3 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
          <div className="rounded-xl bg-white/5 p-3.5 border border-white/10">
            <p className="text-[11px] uppercase tracking-wider text-[#e2bd82] font-semibold">Assigned Booth</p>
            <p className="mt-1 text-sm font-semibold text-white">Booth A12 • Tech Zone</p>
            <p className="text-xs text-slate-400">Approved & Active</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-red-500/20 hover:border-red-400/40 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div ref={contentRef} className="flex min-w-0 flex-1 flex-col lg:h-screen lg:overflow-y-auto">
        <header className="sticky top-0 z-20 h-20 bg-[#f7f7f5]/90 backdrop-blur-md border-b border-[#e6e5e0] px-4 sm:px-8 flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e6e5e0] bg-white text-[#192334] lg:hidden"
            >
              ☰
            </button>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9a8058]">Exhibitor Portal</p>
              <h1 className="truncate text-base font-semibold text-[#192334] sm:text-lg">
                Welcome back, {user?.name || 'TechNova Solutions'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#e6e5e0] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#42664d]">
              <span className="h-2 w-2 rounded-full bg-[#42664d]" />
              Live on Floor Plan
            </span>
            <div className="h-10 w-10 rounded-full bg-[#192334] text-[#e2bd82] font-bold text-sm flex items-center justify-center">
              {(user?.name || 'T').charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ExhibitorLayout;