"use client";

import Button from "../atom/Button";
import Icon from "../atom/Icon";
import {
  faUser,
  faAngleDown,
  faInbox,
  faIndent,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

// Componente para la celda individual de notas
function GradeInput({ initialGrade, onSave }) {
  const [grade, setGrade] = useState(initialGrade ?? "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGrade(initialGrade ?? "");
  }, [initialGrade]);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val === "" || (/^\d*\.?\d*$/.test(val) && Number(val) <= 20)) {
      setGrade(val);
    }
  };

  const handleBlur = async () => {
    if (grade === (initialGrade ?? "") || grade === "") return;

    setIsSaving(true);
    try {
      await onSave(grade === "" ? null : Number(grade));
    } catch (error) {
      console.error("Error guardando nota:", error);
      setGrade(initialGrade ?? "");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <input
      type="text"
      inputMode="decimal"
      value={grade}
      placeholder="—"
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
      disabled={isSaving}
      className={`w-14 text-center py-1 px-2 border rounded-md transition-colors font-semibold outline-none text-sm
        ${
          isSaving
            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-400"
            : " dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-100 dark:border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        }
      `}
    />
  );
}

export default function TablaNotas({
  data,
  students = [],
  notes = [],
  activities = [],
  onSaveGrade,
}) {
  const [isOpen, setIsOpen] = useState(true);

  if (!data) {
    return (
      <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow animate-pulse">
        Cargando notas...
      </div>
    );
  }

  const name = data.name;
  const isActive = data.is_active === true;
  const status = isActive ? "Activo" : "Inactivo";

  return (
    <div className="rounded-xl bg-white shadow dark:bg-slate-950 border border-slate-100 dark:border-slate-800/50 hidden md:block lg:block">
      {/* Cabecera */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50 ">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 tracking-tight">
            {name}
          </h2>
          <p className="text-sm text-slate-400 dark:text-slate-500 font-normal">
            Ciclo Escolar Actual • Evaluaciones Planificadas
          </p>
        </div>
        <div className="flex items-center gap-5">
          <span
            className={`uppercase text-xs font-black tracking-wider px-2.5 py-1 rounded-full ${
              status === "Activo"
                ? "bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400"
                : "bg-red-50 text-red-500 dark:bg-red-950/20 dark:text-red-400"
            }`}
          >
            {status}
          </span>
          <Button
            classNameBtn={`hover:bg-slate-100 text-slate-400 p-2 rounded-xl transition-transform duration-300 ${
              isOpen ? "" : "rotate-180"
            } dark:hover:bg-slate-800 dark:text-slate-500`}
            icon={faAngleDown}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>

      {/* Tabla Colapsable */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-1500 opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="overflow-x-auto overflow-y-auto max-h-[70vh] scrollbar-thin pb-2">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="sticky top-0 z-10 border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
                <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                  <Icon icon={faIndent} className="mr-2 text-slate-400" />N
                </th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                  <Icon icon={faIdCard} className="mr-2 text-slate-400" />
                  Matrícula
                </th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                  <Icon icon={faUser} className="mr-2 text-slate-400" />
                  Estudiante
                </th>
                {activities.map((activity, index) => (
                  <th
                    className="px-4 py-4 text-center text-sm font-bold text-slate-500 dark:text-slate-400 min-w-30"
                    key={activity.id ?? index}
                  >
                    <span className="block text-slate-700 dark:text-slate-300 truncate max-w-37.5 mx-auto">
                      {activity.activity}
                    </span>
                    <span className="block text-slate-500 dark:text-slate-300 truncate max-w-37.5 mx-auto">
                      {activity.referent_teorical}
                    </span>
                    <span className="text-xs text-slate-400 block font-normal mt-0.5">
                      {activity.porcentage}%
                    </span>
                  </th>
                ))}
                <th className="px-6 py-4 text-center text-sm font-bold text-slate-600 dark:text-slate-400 bg-slate-100/50 dark:bg-slate-800/50">
                  Definitiva
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-slate-500 dark:text-slate-400">
                  Estatus
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan={activities.length + 5}
                    className="px-6 py-10 text-center text-slate-400 font-normal"
                  >
                    <Icon
                      icon={faInbox}
                      className="mb-2 block text-xl text-slate-300"
                    />
                    No hay estudiantes inscritos en esta sección.
                  </td>
                </tr>
              ) : (
                students.map((student, index) => {
                  const studentId = student.id_student ?? student.id;
                  const notaDelEstudiante = notes.find(
                    (n) => n.id_student === studentId,
                  );

                  const definitivaRaw = notaDelEstudiante?.final_grade;
                  const definitiva =
                    definitivaRaw !== undefined && definitivaRaw !== null
                      ? parseFloat(definitivaRaw).toFixed(2)
                      : "0.00";

                  const approved = parseFloat(definitiva) >= 10;

                  return (
                    <tr
                      key={studentId}
                      className="transition-colors hover:bg-slate-50/40 dark:hover:bg-slate-800/20"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-500 dark:text-slate-300">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 font-semibold text-cyan-600 dark:text-slate-300">
                        {student.tuition_number}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            {student.name} {student.last_name}
                          </span>
                          <span className="text-xs text-slate-400 font-normal mt-0.5">
                            {student.id_card || `C.I: ${studentId}`}
                          </span>
                        </div>
                      </td>

                      {/* Celdas de Evaluaciones */}
                      {activities.map((activity, aIndex) => {
                        const currentNote = notes.find(
                          (n) =>
                            n.id_student === studentId &&
                            n.id_evaluation === activity.id,
                        );

                        return (
                          <td
                            className="px-4 py-4 text-center font-bold"
                            key={activity.id ?? aIndex}
                          >
                            <GradeInput
                              initialGrade={currentNote?.grade}
                              onSave={async (newGrade) => {
                                if (onSaveGrade) {
                                  await onSaveGrade({
                                    student_id: studentId,
                                    evaluation_id: activity.id,
                                    grade: newGrade,
                                  });
                                }
                              }}
                            />
                          </td>
                        );
                      })}

                      {/* Nota Definitiva */}
                      <td className="px-6 py-4 text-center bg-slate-50/30 dark:bg-slate-800/10">
                        <span
                          className={`text-sm font-black ${
                            approved
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-red-500 dark:text-red-400"
                          }`}
                        >
                          {definitiva}
                        </span>
                      </td>

                      {/* Estatus Final */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${
                            approved
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                              : "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              approved ? "bg-emerald-500" : "bg-red-500"
                            }`}
                          />
                          {approved ? "Aprobado" : "Reprobado"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
