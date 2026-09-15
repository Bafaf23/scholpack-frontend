"use client";

/**
 * Input estilado y adaptable con tipo, para el menejo de datos, tambien recibe onChange.
 *
 * @component
 * @param {Object} props
 * @param {string} props.label - Titulo del input (ej: nombre)
 * @param {string} props.type - El tipo de input (ej: text, number, data, etc)
 * @param {string} props.placeholder - Texte de ayuda para el usuario (ej: user@ejemplo.com)
 * @param {string} props.name
 * @param {string} props.valeu
 * @param {string} props.onChange
 * @returns {JSX.Element}
 */

export default function Input({
  label,
  type = "text",
  placeholder,
  name,
  id,
  value,
  onChange,
  className,
  readOnly = false,
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="ml-1 text-sm font-semibold text-slate-600 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onWheel={(e) => e.target.blur()}
        onChange={onChange}
        placeholder={placeholder}
        className={`relative w-full [appearance:textfield] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 focus:outline-none dark:border-slate-700 dark:bg-slate-800 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${readOnly ? "cursor-not-allowed text-gray-400" : " text-slate-200"}`}
        readOnly={readOnly}
      />
    </div>
  );
}
