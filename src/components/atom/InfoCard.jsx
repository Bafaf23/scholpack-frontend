import Icon from "./Icon";

/**
 * Tarjeta de estado (KPI) adaptable para visualización de métricas.
 * Soporta integración con el componente Icon y estilos personalizados. (Dashboard)
 *
 * @component
 * @param {Object} props
 * @param {string} props.label - Título de la tarjeta.
 * @param {string|number} props.value - Valor relevante de la tarjeta.
 * @param {object|string} props.icon - Icono de FontAwesome u objeto soportado por <Icon />.
 * @param {string} [props.colorClass="text-orange-500 bg-orange-500/10"] - Clases Tailwind para color de texto/fondo del icono.
 * @param {string} [props.description="No hay información que mostrar"] - Descripción breve de la tarjeta.
 * @returns {JSX.Element}
 */
export default function InfoCard({
  label,
  value,
  icon,
  colorClass = "text-orange-500 bg-orange-500/10 dark:text-orange-400 dark:bg-orange-500/20",
  description = "No hay información que mostrar",
}) {
  return (
    <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        {/* Contenedor del icono con fondo dinámico semitransparente */}
        <div
          className={`flex items-center justify-center rounded-xl p-2.5 transition-colors ${colorClass}`}
        >
          <Icon icon={icon} className="text-xl" />
        </div>

        {/* Valor principal del KPI */}
        <span className="text-2xl font-bold text-slate-800 dark:text-zinc-100">
          {value}
        </span>
      </div>

      <div>
        {/* Título o etiqueta del KPI */}
        <p className="text-sm font-semibold text-slate-700 dark:text-zinc-200">
          {label}
        </p>

        {/* Descripción secundaria */}
        <p className="text-xs text-slate-400 dark:text-zinc-400 italic">
          {description}
        </p>
      </div>
    </div>
  );
}
