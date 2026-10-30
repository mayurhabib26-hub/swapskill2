import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastContainer } from './components/shared/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ExploreSkillsPage } from './pages/ExploreSkillsPage';
import { PeerProfilePage } from './pages/PeerProfilePage';
import { SessionsPage } from './pages/SessionsPage';
import { MessagesPage } from './pages/MessagesPage';
import { CreditsPage } from './pages/CreditsPage';
import { MyProfilePage } from './pages/MyProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll Motion Architecture
import { SmoothScroll } from './components/scroll/SmoothScroll';
import { ScrollProgress } from './components/scroll/ScrollProgress';
import { ScrollToTop } from './components/scroll/ScrollToTop';
import { FloatingScrollButton } from './components/scroll/FloatingScrollButton';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <SmoothScroll>
          {/* Spring-based kinetic reading progress bar */}
          <ScrollProgress />

          {/* Reset scroll on route changes */}
          <ScrollToTop />

          <Routes>
            {/* Public Landing & Marketing */}
            <Route path="/" element={<HomePage />} />

            {/* Authentication & Onboarding */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />

            {/* Authenticated Student Platform */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/explore" element={<ExploreSkillsPage />} />
            <Route path="/peer/:id" element={<PeerProfilePage />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/credits" element={<CreditsPage />} />
            <Route path="/profile" element={<MyProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* Demo Admin Dashboard */}
            <Route path="/admin" element={<AdminPage />} />

            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {/* Floating dynamic back-to-top scroll button with progress ring */}
          <FloatingScrollButton />

          {/* Global Toast Feedback System */}
          <ToastContainer />
        </SmoothScroll>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
