"use client";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import Button from "@/components/atom/Button";
import { useRouter } from "next/navigation";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import VersionTag from "@/components/atom/VersionTag";
import { RememberProvider } from "@/context/RememberContext";

/* export const metadata = {
  title: {
    template: "SchoPack | %s",
    default: "SchoPack",
  },
  description: "Sistema de control de Estudios para Liceos",
}; */

export default function RootLayout({ children }) {
  const router = useRouter();
  return (
    <RememberProvider>
      <main className="min-h-dvh w-full flex overflow-hidden bg-white">
        <div className="hidden md:block w-1/2 lg:w-3/5 relative z-10 [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]">
          {/* Fotografía de fondo */}
          <Image
            src="https://media.istockphoto.com/id/1335969806/es/foto/chica-adolescente-usando-computadora-port%C3%A1til-en-la-cama-usar-las-redes-sociales-o-estudiar.jpg?s=612x612&w=0&k=20&c=c9TQT94oGL3gcvD88ctwN28FGKxJVM4LAtP88Pp8SxU="
            alt="Estudiantes y profesores"
            className="absolute inset-0 w-full h-full object-cover"
            fill
          />

          {/* Superposición de color (Overlay) para mantener la identidad visual y legibilidad */}
          <div className="absolute inset-0 bg-linear-to-tr from-orange-600/90 via-amber-500/80 to-cyan-500/60" />

          {/* Contenido sobre la foto */}
          <div className="relative z-10 flex flex-col justify-between h-full p-12 text-white">
            <div className="flex items-center gap-2">
              <Button
                classNameIcon="text-xl text-gray-100/40 mr-1"
                icon={faArrowLeft}
                classNameBtn="font-bold text-2xl tracking-wider"
                onClick={() => router.back()}
              >
                SchoPack
              </Button>
            </div>

            <div className="max-w-md space-y-3">
              <h1 className="text-3xl font-extrabold leading-tight">
                Gestión académica simple y al alcance de todos
              </h1>
              <p className="text-red-100 text-sm leading-relaxed">
                Consulta calificaciones y más desde un solo lugar.
              </p>
            </div>

            <p className="text-xs text-red-200">
              © {new Date().getFullYear()} SchoPack. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col items-center justify-between p-6 md:p-12">
          {/* Espaciador superior para mantener el centrado perfecto */}
          <div className="w-full h-4" />

          {/* Tarjeta del Formulario centrada */}
          <section className="w-full">{children}</section>

          {/* Footer al final del panel derecho */}
          <section className="w-full max-w-md flex items-center justify-between gap-2 text-xs text-slate-400/90 pt-4">
            <p>
              ¿No tienes acceso?,{" "}
              <Link
                href="https://wa.link/a6tg3m"
                className="text-orange-400 underline font-bold hover:text-orange-200"
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
          reverseOrder={false}
          toastOptions={{
            className:
              "rounded-xl border border-slate-100 shadow-lg font-medium",
            duration: 4000,
          }}
        />
      </main>
    </RememberProvider>
  );
}
