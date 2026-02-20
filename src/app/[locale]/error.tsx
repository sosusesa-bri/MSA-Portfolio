"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errors.generic");

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-500/10 flex items-center justify-center"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AlertTriangle size={32} className="text-red-500" />
        </motion.div>
        <h1
          className="text-3xl font-bold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          {t("title")}
        </h1>
        <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
          {t("description")}
        </p>
        <Button onClick={reset} variant="primary" size="lg">
          <RefreshCw size={16} />
          {t("tryAgain")}
        </Button>
      </motion.div>
    </div>
  );
}
