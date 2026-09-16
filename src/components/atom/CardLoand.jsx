"use client";

import Icon from "../atom/Icon";
import {
  faUserTie,
  faBook,
  faHashtag,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Tarjeta informativa para visualizar una carga académica individual.
 * Soporta respuestas anidadas del backend (subject, teacher, section) o propiedades planas.
 *
 * @component
 * @param {object} props
 * @param {object} props.load - Objeto de carga académica desde la API.
 * @returns {JSX.Element}
 */
export default function CardLoad({ load = {} }) {
  // Extraer datos anidados o usar las propiedades planas como fallback
  const subject = load.subject || {};
  const teacher = load.teacher || {};

  // Resolución de valores con fallback seguro
  const subjectName =
    subject.name || load.name_subject || "Asignatura no asignada";
  const subjectCode =
    subject.code_subject || subject.abbreviation || load.id_subject || "S/C";

  const teacherName = teacher.name
    ? `${teacher.name} ${teacher.last_name || ""}`.trim()
    : load.name_teacher
      ? `${load.name_teacher} ${load.last_name_teacher || ""}`.trim()
      : "Sin docente asignado";

  const teacherDocument = teacher.document || load.document_teacher || null;
  const loadId = load.id_load_academic || load.id;

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-500/50 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-orange-500/40">
      <div>
        {/* Cabecera: Código e ID */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 rounded-lg bg-orange-50 px-2 py-0.5 text-[11px] font-bold tracking-wide text-orange-700 border border-orange-200/60 dark:bg-orange-950/40 dark:text-orange-400 dark:border-orange-800/40">
            <Icon icon={faBook} className="text-[10px]" />
            {subjectCode}
          </span>
          {loadId && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-slate-400 dark:text-zinc-500">
              <Icon icon={faHashtag} className="text-[9px]" />
              {loadId}
            </span>
          )}
        </div>

        {/* Nombre de la Materia */}
        <h4 className="mt-2.5 text-sm font-bold text-slate-800 line-clamp-2 dark:text-zinc-100">
          {subjectName}
        </h4>
      </div>

      {/* Información del Docente */}
      <div className="mt-4 border-t border-slate-100 pt-3 dark:border-zinc-600/80">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-400">
          Docente Asignado
        </p>

        <div className="mt-1.5 flex items-start gap-2.5">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
            <Icon icon={faUserTie} className="text-xs" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-700 dark:text-zinc-200">
              {teacherName}
            </p>
            {teacherDocument && (
              <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-slate-400 dark:text-zinc-400">
                <Icon icon={faAddressCard} className="text-[10px]" />
                C.I: {teacherDocument}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
