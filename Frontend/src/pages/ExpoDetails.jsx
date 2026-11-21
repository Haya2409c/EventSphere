import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import ScrollReveal from '../components/ScrollReveal';

const expoCatalog = {
  1: {
    title: 'Global Tech Summit 2026',
    category: 'Technology',
    date: 'Dec 12–14, 2026',
    venue: 'Expo Center, Hall A',
    boothsLeft: 8,
    attendees: '2,400+',
    summary:
      'Three days of keynotes, live product showcases, and curated networking with cloud architects, AI founders, and enterprise leaders.',
  },
  2: {
    title: 'Retail & E-Commerce Expo',
    category: 'Retail',
    date: 'Jan 05–07, 2027',
    venue: 'Grand Venue, Hall 3',
    boothsLeft: 14,
    attendees: '1,850+',
    summary:
      'Explore omnichannel commerce, modern supply chains, and direct-to-consumer brand experiences under one roof.',
  },
  3: {
    title: 'Creative Arts & Design Fair',
    category: 'Design',
    date: 'Jan 20–22, 2027',
    venue: 'Art Space, Level 2',
    boothsLeft: 5,
    attendees: '1,200+',
    summary:
      'An editorial showcase of spatial design, brand systems, digital craft, and interactive installations.',
  },
  4: {
    title: 'AI & Robotics Showcase',
    category: 'Technology',
    date: 'Feb 10–12, 2027',
    venue: 'Tech Arena, Hall B',
    boothsLeft: 3,
    attendees: '1,600+',
    summary:
      'Discover practical AI, robotics, and automation through live demos, expert sessions, and hands-on showcases.',
  },
  5: {
    title: 'Food & Hospitality Expo',
    category: 'Hospitality',
    date: 'Feb 24–26, 2027',
    venue: 'Convention Hall 1',
    boothsLeft: 11,
    attendees: '2,100+',
    summary:
      'Meet the makers and hospitality teams shaping food experiences, catering, and service innovation.',
  },
};

const speakers = [
  { id: 1, initials: 'AK', name: 'Dr. Amina Khalid', role: 'VP of AI Systems, TechNova', topic: 'Autonomous Workflows at Scale' },
  { id: 2, initials: 'MR', name: 'Marcus Reid', role: 'Design Director, PixelCraft', topic: 'Spatial Interfaces for Live Events' },
  { id: 3, initials: 'ZS', name: 'Zainab Siddiqui', role: 'Founder, FinEdge Systems', topic: 'Frictionless Commerce in 2027' },
];

const scheduleByDay = {
  'Day 1': [
    { id: 's1', time: '09:30 AM', room: 'Main Auditorium', title: 'Opening Keynote: The Next Decade of Live Expos', speaker: 'Dr. Amina Khalid', tag: 'Keynote' },
    { id: 's2', time: '11:30 AM', room: 'Hall A — Stage 2', title: 'Designing Interactive Show Floors That Convert', speaker: 'Marcus Reid', tag: 'Workshop' },
    { id: 's3', time: '02:15 PM', room: 'Startup Lounge', title: 'Founder Pitch & Investor Q&A', speaker: 'Zainab Siddiqui', tag: 'Panel' },
  ],
  'Day 2': [
    { id: 's4', time: '10:00 AM', room: 'Main Auditorium', title: 'Enterprise Security & Real-Time Event Analytics', speaker: 'Dr. Amina Khalid', tag: 'Keynote' },
    { id: 's5', time: '01:00 PM', room: 'Hall A — Booth B2', title: 'Live Demo: Next-Gen Exhibitor Toolkits', speaker: 'Marcus Reid', tag: 'Showcase' },
  ],
  'Day 3': [
    { id: 's6', time: '10:30 AM', room: 'Main Auditorium', title: 'Closing Fireside Chat & Expo Awards', speaker: 'All Speakers', tag: 'Awards' },
  ],
};

const ExpoDetails = () => {
  const { id } = useParams();
  const expo = expoCatalog[id] || expoCatalog[1];

  const [activeDay, setActiveDay] = useState('Day 1');
  const [bookedSessions, setBookedSessions] = useState([]);
  const [savedSessions, setSavedSessions] = useState([]);
  const [passReserved, setPassReserved] = useState(false);

  const toggleBookSession = (sessionId) => {
    setBookedSessions((prev) =>
      prev.includes(sessionId) ? prev.filter((item) => item !== sessionId) : [...prev, sessionId]
    );
  };

  const toggleSaveSession = (sessionId) => {
    setSavedSessions((prev) =>
      prev.includes(sessionId) ? prev.filter((item) => item !== sessionId) : [...prev, sessionId]
    );
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#f7f7f5] pt-24 sm:pt-28">
      <main className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        
        {/* Back Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/expos"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#687078] transition hover:text-[#192334]"
          >
            <span aria-hidden="true">←</span> Back to all expos
          </Link>
        </div>

        {/* Editorial Hero Banner */}
        <ScrollReveal y={28} duration={0.75}>
          <section className="relative mb-12 overflow-hidden rounded-[2rem] bg-[#192334] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14">
            <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border border-white/10 sm:h-[28rem] sm:w-[28rem]" />
            <div className="pointer-events-none absolute right-12 top-16 h-56 w-56 rounded-full bg-[#d5a35b]/20 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#e2bd82]">
                  <span className="h-px w-8 bg-[#e2bd82]" />
                  {expo.category} • Official Program
                </p>
                <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  {expo.title.split(' ').slice(0, -1).join(' ')}{' '}
                  <span className="font-serif font-normal italic text-[#e2bd82]">
                    {expo.title.split(' ').slice(-1)}
                  </span>
                </h1>
                <p className="mt-5 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
                  {expo.summary}
                </p>

                <div className="mt-7 flex flex-wrap gap-3 text-xs text-slate-200">
                  <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm">
                    📅 {expo.date}
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm">
                    📍 {expo.venue}
                  </span>
                  <span className="rounded-full border border-[#e2bd82]/40 bg-[#e2bd82]/10 px-4 py-2 text-[#e2bd82]">
                    {expo.boothsLeft} booths remaining
                  </span>
                </div>
              </div>

              <div className="flex gap-8 border-t border-white/15 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <div>
                  <p className="text-3xl font-semibold tracking-tight">{expo.attendees}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-400">Attendees</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold tracking-tight">06</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-400">Live Sessions</p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Main Content + Sticky Sidebar */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:items-start">
          
          {/* Left Column (2/3): Speakers + Schedule */}
          <div className="space-y-14 lg:col-span-2">
            
            {/* Featured Speakers */}
            <section>
              <ScrollReveal y={24}>
                <div className="mb-6 flex items-end justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a8058]">Keynote Voices</p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#192334] sm:text-3xl">
                      Featured Speakers
                    </h2>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal stagger={0.12} y={32} className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {speakers.map((speaker) => (
                  <article
                    key={speaker.id}
                    className="group rounded-2xl border border-[#e6e5e0] bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-[#d2c8b7] hover:shadow-[0_14px_32px_rgba(25,35,52,0.07)]"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3f0e9] text-sm font-bold text-[#80643a] transition group-hover:bg-[#5145CD] group-hover:text-white">
                      {speaker.initials}
                    </div>
                    <h3 className="text-base font-semibold text-[#192334]">{speaker.name}</h3>
                    <p className="mt-0.5 text-xs text-[#737980]">{speaker.role}</p>
                    <p className="mt-4 border-t border-[#efefeb] pt-3 text-xs font-medium text-[#475569]">
                      “{speaker.topic}”
                    </p>
                  </article>
                ))}
              </ScrollReveal>
            </section>

            {/* Interactive Session Schedule */}
            <section>
              <ScrollReveal y={24}>
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a8058]">Agenda & Bookings</p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#192334] sm:text-3xl">
                      Event Schedule
                    </h2>
                  </div>

                  {/* Day Tabs */}
                  <div className="inline-flex rounded-full border border-[#e6e5e0] bg-white p-1">
                    {Object.keys(scheduleByDay).map((day) => (
                      <button
                        key={day}
                        type="button"
                        aria-pressed={activeDay === day}
                        onClick={() => setActiveDay(day)}
                        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                          activeDay === day
                            ? 'bg-[#5145CD] text-white shadow-sm'
                            : 'text-[#62686e] hover:text-[#192334]'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal key={activeDay} stagger={0.1} y={24} className="space-y-4">
                {scheduleByDay[activeDay].map((session) => {
                  const isBooked = bookedSessions.includes(session.id);
                  const isSaved = savedSessions.includes(session.id);

                  return (
                    <article
                      key={session.id}
                      className="flex flex-col justify-between gap-5 rounded-2xl border border-[#e6e5e0] bg-white p-5 transition duration-200 hover:border-[#d2c8b7] hover:shadow-[0_10px_28px_rgba(25,35,52,0.06)] sm:flex-row sm:items-center sm:p-6"
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2.5 text-xs">
                          <span className="font-semibold text-[#5145CD]">{session.time}</span>
                          <span className="text-[#cbd5e1]">•</span>
                          <span className="text-[#737980]">{session.room}</span>
                          <span className="rounded-full bg-[#f3f0e9] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#80643a]">
                            {session.tag}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-[#192334]">{session.title}</h3>
                        <p className="text-xs text-[#687078]">Hosted by {session.speaker}</p>
                      </div>

                      <div className="flex shrink-0 items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => toggleSaveSession(session.id)}
                          aria-label={isSaved ? 'Remove bookmark' : 'Bookmark session'}
                          aria-pressed={isSaved}
                          className={`rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition ${
                            isSaved
                              ? 'border-[#d5a35b] bg-[#f3f0e9] text-[#80643a]'
                              : 'border-[#e6e5e0] bg-[#fafaf8] text-[#687078] hover:border-[#192334] hover:text-[#192334]'
                          }`}
                        >
                          {isSaved ? '★ Saved' : '☆ Save'}
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleBookSession(session.id)}
                          className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                            isBooked
                              ? 'bg-[#edf3ed] text-[#42664d]'
                              : 'bg-[#192334] text-white hover:bg-[#2b3d55]'
                          }`}
                        >
                          {isBooked ? 'Seat Booked ✓' : 'Book Seat'}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </ScrollReveal>
            </section>
          </div>

          {/* Right Column (1/3): Sticky Pass & Booth Summary */}
          <aside className="lg:sticky lg:top-28">
            <ScrollReveal y={30} delay={0.1}>
              <div className="rounded-2xl border border-[#e6e5e0] bg-white p-6 shadow-[0_12px_36px_rgba(25,35,52,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a8058]">Your Access</p>
                <h3 className="mt-1 text-xl font-semibold text-[#192334]">Attendee Pass</h3>
                <p className="mt-2 text-xs leading-5 text-[#687078]">
                  Includes full hall entry, exhibitor directory access, and live session seat reservations.
                </p>

                <div className="my-6 space-y-3 border-y border-[#efefeb] py-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#737980]">Pass Type</span>
                    <span className="font-semibold text-[#192334]">Standard Visitor</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#737980]">Booked Sessions</span>
                    <span className="font-semibold text-[#5145CD]">{bookedSessions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#737980]">Saved Reminders</span>
                    <span className="font-semibold text-[#80643a]">{savedSessions.length}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setPassReserved(true)}
                  disabled={passReserved}
                  className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    passReserved
                      ? 'bg-[#edf3ed] text-[#42664d]'
                      : 'bg-[#5145CD] text-white shadow-md hover:bg-[#7C3AED]'
                  }`}
                >
                  {passReserved ? 'Pass Confirmed ✓' : 'Confirm Free Pass →'}
                </button>

                <div className="mt-6 rounded-xl bg-[#f7f7f5] p-4">
                  <p className="text-xs font-semibold text-[#192334]">Want to exhibit here?</p>
                  <p className="mt-1 text-xs text-[#687078]">
                    {expo.boothsLeft} booths are still open on the floor plan.
                  </p>
                  <Link
                    to="/exhibitors"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5145CD] hover:underline"
                  >
                    Explore exhibitors & booths <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </aside>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExpoDetails;