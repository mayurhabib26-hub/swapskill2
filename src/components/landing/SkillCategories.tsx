import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Code2,
  Globe,
  Layout,
  Palette,
  Film,
  MessageSquare,
  Languages,
  Camera,
  ArrowRight,
} from 'lucide-react';
import { TiltedGridHero, type TiltedGridImage } from '@/components/ui/tilted-grid-hero';
import { SKILL_CATEGORIES } from '../../data/mockData';

// Curated high quality Unsplash stock images representing skill disciplines
const HERO_SKILL_IMAGES: TiltedGridImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    alt: 'Programming - Code on screen',
  },
  {
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    alt: 'Web Development - Fullstack web workflow',
  },
  {
    src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    alt: 'UI/UX Design - Wireframes and mobile prototypes',
  },
  {
    src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
    alt: 'Graphic Design - Color palette and typography',
  },
  {
    src: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    alt: 'Video Editing - Timeline editing and color grading',
  },
  {
    src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    alt: 'Communication - Public speaking and discussion',
  },
  {
    src: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    alt: 'Languages - Multilingual vocabulary and study',
  },
  {
    src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    alt: 'Photography - Studio camera framing',
  },
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    alt: 'Data Analytics - Statistical models and charts',
  },
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    alt: 'Peer Collaboration - University students mentoring',
  },
];

export const SkillCategories: React.FC = () => {
  const navigate = useNavigate();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return Code2;
      case 'Globe':
        return Globe;
      case 'Figma':
        return Layout;
      case 'Palette':
        return Palette;
      case 'Film':
        return Film;
      case 'MessageSquare':
        return MessageSquare;
      case 'Languages':
        return Languages;
      case 'Camera':
        return Camera;
      default:
        return Code2;
    }
  };

  const handleSelectCategory = (categoryName: string) => {
    navigate(`/explore?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section id="skills" className="relative w-full overflow-hidden border-b border-slate-200/80">
      {/* Full-Width Tilted Grid Hero Section (Edge-to-Edge) */}
      <div className="w-full relative border-y border-slate-200/80 bg-white">
        <TiltedGridHero
          images={HERO_SKILL_IMAGES}
          speed={4}
          tileHeight={28}
          aspectRatio={16 / 9}
          gap={6}
          curve={80}
          fade={0}
          className="h-[560px] sm:h-[620px] w-full bg-gradient-to-b from-white via-[#F8FAFD] to-white"
        >
          {/* Overlay Interface */}
          <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-10 pointer-events-none">
            
            {/* Top overlay badge & headline */}
            <div className="text-center max-w-2xl mx-auto pointer-events-auto">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                  150+ Verified Student Skills
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#020C21] tracking-tight drop-shadow-sm">
                Every skill, brought into motion.
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#59627E] max-w-md mx-auto">
                Browse peer mentors teaching software engineering, UI design, cinematography, languages, and more.
              </p>
            </div>

            {/* Bottom interactive category pills bar */}
            <div className="pointer-events-auto pt-14 sm:pt-16">
              <div className="max-w-4xl mx-auto p-3 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-elevated">
                <div className="flex items-center justify-between mb-3 px-2">
                  <span className="text-xs font-semibold text-[#59627E] uppercase tracking-wider">
                    Quick Filter By Discipline
                  </span>
                  <button
                    onClick={() => navigate('/explore')}
                    className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 group"
                  >
                    <span>Explore all</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                {/* Horizontal pill list */}
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {SKILL_CATEGORIES.map((cat) => {
                    const Icon = getIcon(cat.icon);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleSelectCategory(cat.name)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8FAFD] hover:bg-[#EFF6FF] border border-slate-200/80 hover:border-[#BFDBFE] text-xs font-semibold text-[#020C21] hover:text-[#2563EB] transition-all group shadow-sm hover:scale-[1.02]"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#2563EB] group-hover:scale-110 transition-transform" />
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-[#59627E] bg-white px-1.5 py-0.5 rounded-md border border-slate-200">
                          {cat.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </TiltedGridHero>
      </div>

    </section>
  );
};

export default SkillCategories;
