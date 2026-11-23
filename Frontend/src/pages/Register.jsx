import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { register } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('attendee');

  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [validationField, setValidationField] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  // Live Password Rules
  const rules = {
    length: password.length >= 8,
    number: /\d/.test(password),
    uppercase: /[A-Z]/.test(password),
  };
  const isPasswordValid = rules.length && rules.number && rules.uppercase;

  const nameError =
    validationField === 'fullName' && fullName.trim().length < 2
      ? 'Please enter your full name.'
      : '';
  const emailError =
    validationField === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? 'Please enter a valid email address.'
      : '';
  const passwordError =
    validationField === 'password' && !isPasswordValid
      ? 'Password must be at least 8 characters and include an uppercase letter and a number.'
      : '';

  const handleKeyEvent = (e) => {
    setCapsLockOn(e.getModifierState && e.getModifierState('CapsLock'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (fullName.trim().length < 2) {
      setValidationField('fullName');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationField('email');
      return;
    }

    if (!isPasswordValid) {
      setValidationField('password');
      return;
    }

    setValidationField('');

    try {
      setLoading(true);
      await register({ name: fullName, email, password, role });
      navigate(role === 'exhibitor' ? '/exhibitor' : role === 'attendee' ? '/attendee' : '/');
    } catch (err) {
      setApiError(err.response?.data?.message || err.message || 'Unable to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] pt-20 grid grid-cols-1 lg:grid-cols-2">
      
      {/* Left Brand Panel */}
      <div className="hidden lg:flex flex-col justify-between bg-[#192334] p-14 text-white relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute right-10 bottom-16 h-64 w-64 rounded-full bg-[#d5a35b]/20 blur-3xl" />

        <div className="relative z-10">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#e2bd82]">
            <span className="h-px w-8 bg-[#e2bd82]" />
            Join EventSphere
          </p>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.1] tracking-tight">
            Where global expos <span className="font-serif font-normal italic text-[#e2bd82]">come alive.</span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-300">
            Create your free account to reserve passes, bookmark sessions, or showcase your brand on the show floor.
          </p>
        </div>

        <p className="relative z-10 text-xs text-slate-400">
          Role-based dashboards • Real-time booth availability • Instant pass confirmation
        </p>
      </div>

      {/* Right Form Panel */}
      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md rounded-2xl border border-[#e6e5e0] bg-white p-8 shadow-[0_12px_36px_rgba(25,35,52,0.05)]">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight text-[#192334]">Create your account</h2>
            <p className="mt-1.5 text-sm text-[#687078]">
              Already have an account?{' '}
              <Link
                to="/login"
                state={{ email }}
                className="font-semibold text-[#5145CD] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

          {apiError && (
            <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Role Selector Pills */}
            <div>
              <span className="block text-xs font-semibold text-[#192334] mb-1.5">I am joining as</span>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'attendee', label: 'Visitor / Attendee' },
                  { value: 'exhibitor', label: 'Exhibitor (Booth)' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={role === option.value}
                    onClick={() => setRole(option.value)}
                    className={`min-h-11 rounded-xl border px-2 py-2.5 text-xs font-semibold transition ${
                      role === option.value
                        ? 'border-[#5145CD] bg-[#5145CD]/10 text-[#5145CD]'
                        : 'border-[#e6e5e0] bg-[#fafaf8] text-[#687078] hover:border-[#192334]'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="reg-name" className="block text-xs font-semibold text-[#192334] mb-1.5">
                Full name
              </label>
              <input
                id="reg-name"
                type="text"
                autoFocus
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your Name"
                aria-invalid={Boolean(nameError)}
                className={`w-full rounded-xl border bg-[#fafaf8] px-4 py-3 text-base text-[#192334] outline-none transition focus:ring-2 ${
                  nameError
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                    : 'border-[#e6e5e0] focus:border-[#5145CD] focus:ring-[#5145CD]/20'
                }`}
              />
              {nameError && <p role="alert" className="mt-1 text-xs text-red-600">{nameError}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="reg-email" className="block text-xs font-semibold text-[#192334] mb-1.5">
                Email address
              </label>
              <input
                id="reg-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-invalid={Boolean(emailError)}
                className={`w-full rounded-xl border bg-[#fafaf8] px-4 py-3 text-base text-[#192334] outline-none transition focus:ring-2 ${
                  emailError
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                    : 'border-[#e6e5e0] focus:border-[#5145CD] focus:ring-[#5145CD]/20'
                }`}
              />
              {emailError && <p role="alert" className="mt-1 text-xs text-red-600">{emailError}</p>}
            </div>

            {/* Password (No Confirm Field — Eye Toggle + Live Checklist) */}
            <div>
              <label htmlFor="reg-password" className="block text-xs font-semibold text-[#192334] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={handleKeyEvent}
                  onKeyDown={handleKeyEvent}
                  placeholder="Create a strong password"
                  aria-invalid={Boolean(passwordError)}
                  className={`w-full rounded-xl border bg-[#fafaf8] py-3 pl-4 pr-14 text-base text-[#192334] outline-none transition focus:ring-2 ${
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

              {capsLockOn && (
                <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-md bg-[#f3f0e9] px-2.5 py-1 text-[11px] font-semibold text-[#80643a]">
                  ⚠ Caps Lock is on
                </p>
              )}
              {passwordError && <p role="alert" className="mt-1.5 text-xs text-red-600">{passwordError}</p>}
                
              {/* Live Password Checklist */}
              <ul className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
                <li className={`font-medium ${rules.length ? 'text-[#42664d]' : 'text-[#969a9e]'}`}>
                  {rules.length ? '✓' : '○'} 8+ chars
                </li>
                <li className={`font-medium ${rules.uppercase ? 'text-[#42664d]' : 'text-[#969a9e]'}`}>
                  {rules.uppercase ? '✓' : '○'} 1 uppercase
                </li>
                <li className={`font-medium ${rules.number ? 'text-[#42664d]' : 'text-[#969a9e]'}`}>
                  {rules.number ? '✓' : '○'} 1 number
                </li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#192334] py-3 text-sm font-semibold text-white transition hover:bg-[#2b3d55] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              )}
              {loading ? 'Creating account...' : 'Create account →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;