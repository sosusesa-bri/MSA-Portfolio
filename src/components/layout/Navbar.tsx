"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { key: "home", href: "" },
  { key: "about", href: "/about" },
  { key: "projects", href: "/projects" },
  { key: "dashboard", href: "/dashboard" },
  { key: "contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("common.nav");
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    const fullPath = `/${locale}${href}`;
    if (href === "")
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(fullPath);
  };

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2 shadow-lg" : "py-4"
        }`}
        style={{
          background: scrolled ? "var(--nav-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-color)" : "none",
        }}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center"
              >
                <Code2 size={20} className="text-white" />
              </motion.div>
              <span className="text-lg font-bold gradient-text hidden sm:block">
                MSAPortfolio
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={`/${locale}${item.href}`}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    isActive(item.href) ? "gradient-text" : ""
                  }`}
                  style={{
                    color: isActive(item.href)
                      ? undefined
                      : "var(--text-secondary)",
                  }}
                >
                  {t(item.key)}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full gradient-bg"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border-color)",
                }}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 pt-20 md:hidden"
            style={{ background: "var(--bg-primary)" }}
          >
            <nav
              className="flex flex-col items-center gap-2 p-6"
              aria-label="Mobile navigation"
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-full"
                >
                  <Link
                    href={`/${locale}${item.href}`}
                    className={`block w-full text-center py-3 px-6 rounded-xl text-lg font-medium transition-all duration-300 ${
                      isActive(item.href) ? "gradient-bg text-white" : ""
                    }`}
                    style={{
                      background: isActive(item.href)
                        ? undefined
                        : "var(--bg-secondary)",
                      color: isActive(item.href)
                        ? "#fff"
                        : "var(--text-primary)",
                    }}
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
