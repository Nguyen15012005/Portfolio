/**
 * LoadingScreen.jsx
 * Màn hình loading ban đầu với animation logo và code terminal mock.
 * Tự động ẩn sau khi app load xong.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CODE_LINES = [
  "> Initializing portfolio...",
  "> Loading components...",
  "> Connecting to database...",
  "> Compiling skills...",
  "> Building projects...",
  "> Ready! 🚀",
];

export default function LoadingScreen({ onComplete }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lineIndex = 0;
    const interval = setInterval(() => {
      lineIndex++;
      setCurrentLine(lineIndex);
      if (lineIndex >= CODE_LINES.length) {
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 600);
        }, 400);
      }
    }, 280);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#030712" }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute inset-0 bg-radial-fade" />

          {/* Logo */}
          <motion.div
            className="relative mb-12 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-full animate-pulse-glow"
              style={{
                filter: "blur(40px)",
                background:
                  "radial-gradient(circle, rgba(37,99,235,0.5), transparent 70%)",
              }}
            />

            {/* Logo mark */}
            <div
              className="relative w-30 h-30 rounded-2xl flex items-center justify-center mb-5"
              style={{
                boxShadow: "0 0 0 rgba(37,99,235,0.5)",
              }}
            >
              <img
                className="rounded-full w-full h-full"
                src="/avatar.jpg"
                alt=""
              />
            </div>

            <motion.p
              className="text-base font-semibold tracking-[0.3em] uppercase"
              style={{ color: "#38bdf8" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Portfolio
            </motion.p>
          </motion.div>

          {/* Terminal mock */}
          <motion.div
            className="glass-card w-full max-w-sm mx-4 p-5"
            style={{ borderColor: "rgba(37,99,235,0.25)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {/* Terminal header */}
            <div
              className="flex items-center gap-2 mb-4 pb-3 border-b"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
              <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
              <span className="ml-2 text-xs text-slate-500 font-mono">
                bash — portfolio
              </span>
            </div>

            {/* Code lines */}
            <div className="space-y-2">
              {CODE_LINES.slice(0, currentLine + 1).map((line, i) => (
                <motion.p
                  key={i}
                  className="text-sm font-mono flex items-center gap-2"
                  style={{
                    color:
                      i === currentLine ? "#38bdf8" : "rgba(148,163,184,0.6)",
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {line}
                  {i === currentLine && i < CODE_LINES.length - 1 && (
                    <motion.span
                      className="inline-block w-2 h-4 bg-blue-400"
                      animate={{ opacity: [1, 0] }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  )}
                </motion.p>
              ))}
            </div>

            {/* Progress bar */}
            <div
              className="mt-5 h-1 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #2563eb, #38bdf8)",
                }}
                initial={{ width: "0%" }}
                animate={{
                  width: `${((currentLine + 1) / CODE_LINES.length) * 100}%`,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
