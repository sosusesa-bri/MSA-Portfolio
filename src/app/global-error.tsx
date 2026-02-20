"use client";

import { useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/index";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
          <div className="text-center max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <LucideIcons.AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              Something went wrong!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              A critical error occurred. Please try refreshing the page.
            </p>
            <Button onClick={() => reset()} variant="primary">
              <LucideIcons.RefreshCcw size={16} />
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
