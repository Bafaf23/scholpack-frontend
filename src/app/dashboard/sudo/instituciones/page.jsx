"use client";
import Banner from "@/components/atom/Banner";
import Button from "@/components/atom/Button";
import Icon from "@/components/atom/Icon";
import HeaderDashbord from "@/components/molecules/HeaderDashbord";
import Search from "@/components/molecules/Serch";
import TableInsti from "@/components/molecules/TableInsti";
import FormInstitucion from "@/components/organism/FormInstitucion";
import Modal from "@/components/organism/Modal";
import { deleteSchool } from "@/services/school/deleteSchool";
import { getCDDE } from "@/services/school/getCDDE";
import { getSchools } from "@/services/school/getSchool";
import { getUsers } from "@/services/user/getUsers";
import {
  faPlus,
  faEdit,
  faTrash,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCode,
  faInstitution,
  faLocationDot,
  faNetworkWired,
  faPhone,
  faIdCard,
  faTag,
  faBuilding,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function InstitucionesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [institutions, setInstitutions] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingInstitution, setEditingInstitution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [appliedFilter, setAppliedFilter] = useState("");
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [cdee, setCdde] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [schoolsRes, usersRes, cddeRes] = await Promise.all([
          getSchools(),
          getUsers(),
          getCDDE(),
        ]);

        setInstitutions(schoolsRes.data);
        setUsers(usersRes.data);
        setCdde(cddeRes.data);
      } catch (error) {
        console.error("Error al cargar datos del panel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fechSchool = () => {
    getSchools().then((data) => {
      if (data.data) {
        setInstitutions(data.data);
      }
    });
  };

  const filteredInstitutions = institutions?.filter((institution) => {
    const SIG = String(institution?.SIG || "");
    const nameStr = String(institution?.name || "");
    const completeTerm = `${SIG} ${nameStr}`.toLowerCase();

    return completeTerm.includes(appliedFilter.toLowerCase().trim());
  });

  useEffect(() => {
    if (search.trim() === "") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAppliedFilter("");
    }
  }, [search]);

  const handleSearch = () => {
    setAppliedFilter(search);
  };
  const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN;

  return (
    <div className="space-y-5">
      <Modal
        titel="Agregar nueva institución"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <FormInstitucion
          cdde={cdee}
          onSuccess={() => {
            setIsOpen(false);
            fechSchool();
          }}
        />
      </Modal>

      <h2 className="text-3xl dark:text-zinc-200 font-extrabold">
        Instituciones
      </h2>

      <Banner
        icon={faInfo}
        titel="Instituciones Públicas"
        message="Las instituciones de tipo pública  tienen como razón social el nombre del Ministerio del Poder Popular para la Educación y el RIF del mismo."
      />

      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <Search
          placeholder="Código SIG o nombre..."
          setSearch={setSearch}
          onSearch={handleSearch}
          search={search}
        />

        <Button
          onClick={() => setIsOpen(true)}
          icon={faPlus}
          classNameBtn="bg-[#ED781F] hover:bg-orange-500 active:scale-95 transition-all p-3 rounded-xl text-slate-50 font-bold cursor-pointer flex items-center justify-center gap-2 w-full md:w-auto whitespace-nowrap shadow-lg shadow-[#ED781F]/20"
        >
          Crear Institución
        </Button>
      </div>

      <TableInsti
        loading={loading}
        titelTable={[
          { name: "SIG", icon: faCode },
          { name: "Institucion", icon: faInstitution },
          { name: "Razon Social", icon: faBuilding },
          { name: "Direccion", icon: faLocationDot },
          { name: "Contacto", icon: faPhone },
          { name: "Tipo", icon: faTag },
          { name: "RIF/DEA", icon: faIdCard },
          { name: "CDCEE", icon: faIdCard },
          { name: "Subdominio", icon: faNetworkWired },
          { name: "Acciones", icon: faEllipsis },
        ]}
        renderTableRows={(institution) => {
          const schoolDirector = institution.user_schools?.find(
            (item) => item.user?.role?.name === "director",
          );
          return (
            <tr
              key={institution.SIG}
              className="transition-colors hover:bg-slate-50/50 dark:hover:bg-zinc-700/40 group"
            >
              {/* SIG Y DIRECTOR */}
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex flex-col group-hover:text-cyan-600 transition-colors dark:text-zinc-200">
                  <span className="font-medium">{institution.SIG}</span>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center max-w-40 px-2 py-0.5 rounded-full text-xs font-semibold ${institution.is_active ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800/60" : "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/60"} `}
                    titel={
                      institution.is_active
                        ? `${institution.is_active}`
                        : "Sin asignar"
                    }
                  >
                    <span className="truncate">
                      {institution.is_active ? `Activa` : "Inactiva"}
                    </span>
                  </span>
                </div>
              </td>

              {/* NOMBRE DE LA INSTITUCIÓN */}
              <td className="px-4 py-4 max-w-50">
                <span
                  className="font-medium text-slate-800 line-clamp-2 dark:text-zinc-200"
                  titel={institution.school_name}
                >
                  {institution.school_name}
                </span>
                <span
                  className="inline-flex  max-w-40 px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800/60"
                  titel={
                    schoolDirector
                      ? `${schoolDirector.user.name} ${schoolDirector.user.last_name}`
                      : "Sin asignar"
                  }
                >
                  <span className="truncate">
                    {schoolDirector
                      ? `${schoolDirector.user.name} ${schoolDirector.user.last_name}`
                      : "Sin asignar"}
                  </span>
                </span>
              </td>

              {/* RAZÓN SOCIAL */}
              <td className="px-4 py-4 max-w-45 dark:text-zinc-200">
                <span
                  className={`font-medium uppercase line-clamp-1 ${
                    institution.type === "Pública" ||
                    institution.type === "Publica"
                      ? "text-green-500"
                      : "text-orange-500"
                  }`}
                  titel={institution.company_name}
                >
                  {institution.type === "Pública" ||
                  institution.type === "Publica"
                    ? "MPPE"
                    : institution.company_name}
                </span>
              </td>

              {/* DIRECCIÓN */}
              <td className="px-4 py-4 max-w-55">
                <span
                  className="font-medium text-slate-800 text-sm line-clamp-2 dark:text-zinc-200"
                  titel={institution.address}
                >
                  {institution.address}
                </span>
              </td>

              {/* CONTACTO */}
              <td className="px-4 py-4 max-w-45">
                <div className="flex flex-col">
                  <span className="font-medium text-slate-800 whitespace-nowrap dark:text-zinc-200">
                    {institution.phone}
                  </span>
                  <span className="font-medium text-slate-500 text-xs break-all dark:text-zinc-200">
                    {institution.email}
                  </span>
                </div>
              </td>

              {/* TIPO */}
              <td className="px-4 py-4 whitespace-nowrap">
                <span
                  className={`font-medium uppercase ${
                    institution.type === "Pública" ||
                    institution.type === "Publica"
                      ? "text-green-500"
                      : "text-orange-500"
                  }`}
                >
                  {institution.type}
                </span>
              </td>

              {/* RIF / DEA */}
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <span className="font-medium text-slate-800 text-sm font-mono dark:text-zinc-200">
                    {institution.type === "Pública" ||
                    institution.type === "Publica"
                      ? "G-200000090"
                      : institution.RIF}
                  </span>
                  <span className="font-medium text-slate-500 text-xs font-mono dark:text-zinc-200">
                    {institution.DEA_CODE}
                  </span>
                </div>
              </td>

              {/* CDCEE */}
              <td className="px-4 py-4 max-w-30 whitespace-nowrap truncate">
                <span className="font-medium text-slate-800 dark:text-zinc-200">
                  {institution.cdcee?.name || "N/A"}
                </span>
              </td>
              {/* SuBdominio */}
              <td className="px-4 py-4 max-w-30 whitespace-nowrap truncate">
                <Link
                  href={`https://${institution.subdomain}.${BASE_DOMAIN}`}
                  target="_blank"
                  className="font-mono text-slate-800 hover:underline dark:text-zinc-200"
                >
                  {`${institution.subdomain}`}
                </Link>
              </td>

              {/* ACCIONES */}
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <Button
                    icon={faEdit}
                    classNameBtn="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 dark:text-zinc-200 transition-all hover:bg-indigo-50 hover:text-indigo-600"
                    onClick={() => {
                      setEditingInstitution(institution);
                      setIsOpenEdit(true);
                    }}
                  />
                  <Button
                    icon={faTrash}
                    classNameBtn="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-red-50 hover:text-red-600 dark:text-zinc-200"
                    onClick={() => {
                      deleteSchool(institution.SIG).then((data) => {
                        if (data?.ok) {
                          setInstitutions((prev) =>
                            prev.filter((item) => item.SIG !== institution.SIG),
                          );
                        }
                      });
                    }}
                  />
                </div>
              </td>
            </tr>
          );
        }}
        renderMovilCard={(institution) => (
          <div
            key={`card-${institution.SIG}`}
            className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Encabezado de la Card */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  SIG: {institution.SIG}
                </span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  {institution.school_name}
                </h3>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${institution.type === "Pública" ? "bg-green-50 text-green-600 dark:bg-green-950/30" : "bg-orange-50 text-orange-600 dark:bg-orange-950/30"}`}
              >
                {institution.type}
              </span>
            </div>

            {/* Detalles en filas */}
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <Icon icon={faBuilding} className="mt-0.5 text-slate-400" />
                <div>
                  <span className="font-medium block text-xs text-slate-400">
                    Razón Social
                  </span>
                  {institution.type === "Publica"
                    ? "MPPE"
                    : institution.company_name}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Icon icon={faLocationDot} className="mt-0.5 text-slate-400" />
                <div>
                  <span className="font-medium block text-xs text-slate-400">
                    Dirección
                  </span>
                  {institution.address}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Icon icon={faPhone} className="mt-0.5 text-slate-400" />
                <div>
                  <span className="font-medium block text-xs text-slate-400">
                    Contacto
                  </span>
                  <p>{institution.phone}</p>
                  <p className="text-xs text-slate-400">{institution.email}</p>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex items-start gap-2 border-t border-slate-50 pt-2 dark:border-slate-800/50">
                  <Icon icon={faIdCard} className="mt-0.5 text-slate-400" />
                  <div>
                    <span className="font-medium block text-xs text-slate-400">
                      {institution.type === "Publica" ? "Código DEA" : "RIF"}
                    </span>
                    <span className="font-mono font-semibold">
                      {institution.DEA_CODE}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2 border-t border-slate-50 pt-2 dark:border-slate-800/50">
                  <Icon icon={faIdCard} className="mt-0.5 text-slate-400" />
                  <div>
                    <span className="font-medium block text-xs text-slate-400">
                      {"RIF"}
                    </span>
                    <span className="font-mono font-semibold">
                      {institution.type === "Publica"
                        ? "G-200000090"
                        : institution.RIF}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        data={filteredInstitutions}
      />

      <Modal
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEdit(false)}
        titel="Editar Institución"
      >
        <FormInstitucion
          isEdit={true}
          institution={editingInstitution}
          onSuccess={() => setIsOpenEdit(false)}
        />
      </Modal>
    </div>
  );
}
