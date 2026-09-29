import Icon from "@/components/atom/Icon";
import {
  faExclamationTriangle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function ConfirmActionModal({
  isOpen,
  titel,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  variant = "danger",
}) {
  if (!isOpen) return null;

  // Estilos dinámicos según el peligro de la acción
  const colorMap = {
    danger: {
      bgIcon: "bg-red-50 dark:bg-red-950/30",
      icon: "text-red-600 dark:text-red-400",
      btn: "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/10",
    },
    warning: {
      bgIcon: "bg-amber-50 dark:bg-amber-950/30",
      icon: "text-amber-600 dark:text-amber-400",
      btn: "bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/10",
    },
    info: {
      bgIcon: "bg-cyan-50 dark:bg-zinc-950/30",
      icon: "text-cyan-600 dark:text-orange-400",
      btn: "bg-cyan-500 hover:bg-cyan-700 shadow-cyan-600/10 dark:bg-orange-600 dark:hover:bg-orange-700 text-white shadow-md dark:shadow-orange-600/10",
    },
  };

  const styles = colorMap[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fondo oscuro traslúcido con desenfoque premium */}
      <div
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm animate-fade-in"
        onClick={onCancel}
      />

      {/* Contenedor de la Ventana */}
      <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl border border-slate-100 dark:border-zinc-800 dark:bg-zinc-900 transition-all animate-scale-up">
        <div className="flex items-start gap-4">
          {/* Icono de Alerta */}
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${styles.bgIcon}`}
          >
            <Icon
              icon={variant === "danger" ? faTrashAlt : faExclamationTriangle}
              className={`text-xl ${styles.icon}`}
            />
          </div>

          {/* Textos */}
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              {titel}
            </h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Botonera Inferior */}
        <div className="mt-6 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 dark:border-zinc-700 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${styles.btn} cursor-pointer`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
