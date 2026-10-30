import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { useApp } from '../context/AppContext';
import {
  Settings,
  Bell,
  Lock,
  Eye,
  Shield,
  LogOut,
  Save,
  CheckCircle2,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { currentUser, addToast } = useApp();
  const navigate = useNavigate();

  // Settings Toggles
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [sessionReminders, setSessionReminders] = useState(true);
  const [chatPings, setChatPings] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [showEmailOnProfile, setShowEmailOnProfile] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Preferences saved!', 'Your account and notification settings have been updated.', 'success');
  };

  const handleSignOut = () => {
    addToast('Signed out', 'You have been logged out of the demo environment.', 'info');
    navigate('/');
  };

  return (
    <AppShell pageTitle="Settings & Preferences">
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EAE6] shadow-card">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#063F83] bg-[#EAF6F0] border border-[#C5E9DC] mb-2">
            <Settings className="w-3.5 h-3.5 text-[#16845B]" />
            <span>Account Configuration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#152238] tracking-tight">
            Account & App Preferences
          </h1>
          <p className="mt-1 text-sm text-[#64748B]">
            Manage notifications, privacy controls, and student security settings.
          </p>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-6">
          {/* Notification Preferences */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EAE6] shadow-card space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E2EAE6]">
              <Bell className="w-5 h-5 text-[#063F83]" />
              <h3 className="font-heading font-bold text-base text-[#152238]">
                Notification Preferences
              </h3>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-[#152238] block">
                    Session Request Alerts
                  </span>
                  <span className="text-xs text-[#64748B]">
                    Receive instant notifications when a student requests your skills.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={sessionReminders}
                  onChange={(e) => setSessionReminders(e.target.checked)}
                  className="w-4 h-4 rounded text-[#063F83] focus:ring-[#063F83]"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-[#152238] block">
                    Direct Message Pings
                  </span>
                  <span className="text-xs text-[#64748B]">
                    Notify when peers send chat messages about 30m slots.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={chatPings}
                  onChange={(e) => setChatPings(e.target.checked)}
                  className="w-4 h-4 rounded text-[#063F83] focus:ring-[#063F83]"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-[#152238] block">
                    Escrow Settlement Confirmations
                  </span>
                  <span className="text-xs text-[#64748B]">
                    Alerts when credit transfers complete or are refunded.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="w-4 h-4 rounded text-[#063F83] focus:ring-[#063F83]"
                />
              </label>
            </div>
          </div>

          {/* Privacy & Safety */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2EAE6] shadow-card space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E2EAE6]">
              <Shield className="w-5 h-5 text-[#16845B]" />
              <h3 className="font-heading font-bold text-base text-[#152238]">
                Privacy & Campus Visibility
              </h3>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-[#152238] block">
                    Public Directory Listing
                  </span>
                  <span className="text-xs text-[#64748B]">
                    Allow other students to discover your teaching skills on the Explore page.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={publicProfile}
                  onChange={(e) => setPublicProfile(e.target.checked)}
                  className="w-4 h-4 rounded text-[#063F83] focus:ring-[#063F83]"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-[#152238] block">
                    Display Campus Email to Peers
                  </span>
                  <span className="text-xs text-[#64748B]">
                    Keep hidden by default; peers can communicate through SwapSkill chat instead.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={showEmailOnProfile}
                  onChange={(e) => setShowEmailOnProfile(e.target.checked)}
                  className="w-4 h-4 rounded text-[#063F83] focus:ring-[#063F83]"
                />
              </label>
            </div>
          </div>

          {/* Save & Sign Out Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#063F83] hover:bg-[#082B50] shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save All Settings</span>
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out of Account</span>
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
};
