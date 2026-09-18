import { useState, useEffect } from "react";
import { getRecordStudent } from "@/services/student/getRecordStudent";

export default function RecordAcademico({ periodStudent, idStudent }) {
  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const [loading, setLoading] = useState(false);
  const [subjectsList, setSubjectsList] = useState([]);

  const [openLapso, setOpenLapso] = useState(null);

  const period = periodStudent?.[selectedPeriod];

  useEffect(() => {
    if (!period || !idStudent) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    getRecordStudent(idStudent, period.period.id)
      .then((data) => {
        const periodData = data?.data?.[0];
        setSubjectsList(periodData?.subjects || []);
      })
      .catch((err) => {
        console.error("❌ Error al traer el récord de SIGACE:", err);
        setSubjectsList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [period, idStudent]);

  if (!periodStudent || periodStudent.length === 0) {
    return (
      <div className="w-full text-center p-8 bg-white dark:bg-zinc-800 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm transition-colors">
        <p className="text-sm text-slate-500 dark:text-zinc-400">
          No se encontraron récords académicos disponibles.
        </p>
      </div>
    );
  }

  const toggleLapso = (materiaName, lapIndex) => {
    const key = `${materiaName}-${lapIndex}`;
    setOpenLapso(openLapso === key ? null : key);
  };

  return (
    <div className="w-full space-y-6">
      {/* Selector de Período */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-800 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm transition-colors">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-100 tracking-tight">
            Récord Académico de Evaluaciones
          </h2>
          <p className="text-sm text-cyan-600 dark:text-cyan-400 font-semibold mt-0.5">
            {period?.section.year.name} — Sección &quot;{period?.section.name}
            &quot;
          </p>
          <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium">
            Estatus:{" "}
            <span className="font-semibold text-slate-700 dark:text-zinc-200">
              {period?.status}
            </span>
          </p>
        </div>
        <select
          className="bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700/70 rounded-xl p-2.5 text-sm font-medium text-slate-700 dark:text-zinc-200 focus:ring-2 focus:ring-orange-500 focus:outline-none shadow-sm cursor-pointer transition-colors"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(parseInt(e.target.value, 10))}
        >
          {periodStudent.map((rec, index) => (
            <option
              key={index}
              value={rec.period.id}
              className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200"
            >
              Periodo Escolar - {rec.period.name}
            </option>
          ))}
        </select>
      </div>

      {/* Estado de Carga */}
      {loading ? (
        <div className="w-full text-center p-12 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm transition-colors">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto mb-4" />
          <p className="text-sm text-slate-500 dark:text-zinc-400 font-medium">
            Sincronizando calificaciones...
          </p>
        </div>
      ) : subjectsList.length === 0 ? (
        <div className="w-full text-center p-8 bg-white dark:bg-zinc-800 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm transition-colors">
          <p className="text-sm text-slate-500 dark:text-zinc-400">
            El alumno seleccionado no cuenta con calificaciones o evaluaciones
            cargadas para este periodo.
          </p>
        </div>
      ) : (
        /* Lista de Materias */
        <div className="grid grid-cols-1 gap-6">
          {subjectsList.map((subject, idx) => {
            const gradeNum = parseInt(subject.final_grade || 0, 10);
            const isAplazado = gradeNum < 10;

            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden transition-colors"
              >
                {/* Header Materia */}
                <div className="bg-slate-50/80 dark:bg-zinc-800/40 px-6 py-4 flex justify-between items-center border-b border-slate-200 dark:border-zinc-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isAplazado
                          ? "bg-red-500 animate-pulse"
                          : "bg-indigo-500 dark:bg-indigo-400"
                      }`}
                    />
                    <h3 className="font-semibold text-slate-800 dark:text-zinc-100 text-base">
                      {subject.subject_name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                      Definitiva
                    </span>
                    <span
                      className={`text-base font-bold px-3 py-1 rounded-xl border ${
                        isAplazado
                          ? "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/50"
                          : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50"
                      }`}
                    >
                      {subject.final_grade !== null
                        ? String(subject.final_grade).padStart(2, "0")
                        : "--"}
                    </span>
                  </div>
                </div>

                {/* Grid de Lapsos */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-slate-400 dark:text-zinc-500 font-medium mb-1">
                    Presiona un lapso para expandir el detalle de tareas y
                    exámenes:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {subject.lapses?.map((lapso, lapIdx) => {
                      const isLapAplazado =
                        lapso.grade !== null && lapso.grade < 10;
                      const isCurrentOpen =
                        openLapso === `${subject.subject_name}-${lapIdx}`;

                      return (
                        <div
                          key={lapIdx}
                          className="flex flex-col border border-slate-200 dark:border-zinc-800 rounded-xl bg-slate-50/50 dark:bg-zinc-800/20 overflow-hidden transition-colors"
                        >
                          {/* Encabezado Botón de Lapso */}
                          <button
                            onClick={() =>
                              toggleLapso(subject.subject_name, lapIdx)
                            }
                            className={`w-full text-left p-4 flex justify-between items-center transition-colors hover:bg-slate-100/70 dark:hover:bg-zinc-800/60 ${
                              isCurrentOpen
                                ? "bg-indigo-50/50 dark:bg-indigo-950/30"
                                : ""
                            }`}
                          >
                            <div>
                              <span className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider block">
                                Momento {lapso.number}
                              </span>
                              <span
                                className={`text-sm font-bold ${
                                  lapso.grade === null
                                    ? "text-slate-400 dark:text-zinc-500 font-normal"
                                    : isLapAplazado
                                      ? "text-red-500 dark:text-red-400"
                                      : "text-slate-700 dark:text-zinc-200"
                                }`}
                              >
                                {lapso.grade !== null
                                  ? `${String(lapso.grade).padStart(2, "0")} pts`
                                  : "Sin evaluar"}
                              </span>
                            </div>
                            <span className="text-slate-400 dark:text-zinc-500 font-medium text-xs">
                              {isCurrentOpen ? "▲ Ocultar" : "▼ Ver Notas"}
                            </span>
                          </button>

                          {/* Contenido Desplegable (Actividades del Lapso) */}
                          {isCurrentOpen && (
                            <div className="bg-white dark:bg-zinc-900/80 p-4 border-t border-slate-100 dark:border-zinc-800 space-y-3 flex-1 transition-colors">
                              {lapso.evaluations &&
                              lapso.evaluations.length > 0 ? (
                                lapso.evaluations.map((evalu, evalIdx) => (
                                  <div
                                    key={evalIdx}
                                    className="flex justify-between items-start text-xs border-b border-slate-100 dark:border-zinc-800/60 pb-2 last:border-none last:pb-0"
                                  >
                                    <div className="space-y-0.5 max-w-[75%]">
                                      <p className="font-medium text-slate-700 dark:text-zinc-200 wrap-break-word">
                                        {evalu.name}
                                      </p>
                                      <p className="text-slate-400 dark:text-zinc-500 font-normal">
                                        Valor: {evalu.percentage}%
                                      </p>
                                    </div>
                                    <span
                                      className={`font-semibold shrink-0 px-2 py-0.5 rounded ${
                                        evalu.grade < 10
                                          ? "text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/30"
                                          : "text-slate-600 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800"
                                      }`}
                                    >
                                      {String(evalu.grade).padStart(2, "0")} pts
                                    </span>
                                  </div>
                                ))
                              ) : (
                                <p className="text-xs text-slate-400 dark:text-zinc-500 text-center py-2">
                                  No hay actividades registradas para este
                                  lapso.
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
