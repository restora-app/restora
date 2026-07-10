import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Lightbulb,
  Target,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import mascot from '../assets/images/thinking_mascot.png';

/**
 * AboutUs — Dedicated page explaining Restora's mission, vision, values,
 * and the team behind it. Follows the same warm, minimal design language.
 */
export default function AboutUsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative pt-xl pb-xl w-[85%] mx-auto">
      {/* ── Back Navigation ── */}
      <div className="px-gutter w-full mx-auto mb-lg">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-label-md text-on-surface-variant font-bold hover:text-primary transition-colors duration-300 group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          Back to Home
        </Link>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — What is Restora?
          ═══════════════════════════════════════════════════════════ */}
      <section className="px-gutter w-full mx-auto mb-xl">
        {/* Hero area */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex flex-col gap-5">
            <span className="font-bold text-label-md text-secondary uppercase tracking-widest">
              About Restora
            </span>
            <h1 className="text-headline-xl text-primary leading-tight">
              Reclaiming minds in the age of digital fog.
            </h1>
            <p className="text-body-lg text-on-surface-variant leading-relaxed max-w-lg">
              Restora isn't just another wellness app. It's a research-driven movement
              to understand and reverse the cognitive fatigue epidemic — the invisible
              cost of our hyper-connected lives.
            </p>
          </div>

          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <img
              src={mascot}
              alt="Restora Thinking Mascot"
              className="w-full max-w-xs h-auto object-contain"
            />
          </motion.div>
        </motion.div>


        {/* The Story */}
        <motion.div
          className="p-8 rounded-lg bg-surface-container-low border border-outline-variant/20 mb-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-headline-md text-primary font-bold mb-4 flex items-center gap-2">
            <Lightbulb size={22} className="text-primary" />
            The Story Behind Restora
          </h2>
          <div className="space-y-4 text-body-md text-on-surface-variant leading-relaxed">
            <p>
              It started with a simple observation: brilliant, capable people were
              struggling to think clearly. Not because of any disorder — but because
              modern life had silently drained their cognitive reserves.
            </p>
            <p>
              Endless notifications, algorithmic feeds designed to capture attention,
              and the constant context-switching of digital life had created a new kind
              of exhaustion — one that doesn't show up on any medical test.
            </p>
            <p>
              We realised that before we could build a solution, we needed to understand
              the problem deeply. That's why Restora begins with research — listening
              to real people, gathering real data, and letting science guide our path.
            </p>
          </div>
        </motion.div>

        {/* Our Goal */}
        <motion.div
          className="p-8 rounded-lg bg-surface-container-high border border-outline-variant/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-headline-md text-primary font-bold mb-4 flex items-center gap-2">
            <Target size={22} className="text-primary" />
            Our Goal
          </h2>
          <div className="space-y-4 text-body-md text-on-surface-variant leading-relaxed">
            <p>
              We look forward to identifying the problem at its core — understanding
              exactly how and why cognitive fatigue impacts everyday life — and then
              solving it with the right approach and framework.
            </p>
            <p>
              Our focus isn't just on building an app. It's on designing a structured,
              research-backed methodology that tackles digital-age brain fog from the
              ground up — so every solution we create is rooted in real insight, not
              guesswork.
            </p>
          </div>
        </motion.div>

      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — Meet the Team
          ═══════════════════════════════════════════════════════════ */}
      <section className="px-gutter w-full mx-auto mb-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <span className="font-bold text-label-md text-secondary uppercase tracking-widest">
              The People
            </span>
            <h2 className="text-headline-xl text-primary mt-2">
              Meet the Team
            </h2>
            <p className="text-body-lg text-on-surface-variant mt-3 max-w-xl mx-auto">
              A small, passionate group united by one belief — your mind deserves better.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.name} member={member} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — Join the Movement CTA
          ═══════════════════════════════════════════════════════════ */}
      <section className="px-gutter w-full mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-lg p-10 text-center bg-gradient-to-br from-primary-fixed via-secondary-fixed to-tertiary-fixed/40 border border-outline-variant/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles
            size={32}
            className="mx-auto text-primary mb-4 opacity-60"
          />
          <h2 className="text-headline-md text-on-surface font-bold mb-3">
            Be Part of the Research
          </h2>
          <p className="text-body-lg text-on-surface-variant max-w-md mx-auto mb-6">
            Your 60-second survey helps us understand cognitive fatigue at scale.
            Every response matters.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-md py-[12px] rounded-full text-label-md font-bold hover:bg-primary/90 transition-colors shadow-sm"
          >
            Take the Survey
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

/* ── Team Data ─────────────────────────────────────────────── */
const teamMembers = [
  {
    name: 'Priyanshi Jain',
    role: 'Founder',
    bio: 'Passionate engineer building at the intersection of technology and mental wellness. Turning real-world problems into elegant solutions.',
    initials: 'PJ',
  },
  {
    name: 'Mehul Sharma',
    role: 'Founder',
    bio: 'Passionate engineer building at the intersection of technology and mental wellness. Turning real-world problems into elegant solutions.',
    initials: 'MS',
  },
];

/* ── Sub-components ─────────────────────────────────────────── */

function TeamCard({ member, delay }) {
  return (
    <motion.div
      className="bg-surface-container-high rounded-xl p-6 flex flex-col items-center text-center gap-4 border border-outline-variant/20 transition-transform duration-300 hover:scale-[1.03]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay }}
    >
      {/* Avatar with initials */}
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-md">
        <span className="text-headline-md text-on-primary font-bold">
          {member.initials}
        </span>
      </div>

      <div>
        <h3 className="text-body-lg font-bold text-on-surface">{member.name}</h3>
        <p className="text-label-md text-primary font-semibold mt-0.5">
          {member.role}
        </p>
      </div>

      <p className="text-body-md text-on-surface-variant leading-relaxed">
        {member.bio}
      </p>
    </motion.div>
  );
}
