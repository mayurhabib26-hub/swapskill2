import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, CalendarCheck, Coins } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: UserPlus,
      title: 'Create Your Profile',
      desc: 'Tell the community what you can teach and what you want to learn. Receive 2 starter credits right away.',
    },
    {
      num: '02',
      icon: Search,
      title: 'Find Your Match',
      desc: 'Discover peers with skills, goals, and availability that fit yours through smart filters and search.',
    },
    {
      num: '03',
      icon: CalendarCheck,
      title: 'Book a Session',
      desc: 'Request a 30-minute session. When the teacher accepts, 1 credit is safely held in escrow.',
    },
    {
      num: '04',
      icon: Coins,
      title: 'Exchange Credits',
      desc: 'Complete the session, confirm it, and release the held credit to your teacher. Simple and fair.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#F8FAFD] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] mb-3">
            <span>Simple Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#020C21] tracking-tight">
            Learning is better when we share.
          </h2>
          <p className="mt-3 text-base text-[#59627E] max-w-xl mx-auto">
            Four simple steps to turn your knowledge into new opportunities without financial barriers.
          </p>
        </div>

        {/* 4 Cards Grid with Desktop Connecting Line */}
        <div className="relative">
          {/* Subtle Desktop Connector Bar */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-[#BFDBFE] via-[#2563EB]/30 to-[#BFDBFE] -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-card border border-slate-200/80 hover:border-[#BFDBFE] hover:shadow-elevated transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Header with Step Number and Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold border border-[#BFDBFE] group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6 text-[#2563EB]" />
                      </div>
                      <span className="font-heading font-extrabold text-2xl text-slate-200 group-hover:text-[#93C5FD] transition-colors">
                        {step.num}
                      </span>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-[#020C21] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#59627E] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-[#2563EB]">
                    <span>Step {step.num} Complete</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
