import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black gradient-text mb-4">404</div>
        <h1
          className="text-2xl font-bold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Page Not Found
        </h1>
        <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/en"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold gradient-bg text-white shadow-lg hover:scale-105 transition-transform"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
