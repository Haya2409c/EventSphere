import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen flex bg-background font-sans">
      
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close admin sidebar"
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Sidebar - Dark theme for premium contrast */}
      <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 w-64 bg-navbar text-white flex flex-col shadow-xl transition-transform duration-300 md:static md:translate-x-0 md:flex md:w-64`}>
        <div className="h-20 flex items-center justify-center border-b border-white/10">
          <h1 className="text-2xl font-bold text-surface">Event<span className="text-accent">Sphere</span></h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link to="/admin" onClick={closeSidebar} className="flex items-center px-4 py-3 bg-primary/20 text-accent rounded-lg border border-primary/30 font-medium transition-all">
            Dashboard
          </Link>
          <Link to="/admin/expos" onClick={closeSidebar} className="flex items-center px-4 py-3 text-surface hover:bg-white/5 rounded-lg font-medium transition-all">
            Manage Expos
          </Link>
          <Link to="/admin/exhibitors" onClick={closeSidebar} className="flex items-center px-4 py-3 text-surface hover:bg-white/5 rounded-lg font-medium transition-all">
            Exhibitor Approvals
          </Link>
          <Link to="/admin/schedule" onClick={closeSidebar} className="flex items-center px-4 py-3 text-surface hover:bg-white/5 rounded-lg font-medium transition-all">
            Event Schedule
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link to="/login" onClick={closeSidebar} className="flex items-center justify-center w-full px-4 py-2 bg-white/10 hover:bg-danger text-white rounded-lg transition-colors font-medium">
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-surface border-b border-border flex items-center justify-between px-4 md:px-8 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open admin sidebar"
              aria-expanded={isSidebarOpen}
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-textMain p-2 rounded-lg border border-border"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-xl font-bold text-textMain">Admin Portal</h2>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-textSecondary font-medium">Welcome, Admin</span>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-md">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Content (Yahan page change hoga) */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;