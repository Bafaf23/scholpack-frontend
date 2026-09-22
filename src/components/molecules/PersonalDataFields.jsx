import Input from "../atom/Input";
import Selector from "../atom/Selector";
import ToggleSimple from "../atom/ToggleSimple";
import Banner from "../atom/Banner";
import SelectorInput from "./SelectorInput";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";

/**
 * Page de fromulario de inscripcion de estudiantes.
 * Furmulario de del estudiante (ej: nombre, sexo, fecha de nacimineto).
 *
 * @componet
 * @param {object} props
 * @param {object} props.datos - Objeto de datos para la inscripcion de estudiante.
 * @param {Event} props.manejarCambio - Guarda los datos recopilados desde los formularios.
 * @returns {JSX.Element}
 */

const PersonalDataFields = ({ datos, manejarCambio, mode }) => {
  const documentType = [
    { value: "V", label: "V" },
    { value: "CE", label: "CE" },
  ];

  const genderSel = [
    { label: "Femenino", value: "F" },
    { label: "Masculino", value: "M" },
  ];

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    manejarCambio({ target: { name, value: checked } });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-2xl font-extrabold text-amber-500 uppercase">
          Tus datos personales
        </h4>
      </div>
      {/* Toggle para estudiantes de procedencia de otras escuelas */}
      <div>
        {/*  {mode !== "edit" && (
          <ToggleSimple
            label={"¿Vienes de otra institución academica?"}
            name={"isNewEntry"}
            value={datos.isNewEntry}
            onChange={handleToggle}
          />
        )} */}
      </div>
      <Banner icon={faIdCard} titel="¿Sin Cedula de Identidad?" message="Si aun no tienes cedula de identidad, puedes seleccionar 'CE' (Cédula de estudiantil) como tipo de documento y completar el campo con la cedula de tu representante." />
      <div className="grid md:grid-cols-3 items-end gap-4">
        {mode !== "edit" ? (
          <div className="col-span-2">
            <SelectorInput
              id={"dni"}
              name={"documentType"}
              nameInput={"document"}
              placeholder={"32876354"}
              label={"Selecciona tipo de documento"}
              options={documentType}
              onChange={manejarCambio}
              valueSel={datos.documentType}
              valueInput={datos.document}
            />
          </div>
        ) : (
          <>
            <div className="col-span-2 md:col-span-2">
              <Input
                name={"document"}
                label={"Numero de documento"}
                placeholder={"32876354"}
                onChange={manejarCambio}
                value={datos.document}
              />
            </div>
          </>
        )}
        <div className="col-span-2 md:col-span-1">
          <Input
            name={"birthDate"}
            label={"Fecha de nacimiento"}
            placeholder={"23/12/2002"}
            type={"date"}
            onChange={manejarCambio}
            value={datos.birthDate || ""}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 place-items-end gap-2 md:grid-cols-2">
        <Input
          name={"name"}
          label={"Nombre"}
          placeholder={"Juan"}
          onChange={manejarCambio}
          value={datos?.name}
        />
        <Input
          name={"lastName"}
          label={"Apellido"}
          placeholder={"Fernandez"}
          onChange={manejarCambio}
          value={datos?.lastName}
        />
      </div>
      <div>
        <Selector
          name={"gender"}
          label={"Género / Sexo"}
          options={genderSel}
          onChange={manejarCambio}
          value={datos?.gender}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 place-items-end gap-2">
        <Input
          name={"email"}
          label={"Correo Electronico"}
          placeholder={"ejemplo@correo.com"}
          onChange={manejarCambio}
          value={datos?.email}
        />
        <Input
          name={"phone"}
          label={"Numero de Telefono"}
          placeholder={"0424XXXXXXX"}
          onChange={manejarCambio}
          value={datos?.phone}
        />
      </div>
    </div>
  );
};

export default PersonalDataFields;
