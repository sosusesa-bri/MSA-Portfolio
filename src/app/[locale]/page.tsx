"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui";
import { TechIcon } from "@/components/ui/TechIcon";
import { Typewriter } from "@/components/ui/Typewriter";
import {
  AnimatedContainer,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/AnimatedContainer";
import { techStack } from "@/lib/constants";

export default function HomePage() {
  const t = useTranslations("home");
  const locale = useLocale();

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: "var(--gradient-start)" }}
          />
          <div
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: "var(--gradient-end)" }}
          />
          {/* Floating dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background:
                  i % 2 === 0 ? "var(--gradient-start)" : "var(--gradient-end)",
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
                opacity: 0.4,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            {/* Greeting Line */}
            <AnimatedContainer delay={0.1}>
              <span
                className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-6"
                style={{
                  background: "rgba(108, 92, 231, 0.1)",
                  color: "var(--gradient-start)",
                  border: "1px solid rgba(108, 92, 231, 0.2)",
                }}
              >
                👋 {t("greeting")}
              </span>
            </AnimatedContainer>

            {/* Name */}
            <AnimatedContainer delay={0.2}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-4">
                <span className="gradient-text">{t("name")}</span>
              </h1>
            </AnimatedContainer>

            {/* Role */}
            <AnimatedContainer delay={0.3}>
              <h2
                className="text-2xl sm:text-3xl font-semibold mb-6 font-mono h-10"
                style={{ color: "var(--text-secondary)" }}
              >
                {"< "}
                <span style={{ color: "var(--gradient-end)" }}>
                  <Typewriter
                    strings={[
                      "Full Stack Developer",
                      "UI/UX Designer",
                      "Frontend Specialist",
                      "Backend Specialist",
                    ]}
                  />
                </span>
                {" />"}
              </h2>
            </AnimatedContainer>

            {/* Description */}
            <AnimatedContainer delay={0.4}>
              <p
                className="text-lg max-w-xl mb-8 leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {t("description")}
              </p>
            </AnimatedContainer>

            {/* CTA Buttons */}
            <AnimatedContainer delay={0.5}>
              <div className="flex flex-wrap gap-4">
                <Button
                  href={`/${locale}/projects`}
                  variant="primary"
                  size="lg"
                >
                  {t("cta.projects")}
                  <ArrowRight size={18} />
                </Button>
                <Button
                  href={`/${locale}/contact`}
                  variant="secondary"
                  size="lg"
                >
                  {t("cta.contact")}
                </Button>
                <Button href={`/${locale}/dashboard`} variant="ghost" size="lg">
                  <BarChart3 size={18} />
                  {t("cta.dashboard")}
                </Button>
              </div>
            </AnimatedContainer>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} style={{ color: "var(--text-tertiary)" }} />
        </motion.div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContainer className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold gradient-text inline-block mb-3">
              {t("techStack.title")}
            </h2>
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              {t("techStack.subtitle")}
            </p>
            <div className="mt-4 mx-auto w-20 h-1 rounded-full gradient-bg" />
          </AnimatedContainer>

          <StaggerContainer className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {techStack.map((tech) => (
              <StaggerItem key={tech.name}>
                <motion.div
                  className="glass rounded-2xl p-4 flex flex-col items-center gap-2 cursor-default"
                  whileHover={{ y: -6, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <TechIcon name={tech.name} size={40} />
                  <span
                    className="text-xs font-medium text-center"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {tech.name}
                  </span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
