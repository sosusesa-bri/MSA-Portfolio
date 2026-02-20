export const siteConfig = {
  name: "Muhammad Sabri Akbar",
  title: "MSAPortfolio",
  description: "Modern Developer Portfolio with Interactive Dashboard",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  github: "https://github.com/sosusesa-bri",
  linkedin: "https://www.linkedin.com/in/muhammadsabriakbar",
  instagram: "https://www.instagram.com/sosusesa_bri?igsh=cm1kZzU3cDRkcGp4",
  email: "muhammadsabriakbar@gmail.com",
};

export const techStack = [
  { name: "React", icon: "⚛️", category: "frontend" },
  { name: "Next.js", icon: "▲", category: "frontend" },
  { name: "TypeScript", icon: "🔷", category: "frontend" },
  { name: "Tailwind CSS", icon: "🎨", category: "frontend" },
  { name: "Node.js", icon: "🟢", category: "backend" },
  { name: "Python", icon: "🐍", category: "backend" },
  { name: "PostgreSQL", icon: "🐘", category: "backend" },
  { name: "MongoDB", icon: "🍃", category: "backend" },
  { name: "Docker", icon: "🐳", category: "tools" },
  { name: "Git", icon: "📦", category: "tools" },
  { name: "AWS", icon: "☁️", category: "tools" },
  { name: "Figma", icon: "🎯", category: "tools" },
];

export const skills = {
  frontend: [
    { name: "React / Next.js", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Tailwind CSS", level: 92 },
    { name: "Framer Motion", level: 85 },
    { name: "HTML / CSS", level: 95 },
  ],
  backend: [
    { name: "Node.js / Express", level: 88 },
    { name: "Python / FastAPI", level: 82 },
    { name: "PostgreSQL", level: 85 },
    { name: "MongoDB", level: 80 },
    { name: "REST / GraphQL API", level: 90 },
  ],
  tools: [
    { name: "Git / GitHub", level: 92 },
    { name: "Docker", level: 78 },
    { name: "AWS / Vercel", level: 80 },
    { name: "CI/CD", level: 75 },
    { name: "Figma", level: 70 },
  ],
};

export const projects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce platform with real-time inventory, payment processing, and admin dashboard.",
    image: "/images/project-commerce.png",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    category: "fullstack",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "Real-time collaborative task management with drag-and-drop, team workspaces, and analytics.",
    image: "/images/project-task.png",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    category: "fullstack",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: "3",
    title: "AI Content Generator",
    description:
      "AI-powered content generation tool with multiple templates, brand voice customization, and export options.",
    image: "/images/project-ai.png",
    tech: ["Next.js", "Python", "OpenAI", "Tailwind CSS"],
    category: "fullstack",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: "4",
    title: "Portfolio Dashboard",
    description:
      "Interactive developer portfolio with real-time coding stats, GitHub integration, and analytics.",
    image: "/images/project-dashboard.png",
    tech: ["Next.js", "TypeScript", "Recharts", "Tailwind CSS"],
    category: "frontend",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: "5",
    title: "REST API Gateway",
    description:
      "Scalable API gateway with rate limiting, authentication, caching, and monitoring dashboard.",
    image: "/images/project-api.png",
    tech: ["Node.js", "Express", "Redis", "Docker"],
    category: "backend",
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: "6",
    title: "Weather Dashboard",
    description:
      "Beautiful weather dashboard with location search, 7-day forecast, and interactive maps.",
    image: "/images/project-weather.png",
    tech: ["React", "TypeScript", "Tailwind CSS", "OpenWeather"],
    category: "frontend",
    github: "https://github.com",
    live: "https://example.com",
  },
];

export const socialLinks = [
  { name: "GitHub", url: siteConfig.github, icon: "github" },
  { name: "LinkedIn", url: siteConfig.linkedin, icon: "linkedin" },
  { name: "Instagram", url: siteConfig.instagram, icon: "instagram" },
  { name: "Email", url: `mailto:${siteConfig.email}`, icon: "mail" },
];

// Demo data for dashboard when APIs are not configured
export const demoGithubData = {
  totalContributions: 2847,
  totalCommits: 1532,
  publicRepos: 48,
  topLanguages: [
    { name: "TypeScript", percentage: 42, color: "#3178c6" },
    { name: "JavaScript", percentage: 25, color: "#f7df1e" },
    { name: "Python", percentage: 18, color: "#3776ab" },
    { name: "CSS", percentage: 8, color: "#264de4" },
    { name: "Others", percentage: 7, color: "#6c5ce7" },
  ],
  contributionCalendar: Array.from({ length: 52 }, () =>
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
  ),
};

export const demoWakatimeData = {
  totalHours: 1847,
  dailyAverage: "5h 23m",
  topLanguage: "TypeScript",
  languages: [
    { name: "TypeScript", hours: 780, color: "#3178c6" },
    { name: "JavaScript", hours: 420, color: "#f7df1e" },
    { name: "Python", hours: 320, color: "#3776ab" },
    { name: "CSS/SCSS", hours: 180, color: "#264de4" },
    { name: "HTML", hours: 90, color: "#e34f26" },
    { name: "Others", hours: 57, color: "#6c5ce7" },
  ],
  weeklyActivity: [
    { day: "Mon", hours: 6.2 },
    { day: "Tue", hours: 7.5 },
    { day: "Wed", hours: 5.8 },
    { day: "Thu", hours: 8.1 },
    { day: "Fri", hours: 6.9 },
    { day: "Sat", hours: 4.2 },
    { day: "Sun", hours: 3.5 },
  ],
};

export const demoAnalyticsData = {
  pageViews: 15420,
  uniqueVisitors: 8930,
  liveVisitors: 12,
  traffic: [
    { month: "Jan", views: 1200 },
    { month: "Feb", views: 1450 },
    { month: "Mar", views: 1100 },
    { month: "Apr", views: 1680 },
    { month: "May", views: 1920 },
    { month: "Jun", views: 2100 },
    { month: "Jul", views: 1850 },
    { month: "Aug", views: 2350 },
    { month: "Sep", views: 2680 },
    { month: "Oct", views: 2450 },
    { month: "Nov", views: 2890 },
    { month: "Dec", views: 3200 },
  ],
};

export const demoTypingData = {
  wpm: 95,
  accuracy: 97.5,
  bestScore: 112,
  averageWpm: 88,
};
