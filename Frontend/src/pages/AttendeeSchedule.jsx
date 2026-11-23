import React from 'react';
import ScrollReveal from '../components/ScrollReveal';

const AttendeeSchedule = () => {
  return (
    <div className="space-y-6">
      <ScrollReveal>
        <section className="rounded-2xl bg-[#192334] px-6 py-6 text-white shadow-[0_12px_28px_rgba(25,35,52,0.12)] sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e2bd82]">
            My Visit
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Attendee <span className="font-serif italic text-[#e2bd82]">Schedule</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            View your personalized event sessions, timings, and halls in one place.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="rounded-2xl border border-[#e6e5e0] bg-white p-6 shadow-[0_6px_22px_rgba(25,35,52,0.04)] sm:p-8">
          <div className="rounded-xl border border-dashed border-[#c9bea9] bg-[#fafaf8] px-5 py-10 text-center">
            <p className="text-base font-semibold text-[#192334]">Schedule page is ready for your content</p>
            <p className="mt-1 text-xs text-[#687078]">
              Aap yahan apna attendee schedule UI build kar sakti hain (sessions list, filters, reminders, etc.).
            </p>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

export default AttendeeSchedule;
