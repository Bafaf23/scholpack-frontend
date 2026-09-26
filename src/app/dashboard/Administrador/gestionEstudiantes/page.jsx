"use client";

import Loading from "@/app/loading";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import AccessDenied from "@/components/molecules/AccessDenied";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import Search from "@/components/molecules/Serch";
import TableInsti from "@/components/molecules/TableInsti";
import FormInscrip from "@/components/organism/FromInscrip";
import SkeletonCard from "@/components/atom/SkeletonCard";
import Modal from "@/components/organism/Modal";
import { useAuth } from "@/context/AuthContext";
import { getStudents } from "@/services/student/getStudents";
import Banner from "@/components/atom/Banner";
import Pagination from "@/components/molecules/Pagination";
import {
  faAdd,
  faBook,
  faIdCard,
  faUser,
  faClipboardList,
  faAward,
  faInfo,
  faFile,
  faFileCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

export default function GestionEstudiantesPage() {
  const { user, loading: authLoading } = useAuth();

  const [isOpent, setIsOpent] = useState(false);
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [appliedFilter, setAppliedFilter] = useState("");

  // Definición centralizada y memorizada para cargar estudiantes
  const fetchStudentsData = useCallback(
    async (targetPage = page) => {},
    [page],
  );

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setDataLoading(true);
        const res = await getStudents(page);
        setStudents(res?.data ?? []);
        setPagination(res?.pagination ?? null);
      } catch (error) {
        console.error("Error al cargar estudiantes:", error);
      } finally {
        setDataLoading(false);
      }
    };

    if (user) {
      fetchStudents();
    }
  }, [user, page]);
  // Carga inicial y por cambio de página
  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchStudentsData(page);
    }
  }, [user, page, fetchStudentsData]);

  const handlePageChange = (newPage) => {
    if (newPage && newPage !== page) {
      setPage(newPage);
    }
  };

  // Limpieza del filtro al vaciar el input
  if (authLoading) return <Loading />;
  if (
    !user ||
    user.user.role === "estudiante" ||
    user.user.role === "profesor"
  ) {
    return <AccessDenied />;
  }

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500 ease-out">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 p-1">
        <HeaderDashbord titelPage="Gestión de Estudiantes" />
      </div>

      {/* Modales */}
      <Modal
        title="Crear Estudiante"
        isOpen={isOpent}
        onClose={() => setIsOpent(false)}
      >
        <FormInscrip
          mode="insc"
          onSuccess={() => {
            fetchStudentsData(1);
            setIsOpent(false);
          }}
        />
      </Modal>

      <Modal
        title="Información del Estudiante"
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <FormInscrip
          mode="edit"
          student={selectedStudent}
          onSuccess={() => {
            fetchStudentsData(page);
            setIsOpenModal(false);
          }}
        />
      </Modal>

      <div className="p-2">
        <Banner
          icon={faInfo}
          titel="Más información"
          message="Para conocer la ficha detallada del estudiante, haz clic sobre el número de matrícula."
        />
      </div>

      {/* Filtros y Métricas Rápidas */}
      <section className="p-2">
        <div className="p-4 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md border border-slate-200/80 dark:border-zinc-700/50 rounded-2xl mb-4 shadow-sm">
          <div className="w-full sm:max-w-md">
            <Search
              placeholder="Cédula, Matrícula o Nombre..."
              search={search}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-end items-stretch sm:items-center w-full sm:w-auto">
            {pagination && (
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
                loading={dataLoading}
              />
            )}
            <div className="w-full sm:w-auto">
              <Button
                onClick={() => setIsOpent(true)}
                icon={faAdd}
                classNameBtn="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition-colors p-3 rounded-xl text-white font-semibold cursor-pointer flex items-center justify-center gap-2 text-sm shadow-sm shadow-indigo-500/20 w-full whitespace-nowrap"
              >
                Crear Estudiante
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabla y Renderizado de Datos */}
      {dataLoading ? (
        <div className="p-3">
          <SkeletonCard />
        </div>
      ) : (
        <div className="p-2">
          <TableInsti
            titelTable={[
              { name: "Número de Matrícula", icon: faIdCard },
              { name: "Nombre y Apellido", icon: faUser },
              { name: "Grado y Sección", icon: faBook },
              { name: "Acciones", icon: faClipboardList },
            ]}
            data={students}
            renderTableRows={(student) => (
              <tr
                key={student.id}
                className="transition-colors hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 group border-b border-slate-100 dark:border-zinc-800"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1.5">
                    <Link
                      href={`/dashboard/administrador/gestionEstudiantes/${student.id}`}
                      className="font-bold text-cyan-700 dark:text-cyan-400 text-xs uppercase tracking-wide border border-cyan-500/20 rounded-lg px-2.5 py-1 inline-flex items-center bg-cyan-500/10 w-fit hover:bg-cyan-500/20 transition-colors"
                    >
                      {student.tuition_number}
                    </Link>
                    <span
                      className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full w-fit ${
                        student.condition === "nuevo_ingreso"
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-orange-500/10 text-orange-600"
                      }`}
                    >
                      {student.condition?.replace("_", " ")}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-md font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-orange-400 transition-colors">
                      {student.user?.name} {student.user?.last_name}
                    </span>
                    <span className="text-sm text-slate-400 mt-0.5">
                      {student.user?.id_card}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {student.enrollment ? (
                    <div className="flex flex-col gap-1">
                      <span className="w-fit rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {student.enrollment.year?.name} - Sección &quot;
                        {student.enrollment.section?.name}&quot;
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      Sin inscripción
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {student.enrollment && (
                      <Link
                        href={`${process.env.NEXT_PUBLIC_API_URL}/reports/${student.id}/enrollment`}
                        target="_blank"
                      >
                        <Button
                          icon={faClipboardList}
                          title="Descargar Planilla de Inscripción"
                          classNameBtn="p-1.5 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition-colors"
                        />
                      </Link>
                    )}
                    <Button
                      icon={faFileCircleCheck}
                      onClick={() =>
                        alert(
                          "Este reporte sigue en desarrollo, en la proxima version podras disfrutar de el",
                        )
                      }
                      title="Constacia de Estudio"
                      classNameBtn="p-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                    />
                  </div>
                </td>
              </tr>
            )}
            renderMovilCard={(student) => (
              <div
                key={`movil-${student.id}`}
                className="flex flex-col gap-3 p-5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 mb-3 border-dashed"
              >
                <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-indigo-500 tracking-wider block">
                      {student.tuition_number || "?"}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 capitalize mt-0.5">
                      {student.user?.name} {student.user?.last_name}
                    </h3>
                  </div>

                  {student.enrollment && (
                    <Link
                      href={`${process.env.NEXT_PUBLIC_API_URL}/reports/${student.id}/enrollment`}
                      target="_blank"
                    >
                      <Button
                        title="Descargar Planilla de inscripcion"
                        classNameBtn="text-cyan-600 p-1.5 hover:bg-cyan-500/10 rounded-xl border border-cyan-500/10"
                      >
                        <Icon icon={faClipboardList} className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                  <p>
                    <span className="text-slate-400">C.I:</span>{" "}
                    {student.user?.id_card}
                  </p>

                  <p className="col-span-2 truncate">
                    <span className="text-slate-400">Email:</span>{" "}
                    {student.user?.email || "N/A"}
                  </p>
                </div>

                <div className="pt-1 flex justify-between items-center text-[11px]">
                  <div className="flex gap-1">
                    <span className="px-2 py-0.5 font-bold bg-indigo-500/10 text-indigo-600 rounded-md border border-indigo-500/10">
                      {student.enrollment?.year?.name || `Sin año`}
                    </span>
                    <span className="px-2 py-0.5 font-bold bg-slate-500/10 text-slate-700 dark:text-slate-300 rounded-md">
                      Sección {student.enrollment?.section?.name || "N/A"}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      student.condition === "nuevo_ingreso"
                        ? "bg-emerald-500/10 text-emerald-600"
                        : "bg-orange-500/10 text-orange-600"
                    }`}
                  >
                    {student.condition?.replace("_", " ")}
                  </span>
                </div>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
}
