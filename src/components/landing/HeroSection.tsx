import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 80]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.5]);
  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-gradient-to-b from-[#EBF2FA] via-[#F0F5FC] to-[#F8FAFD] isolate flex flex-col justify-between">
      {/* ── Background Video Plate ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          className="w-full h-full object-cover object-center filter brightness-[1.01] saturate-[.98] scale-[1.002]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_105822_bf7c2d53-9957-4521-bbbf-7c1ab7a70130.png"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260912_105953_21ad8049-9088-4a00-bad3-aee6b5575a2b.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#EBF2FA]/30 via-transparent to-[#F8FAFD]/40 pointer-events-none" />
      </div>

      {/* ── Top Spacer for Floating Header ── */}
      <div className="h-16 sm:h-20 w-full relative z-10" aria-hidden="true" />

      {/* ── Hero Center Block (Typography & Play) ── */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-6 sm:px-10 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ y: heroY, opacity: heroOpacity }}
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <p className="text-[#59627E] text-[16px] font-[470] tracking-[-0.015em] mb-3">
            Peer-to-peer student skill exchange
          </p>

          {/* Headline */}
          <h1 className="text-[64px] sm:text-[84px] lg:text-[96px] font-[360] tracking-[-0.035em] leading-[0.94] text-[#020C21]">
            <span>Trade Skills.</span>
            <br />
            <span>Zero Money.</span>
          </h1>

          {/* Play + Tagline */}
          <div className="flex items-center gap-4 mt-7">
            <a
              href="#how-it-works"
              className="w-[50px] h-[50px] rounded-full bg-white shadow-[0_6px_18px_rgba(28,52,92,0.1)] flex items-center justify-center hover:scale-105 transition-transform"
              aria-label="How skill swapping works"
            >
              <Play className="w-3.5 h-3.5 ml-0.5 fill-[#0b1526] text-[#0b1526]" />
            </a>
            <span className="text-[20px] sm:text-[23px] font-[470] tracking-[-0.03em] text-[#0F182F]">
              Teach 1 Hour. Earn 1 Credit. Learn Anything.
            </span>
          </div>
        </motion.div>
      </div>

      {/* ── Hero Bottom Statistics Row ── */}
      <footer className="relative z-10 w-full max-w-[1240px] mx-auto px-6 sm:px-10 pb-8 sm:pb-12 flex items-end">
        <div className="flex items-end gap-6 sm:gap-10">
          <div className="flex items-end gap-3 sm:gap-4">
            <span className="text-[72px] sm:text-[96px] font-[200] leading-none text-[#020C21] tracking-tight">
              350+
            </span>
            <span className="text-[15px] sm:text-[18px] font-[400] tracking-[-0.02em] leading-[1.2] text-[#39455F] pb-2">
              Campuses<br />Connected<br />Globally
            </span>
          </div>

          {/* Diagonal Slash */}
          <div className="w-[20px] h-[64px] bg-gradient-to-tl from-transparent via-[#A7B4C6] to-transparent transform -skew-x-[22deg] mb-2" />

          <div className="flex items-end gap-3 sm:gap-4">
            <span className="text-[72px] sm:text-[96px] font-[200] leading-none text-[#020C21] tracking-tight">
              18K+
            </span>
            <span className="text-[15px] sm:text-[18px] font-[400] tracking-[-0.02em] leading-[1.2] text-[#39455F] pb-2">
              Skills<br />Exchanged
            </span>
          </div>
        </div>
      </footer>
    </section>
  );
};
