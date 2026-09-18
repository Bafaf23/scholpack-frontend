"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Icon from "../atom/Icon";
import {
  faExclamationTriangle,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Componente visual para accesos denegados compatible con Next.js (App Router).
 * @component
 */
const AccessDenied = ({ redirectTo = "/login", delaySeconds = 10 }) => {
  const [countdown, setCountdown] = useState(delaySeconds);
  const router = useRouter();

  useEffect(() => {
    if (countdown <= 0) {
      router.push(redirectTo);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, router, redirectTo]);

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center p-4 backdrop-blur-md bg-slate-900/40 dark:bg-zinc-950/80 transition-colors">
      <div className="w-full max-w-md transform overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-6 text-center shadow-xl transition-all dark:border-zinc-800 dark:bg-zinc-900/95 sm:p-8">
        {/* Icono animado */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
          <Icon icon={faExclamationTriangle} className="text-3xl" />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100">
          Acceso Denegado
        </h2>

        {/* Descripción */}
        <p className="mt-2 text-sm font-medium text-slate-600 dark:text-zinc-400">
          No cuentas con los permisos necesarios para acceder a este apartado.
        </p>

        {/* Banner de redirección */}
        <div className="mt-6 rounded-xl bg-amber-50 p-3.5 border border-amber-200/60 dark:bg-amber-500/10 dark:border-amber-500/20">
          <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">
            Redireccionando automáticamente en{" "}
            <span className="font-bold text-amber-600 dark:text-amber-400">
              {countdown}s
            </span>
            ...
          </p>
        </div>

        {/* Botón de escape directo usando Link de Next.js */}
        <Link
          href={redirectTo}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus:ring-zinc-700"
        >
          <Icon icon={faArrowLeft} />
          <span>Volver ahora</span>
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;
