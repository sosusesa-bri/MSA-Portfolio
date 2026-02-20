"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Filter } from "lucide-react";
import { SectionHeading, Card, Badge, Button } from "@/components/ui";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { projects } from "@/lib/constants";

const categories = ["all", "frontend", "backend", "fullstack"];

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="py-10 relative min-h-screen overflow-hidden">
      {/* Background Animation - Subtle Aurora Effect */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-[20%] -left-[10%] w-[70vh] h-[70vh] rounded-full blur-[100px] opacity-20"
          style={{ background: "var(--gradient-start)" }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-[40%] -right-[10%] w-[60vh] h-[60vh] rounded-full blur-[100px] opacity-20"
          style={{ background: "var(--gradient-end)" }}
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-[20%] left-[20%] w-[80vh] h-[80vh] rounded-full blur-[100px] opacity-10"
          style={{ background: "#6c5ce7" }}
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div> */}

      <div className="relative z-10">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Bar */}
        {/* <AnimatedContainer className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === cat ? "text-white shadow-lg" : ""
              }`}
              style={
                activeFilter === cat
                  ? {}
                  : {
                      background: "var(--bg-tertiary)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-color)",
                    }
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeFilter === cat && (
                <motion.div
                  className="absolute inset-0 rounded-xl gradient-bg"
                  layoutId="filterBg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              <span className="relative z-10">
                {cat === "all" ? (
                  <span className="flex items-center gap-1.5">
                    <Filter size={14} />
                    {t(`filter.${cat}`)}
                  </span>
                ) : (
                  t(`filter.${cat}`)
                )}
              </span>
            </motion.button>
          ))}
        </AnimatedContainer> */}

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Card className="h-full flex flex-col group overflow-hidden !p-0">
                  {/* Project Image */}
                  {/* Project Image */}
                  <div
                    className="h-48 relative overflow-hidden bg-muted group-hover:scale-105 transition-transform duration-500"
                  >
                    {project.image ? (
                      <div className="relative w-full h-full">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                           <Button href={project.live} variant="primary" size="sm" className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                             {t("viewProject")}
                           </Button>
                         </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl opacity-50">
                        {project.category === "frontend"
                          ? "🎨"
                          : project.category === "backend"
                          ? "⚙️"
                          : "🚀"}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3
                      className="text-lg font-bold mb-2 group-hover:text-primary-500 transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-sm mb-4 flex-1"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="primary">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      <Button href={project.live} variant="primary" size="sm">
                        <ExternalLink size={14} />
                        {t("viewProject")}
                      </Button>
                      <Button href={project.github} variant="secondary" size="sm">
                        <Github size={14} />
                        {t("viewCode")}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      </div>
    </div>
  );
}
