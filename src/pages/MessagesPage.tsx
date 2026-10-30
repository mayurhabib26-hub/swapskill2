import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import {
  Search,
  Send,
  ArrowLeft,
  Calendar,
  Sparkles,
  User,
  ExternalLink,
  ShieldCheck,
  CheckCheck,
} from 'lucide-react';

export const MessagesPage: React.FC = () => {
  const { conversations, messages, currentUser, sendMessage, users } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const convParam = searchParams.get('conv');
  const [activeConvId, setActiveConvId] = useState<string>(
    convParam || conversations[0]?.id || ''
  );
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileChatView, setMobileChatView] = useState<boolean>(!!convParam);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync with URL query parameter
  useEffect(() => {
    if (convParam) {
      setActiveConvId(convParam);
      setMobileChatView(true);
    }
  }, [convParam]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeConvId]);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];
  const activeMessages = activeConv ? messages[activeConv.id] || [] : [];
  const peerUser = users.find((u) => u.id === activeConv?.participantId);

  const filteredConversations = conversations.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.participantName.toLowerCase().includes(q) ||
      c.lastMessage.toLowerCase().includes(q) ||
      c.participantSkill.toLowerCase().includes(q)
    );
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeConv) return;

    sendMessage(activeConv.id, messageInput.trim());
    setMessageInput('');
  };

  const handleSelectConv = (id: string) => {
    setActiveConvId(id);
    setSearchParams({ conv: id });
    setMobileChatView(true);
  };

  return (
    <AppShell pageTitle="Messages">
      <div className="bg-white rounded-3xl border border-[#E2EAE6] shadow-card overflow-hidden h-[calc(100vh-140px)] min-h-[500px] flex">
        {/* Left Panel: Conversation List */}
        <div
          className={`w-full lg:w-80 flex-shrink-0 border-r border-[#E2EAE6] flex flex-col ${
            mobileChatView ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Search Header */}
          <div className="p-4 border-b border-[#E2EAE6] bg-[#F7FAF8]">
            <h2 className="font-heading font-extrabold text-base text-[#152238] mb-3">
              Chats & Discussions
            </h2>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages or peers..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E2EAE6] bg-white text-xs text-[#152238] focus:outline-none focus:ring-2 focus:ring-[#063F83]"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#F1F5F3]">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === activeConvId;
              return (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConv(conv.id)}
                  className={`p-4 cursor-pointer transition-colors flex items-start gap-3 ${
                    isSelected ? 'bg-[#EAF6F0]/80' : 'hover:bg-[#F7FAF8]'
                  }`}
                >
                  <img
                    src={conv.participantAvatar}
                    alt={conv.participantName}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[#063F83]/10 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-[#152238] truncate">
                        {conv.participantName}
                      </h4>
                      <span className="text-[10px] text-slate-400">{conv.lastMessageTimestamp}</span>
                    </div>
                    <p className="text-xs text-[#64748B] truncate leading-tight">
                      {conv.lastMessage}
                    </p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-[#063F83] bg-white px-2 py-0.5 rounded border border-[#E2EAE6]">
                        {conv.participantSkill}
                      </span>
                      {conv.unreadCount > 0 && (
                        <span className="w-2 h-2 rounded-full bg-[#16845B]" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredConversations.length === 0 && (
              <div className="p-8 text-center text-xs text-[#64748B]">
                No conversations found.
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Active Chat Window */}
        <div
          className={`flex-1 flex flex-col min-w-0 bg-[#F7FAF8] ${
            !mobileChatView ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {activeConv ? (
            <>
              {/* Chat Topbar */}
              <div className="p-4 bg-white border-b border-[#E2EAE6] flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => setMobileChatView(false)}
                    className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-800"
                    aria-label="Back to conversations"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <img
                    src={activeConv.participantAvatar}
                    alt={activeConv.participantName}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-[#063F83]/20 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-bold text-sm sm:text-base text-[#152238] truncate">
                        {activeConv.participantName}
                      </h3>
                      <span className="text-[10px] font-semibold text-[#16845B] bg-[#EAF6F0] px-2 py-0.5 rounded-full">
                        {activeConv.participantSkill}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#64748B] truncate">
                      {activeConv.participantMajor} · Active student mentor
                    </div>
                  </div>
                </div>

                {/* Quick Profile Link */}
                {peerUser && (
                  <Link
                    to={`/peer/${peerUser.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F0F5FA] text-[#063F83] text-xs font-bold hover:bg-[#DDE9F4] transition-colors flex-shrink-0"
                  >
                    <span>View Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                {/* Security and Escrow Notice Banner */}
                <div className="max-w-md mx-auto p-3 rounded-2xl bg-white border border-[#C5E9DC] text-center shadow-sm text-xs text-[#063F83]">
                  <span className="font-bold flex items-center justify-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#16845B]" />
                    <span>Safe Peer Chat</span>
                  </span>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    Coordinate your 30-minute lesson details. Never pay money outside of SwapSkill's credit escrow.
                  </p>
                </div>

                {activeMessages.map((msg) => {
                  const isMe = msg.senderId === currentUser.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-xs sm:max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                          isMe
                            ? 'bg-[#063F83] text-white rounded-br-sm'
                            : 'bg-white text-[#152238] border border-[#E2EAE6] rounded-bl-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 px-1">
                        <span>{msg.timestamp}</span>
                        {isMe && <CheckCheck className="w-3 h-3 text-[#16845B]" />}
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Composer */}
              <div className="p-3 sm:p-4 bg-white border-t border-[#E2EAE6]">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder={`Message ${activeConv.participantName.split(' ')[0]} (Press Enter to send)...`}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#E2EAE6] bg-[#F7FAF8] text-xs sm:text-sm text-[#152238] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#063F83]"
                  />
                  <button
                    type="submit"
                    disabled={!messageInput.trim()}
                    className="p-2.5 rounded-xl bg-[#063F83] text-white hover:bg-[#082B50] disabled:opacity-50 transition-colors"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#64748B]">
              <p>Select a conversation from the left to start chatting.</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
};
