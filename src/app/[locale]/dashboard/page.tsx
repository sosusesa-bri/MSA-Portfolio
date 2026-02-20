"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Github,
  Clock,
  Eye,
  Keyboard,
  Activity,
  TrendingUp,
  Users,
  Zap,
  BarChart3,
  Code,
  Globe,
  Target,
  AlertCircle,
} from "lucide-react";
import { SectionHeading, Card, StatCard } from "@/components/ui";
import { AnimatedContainer, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedContainer";
import {
  demoGithubData,
  demoWakatimeData,
  demoAnalyticsData,
  demoTypingData,
} from "@/lib/constants";

// Dynamically import chart components to reduce initial bundle
const DashboardCharts = dynamic(() => import("@/components/dashboard/DashboardCharts"), {
  ssr: false,
  loading: () => (
    <div className="h-64 rounded-2xl animate-pulse" style={{ background: "var(--bg-tertiary)" }} />
  ),
});

export default function DashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="py-10">
      <SectionHeading title={t("title")} subtitle={t("subtitle")} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Demo Data Banner */}
        <AnimatedContainer>
          <div
            className="flex items-center gap-3 p-4 rounded-xl text-sm"
            style={{
              background: "rgba(108, 92, 231, 0.1)",
              border: "1px solid rgba(108, 92, 231, 0.2)",
              color: "var(--text-secondary)",
            }}
          >
            <AlertCircle size={18} className="text-primary-500 flex-shrink-0" />
            <span>{t("demoData")} — {t("error")}</span>
          </div>
        </AnimatedContainer>

        {/* ===== GitHub Statistics ===== */}
        <section>
          <AnimatedContainer>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-white/10 flex items-center justify-center">
                <Github size={20} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                {t("github.title")}
              </h3>
            </div>
          </AnimatedContainer>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StaggerItem>
              <StatCard
                label={t("github.contributions")}
                value={demoGithubData.totalContributions.toLocaleString()}
                icon={<Activity size={20} className="text-white" />}
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                label={t("github.commits")}
                value={demoGithubData.totalCommits.toLocaleString()}
                icon={<TrendingUp size={20} className="text-white" />}
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                label={t("github.repos")}
                value={demoGithubData.publicRepos}
                icon={<Code size={20} className="text-white" />}
              />
            </StaggerItem>
          </StaggerContainer>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnimatedContainer>
              <Card>
                <h4 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                  {t("github.topLanguages")}
                </h4>
                <div className="space-y-3">
                  {demoGithubData.topLanguages.map((lang) => (
                    <div key={lang.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                          {lang.name}
                        </span>
                        <span className="text-xs font-mono" style={{ color: "var(--text-tertiary)" }}>
                          {lang.percentage}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full" style={{ background: "var(--bg-tertiary)" }}>
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: lang.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </AnimatedContainer>
            <AnimatedContainer delay={0.1}>
              <Card>
                <h4 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                  {t("github.contributionCalendar")}
                </h4>
                <div className="overflow-x-auto pb-2">
                  <div className="flex gap-1 min-w-max">
                    {demoGithubData.contributionCalendar.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-1">
                        {week.map((level, di) => (
                          <motion.div
                            key={`${wi}-${di}`}
                            className="w-3 h-3 rounded-sm"
                            style={{
                              background:
                                level === 0
                                  ? "var(--bg-tertiary)"
                                  : level === 1
                                  ? "rgba(108, 92, 231, 0.2)"
                                  : level === 2
                                  ? "rgba(108, 92, 231, 0.4)"
                                  : level === 3
                                  ? "rgba(108, 92, 231, 0.7)"
                                  : "rgba(108, 92, 231, 1)",
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: wi * 0.01 + di * 0.01 }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </AnimatedContainer>
          </div>
        </section>

        {/* ===== WakaTime Statistics ===== */}
        <section>
          <AnimatedContainer>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <Clock size={20} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                {t("wakatime.title")}
              </h3>
            </div>
          </AnimatedContainer>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StaggerItem>
              <StatCard
                label={t("wakatime.totalHours")}
                value={`${demoWakatimeData.totalHours}h`}
                icon={<Clock size={20} className="text-white" />}
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                label={t("wakatime.dailyAverage")}
                value={demoWakatimeData.dailyAverage}
                icon={<BarChart3 size={20} className="text-white" />}
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                label={t("wakatime.topLanguage")}
                value={demoWakatimeData.topLanguage}
                icon={<Code size={20} className="text-white" />}
              />
            </StaggerItem>
          </StaggerContainer>

          <AnimatedContainer>
            <DashboardCharts
              wakatimeLanguages={demoWakatimeData.languages}
              wakatimeWeekly={demoWakatimeData.weeklyActivity}
              analyticsTraffic={demoAnalyticsData.traffic}
            />
          </AnimatedContainer>
        </section>

        {/* ===== Website Analytics ===== */}
        <section>
          <AnimatedContainer>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center">
                <Eye size={20} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                {t("analytics.title")}
              </h3>
            </div>
          </AnimatedContainer>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StaggerItem>
              <StatCard
                label={t("analytics.pageViews")}
                value={demoAnalyticsData.pageViews.toLocaleString()}
                icon={<Eye size={20} className="text-white" />}
                trend="+12.5%"
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                label={t("analytics.uniqueVisitors")}
                value={demoAnalyticsData.uniqueVisitors.toLocaleString()}
                icon={<Users size={20} className="text-white" />}
                trend="+8.3%"
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                label={t("analytics.liveVisitors")}
                value={demoAnalyticsData.liveVisitors}
                icon={
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Globe size={20} className="text-white" />
                  </motion.div>
                }
              />
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* ===== Typing Performance ===== */}
        <section>
          <AnimatedContainer>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center">
                <Keyboard size={20} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                {t("typing.title")}
              </h3>
            </div>
          </AnimatedContainer>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StaggerItem>
              <StatCard
                label={t("typing.wpm")}
                value={`${demoTypingData.wpm} WPM`}
                icon={<Zap size={20} className="text-white" />}
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                label={t("typing.accuracy")}
                value={`${demoTypingData.accuracy}%`}
                icon={<Target size={20} className="text-white" />}
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                label={t("typing.bestScore")}
                value={`${demoTypingData.bestScore} WPM`}
                icon={<TrendingUp size={20} className="text-white" />}
              />
            </StaggerItem>
            <StaggerItem>
              <StatCard
                label={t("typing.averageWpm")}
                value={`${demoTypingData.averageWpm} WPM`}
                icon={<BarChart3 size={20} className="text-white" />}
              />
            </StaggerItem>
          </StaggerContainer>

          {/* Typing Accuracy Visual */}
          <AnimatedContainer delay={0.2} className="mt-6">
            <Card>
              <h4 className="text-lg font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
                Performance Overview
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* WPM Progress */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      Speed (WPM)
                    </span>
                    <span className="text-sm font-mono" style={{ color: "var(--text-primary)" }}>
                      {demoTypingData.wpm}/120
                    </span>
                  </div>
                  <div className="h-3 rounded-full" style={{ background: "var(--bg-tertiary)" }}>
                    <motion.div
                      className="h-full rounded-full gradient-bg"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(demoTypingData.wpm / 120) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
                {/* Accuracy Progress */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      Accuracy
                    </span>
                    <span className="text-sm font-mono" style={{ color: "var(--text-primary)" }}>
                      {demoTypingData.accuracy}%
                    </span>
                  </div>
                  <div className="h-3 rounded-full" style={{ background: "var(--bg-tertiary)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "#22c55e" }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${demoTypingData.accuracy}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedContainer>
        </section>
      </div>
    </div>
  );
}
