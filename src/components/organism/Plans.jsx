import Label from "../atom/Label";
import Icon from "@/components/atom/Icon";
import {
  faBuildingColumns,
  faGraduationCap,
  faFile,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Plans() {
  const services = [
    {
      name: "Base",
      description:
        "Módulo estructural obligatorio sobre el cual se activan los demás servicios de la institución.",
      icon: faBuildingColumns,
      class: "border-cyan-500/30 shadow-xl shadow-cyan-500/10",
      servers: [
        {
          name: "Autenticación",
          class: "bg-cyan-500/10 text-cyan-500 dark:text-cyan-400",
        },
        {
          name: "Control de roles",
          class: "bg-amber-500/10 text-amber-500 dark:text-amber-400",
        },
        {
          name: "Perfil institucional",
          class: "bg-orange-500/10 text-orange-500 dark:text-orange-400",
        },
        {
          name: "Gestión de usuarios",
          class: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
        },
        {
          name: "Configuración del año escolar",
          class: "bg-teal-500/10 text-teal-500 dark:text-teal-400",
        },
        {
          name: "Recuperación de credenciales",
          class: "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400",
        },
        {
          name: "Carga de calificaciones",
          class: "bg-rose-500/10 text-rose-500 dark:text-rose-400",
        },
        {
          name: "Planes de evaluación",
          class: "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400",
        },
      ],
      base: true,
    },
  ];
  const additionalServices = [
    {
      name: "Evaluaciones y Notas",
      description:
        "Carga de lapsos, planes de evaluación, boletines, cortes de notas y listas de cotejo.",
      icon: faGraduationCap,
      class: "border-indigo-500/30 shadow-xl shadow-indigo-500/10",
      servers: [],
      isActive: false,
    },
    {
      name: "Repotortes y EMG-31059",
      description:
        "Emite reportes personalizados para uso interno y reportes con el formato oficial del MPPE.",
      icon: faFile,
      class: "border-emerald-500/30 shadow-xl shadow-emerald-500/10",
      servers: [
        {
          name: "Planillas de inscripción (clase I)",
          class: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
        },
        {
          name: "Lista de Seccion (clase I)",
          class: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
        },
        {
          name: "RFRE (clase E)",
          class: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
        },
        {
          name: "Boletas de Califiaciones (clase I)",
          class: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
        },
      ],
      isActive: true,
    },
    {
      name: "Control de Incripsiones",
      description:
        "Gestión de inscripcion online, con formalizacion presencial.",
      icon: faUser,
      class: "border-amber-500/30 shadow-xl shadow-amber-500/10",
      servers: [
        {
          name: "Inscripcion Online",
          class: "bg-amber-500/10 text-amber-500 dark:text-amber-400",
        },
      ],
      isActive: true,
    },
    {
      name: "Portal de Representantes",
      description:
        "Acceso web para que los padres o representantes consulten notas, asistencias y avisos.",
      icon: "k",
      class: "border-purple-500/30 shadow-xl shadow-purple-500/10",
      servers: [
        {
          name: "Consulta de boletas online",
          class: "bg-purple-500/10 text-purple-500 dark:text-purple-400",
        },
        {
          name: "Notificaciones directas",
          class: "bg-purple-500/10 text-purple-500 dark:text-purple-400",
        },
      ],
      isActive: false,
    },
  ];
  return (
    <section id="planes" className="px-6 py-16">
      {/* Encabezado */}
      <div className="mx-auto mb-12 max-w-7xl">
        <h2 className="mb-2 text-sm font-bold tracking-widest text-orange-500 uppercase">
          Servicios y Módulos
        </h2>
        <h3 className="text-3xl font-black text-slate-800 sm:text-4xl dark:text-zinc-100">
          Sé tú quien decida qué usar
        </h3>
        <p className="mt-4 max-w-2xl text-slate-600 dark:text-zinc-300">
          Inicias con nuestro módulo base e integras únicamente los servicios
          opcionales que tu institución realmente necesita.
        </p>
      </div>

      <div className="mx-auto max-w-7xl space-y-12">
        {/* 1. MÓDULO BASE */}
        <div>
          <h4 className="mb-4 text-md font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-200">
            1. Módulo Estructural (Incluido siempre)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.name}
                className={`relative flex flex-col justify-between rounded-3xl border-2 bg-white p-6 transition-all hover:-translate-y-1 dark:bg-zinc-800/80 dark:border-zinc-700 ${service.class}`}
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 dark:bg-zinc-700 text-slate-700 dark:text-zinc-200">
                      <Icon icon={service.icon} className="text-xl" />
                    </div>
                    <div>
                      <h5 className="text-lg font-bold text-slate-800 dark:text-zinc-100">
                        {service.name}
                      </h5>
                      <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.servers.map((item) => (
                      <Label
                        key={item.name}
                        label={item.name}
                        className={item.class}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. MÓDULOS OPCIONALES / A LA CARTA */}
        <div>
          <h4 className="mb-4 text-md font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-200">
            2. Módulos Adicionales (Selecciona los que desees)
          </h4>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {additionalServices
              .filter((ac) => ac.isActive === true)
              .map((service) => (
                <div
                  key={service.name}
                  className={`relative flex flex-col justify-between rounded-3xl border-2 bg-white p-6 transition-all hover:-translate-y-1 dark:bg-zinc-800/80 dark:border-zinc-700 ${service.class}`}
                >
                  <div>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 dark:bg-zinc-700 text-slate-700 dark:text-zinc-200">
                        <Icon icon={service.icon} className="text-xl" />
                      </div>
                      <div>
                        <h5 className="text-lg font-bold text-slate-800 dark:text-zinc-100">
                          {service.name}
                        </h5>
                        <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.servers.map((item) => (
                        <Label
                          key={item.name}
                          label={item.name}
                          className={item.class}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
