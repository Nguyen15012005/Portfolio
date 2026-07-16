/**
 * Achievements.jsx
 * Hiển thị các thống kê và thành tích nổi bật.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUpModule from "react-countup";
import {
  Trophy,
  Medal,
  GitCommit,
  CheckCircle,
  Award,
  Code2,
  FileCode,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { achievements, achievementHighlights } from "../../data/portfolioData";
import SectionWrapper, { SectionHeader } from "../ui/SectionWrapper";
import { getColorFromKey } from "../../utils/helpers";
import { useTheme } from "../../hooks/useTheme";

const ICON_MAP = {
  Trophy,
  Medal,
  Github: FaGithub,
  GitCommit,
  CheckCircle,
  Award,
  Code2,
  FileCode,
};

const CountUp = CountUpModule.default ?? CountUpModule;

function StatBox({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const color = getColorFromKey(stat.color);
  const Icon = ICON_MAP[stat.icon] || Award;

  const { isDark } = useTheme();

  return (
    <motion.div
      ref={ref}
      className="glass-card p-6 flex flex-col items-center justify-center text-center group"
      style={{ borderColor: `${color}20` }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        delay: index * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -5,
        borderColor: `${color}50`,
        boxShadow: `0 10px 30px ${color}15`,
      }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-6"
        style={{ background: `${color}15`, color }}
      >
        <Icon size={24} />
      </div>
      <div
        className="text-3xl font-black mb-1"
        style={{ color: isDark ? "#f8fafc" : "#0f172a" }}
      >
        {inView ? (
          <CountUp end={stat.value} duration={2.5} separator="," />
        ) : (
          "0"
        )}
        {stat.suffix && <span style={{ color }}>{stat.suffix}</span>}
      </div>
      <p
        className="text-xs font-semibold uppercase tracking-wider"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}

function HighlightCard({ highlight, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const color = getColorFromKey(highlight.color);
  const Icon = ICON_MAP[highlight.icon] || Trophy;
  const { isDark } = useTheme();

  return (
    <motion.div
      ref={ref}
      className="glass-card p-6 relative overflow-hidden group"
      style={{ borderColor: "rgba(37,99,235,0.1)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
    >
      {/* Background glow on hover */}
      <div
        className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color}20, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      <div className="flex items-start gap-4 relative z-10">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${color}15`, color }}
        >
          <Icon size={20} />
        </div>
        <div>
          <h3
            className="font-bold text-sm mb-1"
            style={{ color: isDark ? "#f8fafc" : "#0f172a" }}
          >
            {highlight.title}
          </h3>
          <span
            className="text-[10px] font-mono mb-2 inline-block"
            style={{ color }}
          >
            {highlight.date}
          </span>
          <p
            className="text-xs leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {highlight.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <SectionWrapper id="achievements" animation="fade-up">
      <SectionHeader
        badge="Milestones"
        title="Key"
        highlight="Achievements"
        subtitle="Những con số và dấu ấn nổi bật trong hành trình phát triển"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {achievements.map((stat, i) => (
            <StatBox key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Right: Highlights List */}
        <div className="space-y-4">
          <h3
            className="text-lg font-bold mb-4 ml-2"
            style={{ color: "var(--color-text-primary)" }}
          >
            Highlights
          </h3>
          {achievementHighlights.map((hl, i) => (
            <HighlightCard key={hl.title} highlight={hl} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
