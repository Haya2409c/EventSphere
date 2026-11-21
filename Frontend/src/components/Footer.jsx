import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Footer = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const dashboardPath =
    user?.role === 'admin'
      ? '/admin'
      : user?.role === 'exhibitor'
      ? '/exhibitor'
      : '/expos';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <footer className="bg-[#171B36] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          <div className="md:col-span-2">
            <img
              src="/footer-logo-transparent.png"
              alt="EventSphere"
              className="h-12 w-48 object-contain drop-shadow-[0_2px_5px_rgba(147,112,219,0.55)]"
            />
            <p className="text-[#94A3B8] mt-3 max-w-md text-sm leading-relaxed">
              The next-generation expo and event management platform connecting organizers, exhibitors, and global attendees in one seamless space.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li><Link to="/" className="hover:text-[#F5A623] transition-colors">Home</Link></li>
              <li><Link to="/expos" className="hover:text-[#F5A623] transition-colors">Upcoming Expos</Link></li>
              <li><Link to="/exhibitors" className="hover:text-[#F5A623] transition-colors">Exhibitors</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Portals</h3>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to={dashboardPath} className="hover:text-[#F5A623] transition-colors">
                      Go to Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-left hover:text-[#F5A623] transition-colors"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li><Link to="/login" className="hover:text-[#F5A623] transition-colors">Sign In</Link></li>
                  <li><Link to="/register" className="hover:text-[#F5A623] transition-colors">Register as Exhibitor</Link></li>
                </>
              )}
            </ul>
          </div>

        </div>

        <div className="pt-8 text-center text-xs text-[#64748B]">
          © {new Date().getFullYear()} EventSphere Management. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;