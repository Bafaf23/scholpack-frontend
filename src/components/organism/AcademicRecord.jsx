import { useState, useEffect } from "react";
import { getRecordStudent } from "@/services/student/getRecordStudent";
import TableInsti from "../molecules/TableInsti";
import Label from "../atom/Label";
import {
  faBook,
  faBookBookmark,
  faBoxArchive,
  faChain,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function RecordAcademico({ periodStudent, idStudent }) {
  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const [loading, setLoading] = useState(false);
  const [subjectsList, setSubjectsList] = useState([]);
  const [openLapso, setOpenLapso] = useState(null);

  const period = periodStudent?.[selectedPeriod];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    if (!period || !idStudent) return;

    getRecordStudent(idStudent, period.period.id)
      .then((data) => {
        const periodData = data?.data;
        setSubjectsList(periodData || []);
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

  const staticStart = [
    { name: "Código", icon: faChain },
    { name: "Asignatura", icon: faBook },
    { name: "Nomenclatura", icon: faBoxArchive },
  ];

  const staticEnd = [
    { name: "Definitiva", icon: faCheck },
    { name: "Estatus", icon: faCheck },
  ];

  // Renderizado dinámico de las columnas de lapsos
  const lapsesColumns = Array.isArray(subjectsList)
    ? subjectsList.map((lapse) => ({
        name: lapse?.lapse_name || "Lapso",
        icon: faBookBookmark,
      }))
    : [];

  return (
    <div className="w-full space-y-6">
      {/* Selector de Período */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-800 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm transition-colors">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-100 tracking-tight">
            Récord Académico de Evaluaciones
          </h2>
          <p className="text-sm text-cyan-600 dark:text-cyan-400 font-semibold mt-0.5">
            {period?.section?.year?.name} — Sección &quot;
            {period?.section?.name}&quot;
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
              key={rec?.period?.id || index}
              value={index}
              className="bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200"
            >
              Periodo Escolar - {rec?.period?.name}
            </option>
          ))}
        </select>
      </div>

      {/* Estado de Carga / Tabla */}
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
        <TableInsti
          titelTable={[...staticStart, ...lapsesColumns, ...staticEnd]}
          data={subjectsList[0]?.subjects || []}
          renderTableRows={(subject) => {
            // Recopilamos las notas de esta asignatura específica a lo largo de todos los lapsos
            const subjectScores = subjectsList.map((lapse) => {
              const matchedSubject = lapse?.subjects?.find(
                (s) => s.code_subject === subject.code_subject,
              );
              return Number(matchedSubject?.score) || 0;
            });

            // Promedio de la asignatura
            const totalScore = subjectScores.reduce(
              (acc, score) => acc + score,
              0,
            );
            const totalLapses = subjectsList.length || 1;
            const scoreFinal = Math.round(totalScore / totalLapses);

            return (
              <tr
                key={subject.code_subject}
                className="transition-colors hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 group border-b border-slate-100 dark:border-slate-800"
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-orange-400 transition-colors">
                    {subject.code_subject}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-slate-600 dark:group-hover:text-zinc-200 transition-colors">
                    {subject.name}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-slate-600 dark:group-hover:text-zinc-200 transition-colors">
                    {subject.abbreviation}
                  </span>
                </td>

                {/* Notas por cada lapso */}
                {subjectsList.map((lapse, lapseIdx) => {
                  const currentSubject = lapse?.subjects?.find(
                    (s) => s.code_subject === subject.code_subject,
                  );

                  return (
                    <td className="px-6 py-4" key={lapseIdx}>
                      <span className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-orange-400 transition-colors">
                        {currentSubject?.score ?? "0"}
                      </span>
                    </td>
                  );
                })}

                {/* Definitiva */}
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {scoreFinal}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-sm font-bold transition-colors ${scoreFinal >= 10 ? "text-emerald-500" : "text-red-500"}`}
                  >
                    {scoreFinal >= 10 ? "Aprobado" : "Reprobado"}
                  </span>
                </td>
              </tr>
            );
          }}
        />
      )}
    </div>
  );
}
