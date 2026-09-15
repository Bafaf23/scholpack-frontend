"use client";

import Icon from "../atom/Icon";
import { menuLink } from "./NabarSidebar";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMovil() {
  const { user } = useAuth();
  const pathname = usePathname();

  // 1. Extracción segura del rol (Soporta user directo o anidado user.user)
  const rawRole = user?.user?.role || user?.role;
  const role = rawRole === "director" ? "administrador" : rawRole;

  // 2. Obtener enlaces de forma segura con fallback a un array vacío
  const currentLinks = menuLink[role] || [];

  // 3. Guard Clause: Si no hay usuario o no hay links, no renderizar
  if (!user || currentLinks.length === 0) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 p-2 md:hidden">
      <div className="flex items-center justify-around gap-1 rounded-2xl border border-gray-200 bg-white/90 p-2 backdrop-blur-md shadow-lg dark:border-slate-800 dark:bg-slate-900/90">
        {currentLinks.map((link, index) => {
          const isActive = pathname === link.href;

          return (
            <Link
              href={link.href}
              key={link.href || index}
              className={`flex flex-1 flex-col items-center justify-center p-2 rounded-xl transition-all ${
                isActive
                  ? "bg-orange-500/10 font-bold text-orange-600 dark:bg-orange-500/20 dark:text-orange-400"
                  : "text-gray-400 hover:text-gray-600 dark:text-zinc-300 dark:hover:text-zinc-300"
              }`}
            >
              <Icon icon={link.icon} className="text-xl" />
              {link.label && (
                <span className="mt-0.5 text-[10px] whitespace-nowrap">
                  {link.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
