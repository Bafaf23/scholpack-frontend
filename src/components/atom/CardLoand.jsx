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
  const section = load.section || {};

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
    <div className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-500/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-cyan-500/40">
      <div>
        {/* Cabecera: Código e ID */}
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-cyan-50 px-2 py-0.5 text-[11px] font-bold tracking-wide text-cyan-700 border border-cyan-200/60 dark:bg-cyan-950/50 dark:text-cyan-300 dark:border-cyan-800/50">
            <Icon icon={faBook} className="text-[10px]" />
            {subjectCode}
          </span>
          {loadId && (
            <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
              <Icon icon={faHashtag} className="text-[9px]" />
              {loadId}
            </span>
          )}
        </div>

        {/* Nombre de la Materia */}
        <h4 className="mt-2.5 text-sm font-bold text-slate-800 line-clamp-2 dark:text-slate-100">
          {subjectName}
        </h4>
      </div>

      {/* Información del Docente */}
      <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Docente Asignado
        </p>

        <div className="mt-1.5 flex items-start gap-2.5">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
            <Icon icon={faUserTie} className="text-xs" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-200">
              {teacherName}
            </p>
            {teacherDocument && (
              <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-slate-400 dark:text-slate-500">
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
