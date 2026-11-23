import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Role ke hisaab se dashboard link decide karein
  const dashboardPath =
    user?.role === 'admin'
      ? '/admin'
      : user?.role === 'exhibitor'
      ? '/exhibitor'
      : user?.role === 'attendee'
      ? '/attendee'
      : '/';

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-[#e6e5e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" aria-label="EventSphere home" className="flex items-center">
            <img
              src="/Logo-transparent.png"
              alt="EventSphere"
              className="h-11 w-40 object-cover drop-shadow-[0_2px_5px_rgba(147,112,219,0.55)]"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-[#5145CD] font-semibold' : 'text-[#475569] hover:text-[#192334]'}`}>
              Home
            </NavLink>
            <NavLink to="/expos" className={({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-[#5145CD] font-semibold' : 'text-[#475569] hover:text-[#192334]'}`}>
              Expos
            </NavLink>
            <NavLink to="/exhibitors" className={({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-[#5145CD] font-semibold' : 'text-[#475569] hover:text-[#192334]'}`}>
              Exhibitors
            </NavLink>

            {/* Auth Buttons (Conditional) */}
            <div className="flex items-center space-x-3 border-l border-[#e6e5e0] pl-6">
              {isAuthenticated ? (
                <>
                  <Link
                    to={dashboardPath}
                    className="rounded-full bg-[#192334] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#2b3d55]"
                  >
                    {user.role === 'attendee' ? 'My Passes' : 'Dashboard →'}
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full border border-[#e6e5e0] px-4 py-2.5 text-xs font-semibold text-[#475569] transition hover:border-red-300 hover:text-red-600"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-[#475569] hover:text-[#192334] transition">
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-full bg-[#192334] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#2b3d55]"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-[#192334] md:hidden"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

    </nav>
    {/* Keep fixed mobile controls outside the filtered navbar so they use the viewport as their containing block. */}
    {isOpen && (
      <>
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[60] bg-[#192334]/50 md:hidden"
        />
        <aside
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-[70] flex w-full flex-col overflow-y-auto bg-white p-5 shadow-2xl md:hidden"
        >
          <div className="mb-6 flex items-center justify-between border-b border-[#e6e5e0] pb-4">
            <img src="/Logo-transparent.png" alt="EventSphere" className="h-10 w-36 object-cover" />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#e6e5e0] text-xl text-[#192334]"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col" aria-label="Mobile navigation links">
            <Link to="/" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-[#192334] hover:bg-[#f7f7f5]">Home</Link>
            <Link to="/expos" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-[#192334] hover:bg-[#f7f7f5]">Expos</Link>
            <Link to="/exhibitors" onClick={() => setIsOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-[#192334] hover:bg-[#f7f7f5]">Exhibitors</Link>
          </nav>

          <div className="mt-4 flex flex-col gap-2 border-t border-[#e6e5e0] pt-4">
            {isAuthenticated ? (
              <>
                <Link
                  to={dashboardPath}
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-11 items-center justify-center rounded-xl bg-[#192334] px-4 text-sm font-semibold text-white"
                >
                  {user.role === 'attendee' ? 'My Passes' : 'Go to Dashboard'}
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="min-h-11 w-full rounded-xl border border-[#e6e5e0] px-4 text-sm font-semibold text-red-600"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="flex min-h-11 items-center justify-center rounded-xl border border-[#e6e5e0] px-4 text-sm font-semibold text-[#192334]">Sign in</Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="flex min-h-11 items-center justify-center rounded-xl bg-[#192334] px-4 text-sm font-semibold text-white">Get started</Link>
              </>
            )}
          </div>
        </aside>
      </>
    )}
    </>
  );
};

export default Navbar;