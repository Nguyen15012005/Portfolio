import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, ExternalLink } from "lucide-react";
import { navLinks, personalInfo } from "../../data/portfolioData";
import { useActiveSection } from "../../hooks/useScrollAnimation";
import { scrollToSection } from "../../utils/helpers";
import ThemeToggle from "../ui/ThemeToggle";
import { useTheme } from "../../hooks/useTheme";
import { SECTION_IDS } from "../../constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);
  const { isDark } = useTheme();
  const hasResume = Boolean(personalInfo.resumeUrl);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback((href) => {
    scrollToSection(href.replace("#", ""), 80);
    setMobileOpen(false);
  }, []);

  const navBg = scrolled
    ? isDark
      ? "rgba(3,7,18,0.85)"
      : "rgba(248,250,252,0.85)"
    : "transparent";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{ height: scrolled ? 60 : 72, transition: "height 0.3s ease" }}
      >
        <div
          className="h-full"
          style={{
            background: navBg,
            backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
            WebkitBackdropFilter: scrolled
              ? "blur(20px) saturate(180%)"
              : "none",
            borderBottom: scrolled
              ? isDark
                ? "1px solid rgba(255,255,255,0.06)"
                : "1px solid rgba(0,0,0,0.06)"
              : "1px solid transparent",
            transition: "all 0.35s ease",
            boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.12)" : "none",
          }}
        >
          <div className="section-container h-full flex items-center justify-between gap-4">
            <motion.button
              onClick={() => handleNavClick("#home")}
              className="flex items-center gap-3 shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              aria-label="Go to home"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm text-white"
                style={{
                  background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                  boxShadow: "0 0 16px rgba(37,99,235,0.35)",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                <img
                  className="rounded-full w-full h-full"
                  src="/avatar.jpg"
                  alt=""
                />
              </div>
              <span
                className={`font-bold text-base hidden sm:block transition-colors duration-300 ${isDark ? "text-white" : "text-slate-900"}`}
              >
                {personalInfo.nameShort}
              </span>
            </motion.button>

            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-blue-400"
                        : isDark
                          ? "text-slate-400 hover:text-white"
                          : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: "rgba(37,99,235,0.1)" }}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.4,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 shrink-0">
              <ThemeToggle />

              {hasResume && (
                <motion.a
                  href={personalInfo.resumeUrl}
                  download
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200"
                  style={{
                    background: "rgba(37,99,235,0.1)",
                    border: "1px solid rgba(37,99,235,0.25)",
                    color: "#38bdf8",
                  }}
                  whileHover={{
                    background: "rgba(37,99,235,0.18)",
                    borderColor: "rgba(37,99,235,0.5)",
                    scale: 1.02,
                  }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Download resume"
                >
                  <Download size={14} />
                  Resume
                </motion.a>
              )}

              <motion.button
                onClick={() => handleNavClick("#contact")}
                className="hidden lg:flex items-center gap-1.5 btn btn-primary text-sm py-2 px-4"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <ExternalLink size={14} />
                Hire Me
              </motion.button>

              <motion.button
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg"
                style={{
                  background: "rgba(37,99,235,0.1)",
                  border: "1px solid rgba(37,99,235,0.2)",
                }}
                onClick={() => setMobileOpen((prev) => !prev)}
                whileTap={{ scale: 0.9 }}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={mobileOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {mobileOpen ? (
                      <X size={18} className="text-blue-400" />
                    ) : (
                      <Menu
                        size={18}
                        className={isDark ? "text-white" : "text-slate-700"}
                      />
                    )}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[98] md:hidden"
              style={{
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(4px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[99] w-72 md:hidden flex flex-col"
              style={{
                background: isDark
                  ? "rgba(5,10,25,0.98)"
                  : "rgba(248,250,252,0.98)",
                backdropFilter: "blur(20px)",
                borderLeft: isDark
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "1px solid rgba(0,0,0,0.08)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div
                className="flex items-center justify-between p-6 border-b"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                <span
                  className="font-bold text-lg"
                  style={{ color: isDark ? "#fff" : "#0f172a" }}
                >
                  Menu
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X
                    size={20}
                    className={isDark ? "text-slate-400" : "text-slate-600"}
                  />
                </button>
              </div>

              <nav
                className="flex-1 overflow-y-auto p-4 space-y-1"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link, i) => {
                  const id = link.href.replace("#", "");
                  const isActive = activeSection === id;
                  return (
                    <motion.button
                      key={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background: isActive
                          ? "rgba(37,99,235,0.12)"
                          : "transparent",
                        color: isActive
                          ? "#38bdf8"
                          : isDark
                            ? "#94a3b8"
                            : "#475569",
                        borderLeft: isActive
                          ? "2px solid #2563eb"
                          : "2px solid transparent",
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
              </nav>

              <div
                className="p-4 space-y-3 border-t"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                {hasResume && (
                  <a
                    href={personalInfo.resumeUrl}
                    download
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
                    style={{
                      background: "rgba(37,99,235,0.12)",
                      border: "1px solid rgba(37,99,235,0.25)",
                      color: "#38bdf8",
                    }}
                  >
                    <Download size={16} />
                    Download Resume
                  </a>
                )}
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="w-full btn btn-primary py-3 text-sm"
                >
                  Hire Me
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
