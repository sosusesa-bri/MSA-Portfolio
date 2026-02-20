import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "common" });

  return {
    title: {
      default: t("siteName"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("siteDescription"),
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    ),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        id: "/id",
      },
    },
    openGraph: {
      title: t("siteName"),
      description: t("siteDescription"),
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate that the incoming locale is supported
  if (!routing.locales.includes(locale as "en" | "id")) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <ThemeProvider>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <Navbar />
        <main id="main-content" className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
