import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { DollarSign, Award, Users2, CalendarClock } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Learn Without Paying',
      desc: 'No expensive bootcamps or recurring subscription fees. Your time is currency.',
    },
    {
      icon: Award,
      title: 'Teach & Earn Credits',
      desc: 'Share what you already know to earn credits for the skills you want to master.',
    },
    {
      icon: Users2,
      title: 'Meet Skilled Peers',
      desc: 'Collaborate with passionate students from diverse majors and universities.',
    },
    {
      icon: CalendarClock,
      title: 'Flexible 30m Sessions',
      desc: 'Focused half-hour blocks that fit around classes, homework, and club activities.',
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="py-10 border-y border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#F8FAFD] transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center flex-shrink-0 border border-[#BFDBFE]">
                  <Icon className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#020C21]">{b.title}</h3>
                  <p className="text-xs text-[#59627E] mt-1 leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
