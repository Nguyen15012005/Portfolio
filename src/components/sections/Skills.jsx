/**
 * Skills.jsx
 * Hiển thị kỹ năng theo category với tabs, progress bars và skill cards.
 * Animation reveal khi scroll vào viewport.
 */

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiSpring,
  SiMysql,
  SiPostgresql,
  SiMariadb,
  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,
  SiIntellijidea,
  SiPostman,
  SiFigma,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiVercel,
} from "react-icons/si";
import { FaJava, FaCss3Alt, FaCode } from "react-icons/fa";
import { Monitor, Server, Database, Container, Wrench } from "lucide-react";
import { skillCategories } from "../../data/portfolioData";
import SectionWrapper, { SectionHeader } from "../ui/SectionWrapper";
import { getSkillLevel } from "../../utils/helpers";
import { useTheme } from "../../hooks/useTheme";

// Icon map
const SI_ICONS = {
  SiHtml5,
  SiCss3: FaCss3Alt,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiRedux,
  SiTailwindcss,

  SiSpring,
  SiSpringsecurity: SiSpring,
  SiHibernate: SiSpring,
  SiOpenapiinitiative: SiSpring,

  SiMysql,
  SiPostgresql,
  SiMariadb,

  SiDocker,
  SiGit,
  SiGithub,
  SiLinux,

  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiVercel,

  SiVisualstudiocode: FaCode,
  SiIntellijidea,
  SiPostman,
  SiFigma,

  SiJava: FaJava,
};

const CAT_ICONS = { Monitor, Server, Database, Container, Wrench };

function SkillBar({ skill, index, categoryColor }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Icon = SI_ICONS[skill.icon];
  const level = getSkillLevel(skill.level);
  const { isDark } = useTheme();

  return (
    <motion.div
      ref={ref}
      className="glass-card p-4 group hover:border-blue-500/30 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.06,
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -3 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `${skill.color}15`,
              border: `1px solid ${skill.color}30`,
            }}
          >
            {Icon ? (
              <Icon size={18} style={{ color: skill.color }} />
            ) : (
              <span
                className="text-xs font-bold"
                style={{ color: skill.color }}
              >
                {skill.name.slice(0, 2)}
              </span>
            )}
          </div>
          <span
            className="font-semibold text-sm"
            style={{ color: isDark ? "#f8fafc" : "#0f172a" }}
          >
            {skill.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: `${level.color}15`,
              color: level.color,
              border: `1px solid ${level.color}30`,
            }}
          >
            {level.label}
          </span>
          <span
            className="text-xs font-mono font-bold"
            style={{ color: categoryColor }}
          >
            {skill.level}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{
          background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${categoryColor}, ${skill.color})`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: index * 0.06 + 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");
  const { isDark } = useTheme();

  const activeCategory = skillCategories.find((c) => c.id === activeTab);

  return (
    <SectionWrapper
      id="skills"
      className={
        isDark ? "bg-[rgba(10,15,30,0.3)]" : "bg-[rgba(241,245,249,0.5)]"
      }
      animation="fade-up"
    >
      <SectionHeader
        badge="Skills & Technologies"
        title="What I"
        highlight="Work With"
        subtitle="Một bộ kỹ năng đa dạng từ frontend đến backend, database và DevOps"
      />

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {skillCategories.map((cat) => {
          const Icon = CAT_ICONS[cat.icon];
          const isActive = activeTab === cat.id;
          return (
            <motion.button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: isActive
                  ? `${cat.color}18`
                  : "rgba(255,255,255,0.03)",
                border: isActive
                  ? `1px solid ${cat.color}50`
                  : "1px solid rgba(255,255,255,0.08)",
                color: isActive ? cat.color : "var(--color-text-secondary)",
                boxShadow: isActive ? `0 0 20px ${cat.color}15` : "none",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {Icon && <Icon size={15} />}
              {cat.label}
              <span
                className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full font-mono"
                style={{ background: `${cat.color}20`, color: cat.color }}
              >
                {cat.skills.length}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
        >
          {activeCategory?.skills.map((skill, i) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              index={i}
              categoryColor={activeCategory.color}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Summary footer */}
      <motion.div
        className="mt-12 glass-card p-6 flex flex-wrap justify-center gap-x-8 gap-y-4"
        style={{ borderColor: "rgba(37,99,235,0.12)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        {skillCategories.map((cat) => {
          const Icon = CAT_ICONS[cat.icon];
          return (
            <div key={cat.id} className="flex items-center gap-2">
              {Icon && <Icon size={14} style={{ color: cat.color }} />}
              <span
                className="text-xs font-medium"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {cat.label}
              </span>
              <span
                className="text-xs font-bold px-1.5 py-0.5 rounded-md"
                style={{ background: `${cat.color}15`, color: cat.color }}
              >
                {cat.skills.length} skills
              </span>
            </div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
