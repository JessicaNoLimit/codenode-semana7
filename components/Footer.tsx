export default function Footer() {
  return (
    <footer className="relative z-10 px-6 pb-8 pt-4 text-center text-sm text-gray-500">
      <div className="mx-auto max-w-3xl rounded-full border border-white/8 bg-white/[0.03] px-5 py-3 backdrop-blur-sm">
        <p className="font-medium tracking-[0.18em] text-gray-400">
          FOCUS WORKSPACE © 2026
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Construido con Next.js, Better Auth y PostgreSQL.
        </p>
      </div>
    </footer>
  );
}
