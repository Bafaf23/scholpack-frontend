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

  // 3. Guard Clause: Si no hay usuario cargado aún o no hay links, no renderizar la barra
  if (!user || currentLinks.length === 0) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 p-2 flex justify-around items-center gap-1 md:hidden">
      {currentLinks.map((link, index) => {
        const isActive = pathname === link.href;

        return (
          <Link
            href={link.href}
            key={link.href || index}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${
              isActive
                ? "text-orange-600 bg-orange-500/10 dark:bg-orange-500/20 dark:text-orange-400 font-bold"
                : "text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300"
            }`}
          >
            <Icon icon={link.icon} className="text-xl" />
            {link.label && (
              <span className="text-[10px] mt-0.5 whitespace-nowrap">
                {link.label}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
