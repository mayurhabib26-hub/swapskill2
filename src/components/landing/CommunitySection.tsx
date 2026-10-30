import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Users, Lightbulb, Handshake, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CommunitySection: React.FC = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Personalized Guidance',
      desc: 'Ask exact questions and debug your actual assignment roadblocks with a peer who took the same course last semester.',
    },
    {
      icon: Handshake,
      title: 'Practical, Collaborative Learning',
      desc: 'No passive video lectures. Pair-program, critique design screens, or practice conversational speaking in real time.',
    },
    {
      icon: Users,
      title: 'Everyone Has Something to Share',
      desc: 'Whether you know how to build a React hook, edit cinematic YouTube reels, or speak French, your skills have immense value.',
    },
  ];

  const scenarios = [
    {
      title: 'From Code to Design',
      avatar1: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      name1: 'Alex (CS)',
      avatar2: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
      name2: 'Maya (Design)',
      story: 'Alex taught Java data structures for 30 minutes, earned 1 credit, and immediately booked Maya to review his React app wireframes.',
    },
    {
      title: 'From Language to Data',
      avatar1: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      name1: 'Carlos (Linguistics)',
      avatar2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      name2: 'Rohit (AI)',
      story: 'Carlos helped Rohit refine conversational Spanish for study abroad. Rohit later walked Carlos through Python pandas for his business data project.',
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.58,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="community" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] mb-3">
            <span>Peer Learning Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#020C21] tracking-tight">
            Learn with people, not just videos.
          </h2>
          <p className="mt-3 text-base text-[#59627E] max-w-xl mx-auto">
            Traditional online courses have 5% completion rates. Peer-to-peer 1:1 sessions create accountability, camaraderie, and immediate feedback.
          </p>
        </motion.div>

        {/* 3 Value Pillars */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                className="bg-[#F8FAFD] rounded-2xl p-7 border border-slate-200/80 hover:border-[#BFDBFE] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-white text-[#2563EB] flex items-center justify-center mb-5 border border-slate-200/80 shadow-sm">
                  <Icon className="w-6 h-6 text-[#2563EB]" />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#020C21] mb-2">{v.title}</h3>
                <p className="text-sm text-[#59627E] leading-relaxed">{v.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Example Peer Learning Scenarios */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="bg-[#EFF6FF]/60 rounded-3xl p-8 sm:p-10 border border-[#BFDBFE]"
        >
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
              Example Learning Cycles
            </span>
            <h3 className="font-heading font-bold text-2xl text-[#020C21] mt-1">
              How students swap skills across campuses
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scenarios.map((sc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={sc.avatar1}
                        alt={sc.name1}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-[#0B132B]"
                      />
                      <span className="text-xs font-bold text-[#020C21]">{sc.name1}</span>
                      <span className="text-xs text-[#59627E]">↔</span>
                      <img
                        src={sc.avatar2}
                        alt={sc.name2}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-[#2563EB]"
                      />
                      <span className="text-xs font-bold text-[#020C21]">{sc.name2}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-full border border-[#BFDBFE]">
                      {sc.title}
                    </span>
                  </div>
                  <p className="text-sm text-[#020C21] leading-relaxed italic">
                    "{sc.story}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#59627E]">
                  <span>2 sessions completed</span>
                  <span className="text-[#2563EB] font-semibold">2 credits circulated</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 font-bold text-sm text-[#2563EB] hover:text-[#1D4ED8] group"
            >
              <span>Discover peers matching your skills</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
