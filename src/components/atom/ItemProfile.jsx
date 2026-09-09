"use client";

import Link from "next/link";

/**
 * Componente ItemProfile para el Sidebar/Navbar.
 * Maneja de forma segura los estados de carga y nulos de la sesión del usuario.
 */
export default function ItemProfile({ user }) {
  // Guard Clause primero: Evitamos ejecutar lógica JS si el usuario aún no ha cargado
  if (!user) {
    return (
      <div className="w-full block p-2">
        <div className="flex items-center gap-3 p-2 rounded-lg animate-pulse bg-slate-50/50 border border-slate-100/50 dark:bg-slate-800/50 dark:border-slate-700/50">
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
          <div className="flex-1 space-y-2 min-w-0">
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24" />
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-16" />
          </div>
        </div>
      </div>
    );
  }

  // Extracción segura de datos del objeto usuario (soporta user directo o anidado)
  const userData = user?.user || user;
  const name = userData?.name || "";
  const lastName = userData?.last_name || "";
  const role = userData?.role || "Sin rol asignado";

  // Generación segura de la inicial
  const inicial = name ? name.charAt(0).toUpperCase() : "U";
  const fullName = `${name} ${lastName}`.trim() || "Usuario";

  return (
    <Link href="/dashboard/profile" className="w-full block p-2">
      <div className="flex items-center gap-3 p-2 rounded-lg transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200/60 dark:hover:border-slate-700/60 cursor-pointer w-full group">
        {/* Avatar circular alineado a la paleta naranja */}
        <div className="w-10 h-10 shrink-0 rounded-full bg-orange-500/20 text-orange-600 dark:bg-orange-500/30 dark:text-orange-400 font-bold text-sm flex items-center justify-center shadow-xs select-none uppercase transition-transform group-hover:scale-105">
          <span>{inicial}</span>
        </div>

        {/* Información textual */}
        <div className="flex flex-col min-w-0 flex-1 gap-0.5">
          <h1 className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate uppercase tracking-wide">
            {fullName}
          </h1>
          <span className="text-xs text-slate-400 dark:text-slate-500 truncate max-w-full font-medium capitalize">
            {role}
          </span>
        </div>
      </div>
    </Link>
  );
}
