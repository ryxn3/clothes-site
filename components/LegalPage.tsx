export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto min-h-[80vh] max-w-3xl px-6 pb-24 pt-32 sm:px-10">
      <h1 className="font-display text-4xl text-ink-900 dark:text-ink-50">
        {title}
      </h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
        {children}
      </div>
    </main>
  );
}
