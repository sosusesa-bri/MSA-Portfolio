"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { Card } from "@/components/ui";

interface DashboardChartsProps {
  wakatimeLanguages: { name: string; hours: number; color: string }[];
  wakatimeWeekly: { day: string; hours: number }[];
  analyticsTraffic: { month: string; views: number }[];
}

export default function DashboardCharts({
  wakatimeLanguages,
  wakatimeWeekly,
  analyticsTraffic,
}: DashboardChartsProps) {
  return (
    <div className="space-y-6">
      {/* WakaTime Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language Breakdown Pie Chart */}
        <Card>
          <h4
            className="text-lg font-semibold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Language Breakdown
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wakatimeLanguages}
                  dataKey="hours"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={50}
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {wakatimeLanguages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "12px",
                    color: "var(--text-primary)",
                  }}
                  formatter={(value: number) => [`${value}h`, "Hours"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {wakatimeLanguages.map((lang) => (
              <div
                key={lang.name}
                className="flex items-center gap-1.5 text-xs"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: lang.color }}
                />
                <span style={{ color: "var(--text-secondary)" }}>
                  {lang.name} ({lang.hours}h)
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Activity Bar Chart */}
        <Card>
          <h4
            className="text-lg font-semibold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Weekly Activity
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wakatimeWeekly}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border-color)"
                  opacity={0.3}
                />
                <XAxis
                  dataKey="day"
                  stroke="var(--text-tertiary)"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="var(--text-tertiary)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  unit="h"
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "12px",
                    color: "var(--text-primary)",
                  }}
                  formatter={(value: number) => [`${value}h`, "Hours"]}
                />
                <Bar
                  dataKey="hours"
                  fill="url(#barGradient)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6c5ce7" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Traffic Area Chart */}
      <Card>
        <h4
          className="text-lg font-semibold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Traffic Overview
        </h4>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analyticsTraffic}>
              <defs>
                <linearGradient
                  id="trafficGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#6c5ce7" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6c5ce7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--border-color)"
                opacity={0.3}
              />
              <XAxis
                dataKey="month"
                stroke="var(--text-tertiary)"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="var(--text-tertiary)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "12px",
                  color: "var(--text-primary)",
                }}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#6c5ce7"
                strokeWidth={2}
                fill="url(#trafficGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
