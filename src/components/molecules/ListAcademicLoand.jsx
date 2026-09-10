"use client";

import Button from "../atom/Button";
import CardLoand from "../atom/CardLoand";
import Icon from "../atom/Icon";
import FormAcadLoand from "../organism/FormAcadLoand";
import Modal from "../organism/Modal";
import { faLongArrowDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function ListAcademicLoand({ academicLoads = [] }) {
  // Garantiza que siempre sea un Array (si viene { data: [...] } o no es un arreglo, lo normaliza)
  const safeAcademicLoads = Array.isArray(academicLoads)
    ? academicLoads
    : Array.isArray(academicLoads?.data)
      ? academicLoads.data
      : [];

  return (
    <div className="p-3 space-y-6">
      {safeAcademicLoads.length === 0 ? (
        <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-12 text-center dark:border-slate-500 dark:bg-slate-700">
          <Icon
            icon={faLongArrowDown}
            className="mb-4 text-4xl text-slate-300 dark:text-slate-400"
          />
          <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
            No hay cargas académicas registradas
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            Comienza creando la carga académica con el botón de arriba.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {safeAcademicLoads.map((item) => (
            <CardLoand key={item.id} load={item} />
          ))}
        </div>
      )}
    </div>
  );
}
