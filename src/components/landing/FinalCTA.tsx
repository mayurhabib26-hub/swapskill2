import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Coins, CheckCircle } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0B132B] via-[#0F172A] to-[#0B132B] text-white relative overflow-hidden">
      {/* Decorative Ice Accent Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3B82F6]/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0B132B] bg-[#BFDBFE] mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>Join the Campus Learning Exchange</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-tight">
          Ready to share what you know?
        </h2>

        {/* Supporting text */}
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
          Your next skill could be one conversation away. Sign up in under two minutes and claim your 2 starter credits.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-[#0B132B] bg-white hover:bg-slate-100 shadow-elevated transition-all group"
          >
            <Coins className="w-4 h-4 mr-2 text-[#2563EB]" />
            <span>Join SwapSkill</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-all backdrop-blur-sm"
          >
            <span>Explore Skills</span>
          </Link>
        </div>

        {/* Trust Points */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-[#BFDBFE]" />
            <span>2 Starter Credits included</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-[#BFDBFE]" />
            <span>No subscription or credit card</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-[#BFDBFE]" />
            <span>Verified student community</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
