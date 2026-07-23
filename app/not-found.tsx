import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-ink-50 px-6 text-center dark:bg-ink-950">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl text-ink-900 dark:text-ink-50 sm:text-4xl">
        This page is hidden a little too well.
      </h1>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-ink-900 px-8 py-4 text-sm font-medium text-ink-50 dark:bg-ink-50 dark:text-ink-950"
      >
        Back to Home
      </Link>
    </main>
  );
}
