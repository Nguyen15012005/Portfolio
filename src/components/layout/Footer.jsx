import { motion } from "framer-motion";
import { Heart, ArrowUp, MapPin, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";
import { navLinks, personalInfo } from "../../data/portfolioData";
import { scrollToSection } from "../../utils/helpers";
import { useTheme } from "../../hooks/useTheme";

const SOCIAL_LINKS = [
  {
    icon: FaGithub,
    href: personalInfo.social.github,
    label: "GitHub",
    color: "#ffffff",
  },
  {
    icon: FaLinkedin,
    href: personalInfo.social.linkedin,
    label: "LinkedIn",
    color: "#0a66c2",
  },
  {
    icon: FaFacebook,
    href: personalInfo.social.facebook,
    label: "Facebook",
    color: "#1877f2",
  },
  {
    icon: FaEnvelope,
    href: personalInfo.social.email,
    label: "Email",
    color: "#22c55e",
  },
];

export default function Footer() {
  const { isDark } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative pt-16 pb-8 overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(to bottom, transparent, rgba(3,7,18,0.95))"
          : "linear-gradient(to bottom, transparent, rgba(241,245,249,0.95))",
        borderTop: isDark
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(37,99,235,0.5), transparent)",
        }}
      />

      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white"
                style={{
                  background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                TN
              </div>
              <div>
                <p
                  className="font-bold text-sm"
                  style={{ color: isDark ? "#fff" : "#0f172a" }}
                >
                  {personalInfo.nameShort}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Backend / Full Stack Developer
                </p>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              I focus on building real-world web applications using React,
              Spring Boot, and SQL.
            </p>

            <div className="flex gap-3 mt-5">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  whileHover={{
                    scale: 1.12,
                    background: `${color}18`,
                    borderColor: `${color}40`,
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={15} style={{ color }} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3
              className="font-semibold text-sm mb-4 tracking-wider uppercase"
              style={{ color: "#38bdf8" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href.replace("#", ""))}
                    className="text-sm transition-colors duration-200 text-left"
                    style={{ color: "var(--color-text-secondary)" }}
                    onMouseEnter={(e) => (e.target.style.color = "#38bdf8")}
                    onMouseLeave={(e) =>
                      (e.target.style.color = "var(--color-text-secondary)")
                    }
                  >
                    → {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="font-semibold text-sm mb-4 tracking-wider uppercase"
              style={{ color: "#38bdf8" }}
            >
              Contact
            </h3>
            <div
              className="space-y-3 text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <p className="flex items-center gap-2">
                <MapPin size={14} /> {personalInfo.location}
              </p>
              <a
                href={personalInfo.social.email}
                className="flex items-center gap-2 transition-colors duration-200"
                style={{ color: "var(--color-text-secondary)" }}
                onMouseEnter={(e) => (e.target.style.color = "#38bdf8")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "var(--color-text-secondary)")
                }
              >
                <Mail size={14} /> {personalInfo.email}
              </a>
              <div className="flex items-center gap-2 mt-4">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-medium">
                  Available for work
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="h-px w-full mb-6"
          style={{
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
          }}
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-center"
            style={{ color: "var(--color-text-muted)" }}
          >
            © {year} {personalInfo.name}. Built with{" "}
            <Heart size={10} className="inline text-red-400 mx-0.5" />
            using React.
          </p>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full transition-all"
            style={{
              background: "rgba(37,99,235,0.1)",
              border: "1px solid rgba(37,99,235,0.2)",
              color: "#38bdf8",
            }}
            whileHover={{ background: "rgba(37,99,235,0.18)", scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowUp size={12} />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
