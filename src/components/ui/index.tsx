"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-12 ${centered ? "text-center" : ""} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold gradient-text inline-block mb-3">
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          {subtitle}
        </p>
      )}
      {centered && (
        <div className="mt-4 mx-auto w-20 h-1 rounded-full gradient-bg" />
      )}
    </motion.div>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <motion.div
      className={`glass rounded-2xl p-6 ${className}`}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary" | "accent";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    default: {
      background: "var(--bg-tertiary)",
      color: "var(--text-secondary)",
      border: "1px solid var(--border-color)",
    },
    primary: {
      background: "rgba(108, 92, 231, 0.1)",
      color: "#6c5ce7",
      border: "1px solid rgba(108, 92, 231, 0.2)",
    },
    accent: {
      background: "rgba(6, 182, 212, 0.1)",
      color: "#06b6d4",
      border: "1px solid rgba(6, 182, 212, 0.2)",
    },
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`}
      style={variantStyles[variant]}
    >
      {children}
    </span>
  );
}

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const baseClass = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 ${
    sizeStyles[size]
  } ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105 active:scale-95"} ${className}`;

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {},
    secondary: {
      background: "var(--bg-tertiary)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-color)",
    },
    ghost: {
      background: "transparent",
      color: "var(--text-secondary)",
    },
  };

  const content = (
    <motion.span
      className={`${baseClass} ${variant === "primary" ? "gradient-bg text-white shadow-lg" : ""}`}
      style={variant !== "primary" ? variantStyles[variant] : {}}
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} type={type} disabled={disabled}>
      {content}
    </button>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: string;
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <Card className="flex items-center gap-4">
      {icon && (
        <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
      )}
      <div>
        <p
          className="text-2xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {value}
        </p>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {label}
        </p>
        {trend && (
          <p className="text-xs text-green-500 font-medium mt-1">{trend}</p>
        )}
      </div>
    </Card>
  );
}
