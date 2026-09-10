import CardSecction from "../atom/CardSection";
import Icon from "../atom/Icon";
import { faBook } from "@fortawesome/free-solid-svg-icons";

/**
 * Grilla de secciones cargadas en el sistema.
 *
 * @component
 *
 * @param {object} props
 * @param {Array} props.dataSet - Arreglo de objetos de sección
 * @param {Array} props.availableStudents
 * @param {string|number} props.period
 * @returns {JSX.Element}
 */

export default function CardGridSetion({
  dataSet = [],
  availableStudents = [],
  period,
  preinscriptionStudent = [],
}) {
  if (!dataSet || dataSet.length === 0)
    return (
      <div className="p-3">
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center dark:border-slate-500 dark:bg-slate-700">
          <Icon
            icon={faBook}
            className="mb-4 text-4xl text-slate-300 dark:text-slate-400"
          />
          <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
            No hay secciones creadas
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            Comienza agregando una materia en el formulario lateral.
          </p>
        </div>
      </div>
    );

  return (
    <div className="grid gap-5 p-3 md:grid-cols-1 lg:grid-cols-2">
      {dataSet.map((section) => {
        // Formateamos el nombre del docente guía de manera limpia
        const teacherName = section.guide
          ? `${section.guide.name} ${section.guide.last_name || ""}`.trim()
          : "No asignado";

        return (
          <CardSecction
            id={section.id}
            key={section.id}
            grade={section.name}
            identifier={section.nomenclature}
            teacher={teacherName}
            idTeacher={section.guide.document}
            current={section.students.length}
            max={section.capacity || 35}
            availableStudents={availableStudents}
            period={period}
            idYearSection={section.year_id}
            id_section={section.id}
            sectionStudents={section.students || []}
            preinscriptionStudent={preinscriptionStudent}
          />
        );
      })}
    </div>
  );
}
