"use client";
import Button from "@/components/atom/Button";
import VersionTag from "@/components/atom/VersionTag";
import { RememberProvider } from "@/context/RememberContext";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function AuthLayout({ children }) {
  const router = useRouter();

  return (
    <RememberProvider>
      <section className="min-h-dvh w-full flex overflow-hidden bg-zinc-100 dark:bg-zinc-950 transition-colors">
        <div className="hidden md:block w-1/1 relative z-10">
          {/* Fondo para Modo Claro */}
          <Image
            src="/bg-light.jpeg"
            alt="Fondo Sigace"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-300 dark:hidden"
            fill
            priority
          />

          {/* Fondo para Modo Oscuro */}
          <Image
            src="/bg-dark.jpg"
            alt="Fondo Sigace Oscuro"
            className="absolute inset-0 w-full h-full object-cover transition-all duration-300 hidden dark:block dark:brightness-50 dark:opacity-80"
            fill
            priority
          />

          {/* Superposición de color */}
          <div className="absolute inset-0 bg-black/30 dark:bg-transparent transition-colors" />

          {/* Contenido sobre la imagen */}
          <div className="relative z-10 flex flex-col justify-between h-full p-12 text-white">
            <div className="flex items-center gap-2">
              <Button
                classNameIcon="text-xl text-gray-200 mr-1"
                icon={faArrowLeft}
                classNameBtn="font-bold text-2xl tracking-wider cursor-pointer"
                onClick={() => router.back()}
              >
                SIGACE
              </Button>
            </div>

            <div className="max-w-md space-y-3">
              <h1 className="text-3xl font-extrabold leading-tight">
                Gestión académica simple en un solo lugar
              </h1>
              <p className="text-white text-sm leading-relaxed dark:text-zinc-300">
                Consulta calificaciones y más desde un solo lugar.
              </p>
            </div>

            <p className="text-xs text-white/80 dark:text-zinc-400">
              © {new Date().getFullYear()} SIGACE. Todos los derechos
              reservados.
            </p>
          </div>
        </div>

        {/* Panel Derecho: Formulario */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-between p-6 md:p-12">
          {/* Espaciador superior */}
          <div className="w-full" />

          {/* Tarjeta del Formulario centrada */}
          <section className="w-full max-w-md">{children}</section>

          {/* Footer al final del panel derecho */}
          <section className="w-full max-w-md flex items-center justify-between gap-2 text-xs text-slate-400 dark:text-zinc-500 pt-4">
            <p>
              ¿No tienes acceso?,{" "}
              <Link
                href="https://wa.link/a6tg3m"
                className="text-orange-500 dark:text-orange-400 underline font-bold hover:text-orange-600 dark:hover:text-orange-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contacta al administrador
              </Link>
            </p>

            <div className="flex items-center justify-center">
              <VersionTag />
            </div>
          </section>
        </div>

        <Toaster
          position="top-right"
          reverseOrder={true}
          toastOptions={{
            className:
              "rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 shadow-lg font-medium transition-colors",
            duration: 4000,
          }}
        />
      </section>
    </RememberProvider>
  );
}
