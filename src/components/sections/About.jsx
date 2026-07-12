/**
 * About.jsx
 * Giới thiệu bản thân với bio, timeline, và animated counter statistics.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { personalInfo, stats, aboutTimeline } from "../../data/portfolioData";
import SectionWrapper, { SectionHeader } from "../ui/SectionWrapper";
import { getColorFromKey } from "../../utils/helpers";
import { useTheme } from "../../hooks/useTheme";
import {
  Rocket,
  Server,
  Layers,
  Database,
  Container,
  Briefcase,
  FolderKanban,
  Award,
  Code2,
  Calendar,
} from "lucide-react";

const ICON_MAP = {
  Rocket,
  Server,
  Layers,
  Database,
  Container,
  Briefcase,
  FolderKanban,
  Award,
  Code2,
  Calendar,
};

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const Icon = ICON_MAP[stat.icon] ?? Award;

  return (
    <motion.div
      ref={ref}
      className="glass-card p-6 text-center group"
      style={{ borderColor: "rgba(37,99,235,0.12)" }}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
    >
      {Icon && (
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto transition-all duration-300 group-hover:scale-110"
          style={{
            background: "rgba(37,99,235,0.1)",
            border: "1px solid rgba(37,99,235,0.2)",
          }}
        >
          <Icon size={22} className="text-blue-400" />
        </div>
      )}
      <div className="text-4xl font-black mb-1 gradient-text-blue">
        {inView ? (
          <CountUp
            end={stat.value}
            duration={2.2}
            delay={index * 0.1}
            separator=","
          />
        ) : (
          "0"
        )}
        <span>{stat.suffix}</span>
      </div>
      <p
        className="text-sm font-medium"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = index % 2 === 0;
  const color = getColorFromKey(item.color);
  const Icon = ICON_MAP[item.icon];
  const { isDark } = useTheme();

  return (
    <div
      ref={ref}
      className={`relative flex gap-4 md:gap-8 items-start mb-10 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
    >
      {/* Icon node */}
      <div className="flex-shrink-0 relative z-10">
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: `${color}15`,
            border: `2px solid ${color}40`,
            boxShadow: `0 0 20px ${color}20`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.08, type: "spring", stiffness: 200 }}
        >
          {Icon && <Icon size={20} style={{ color }} />}
        </motion.div>
        {/* Year badge */}
        <div
          className="absolute -bottom-1 -right-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md text-white"
          style={{ background: color, fontSize: "10px" }}
        >
          {item.year}
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="flex-1 glass-card p-5"
        style={{ borderColor: `${color}20` }}
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{
          delay: index * 0.08 + 0.1,
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <h3
          className="font-bold text-base mb-1.5"
          style={{ color: isDark ? "#f8fafc" : "#0f172a" }}
        >
          {item.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {item.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function About() {
  const { isDark } = useTheme();

  return (
    <SectionWrapper id="about" animation="fade-up">
      <SectionHeader
        badge="About Me"
        title="Who I"
        highlight="Am"
        subtitle="Passionate developer with a love for clean code and scalable systems"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-20">
        {/* Bio */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Avatar */}
          <div className="glass-card p-6 mb-6 flex items-center gap-4">
            <img
              src={personalInfo.avatar}
              alt={`${personalInfo.nameShort} avatar`}
              className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
              style={{
                objectPosition: "center 38%",
                boxShadow: "0 0 30px rgba(37,99,235,0.35)",
              }}
            />
            <div>
              <h3
                className="font-bold"
                style={{ color: isDark ? "#f8fafc" : "#0f172a" }}
              >
                {personalInfo.nameShort}
              </h3>
              <p className="text-sm" style={{ color: "#38bdf8" }}>
                {personalInfo.role}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "var(--color-text-muted)" }}
              >
                📍 {personalInfo.location}
              </p>
            </div>
          </div>

          <div className="glass-card p-6 space-y-4">
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {personalInfo.description}
            </p>

            <div className="pt-2 space-y-3">
              {[
                { label: "Name", value: personalInfo.name },
                { label: "Email", value: personalInfo.email },
                { label: "Location", value: personalInfo.location },
                {
                  label: "Status",
                  value: "Available for work",
                  highlight: true,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col sm:flex-row gap-1 sm:gap-3"
                >
                  <span
                    className="text-xs font-semibold tracking-wider uppercase w-20 shrink-0"
                    style={{ color: "#38bdf8" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`text-sm ${item.highlight ? "text-green-400 font-semibold" : ""}`}
                    style={
                      !item.highlight
                        ? { color: "var(--color-text-secondary)" }
                        : {}
                    }
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="lg:col-span-3">
          <h3
            className="text-lg font-bold mb-8"
            style={{ color: isDark ? "#f8fafc" : "#0f172a" }}
          >
            My Journey
          </h3>
          <div className="relative">
            {/* Vertical line on mobile */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px md:hidden"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(37,99,235,0.3), transparent)",
              }}
            />
            {aboutTimeline.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
