"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, Heart, Code2 } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/constants";

const footerLinks = [
  { key: "home", href: "" },
  { key: "about", href: "/about" },
  { key: "projects", href: "/projects" },
  { key: "dashboard", href: "/dashboard" },
  { key: "contact", href: "/contact" },
];

export function Footer() {
  const t = useTranslations("common");
  const locale = useLocale();

  return (
    <footer
      className="relative mt-20 border-t"
      style={{
        borderColor: "var(--border-color)",
        background: "var(--bg-secondary)",
      }}
    >
      {/* Gradient line on top */}
      <div className="h-px gradient-bg w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <Code2 size={20} className="text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">
                MSAPortfolio
              </span>
            </Link>
            <p
              className="text-sm max-w-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              {t("siteDescription")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-semibold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href}`}
                  className="text-sm transition-colors duration-200 hover:text-primary-500"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3
              className="font-semibold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Connect
            </h3>
            <div className="flex gap-3">
              {[
                { icon: Github, url: siteConfig.github, label: "GitHub" },
                { icon: Linkedin, url: siteConfig.linkedin, label: "LinkedIn" },
                { icon: Instagram, url: siteConfig.instagram, label: "Instagram" },
                {
                  icon: Mail,
                  url: `mailto:${siteConfig.email}`,
                  label: "Email",
                },
              ].map(({ icon: Icon, url, label }) => (
                <motion.a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-secondary)",
                  }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
          style={{
            borderColor: "var(--border-color)",
            color: "var(--text-tertiary)",
          }}
        >
          <p>{t("footer.copyright")}</p>
          {/* <p className="flex items-center gap-1">
            {t("footer.madeWith")} {siteConfig.name}
            <Heart size={14} className="text-red-500 fill-red-500" />
          </p> */}
        </div>
      </div>
    </footer>
  );
}
