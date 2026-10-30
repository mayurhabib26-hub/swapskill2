import React from 'react';
import { Header } from '../components/ui/header-2';
import { HeroSection } from '../components/landing/HeroSection';
import { HowItWorks } from '../components/landing/HowItWorks';
import { SkillCategories } from '../components/landing/SkillCategories';
import { CreditSystemSection } from '../components/landing/CreditSystemSection';
import { CommunitySection } from '../components/landing/CommunitySection';
import { FinalCTA } from '../components/landing/FinalCTA';
import { Footer } from '../components/layout/Footer';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFD]">
      {/* Dynamic floating header */}
      <Header />

      {/* Hero section is the full first viewport (entrance) */}
      <HeroSection />

      <main className="flex-1">
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <SkillCategories />
        <CreditSystemSection />
        <div id="reviews">
          <CommunitySection />
        </div>
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
