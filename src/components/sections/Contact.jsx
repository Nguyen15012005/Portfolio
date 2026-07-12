/**
 * Contact.jsx
 * Form liên hệ sử dụng EmailJS. Có validation, loading state, và toast thông báo.
 */

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Send,
  MapPin,
  Mail,
  Phone,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { personalInfo } from "../../data/portfolioData";
import { EMAILJS_CONFIG } from "../../constants";
import SectionWrapper, { SectionHeader } from "../ui/SectionWrapper";
import { useTheme } from "../../hooks/useTheme";

// Simple Toast component (can be extracted if needed elsewhere)
function Toast({ message, type, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      {type === "success" ? <CheckCircle size={20} /> : <XCircle size={20} />}
      <span className="font-semibold text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
        <XCircle size={16} />
      </button>
    </motion.div>
  );
}

export default function Contact() {
  const formRef = useRef(null);
  const { isDark } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const isEmailConfigured = Boolean(
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.templateId &&
    EMAILJS_CONFIG.publicKey,
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setToast({
        type: "error",
        message: "Vui lòng điền các trường bắt buộc.",
      });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    if (!isEmailConfigured) {
      setToast({
        type: "error",
        message:
          "Contact form chưa được cấu hình EmailJS. Vui lòng liên hệ qua email.",
      });
      setTimeout(() => setToast(null), 4000);
      return;
    }

    setIsSubmitting(true);
    try {
      // NOTE: Configure EmailJS in constants/index.js or .env
      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        EMAILJS_CONFIG.publicKey,
      );
      setToast({ type: "success", message: "Gửi tin nhắn thành công!" });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setToast({
        type: "error",
        message: "Có lỗi xảy ra, vui lòng thử lại sau.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  const inputStyle = {
    background: isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.5)",
    border: "1px solid",
    borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
    color: isDark ? "#fff" : "#0f172a",
  };

  return (
    <SectionWrapper id="contact" animation="fade-up">
      <SectionHeader
        badge="Contact"
        title="Get In"
        highlight="Touch"
        subtitle="Có ý tưởng dự án mới hoặc cần tư vấn? Đừng ngần ngại liên hệ với tôi"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
        {/* Left: Contact Info */}
        <div className="lg:col-span-2 space-y-6">
          <div
            className="glass-card p-8 h-full"
            style={{ borderColor: "rgba(37,99,235,0.15)" }}
          >
            <h3
              className="text-2xl font-bold mb-6"
              style={{ color: isDark ? "#f8fafc" : "#0f172a" }}
            >
              Let's talk about your project
            </h3>
            <p
              className="text-sm leading-relaxed mb-8"
              style={{ color: "var(--color-text-secondary)" }}
            >
              I am currently open to new job opportunities (full-time or
              freelance). If you have a project that needs support or simply
              want to connect, please send me a message.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "Location",
                  text: personalInfo.location,
                },
                {
                  icon: Mail,
                  title: "Email",
                  text: personalInfo.email,
                  link: `mailto:${personalInfo.email}`,
                },
                {
                  icon: Phone,
                  title: "Phone",
                  text: personalInfo.phone,
                  link: `tel:${personalInfo.phone.replace(/\s+/g, "")}`,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: "rgba(37,99,235,0.1)",
                      border: "1px solid rgba(37,99,235,0.2)",
                      color: "#38bdf8",
                    }}
                  >
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {item.title}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="font-medium text-sm transition-colors hover:text-blue-400"
                        style={{ color: isDark ? "#fff" : "#0f172a" }}
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p
                        className="font-medium text-sm"
                        style={{ color: isDark ? "#fff" : "#0f172a" }}
                      >
                        {item.text}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability Indicator */}
            <div
              className="mt-10 p-4 rounded-xl flex items-center gap-3"
              style={{
                background: "rgba(34,197,94,0.05)",
                border: "1px solid rgba(34,197,94,0.15)",
              }}
            >
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <div>
                <p className="text-sm font-semibold text-green-400">
                  Available for new opportunities
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Phản hồi trong vòng 24 giờ
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-3">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-card p-8"
            style={{ borderColor: "rgba(37,99,235,0.15)" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl outline-none transition-colors focus:border-blue-500 text-sm"
                  style={inputStyle}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl outline-none transition-colors focus:border-blue-500 text-sm"
                  style={inputStyle}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl outline-none transition-colors focus:border-blue-500 text-sm"
                style={inputStyle}
                placeholder="Project Inquiry"
              />
            </div>

            <div className="mb-8">
              <label
                className="block text-xs font-semibold mb-2 uppercase tracking-wider"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 rounded-xl outline-none transition-colors focus:border-blue-500 text-sm resize-none"
                style={inputStyle}
                placeholder="Hello Trung Nguyên, I would like to discuss..."
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full btn py-3.5 text-sm ${isSubmitting ? "bg-blue-800 cursor-not-allowed opacity-70" : "btn-primary"}`}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
