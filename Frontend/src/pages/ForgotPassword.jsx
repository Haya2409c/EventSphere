import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ForgotPassword = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailError =
    touched && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? 'Please enter a valid email address.'
      : '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md rounded-2xl border border-[#e6e5e0] bg-white p-8 shadow-[0_12px_36px_rgba(25,35,52,0.05)]">
        {submitted ? (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#edf3ed] text-lg text-[#42664d]">
              ✓
            </div>
            <h1 className="text-2xl font-semibold text-[#192334]">Check your inbox</h1>
            <p className="mt-2 text-sm text-[#687078]">
              If an account exists for <span className="font-semibold text-[#192334]">{email}</span>, we’ve sent a password reset link.
            </p>
            <Link
              to="/login"
              state={{ email }}
              className="mt-6 block w-full rounded-xl bg-[#192334] py-3 text-sm font-semibold text-white transition hover:bg-[#2b3d55]"
            >
              Back to Sign in
            </Link>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a8058]">Account Recovery</p>
            <h1 className="mt-1 text-2xl font-semibold text-[#192334]">Reset your password</h1>
            <p className="mt-2 text-sm text-[#687078]">
              Enter your email address and we’ll send you instructions to reset your password.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              <div>
                <label htmlFor="reset-email" className="block text-xs font-semibold text-[#192334] mb-1.5">
                  Email address
                </label>
                <input
                  id="reset-email"
                  type="email"
                  autoFocus
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-4 py-3 text-base text-[#192334] outline-none transition focus:border-[#5145CD] focus:ring-2 focus:ring-[#5145CD]/20"
                />
                {emailError && <p className="mt-1.5 text-xs text-red-600">{emailError}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#192334] py-3 text-sm font-semibold text-white transition hover:bg-[#2b3d55] disabled:opacity-70"
              >
                {loading ? 'Sending link...' : 'Send reset link →'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" state={{ email }} className="inline-flex min-h-11 items-center text-xs font-semibold text-[#687078] hover:text-[#192334]">
                ← Back to Sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;