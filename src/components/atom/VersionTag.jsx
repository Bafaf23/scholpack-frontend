/**
 * Visualizador de versiones del sistema, la version la recibe del package.json
 *
 * @returns {JSX.Element}
 */
export default function VersionTag() {
  return (
    <div className="flex items-center p-1 opacity-50 select-none">
      <div className="flex justify-end rounded-sm p-1 text-xs dark:border-slate-400">
        <span className=" font-bold text-slate-600 uppercase dark:text-slate-300">
          v{process.env.NEXT_PUBLIC_APP_VERSION}
        </span>
      </div>
    </div>
  );
}
