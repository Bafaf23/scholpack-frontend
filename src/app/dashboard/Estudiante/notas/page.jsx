"use client";
import Loading from "@/app/loading";
import axios from "axios";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import TarjetaMateriaNotas from "@/components/molecules/TarjetaMateriaNotas";
import { useAuth } from "@/context/AuthContext";
import { getLapseActive } from "@/services/lapse/getLapseActive";
import { getGrade } from "@/services/student/getGrade";
import {
  faClock,
  faGraduationCap,
  faClipboardList,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import AccessDenied from "@/components/molecules/AccessDenied";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NotasPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingType, setLoadingType] = useState(null);
  const [section, setSection] = useState({
    yearName: "",
    sectionName: "",
    sectionId: null,
  });
  const [lapse, setLapse] = useState({});
  const [generalAverage, setGeneralAverage] = useState("0.00");

  const { user } = useAuth();
  const idPeiod = user?.user?.id_period;
  const id = user?.user?.id;

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        setLoading(true);

        const idStudent = user?.user?.id_user;
        if (!idStudent) return; // Evitar llamadas si el usuario no ha cargado

        const response = await getGrade(idStudent);
        const lapseActive = await getLapseActive();

        const listaMaterias = response?.data.subjects || [];
        const yearName = response?.data.year || "";
        const sectionName = response?.data.section || "";
        const sectionId = response?.data.section_id || null;

        setSubjects(listaMaterias);
        setLapse(lapseActive.data || {});
        setSection({
          yearName: yearName,
          sectionName: sectionName,
          sectionId: sectionId,
        });

        if (listaMaterias.length > 0) {
          const sumaDefinitivas = listaMaterias.reduce(
            (acc, sub) => acc + parseFloat(sub.final_grade || 0),
            0,
          );
          const promedio = sumaDefinitivas / listaMaterias.length;
          setGeneralAverage(promedio.toFixed(2));
        }
      } catch (error) {
        console.error("❌ Error al cargar notas en el frontend:", error);
        toast.error("No se pudo sincronizar el plan de notas");
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [user]);

  const handleDownload = async (url, type) => {
    setLoadingType(type);
    try {
      const response = await axios.get(url, {
        withCredentials: true,
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const blob = response.data;
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;

      const nombreAño = section.yearName.replace(/\s+/g, "_");
      const nombreSeccion = section.sectionName.replace(/\s+/g, "_");
      a.download = `${type}_${nombreAño}_${nombreSeccion}_${new Date().getTime()}.pdf`;

      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
      toast.success("Boleta descargada correctamente");
    } catch (error) {
      console.error("Error al descargar reporte:", error);

      if (
        error.response &&
        error.response.data &&
        typeof error.response.data.text === "function"
      ) {
        try {
          const textoError = await error.response.data.text();
          const dataError = JSON.parse(textoError);
          toast.error(dataError.message || "Error al generar el reporte");
        } catch (parseError) {
          toast.error("Error en el servidor al procesar el archivo");
        }
      } else {
        toast.error(
          "Hubo un fallo de conexión al intentar descargar el reporte",
        );
      }
    } finally {
      setLoadingType(null);
    }
  };

  if (loading) return <Loading />;

  if (user?.user.role != "estudiante") return <AccessDenied />;

  return (
    <main>
      <HeaderDashbord titelPage="Panel de Notas" />

      <section className="p-3 mt-5">
        {/* Banner Informativo Premium */}
        <div className="flex items-start gap-3 p-4 bg-cyan-50/80 dark:bg-cyan-950/30 border border-cyan-200/60 dark:border-cyan-900/50 mb-5 rounded-xl backdrop-blur-sm shadow-sm">
          <div className="p-1.5 bg-cyan-100 text-cyan-600 rounded-lg dark:bg-cyan-900/50 dark:text-cyan-400 mt-0.5 flex items-center justify-center shrink-0">
            <Icon icon={faClipboardList} className="text-sm" />
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
              Nota Informativa
            </span>
            <p className="text-sm text-cyan-800 dark:text-slate-300 leading-relaxed font-medium">
              Las notas se muestran según el <strong>periodo</strong> y el lapso
              en tiempo real. Si quieres ver tus notas de <strong>años</strong>{" "}
              anteriores, consulta al departamento de control de estudios.
            </p>
          </div>
        </div>

        {/* Tarjetas Superiores Informativas */}
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {/* Tarjeta: Periodo */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm transition-all dark:border-slate-700/50 dark:bg-slate-800/60">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400">
              <Icon icon={faClock} className="text-base" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Período y Lapso
              </span>
              <div className="flex items-center gap-2 truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                <span>{user?.user?.period || "2025 - 2026"}</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                  {lapse?.name || "Cargando..."}
                </span>
              </div>
            </div>
          </div>

          {/* Tarjeta: Promedio General */}
          <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm transition-all dark:border-slate-700/50 dark:bg-slate-800/60">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
              <Icon icon={faGraduationCap} className="text-base" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Promedio General
              </span>
              <span
                className={`text-sm font-black ${
                  parseFloat(generalAverage) >= 10
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {generalAverage ? `${generalAverage} pts` : "N/A"}
              </span>
            </div>
          </div>

          {/* Botón de Impresión */}
          <div className="flex items-center justify-start sm:col-span-2 md:col-span-1 md:justify-end">
            <Button
              icon={faPrint}
              disabled={loadingType !== null || !section.sectionId}
              type="button"
              onClick={() =>
                handleDownload(
                  `${process.env.NEXT_PUBLIC_API_URL}/reports/boleta/${id}/${section.sectionId}/${idPeiod}`,
                  "Boleta",
                )
              }
              classNameBtn="w-full sm:w-auto h-full min-h-[48px] px-5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-medium flex gap-2 justify-center items-center cursor-pointer transition-all shadow-sm active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              Imprimir Boleta
            </Button>
          </div>
        </div>

        {/* Mapeo de Materias */}
        {subjects && subjects.length > 0 ? (
          subjects.map((subject) => (
            <TarjetaMateriaNotas key={subject.id} subject={subject} />
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-100 p-6 text-center text-slate-600 transition-colors dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
            Aún no hay materias registradas en tu sección.
          </div>
        )}
      </section>
    </main>
  );
}
