import React from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Coins,
  Lock,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  RefreshCw,
  ChevronRight,
  Zap,
} from 'lucide-react';

const STAGES = [
  {
    stage: 1,
    title: '2 Starter Credits',
    description:
      'Every new student receives 2 free credits upon onboarding. No credit card, deposit, or course fee required.',
    icon: Sparkles,
    iconBg: 'bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE]',
    iconColor: 'text-[#2563EB]',
    iconBorder: 'border-[#BFDBFE]',
    stageColor: 'text-[#2563EB]',
    footerLabel: 'Balance:',
    footerValue: '2 Available',
    footerValueColor: 'text-[#2563EB]',
    highlight: false,
    numberBg: 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]',
  },
  {
    stage: 2,
    title: 'Booking Submitted',
    description:
      'When you request a session, your credits remain untouched. You are never billed simply for asking questions.',
    icon: RefreshCw,
    iconBg: 'bg-gradient-to-br from-[#F0F6FE] to-[#E0EDFC]',
    iconColor: 'text-[#1D4ED8]',
    iconBorder: 'border-[#BFDBFE]',
    stageColor: 'text-[#1D4ED8]',
    footerLabel: 'Status:',
    footerValue: 'Pending Teacher',
    footerValueColor: 'text-[#59627E]',
    highlight: false,
    numberBg: 'bg-[#F0F6FE] text-[#1D4ED8] border-[#BFDBFE]',
  },
  {
    stage: 3,
    title: '1 Credit Held',
    description:
      'When the teacher accepts the session, exactly 1 credit is held in escrow. Neither student has it until the lesson concludes.',
    icon: Lock,
    iconBg: 'bg-gradient-to-br from-[#0B132B] to-[#1E293B]',
    iconColor: 'text-[#BFDBFE]',
    iconBorder: 'border-transparent',
    stageColor: 'text-[#0B132B]',
    footerLabel: 'Held in Escrow:',
    footerValue: '1 Credit',
    footerValueColor: 'text-amber-600',
    highlight: true,
    numberBg: 'bg-[#0B132B] text-white border-[#0B132B]',
  },
  {
    stage: 4,
    title: 'Credit Released',
    description:
      "Both users confirm the 30-minute lesson was completed. The held credit releases immediately to the teacher's wallet!",
    icon: CheckCircle2,
    iconBg: 'bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE]',
    iconColor: 'text-[#2563EB]',
    iconBorder: 'border-[#BFDBFE]',
    stageColor: 'text-[#2563EB]',
    footerLabel: 'Teacher Receives:',
    footerValue: '+1 Earned Credit',
    footerValueColor: 'text-[#2563EB]',
    highlight: false,
    numberBg: 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]',
  },
];

export const CreditSystemSection: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="mt-16 sm:mt-20 py-24 bg-gradient-to-b from-[#F8FAFD] via-white to-[#F8FAFD] relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#EFF6FF] opacity-60 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#F0F6FE] opacity-60 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] border border-[#BFDBFE] mb-4 shadow-sm">
            <Coins className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Time-Banking Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#020C21] tracking-tight">
            Your knowledge is your{' '}
            <span className="bg-gradient-to-r from-[#020C21] to-[#2563EB] bg-clip-text text-transparent">
              currency.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#59627E] max-w-xl mx-auto leading-relaxed">
            SwapSkill uses a zero-cash, escrow-protected credit model designed specifically for students to trade 30-minute knowledge sessions safely.
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 relative mb-16"
        >
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-[60px] left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-[2px]">
            <div className="w-full h-full bg-gradient-to-r from-[#BFDBFE] via-[#0B132B] to-[#BFDBFE] rounded-full opacity-25" />
            <div className="absolute top-0 w-full h-full bg-gradient-to-r from-[#BFDBFE] via-[#2563EB] to-[#BFDBFE] rounded-full opacity-20 blur-sm" />
          </div>

          {STAGES.map((s, i) => {
            const Icon = s.icon;
            const isLast = i === STAGES.length - 1;

            return (
              <React.Fragment key={s.stage}>
                <motion.div
                  variants={cardVariants}
                  whileHover={{
                    y: -6,
                    transition: { duration: 0.25, ease: 'easeOut' },
                  }}
                  className={`relative group rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                    s.highlight
                      ? 'bg-white border-2 border-[#0B132B] shadow-elevated ring-4 ring-[#0B132B]/5'
                      : 'bg-white border border-slate-200/80 shadow-card hover:border-[#BFDBFE] hover:shadow-elevated'
                  }`}
                >
                  {/* Highlight badge */}
                  {s.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                      <div className="flex items-center gap-1.5 bg-[#0B132B] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg">
                        <ShieldCheck className="w-3 h-3 text-[#BFDBFE]" />
                        <span>Escrow Protection</span>
                      </div>
                    </div>
                  )}

                  <div className="p-6 pb-0">
                    {/* Icon + stage number row */}
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className={`w-14 h-14 rounded-2xl ${s.iconBg} ${s.iconColor} flex items-center justify-center border ${s.iconBorder} shadow-sm group-hover:scale-105 transition-transform duration-300`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <div
                        className={`w-8 h-8 rounded-full ${s.numberBg} border text-xs font-bold flex items-center justify-center shadow-sm`}
                      >
                        {s.stage}
                      </div>
                    </div>

                    {/* Stage label */}
                    <span
                      className={`text-[11px] font-bold uppercase tracking-widest ${s.stageColor}`}
                    >
                      Stage {s.stage}
                    </span>

                    {/* Title */}
                    <h3 className="font-heading font-bold text-lg text-[#020C21] mt-1.5 mb-2.5 group-hover:text-[#2563EB] transition-colors">
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] text-[#59627E] leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  {/* Footer status bar */}
                  <div className="mx-6 mt-6 mb-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">
                        {s.footerLabel}
                      </span>
                      <span
                        className={`text-xs font-bold font-mono ${s.footerValueColor} flex items-center gap-1`}
                      >
                        {s.stage === 4 && (
                          <Zap className="w-3 h-3 text-[#2563EB]" />
                        )}
                        {s.footerValue}
                      </span>
                    </div>
                    {/* Mini progress indicator */}
                    <div className="mt-3 h-1 rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.stage * 25}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          s.highlight
                            ? 'bg-gradient-to-r from-[#0B132B] to-[#2563EB]'
                            : 'bg-gradient-to-r from-[#BFDBFE] to-[#2563EB]'
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Mobile arrow connector between cards */}
                {!isLast && (
                  <div className="flex lg:hidden justify-center -my-1">
                    <div className="flex flex-col items-center gap-0.5 text-[#BFDBFE]">
                      <div className="w-0.5 h-4 bg-[#BFDBFE] rounded-full" />
                      <ChevronRight className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </motion.div>

        {/* Escrow Guarantee Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="relative bg-gradient-to-br from-white to-[#F8FAFD] rounded-2xl p-6 sm:p-8 border border-[#BFDBFE] shadow-card overflow-hidden"
        >
          {/* Background shine effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#EFF6FF] to-transparent rounded-full opacity-60 -translate-y-1/2 translate-x-1/3" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] text-[#2563EB] flex items-center justify-center flex-shrink-0 border border-[#BFDBFE] shadow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base sm:text-lg text-[#020C21] flex items-center gap-2">
                  Fairness Guarantee
                  <span className="text-xs font-semibold text-[#2563EB] bg-[#EFF6FF] px-2 py-0.5 rounded-full border border-[#BFDBFE]">
                    Always On
                  </span>
                </h4>
                <p className="text-xs sm:text-sm text-[#59627E] mt-1.5 max-w-2xl leading-relaxed">
                  Cancel anytime before session starts. If either partner cannot make the scheduled time or cancels, the escrow hold is automatically lifted and the credit returns instantly to the learner's available balance.
                </p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE] text-[#020C21] font-semibold text-sm border border-[#BFDBFE] flex items-center gap-2.5 shadow-sm hover:shadow-md transition-shadow">
                <Coins className="w-4.5 h-4.5 text-[#2563EB]" />
                <span>30 Mins Taught = 1 Credit Earned</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CreditSystemSection;
