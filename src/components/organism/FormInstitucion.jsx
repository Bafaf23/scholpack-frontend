import Input from "../atom/Input";
import Selector from "../atom/Selector";
import Button from "../atom/Button";
import { useState } from "react";
import { createSchool } from "@/services/school/createSchool";
import { updateSchool } from "@/services/school/updateSchool";
import toast from "react-hot-toast";
import Banner from "../atom/Banner";
import { faCheck, faInfo } from "@fortawesome/free-solid-svg-icons";

export default function FormInstitucion({
  institution,
  onSuccess,
  isEdit = false,
}) {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    SIG: institution?.SIG || "",
    name: institution?.name || institution?.school_name || "",
    address: institution?.address || "",
    phone: institution?.phone || "",
    company_name: institution?.company_name || "",
    email: institution?.email || "",
    type: institution?.type || "Publica",
    RIF: institution?.RIF || "",
    municipality: institution?.municipality || "",
    cdceId: institution?.cdceId || 1,
    state: institution?.state || "Miranda",
    director_id: institution?.director_id || "",
    city: institution?.city || "",
    DEA_CODE: institution?.DEA_CODE || "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (!formData.type || !formData.name) return false;
    if (formData.type === "Publica" && !formData.DEA_CODE) return false;
    if (
      formData.type === "Privada" &&
      (!formData.RIF || !formData.company_name)
    )
      return false;
    return true;
  };

  const handleNextStep = () => {
    if (!validateStep1()) {
      toast.error("Por favor completa los campos obligatorios del primer paso");
      return;
    }
    setCurrentPage((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.address ||
      !formData.phone ||
      !formData.email ||
      !formData.type ||
      (formData.type === "Publica" && !formData.DEA_CODE) ||
      (formData.type === "Privada" && (!formData.RIF || !formData.company_name))
    ) {
      toast.error("Todos los campos marcados son obligatorios");
      return;
    }

    setLoading(true);

    try {
      const result = isEdit
        ? await updateSchool(formData)
        : await createSchool(formData);

      if (result?.success) {
        toast.success(
          isEdit
            ? "Institución actualizada exitosamente"
            : "Institución creada exitosamente",
        );
        onSuccess?.();
      } else {
        toast.error(
          result?.error || "Ocurrió un error al procesar la solicitud",
        );
      }
    } catch (err) {
      toast.error("Error inesperado en la comunicación con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const totalPage = 2;
  const isLastStep = currentPage === totalPage;

  return (
    <form className="space-y-6 p-2" onSubmit={handleSubmit}>
      <Banner
        titel="Subdominio Automático"
        message="El subdominio se creará de forma automática."
        icon={faInfo}
      />

      {currentPage === 1 && (
        <div className="space-y-3">
          <Selector
            name="type"
            label="Seleccione el tipo de institución"
            value={formData.type}
            onChange={(e) => handleChange("type", e.target.value)}
            options={[
              { value: "Publica", label: "Pública" },
              { value: "Privada", label: "Privada" },
            ]}
          />

          <div className="grid grid-cols-1 gap-2">
            {formData.type === "Publica" ? (
              <Input
                name="name"
                label="Nombre de la institución"
                placeholder="Institución de Educación"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Input
                  name="name"
                  label="Nombre de la institución"
                  placeholder="Institución de Educación"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                <Input
                  name="company_name"
                  label="Razón social"
                  placeholder="Ej: La Paloma S.A."
                  value={formData.company_name}
                  onChange={(e) => handleChange("company_name", e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-2">
            {formData.type === "Publica" ? (
              <Input
                name="DEA_CODE"
                label="Código DEA"
                placeholder="Ej: PD00001234"
                value={formData.DEA_CODE}
                onChange={(e) => handleChange("DEA_CODE", e.target.value)}
              />
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Input
                  name="RIF"
                  label="RIF"
                  placeholder="Ej: J1234567890"
                  value={formData.RIF}
                  onChange={(e) => handleChange("RIF", e.target.value)}
                />
                <Input
                  name="DEA_CODE"
                  label="Código DEA"
                  placeholder="Ej: PD00001234"
                  value={formData.DEA_CODE}
                  onChange={(e) => handleChange("DEA_CODE", e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {currentPage === 2 && (
        <div className="space-y-2">
          <Selector
            name="state"
            label="Estado"
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
            options={[{ value: "Miranda", label: "Miranda" }]}
          />
          <div className="grid grid-cols-1 gap-2">
            <Input
              name="address"
              label="Dirección"
              placeholder="Calle 123, Barrio 456, Caracas 1010"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />

            <div className="grid grid-cols-2 gap-2">
              <Input
                name="city"
                label="Ciudad"
                placeholder="Caracas"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
              <Input
                name="municipality"
                label="Municipio"
                placeholder="El Hatillo"
                value={formData.municipality}
                onChange={(e) => handleChange("municipality", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Input
              name="phone"
              label="Teléfono"
              placeholder="04123456789"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            <Input
              name="email"
              label="Correo electrónico"
              placeholder="ejemplo@institucion.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button
          type="button"
          disabled={currentPage === 1 || loading}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        {isLastStep ? (
          <Button
            icon={faCheck}
            type="submit"
            disabled={loading}
            classNameBtn="px-4 py-2 bg-emerald-600 text-white rounded font-bold cursor-pointer disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        ) : (
          <button
            type="button"
            onClick={handleNextStep}
            className="px-4 py-2 bg-indigo-600 text-white rounded font-bold"
          >
            Siguiente
          </button>
        )}
      </div>
    </form>
  );
}
