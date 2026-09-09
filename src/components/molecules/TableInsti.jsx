import Icon from "../atom/Icon";
import {
  faLocationDot,
  faPhone,
  faIdCard,
  faBook,
  faBuilding,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";

/**
 *
 * @param {array} titelTable - Array de objetos con las propiedades label y key
 * @param {array} data
 * @param {boolean} loading
 * @param {function} renderMovilCard
 * @param {function} renderTableRows
 * @returns {JSX.Element}
 *
 * @expal
 * <TableInsti
 *  titelTable={[
 *    { label: "Nombre", key: "name" },
 *    { label: "Dirección", key: "address" },
 *    { label: "Teléfono", key: "phone" },
 *  ]}
 *  data={data}
 * />
 */
export default function TableInsti({
  titelTable = [],
  data = [],
  loading = false,
  renderMovilCard = () => {},
  renderTableRows = () => {},
}) {
  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 text-center text-slate-500 shadow">
        Cargando instituciones...
      </div>
    );
  }

  return (
    <div className="p-2">
      {/* lista de instituciones mobile */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {data.length === 0 ? (
          <div className="p-3">
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center dark:border-slate-500 dark:bg-slate-700">
              <Icon
                icon={faBook}
                className="mb-4 text-4xl text-slate-300 dark:text-slate-400"
              />
              <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
                No hay informacion que mostar
              </p>
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Comienza haciendo un registro con el boton de arriba.
              </p>
            </div>
          </div>
        ) : (
          data.map((institucion) => {
            return renderMovilCard(institucion);
          })
        )}
      </div>

      {/* Tabla de instituciones PC */}
      <div>
        <div className="overflow-hidden rounded-xl bg-white shadow dark:bg-slate-900 hidden md:block">
          <table className={`w-full border-collapse text-left`}>
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-800">
                {titelTable.map((titel, index) => (
                  <th
                    key={index}
                    className={`${titel.className || `px-6 py-4`} text-sm font-semibold text-slate-600 dark:text-slate-400`}
                  >
                    <Icon icon={titel.icon} />
                    {titel.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={titelTable.length}
                    className="px-6 py-10 text-center text-slate-400"
                  >
                    <div className="flex flex-col gap-2 items-center justify-center">
                      <Icon
                        icon={faBoxOpen}
                        className="text-4xl text-slate-400"
                      />
                      <p className="text-sm text-slate-400 text-center">
                        Parece que no hay datos cargados. Espera un momento y
                        vuelve a cargar la página.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((institucion) => {
                  return renderTableRows(institucion);
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
