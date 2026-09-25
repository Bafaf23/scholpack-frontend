"use client";

import Icon from "@/components/atom/Icon";
import {
  faCheckCircle,
  faHome,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { toPng } from "html-to-image";
import { useState, useEffect, useRef } from "react";

export default function Success({ data, school }) {
  const comprobanteRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  const handleNewRegistration = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("enrolelmentResult");
    }
  };

  const handleDownloading = async () => {
    if (!comprobanteRef.current || downloading) return;

    setDownloading(true);

    try {
      const dataUrl = await toPng(comprobanteRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        cacheBust: true,
      });

      const link = document.createElement("a");
      const tuitionNumber = data?.tuition_number || "J000000000";
      link.download = `${tuitionNumber}-comprobante.png`;
      link.href = dataUrl;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Error al generar el comprobante:", e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="p-4">
      <div
        ref={comprobanteRef}
        className="w-full max-w-md rounded-3xl p-8 text-center"
      >
        {/* Icono de Éxito Animado */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-100 dark:bg-green-900/40 p-4">
            <Icon
              icon={faCheckCircle}
              className="text-5xl text-green-600 dark:text-green-400"
            />
          </div>
        </div>

        <h1 className="mb-2 text-3xl font-extrabold text-slate-800 dark:text-zinc-200">
          ¡Registro Exitoso!
        </h1>
        <p className="mb-8 text-slate-500 dark:text-zinc-300">
          Tu inscripción ha sido procesada correctamente.
        </p>

        <p className="mb-3 text-slate-500 dark:text-zinc-300">
          Numero de matricula:{" "}
          <span className="font-bold text-cyan-500">
            {data?.tuition_number || "N/A"}
          </span>
        </p>

        {/* Card de Resumen Rápido */}
        <div className="mb-8 rounded-2xl border border-dashed border-slate-300 dark:border-zinc-500 dark:bg-zinc-800 p-4">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-400 dark:text-zinc-200">
              Estudiante:
            </span>
            <span className="font-extrabold dark:text-zinc-200 uppercase">
              {data?.user.name || "N/A"} {data?.user.last_name || "N/A"}
            </span>
          </div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-400 dark:text-zinc-200">
              Condicion:
            </span>
            <span className="font-bold text-orange-600 uppercase">
              {data?.condition || "N/A"}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400 dark:text-zinc-200">Liceo:</span>
            <span className="font-semibold text-slate-700 dark:text-zinc-300">
              {school.name || "Esperando..."} (SIG: {school.SIG})
            </span>
          </div>
        </div>

        {/* Acciones */}
        <div className="space-y-3">
          {isClient ? (
            /* Botón de PDF o acción cliente (coloca aquí tu componente cuando esté listo) */
            <button
              type="button"
              onClick={handleDownloading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-600 py-3 font-semibold text-white transition-all hover:bg-orange-700 cursor-pointer
              "
              disabled={downloading}
            >
              <Icon icon={faSave} />
              {downloading ? "Generando comprobante..." : "Guardar comprobante"}
            </button>
          ) : (
            <div className="w-full animate-pulse border border-dashed border-slate-400 rounded-xl py-4 bg-slate-100" />
          )}

          <div className="grid grid-cols-1 gap-3">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 rounded-xl bg-zinc-200 dark:bg-zinc-100 py-3 font-semibold text-zinc-800 dark:text-zinc-700 transition-all hover:bg-zinc-300 dark:hover:bg-zinc-200"
            >
              <Icon icon={faHome} />
              Inicia sesión
            </Link>
          </div>
        </div>

        <p className="mt-8 text-xs text-slate-400 dark:text-zinc-500">
          Guarda el comprobante para formalizar la inscripción en la institución
          educativa.
        </p>
      </div>
    </div>
  );
}
