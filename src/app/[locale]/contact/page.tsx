"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Instagram, Mail, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { SectionHeading, Card, Button } from "@/components/ui";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { siteConfig } from "@/lib/constants";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = t("form.validation.nameRequired");
    if (!formState.email.trim()) newErrors.email = t("form.validation.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email))
      newErrors.email = t("form.validation.emailInvalid");
    if (!formState.message.trim()) newErrors.message = t("form.validation.messageRequired");
    else if (formState.message.length < 10)
      newErrors.message = t("form.validation.messageTooShort");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const socialLinks = [
    { icon: Github, url: siteConfig.github, label: "GitHub", color: "#333" },
    { icon: Linkedin, url: siteConfig.linkedin, label: "LinkedIn", color: "#0077B5" },
    { icon: Instagram, url: siteConfig.instagram, label: "Instagram", color: "#1DA1F2" },
    { icon: Mail, url: `mailto:${siteConfig.email}`, label: "Email", color: "#6c5ce7" },
  ];

  return (
    <div className="py-10">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedContainer direction="left">
            <Card className="!p-8">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t("form.name")}
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, name: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-primary-500/30"
                    style={{
                      background: "var(--bg-tertiary)",
                      border: errors.name ? "1px solid #ef4444" : "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                    placeholder={t("form.name")}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t("form.email")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, email: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-primary-500/30"
                    style={{
                      background: "var(--bg-tertiary)",
                      border: errors.email ? "1px solid #ef4444" : "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                    placeholder={t("form.email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {t("form.message")}
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 resize-none focus:ring-2 focus:ring-primary-500/30"
                    style={{
                      background: "var(--bg-tertiary)",
                      border: errors.message ? "1px solid #ef4444" : "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                    placeholder={t("form.message")}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? (
                    t("form.sending")
                  ) : (
                    <>
                      <Send size={16} />
                      {t("form.send")}
                    </>
                  )}
                </Button>

                {/* Status Messages */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 text-green-500 text-sm"
                  >
                    <CheckCircle size={16} />
                    {t("form.success")}
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 text-red-500 text-sm"
                  >
                    <AlertCircle size={16} />
                    {t("form.error")}
                  </motion.div>
                )}
              </form>
            </Card>
          </AnimatedContainer>

          {/* Contact Info */}
          <AnimatedContainer direction="right">
            <div className="space-y-8">
              {/* Description */}
              <div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t("description")}
                </h3>
              </div>

              {/* Location */}
              <Card className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                    Location
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Indonesia 🇮🇩
                  </p>
                </div>
              </Card>

              {/* Email */}
              <Card className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                    {t("social.email")}
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-sm hover:text-primary-500 transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </Card>

              {/* Social Links */}
              <div>
                <h4
                  className="text-lg font-semibold mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t("social.title")}
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map(({ icon: Icon, url, label }) => (
                    <motion.a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl glass flex items-center justify-center transition-all duration-300"
                      style={{ color: "var(--text-secondary)" }}
                      whileHover={{ y: -4, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={label}
                    >
                      <Icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
}
