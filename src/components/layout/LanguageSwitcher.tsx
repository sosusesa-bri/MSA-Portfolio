"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common.language");

  const switchLocale = () => {
    const newLocale = locale === "en" ? "id" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <motion.button
      onClick={switchLocale}
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
      style={{
        background: "var(--bg-tertiary)",
        border: "1px solid var(--border-color)",
        color: "var(--text-primary)",
      }}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={t("switch")}
    >
      <Globe size={16} />
      <span className="uppercase font-mono text-xs tracking-wider">
        {locale === "en" ? "ID" : "EN"}
      </span>
    </motion.button>
  );
}
