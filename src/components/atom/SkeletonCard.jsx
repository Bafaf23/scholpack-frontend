import { useMemo } from "react";

export default function SkeletonCard({ count = 3 }) {
  // Evitamos problemas de hidratación en SSR/Next.js fijando la cantidad o memorizándola
  const cardsCount = useMemo(() => {
    // eslint-disable-next-line react-hooks/purity
    return count || Math.floor(Math.random() * 3) + 2;
  }, [count]);

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-2 w-full bg-white/60 dark:bg-zinc-900/50 rounded-2xl border border-slate-200/80 dark:border-zinc-700/50 backdrop-blur-md">
      {Array.from({ length: cardsCount }).map((_, index) => (
        <div
          key={index}
          className="w-full h-40 bg-slate-100 dark:bg-zinc-800/80 rounded-xl animate-pulse p-4 flex flex-col justify-between border border-slate-200/60 dark:border-zinc-700/40"
        >
          {/* Cabecera / Título placeholder */}
          <div className="flex justify-between items-center w-full gap-3">
            <div className="h-5 w-1/3 bg-slate-200 dark:bg-zinc-700/70 rounded-md animate-pulse" />
            <div className="h-5 w-1/4 bg-slate-200 dark:bg-zinc-700/50 rounded-md animate-pulse" />
          </div>

          {/* Cuerpo placeholder */}
          <div className="space-y-2 my-3">
            <div className="h-3 w-full bg-slate-200/80 dark:bg-zinc-700/60 rounded animate-pulse" />
            <div className="h-3 w-4/5 bg-slate-200/80 dark:bg-zinc-700/60 rounded animate-pulse" />
          </div>

          {/* Pie / Botón placeholder */}
          <div className="h-8 w-28 bg-slate-200 dark:bg-zinc-700/70 rounded-lg animate-pulse self-end mt-auto" />
        </div>
      ))}
    </div>
  );
}
