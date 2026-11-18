import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      aria-label="Main navigation"
      className="fixed left-4 right-4 top-4 z-50 mx-auto max-w-7xl rounded-2xl border border-white/70 bg-white/85 shadow-lg shadow-slate-900/5 backdrop-blur-xl"
    >
      <div className="flex h-16 items-center justify-between px-5 sm:px-7">
        <Link
          to="/"
          onClick={closeMenu}
          className="text-xl font-semibold tracking-tight text-slate-950"
        >
          Event<span className="text-violet-700">Sphere</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
            Home
          </Link>
          <Link to="/expos" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
            Expos
          </Link>
          <Link to="/exhibitors" className="text-sm font-medium text-slate-600 transition hover:text-slate-950">
            Exhibitors
          </Link>
          <Link to="/login" className="text-sm font-medium text-slate-700 transition hover:text-violet-700">
            Sign in
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            Get started
          </Link>
        </div>

        <button
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-800 md:hidden"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div id="mobile-navigation" className="border-t border-slate-200/80 px-5 py-3 md:hidden">
          <div className="flex flex-col">
            <Link to="/" onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Home
            </Link>
            <Link to="/expos" onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Expos
            </Link>
            <Link to="/exhibitors" onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Exhibitors
            </Link>
            <div className="mt-2 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
              <Link to="/login" onClick={closeMenu} className="rounded-full border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-800">
                Sign in
              </Link>
              <Link to="/register" onClick={closeMenu} className="rounded-full bg-slate-950 px-4 py-2.5 text-center text-sm font-semibold text-white">
                Get started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
