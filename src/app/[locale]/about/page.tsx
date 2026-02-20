"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { User, Briefcase, Award } from "lucide-react";
import { SectionHeading, Card } from "@/components/ui";
import { TechIcon } from "@/components/ui/TechIcon";
import { AnimatedContainer, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedContainer";
import { skills, techStack } from "@/lib/constants";

export default function AboutPage() {
  const t = useTranslations("about");

  const stats = [
    { icon: <Briefcase size={20} className="text-white" />, label: t("bio.experience") },
    { icon: <Award size={20} className="text-white" />, label: t("bio.projects") },
    { icon: <User size={20} className="text-white" />, label: t("bio.clients") },
  ];

  return (
    <div className="py-10">
      {/* Header */}
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      {/* Bio Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Avatar Side */}
          <AnimatedContainer direction="left">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-3xl gradient-bg p-1">
                <div
                  className="w-full h-full rounded-3xl overflow-hidden relative"
                  style={{ background: "var(--bg-primary)" }}
                >
                  {/* Profile Image - User to replace with actual image */}
                  <img
                    src="/images/profile.jpg"
                    alt="Muhammad Sabri Akbar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image not found
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement!.innerHTML = `
                        <div class="flex items-center justify-center w-full h-full text-center p-4">
                          <div>
                            <div class="text-6xl mb-4"></div>
                            <p class="font-mono text-xs opacity-70">Add profile.jpg to public/images/</p>
                          </div>
                        </div>
                      `;
                    }}
                  />
                </div>
              </div>
              {/* Floating badges - 8 items */}
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Node.js",
                "Python",
                "Docker",
                "Figma",
              ].map((tech, i) => (
                <motion.div
                  key={tech}
                  className="absolute glass px-3 py-2 rounded-full flex items-center gap-2"
                  style={{
                    color: "var(--text-secondary)",
                    top: `${10 + i * 12}%`,
                    right: i % 2 === 0 ? "-20px" : "auto",
                    left: i % 2 !== 0 ? "-20px" : "auto",
                    zIndex: 20,
                  }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                >
                  <TechIcon name={tech} size={16} />
                  <span className="text-xs font-medium">{tech}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedContainer>

          {/* Bio Text Side */}
          <AnimatedContainer direction="right">
            <h3 className="text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
              {t("bio.title")}
            </h3>
            <p className="mb-6 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {t("bio.description")}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <Card key={i} className="text-center !p-4">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-2">
                    {stat.icon}
                  </div>
                  <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                    {stat.label}
                  </p>
                </Card>
              ))}
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t("skills.title")} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(["frontend", "backend", "tools"] as const).map((category, catIdx) => (
              <AnimatedContainer key={category} delay={catIdx * 0.15}>
                <Card className="h-full">
                  <h3 className="text-lg font-bold mb-6 gradient-text">
                    {t(`skills.${category}`)}
                  </h3>
                  <div className="space-y-4">
                    {skills[category].map((skill, i) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span
                            className="text-sm font-medium"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {skill.name}
                          </span>
                          <span
                            className="text-xs font-mono"
                            style={{ color: "var(--text-tertiary)" }}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <div
                          className="h-2 rounded-full overflow-hidden"
                          style={{ background: "var(--bg-tertiary)" }}
                        >
                          <motion.div
                            className="h-full rounded-full gradient-bg"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: 0.3 + i * 0.1,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={t("techStack.title")} subtitle={t("techStack.subtitle")} />

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {techStack.map((tech) => (
              <StaggerItem key={tech.name}>
                <motion.div
                  className="glass rounded-2xl p-5 flex flex-col items-center gap-3 cursor-default"
                  whileHover={{ y: -6, scale: 1.05 }}
                >
                  <TechIcon name={tech.name} size={40} />
                  <span
                    className="text-sm font-medium text-center"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {tech.name}
                  </span>
                  <span
                    className="text-xs capitalize px-2 py-0.5 rounded-full"
                    style={{
                      background: "var(--bg-tertiary)",
                      color: "var(--text-tertiary)",
                    }}
                  >
                    {tech.category}
                  </span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
