"use client";
import Button from "../atom/Button";
import InputPass from "../atom/InputPass";
import { useRouter } from "next/navigation";
import axios from "axios";
import { validate, patterns } from "@/services/regex/regex";
import Links from "../atom/Links";
import { faKey, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSearchParams } from "next/navigation"; // Para capturar el token
import toast from "react-hot-toast";

export default function FormResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    passwordConfir: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = searchParams.get("token");

    if (!token) {
      toast.error(
        "No se encontró un token válido. Por favor, solicita un nuevo enlace.",
      );
      return;
    }

    if (!validate(patterns.password, formData.password)) {
      toast.error("La contraseña no cumple con los requisitos mínimos.");
      return;
    }

    if (formData.pass !== formData.passConfir) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resetPass`,
        {
          token: token,
          password: formData.password,
        },
      );

      const data = await response.data;

      if (data.success === false) {
        toast.success(data.message);
        setLoading(false);
        return;
      } else {
        toast.success(data.message);
        setTimeout(() => {
          setLoading(false);
          router.push("/");
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl px-10 md:py-0 flex flex-col md:flex-row gap-6 items-center justify-center">
      <div className="w-full max-w-md">
        {/* Botón para volver al login */}
        <Links
          direction="/"
          className="group mb-8 inline-flex md:hidden lg:hidden items-center gap-2 text-slate-500 transition-colors hover:text-cyan-600 dark:text-slate-400"
          label={"Volver al inicio de sesión"}
          classNameIcon={"transition-transform group-hover:-translate-x-1 "}
          icon={faArrowLeft}
        />

        <div>
          <div className="mb-8 space-y-2">
            <h1 className="text-2xl md:text-3xl font-extrabold uppercase text-orange-600 dark:text-orange-500 tracking-tight">
              Solo falta un paso
            </h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-300 leading-relaxed">
              Crea una nueva contraseña segura para finalizar la recuperación de
              tu cuenta.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputPass
              label="Nueva Contraseña"
              name="password"
              type="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <InputPass
              label="Confirma tu Nueva Contraseña"
              name="passwordConfir"
              type="password"
              placeholder="********"
              value={formData.passwordConfir}
              onChange={handleChange}
              required
            />

            <Button
              classNameBtn="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-200 dark:shadow-orange-500/30 transition-all flex justify-center items-center gap-2"
              icon={faKey}
              type="submit"
              disabled={loading}
            >
              {loading ? "Procesando..." : "Restablecer"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
