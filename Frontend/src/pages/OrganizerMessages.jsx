import React, { useEffect, useMemo, useRef, useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';

const initialThreads = [
  {
    id: 'ops',
    title: 'Event Operations Desk',
    subtitle: 'Floor & Logistics • Hall A',
    unread: 2,
    lastTime: '10:42 AM',
    messages: [
      {
        id: 1,
        sender: 'organizer',
        name: 'Zainab',
        role: 'Floor Ops',
        text: 'Booth A12 power inspection is complete. Your 20A circuit is live and ready for setup.',
        time: '10:15 AM',
      },
      {
        id: 2,
        sender: 'organizer',
        name: 'Zainab',
        role: 'Floor Ops',
        text: 'Please confirm if you need extra exhibitor badges before 5 PM today.',
        time: '10:42 AM',
        attachment: 'Badge_Allocation_Guide.pdf',
      },
    ],
  },
  {
    id: 'av',
    title: 'AV & Stage Support',
    subtitle: 'Displays & Wi-Fi',
    unread: 0,
    lastTime: 'Yesterday',
    messages: [
      {
        id: 1,
        sender: 'exhibitor',
        name: 'You',
        role: 'Exhibitor',
        text: 'Hi team, can we test HDMI display output at Booth A12 tomorrow morning?',
        time: 'Yesterday',
      },
      {
        id: 2,
        sender: 'organizer',
        name: 'Tariq',
        role: 'AV Tech',
        text: 'Yes! Our technician will be at Hall A from 8:00 AM.',
        time: 'Yesterday',
      },
    ],
  },
  {
    id: 'billing',
    title: 'Exhibitor Billing & Passes',
    subtitle: 'Invoices & Sponsorship',
    unread: 0,
    lastTime: 'Nov 18',
    messages: [
      {
        id: 1,
        sender: 'organizer',
        name: 'Finance Desk',
        role: 'Billing',
        text: 'Your Booth A12 invoice receipt is available for your records.',
        time: 'Nov 18',
        attachment: 'Invoice_ES_2026_A12.pdf',
      },
    ],
  },
];

const OrganizerMessages = () => {
  const [threads, setThreads] = useState(initialThreads);
  const [activeId, setActiveId] = useState('ops');
  const [search, setSearch] = useState('');
  const [draft, setDraft] = useState('');
  const [attachmentName, setAttachmentName] = useState('');
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const messagesEndRef = useRef(null);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredThreads = useMemo(
    () =>
      threads.filter((thread) => {
        if (!normalizedSearch) return true;
        return (
          thread.title.toLowerCase().includes(normalizedSearch) ||
          thread.subtitle.toLowerCase().includes(normalizedSearch)
        );
      }),
    [threads, normalizedSearch]
  );

  const activeThread =
    threads.find((thread) => thread.id === activeId) ||
    filteredThreads[0] ||
    threads[0];

  useEffect(() => {
    if (filteredThreads.length === 0) return;
    if (!filteredThreads.some((thread) => thread.id === activeId)) {
      setActiveId(filteredThreads[0].id);
    }
  }, [activeId, filteredThreads]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: 'end' });
  }, [activeThread?.id, activeThread?.messages.length, mobileShowChat]);

  if (!activeThread) {
    return null;
  }

  const selectThread = (id) => {
    setActiveId(id);
    setMobileShowChat(true);
    setThreads((prev) =>
      prev.map((thread) => (thread.id === id ? { ...thread, unread: 0 } : thread))
    );
  };

  const handleAttachment = (e) => {
    const file = e.target.files?.[0];
    if (file) setAttachmentName(file.name);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!draft.trim() && !attachmentName) return;

    const newMsg = {
      id: Date.now(),
      sender: 'exhibitor',
      name: 'You',
      role: 'Exhibitor',
      text: draft.trim() || 'Shared an attachment.',
      time: 'Just now',
      attachment: attachmentName || undefined,
    };

    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === activeThread.id
          ? { ...thread, lastTime: 'Just now', messages: [...thread.messages, newMsg] }
          : thread
      )
    );
    setDraft('');
    setAttachmentName('');
  };

  return (
    <ScrollReveal y={20} className="w-full min-w-0 space-y-5 pb-6 sm:pb-8">
      {/* Compact Editorial Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#192334] px-5 py-4 text-white shadow-[0_10px_26px_rgba(25,35,52,0.12)] sm:px-6">
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#e2bd82]">
            Direct Support
          </span>
          <h2 className="mt-0.5 text-lg font-semibold sm:text-xl">
            Organizer <span className="font-serif italic text-[#e2bd82]">Messages</span>
          </h2>
        </div>
        <span className="inline-flex max-w-full items-center rounded-full border border-[#e2bd82]/35 bg-[#e2bd82]/10 px-3 py-1 text-xs font-medium text-[#e2bd82]">
          Booth A12 • Active Line
        </span>
      </div>

      {/* Messaging Shell */}
      <div className="grid h-[72dvh] min-h-[520px] w-full min-w-0 grid-cols-1 overflow-hidden rounded-2xl border border-[#e6e5e0] bg-white shadow-[0_8px_28px_rgba(25,35,52,0.05)] max-lg:max-h-[860px] lg:h-[calc(100dvh-13rem)] lg:max-h-[820px] lg:grid-cols-12">
        {/* Left: Conversation List */}
        <aside
          className={`min-h-0 min-w-0 flex-col border-b border-[#e6e5e0] bg-[#fafaf8] lg:col-span-4 lg:flex lg:border-b-0 lg:border-r ${
            mobileShowChat ? 'hidden' : 'flex'
          }`}
        >
          <div className="border-b border-[#e6e5e0] bg-white p-4">
            <div className="mb-2.5 flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#687078]">
                Conversations
              </span>
              <span className="text-[11px] font-medium text-[#687078]">
                {filteredThreads.length} channel{filteredThreads.length === 1 ? '' : 's'}
              </span>
            </div>
            <label htmlFor="organizer-thread-search" className="sr-only">
              Search conversations
            </label>
            <input
              id="organizer-thread-search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search teams or topics..."
              className="w-full rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-3.5 py-2.5 text-sm text-[#192334] placeholder:text-[#687078] outline-none transition duration-200 focus:border-[#192334] focus:bg-white focus:ring-[3px] focus:ring-[#192334]/10"
            />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-2 sm:p-2.5">
            {filteredThreads.length === 0 ? (
              <div className="flex h-full min-h-[180px] items-center justify-center p-6 text-center">
                <p className="text-sm text-[#687078]">No matching conversations found.</p>
              </div>
            ) : (
              <div className="space-y-1.5">
                {filteredThreads.map((thread) => {
                  const isActive = thread.id === activeThread.id;
                  const lastMsg = thread.messages[thread.messages.length - 1];

                  return (
                    <button
                      key={thread.id}
                      type="button"
                      onClick={() => selectThread(thread.id)}
                      className={`flex w-full min-w-0 items-start justify-between gap-3 rounded-xl p-3.5 text-left transition-all duration-200 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[#192334]/15 ${
                        isActive
                          ? 'bg-[#192334] text-white shadow-[0_6px_18px_rgba(25,35,52,0.16)] ring-1 ring-[#e2bd82]/30'
                          : 'bg-transparent text-[#192334] hover:bg-white hover:shadow-[0_6px_16px_rgba(25,35,52,0.06)] hover:ring-1 hover:ring-[#e6e5e0]'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={`truncate text-sm font-semibold ${
                              isActive ? 'text-white' : 'text-[#192334]'
                            }`}
                          >
                            {thread.title}
                          </p>
                          <span
                            className={`shrink-0 text-[10px] font-medium ${
                              isActive ? 'text-[#e2bd82]' : 'text-[#687078]'
                            }`}
                          >
                            {thread.lastTime}
                          </span>
                        </div>
                        <p
                          className={`mt-0.5 truncate text-[11px] font-medium ${
                            isActive ? 'text-[#e2bd82]' : 'text-[#7a5f35]'
                          }`}
                        >
                          {thread.subtitle}
                        </p>
                        <p
                          className={`mt-1.5 truncate text-xs ${
                            isActive ? 'text-slate-300' : 'text-[#525b65]'
                          }`}
                        >
                          {lastMsg?.text || 'No messages yet'}
                        </p>
                      </div>

                      {thread.unread > 0 && (
                        <span
                          className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            isActive
                              ? 'bg-[#e2bd82] text-[#192334]'
                              : 'bg-[#192334] text-[#e2bd82]'
                          }`}
                        >
                          {thread.unread}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* Right: Chat Panel */}
        <section
          className={`min-h-0 min-w-0 flex-col bg-[#f7f7f5]/60 lg:col-span-8 lg:flex ${
            mobileShowChat ? 'flex' : 'hidden'
          }`}
          aria-label="Conversation"
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between gap-3 border-b border-[#e6e5e0] bg-white px-4 py-3.5 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileShowChat(false)}
                className="shrink-0 rounded-lg border border-[#e6e5e0] bg-[#fafaf8] px-2.5 py-1.5 text-xs font-semibold text-[#192334] transition hover:bg-[#efefeb] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[#192334]/10 lg:hidden"
              >
                ← Back
              </button>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#e2bd82]/50 bg-[#f3f0e9] text-xs font-semibold text-[#192334]">
                {activeThread.title.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-2">
                  <h3 className="truncate text-sm font-semibold text-[#192334]">
                    {activeThread.title}
                  </h3>
                  <span className="hidden rounded-md bg-[#f3f0e9] px-2 py-0.5 text-[10px] font-semibold text-[#7a5f35] sm:inline-block">
                    {activeThread.subtitle}
                  </span>
                </div>
                <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium text-[#42664d]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#42664d]" aria-hidden="true" />
                  Typical response under 15 mins
                </p>
              </div>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 sm:px-5 sm:py-5">
            <div className="space-y-5">
              {activeThread.messages.map((msg) => {
                const isMe = msg.sender === 'exhibitor';
                return (
                  <div
                    key={msg.id}
                    className={`flex min-w-0 flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`mb-1.5 flex max-w-full flex-wrap items-center gap-x-1.5 gap-y-0.5 px-1 text-[11px] text-[#525b65] ${
                        isMe ? 'justify-end text-right' : ''
                      }`}
                    >
                      <span className="font-semibold text-[#192334]">{msg.name}</span>
                      <span aria-hidden="true">•</span>
                      <span>{msg.role}</span>
                      <span aria-hidden="true">•</span>
                      <span className="text-[#687078]">{msg.time}</span>
                    </div>

                    <div
                      className={`max-w-[90%] rounded-2xl border px-4 py-3 text-sm leading-relaxed break-words shadow-sm transition sm:max-w-[75%] lg:max-w-md ${
                        isMe
                          ? 'rounded-tr-md border-[#cbd5e1] bg-[#eef1f8] text-[#192334]'
                          : 'rounded-tl-md border-[#e6e5e0] bg-white text-[#192334]'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      {msg.attachment && (
                        <div
                          className={`mt-2.5 inline-flex max-w-full items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium ${
                            isMe
                              ? 'border-[#cbd5e1] bg-white/90 text-[#192334]'
                              : 'border-[#e6e5e0] bg-[#f7f7f5] text-[#192334]'
                          }`}
                        >
                          <span className="shrink-0" aria-hidden="true">
                            📎
                          </span>
                          <span className="truncate">{msg.attachment}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <form
            onSubmit={handleSend}
            className="space-y-2.5 border-t border-[#e6e5e0] bg-white p-3.5 sm:p-4"
          >
            {attachmentName && (
              <div className="flex items-center justify-between gap-3 rounded-xl border border-[#e2bd82]/50 bg-[#f3f0e9] px-3.5 py-2 text-xs font-medium text-[#192334]">
                <span className="flex min-w-0 items-center gap-2">
                  <span aria-hidden="true">📎</span>
                  <span className="truncate">{attachmentName}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setAttachmentName('')}
                  aria-label="Remove attachment"
                  className="shrink-0 rounded-md px-1.5 py-0.5 font-semibold text-[#525b65] transition hover:bg-white/60 hover:text-[#192334]"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="flex items-end gap-2 sm:gap-2.5">
              <label className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[#e6e5e0] bg-[#fafaf8] text-base text-[#192334] transition hover:border-[#192334]/40 hover:bg-[#f3f0e9] focus-within:ring-[3px] focus-within:ring-[#192334]/10">
                <span aria-hidden="true">📎</span>
                <span className="sr-only">Attach file</span>
                <input type="file" onChange={handleAttachment} className="hidden" />
              </label>

              <label htmlFor="organizer-message-draft" className="sr-only">
                Message
              </label>
              <input
                id="organizer-message-draft"
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message to the organizer team..."
                className="min-h-[44px] min-w-0 flex-1 rounded-xl border border-[#e6e5e0] bg-[#fafaf8] px-4 py-2.5 text-sm text-[#192334] placeholder:text-[#687078] outline-none transition duration-200 focus:border-[#192334] focus:bg-white focus:ring-[3px] focus:ring-[#192334]/10"
              />

              <button
                type="submit"
                disabled={!draft.trim() && !attachmentName}
                className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-[#192334] px-4 text-xs font-semibold text-[#e2bd82] transition hover:bg-[#24324a] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[#192334]/25 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
              >
                Send
              </button>
            </div>
          </form>
        </section>
      </div>
    </ScrollReveal>
  );
};

export default OrganizerMessages;