"use client";
import Button from "../atom/Button";
import Icon from "../atom/Icon";
import Banner from "../atom/Banner";
import Input from "../atom/Input";
import AcademicFields from "../molecules/AcademicBackgroundFields";
import EnrollmentSchool from "../molecules/EnrollmentSchool";
import HealthPhysicalFields from "../molecules/HealthPhysicalFields";
import LegalRepresentativeFields from "../molecules/LegalRepresentativeFields";
import LocationFields from "../molecules/LocationFields";
import PersonalDataFields from "../molecules/PersonalDataFields";
import { useState } from "react";
import toast from "react-hot-toast";
import { createStudent } from "@/services/student/createStudent";
import { updateStudent } from "@/services/student/updateStudent";
import { faInfoCircle, faStopCircle } from "@fortawesome/free-solid-svg-icons";
import Success from "./Success";
import { useRouter } from "next/navigation";

export default function FormInscrip({
  mode,
  student,
  onSuccess,
  nameSchool,
  SIG,
}) {
  const router = useRouter();
  const [passed, setPassed] = useState(1);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const [formData, setFormData] = useState({
    documentType: "V",
    document: student?.document || "",
    name: student?.name || "",
    lastName: student?.last_name || "",
    email: student?.email || "",
    phone: student?.phone || "",
    gender: student?.gender || "",
    status: student?.status || "",
    birthDate: student?.birth_date
      ? new Date(student.birth_date).toISOString().split("T")[0]
      : "",

    isNewEntry: false,
    previousSchool: student?.previous_school || "",
    previousSchoolCode: student?.previous_school_code || "",
    previousYear: student?.previous_year || "",
    previousSection: student?.previous_section || "",

    SIG: SIG,
    role_id: 2,

    allergies: student?.allergies || "",
    shirtSize: student?.shirt_size || "",
    pantSize: student?.pants_size || "",
    shoeSize: student?.shoe_size || "",
    weight: student?.weight || "",
    medicalCondition: student?.medical_condition || "",
    height: student?.height || "",

    repdniType: student?.repdniType || "V",
    repdni: student?.repdni || "",
    repName: student?.rep_name || "",
    repLastName: student?.rep_last_name || "",
    repPhone: student?.rep_phone || "",
    relationship: student?.relationship || "",
    repEmail: student?.rep_email || "",
  });

  const totalSteps = mode === "edit" ? 2 : formData.isNewEntry ? 5 : 4;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();

    if (loading) return;

    if (
      !formData.documentType ||
      !formData.document ||
      !formData.name ||
      !formData.lastName
    ) {
      return toast.error(
        "Por favor, rellena los campos obligatorios del estudiante.",
      );
    }

    if (
      mode !== "edit" &&
      (!formData.repdni || !formData.repName || !formData.repLastName)
    ) {
      return toast.error(
        "Por favor, completa los datos del representante legal.",
      );
    }

    setLoading(true);
    let result;
    if (mode === "edit") {
      result = await updateStudent(formData);
    } else {
      result = await createStudent(formData);
    }

    if (result?.success !== true) {
      toast.error(result?.message || "Ocurrió un error.");
    } else {
      toast.success(result.message);
      setSuccessData(result.data);
      console.log("Resultado de la inscripción:", result);
      onSuccess?.();
    }
    setLoading(false);
  };

  if (successData)
    return (
      <Success data={successData} school={{ name: nameSchool, SIG: SIG }} />
    );

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {/* Banner modo edit*/}
      {mode === "edit" && (
        <div className="bg-cyan-50/50 border border-cyan-200 p-4 rounded-xl backdrop-blur-sm">
          <p className="text-sm text-cyan-800 font-medium leading-relaxed">
            <strong className="text-cyan-900 font-semibold">Nota:</strong> La
            condición y el estatus del estudiante se actualizarán de forma
            automática al final del periodo académico.
          </p>

          <div className="mt-3 pt-3 border-t border-cyan-200/60 flex items-center gap-2">
            <span className="text-xs font-semibold text-cyan-700 bg-cyan-100/50 px-2 py-0.5 rounded-md">
              Acción
            </span>
            <p className="text-xs text-cyan-600 font-medium">
              En caso de{" "}
              <span className="font-semibold text-cyan-800">Traslado</span> o{" "}
              <span className="font-semibold text-cyan-800">Retirado</span>, por
              favor contacte a soporte.
            </p>
          </div>
        </div>
      )}

      {/* PASO 1: Datos Personales (Común para todos) */}
      {passed === 1 && (
        <div className="space-y-8">
          <PersonalDataFields
            datos={formData}
            manejarCambio={handleChange}
            mode={mode}
          />
        </div>
      )}

      {/* 🚀 FLUJO: NUEVO INGRESO (isNewEntry: true) */}
      {mode !== "edit" && formData.isNewEntry && (
        <>
          {passed === 2 && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <AcademicFields datos={formData} manejarCambio={handleChange} />
            </div>
          )}
          {passed === 3 && (
            <HealthPhysicalFields
              datos={formData}
              manejarCambio={handleChange}
            />
          )}
          {passed === 4 && (
            <LegalRepresentativeFields
              datos={formData}
              manejarCambio={handleChange}
            />
          )}
        </>
      )}

      {/* 🚀 FLUJO: INGRESO REGULAR (isNewEntry: false) */}
      {mode !== "edit" && !formData.isNewEntry && (
        <>
          {passed === 2 && (
            <HealthPhysicalFields
              datos={formData}
              manejarCambio={handleChange}
            />
          )}
          {passed === 3 && (
            <LegalRepresentativeFields
              datos={formData}
              manejarCambio={handleChange}
            />
          )}
        </>
      )}

      {/* 🚀 FLUJO: EDICIÓN (mode === "edit") */}
      {mode === "edit" && (
        <>
          {passed === 2 && (
            <HealthPhysicalFields
              datos={formData}
              manejarCambio={handleChange}
            />
          )}
        </>
      )}

      {/* PASO FINAL: Información de Cuenta (Solo en creación) */}
      {passed === totalSteps && mode !== "edit" && (
        <div className="space-y-6">
          <h4 className="font-extrabold text-amber-500 uppercase text-2xl">
            Una cosa más para termiar
          </h4>

          <Banner
            icon={faStopCircle}
            titel="Reglamento, terminos y condiciones"
            message="Al presionar el boton de inscribir, acepta los términos y condiciones del sistema. (ScholPack) y el reglamento interno de la institución educativa de la que desea inscribir al estudiante. Se recomienda leer el reglamento y los términos y condiciones antes de continuar."
          />

          <div className="grid grid-cols-2 gap-3 items-end">
            <div className="col-span-2">
              <Input
                label="Escuela que procesa el registro"
                name="school"
                value={`${nameSchool} (${SIG})`}
                readOnly
              />
            </div>

            <Input
              label="Usuario para ingresar al sistema"
              name="email"
              value={formData.email}
              readOnly
            />

            <Input
              label="Contraseña temporal para ingresar al sistema"
              name="document"
              value={`${formData.document}@2026`}
              readOnly
            />
          </div>
          <Banner
            icon={faInfoCircle}
            titel="Seguridad"
            message="Proteja esta cuenta. No comparta su usuario ni contraseña con nadie. ScholPack no se hace responsable por el mal uso de la cuenta."
          />
        </div>
      )}

      {/* CONTROLES DE NAVEGACIÓN */}
      <div className="mt-5 flex justify-between pt-6">
        <Button
          type="button"
          onClick={() => setPassed((p) => Math.max(1, p - 1))}
          classNameBtn={`text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-400 font-medium border border-slate-300 dark:border-zinc-600 rounded-lg p-2 cursor-pointer ${passed === 1 ? "invisible" : ""}`}
        >
          Anterior
        </Button>

        <Button
          type="button"
          onClick={() => setPassed((p) => Math.min(totalSteps, p + 1))}
          classNameBtn={`rounded-lg bg-orange-600 p-3 font-bold text-white transition-all hover:bg-orange-700 active:scale-95 group flex items-center gap-5 cursor-pointer ${passed >= totalSteps ? "hidden" : ""}`}
        >
          Siguiente
        </Button>

        <Button
          type="submit"
          disabled={loading}
          classNameBtn={`rounded-lg bg-green-600 p-3 font-bold text-white transition-all hover:bg-green-700 disabled:bg-slate-300 flex items-center gap-2 ${passed < totalSteps ? "hidden" : ""}`}
        >
          {loading
            ? "Procesando..."
            : mode === "edit"
              ? "Actualizar"
              : "Finalizar"}
        </Button>
      </div>
    </form>
  );
}
