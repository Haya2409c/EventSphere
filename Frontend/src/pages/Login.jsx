import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  // Agar Register page se wapas aaye toh typed email preserve rahegi
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);

  const [validationField, setValidationField] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailError =
    validationField === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? 'Please enter a valid email address.'
      : '';

  const passwordError =
    validationField === 'password' && password.length === 0
      ? 'Please enter your password.'
      : '';

  const handleKeyEvent = (e) => {
    setCapsLockOn(e.getModifierState && e.getModifierState('CapsLock'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationField('email');
      return;
    }

    if (!password) {
      setValidationField('password');
      return;
    }

    setValidationField('');

    try {
      setLoading(true);
      const loggedInUser = await login(email, password);

      // Role ke hisaab se redirect
      if (loggedInUser.role === 'admin') navigate('/admin');
      else if (loggedInUser.role === 'exhibitor') navigate('/exhibitor');
      else if (loggedInUser.role === 'attendee') navigate('/attendee');
      else navigate('/');
    } catch (err) {
      setApiError(err.response?.data?.message || err.message || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-20 grid grid-cols-1 lg:grid-cols-2">
      
      {/* Left Side: Editorial Brand Panel */}
      <div className="hidden lg:flex flex-col justify-between bg-[#192334] p-14 text-white relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute right-10 bottom-16 h-64 w-64 rounded-full bg-[#d5a35b]/20 blur-3xl" />

        <div className="relative z-10">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#e2bd82]">
            <span className="h-px w-8 bg-[#e2bd82]" />
            EventSphere Access
          </p>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.1] tracking-tight">
            Step back into the <span className="font-serif font-normal italic text-[#e2bd82]">grand hall.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-300">
            Manage your expo passes, explore live floor plans, and connect with exhibitors in real time.
          </p>
        </div>

        <div className="relative z-10 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#e2bd82]">Quick Test Tip</p>
          <p className="mt-2 text-xs text-slate-300 leading-5">
            Use <span className="text-white font-medium">admin@eventsphere.com</span> for Admin Portal, or any email for Attendee access (min 6 chars password).
          </p>
        </div>
      </div>

      {/* Right Side: Clean Single-Column Form */}
      <div className="flex min-w-0 items-start justify-center px-4 py-6 sm:items-center sm:px-8 sm:py-12">
        <div className="w-full max-w-md rounded-2xl border border-[#e6e5e0] bg-white p-5 shadow-[0_12px_36px_rgba(25,35,52,0.05)] sm:p-8">
          <div className="mb-6 sm:mb-7">
            <h2 className="text-2xl font-semibold tracking-tight text-[#192334]">Sign in to your account</h2>
            <p className="mt-1.5 text-sm text-[#687078]">
              New to EventSphere?{' '}
              <Link
                to="/register"
                state={{ email }}
                className="font-semibold text-[#5145CD] hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>

          {apiError && (
            <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-xs font-semibold text-[#192334] mb-1.5">
                Email address
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoFocus
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className={`min-h-11 w-full rounded-xl border bg-[#fafaf8] px-4 py-3 text-base text-[#192334] outline-none transition focus:ring-2 ${
                  emailError
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                    : 'border-[#e6e5e0] focus:border-[#5145CD] focus:ring-[#5145CD]/20'
                }`}
              />
              {emailError && <p className="mt-1.5 text-xs text-red-600">{emailError}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="mb-1.5 block text-xs font-semibold text-[#192334]">
                  Password
              </label>

              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={handleKeyEvent}
                  onKeyDown={handleKeyEvent}
                  placeholder="Enter your password"
                  className={`min-h-11 w-full rounded-xl border bg-[#fafaf8] py-3 pl-4 pr-14 text-base text-[#192334] outline-none transition focus:ring-2 ${
                    passwordError
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                      : 'border-[#e6e5e0] focus:border-[#5145CD] focus:ring-[#5145CD]/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg text-xs font-semibold text-[#687078] hover:text-[#192334]"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              <div className="mt-1.5 text-right">
                <Link
                  to="/forgot-password"
                  state={{ email }}
                  className="text-xs font-semibold text-[#9a8058] transition hover:text-[#192334]"
                >
                  Forgot password?
                </Link>
              </div>

              {capsLockOn && (
                <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-md bg-[#f3f0e9] px-2.5 py-1 text-[11px] font-semibold text-[#80643a]">
                  ⚠ Caps Lock is on
                </p>
              )}
              {passwordError && <p className="mt-1.5 text-xs text-red-600">{passwordError}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#192334] py-3 text-sm font-semibold text-white transition hover:bg-[#2b3d55] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;