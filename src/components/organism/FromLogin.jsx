"use client";
import Button from "@/components/atom/Button";
import Input from "@/components/atom/Input";
import InputPass from "@/components/atom/InputPass";
import Links from "@/components/atom/Links";
import VersionTag from "../atom/VersionTag";
import { login } from "@/services/auth/login";
import { faKey, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function FromLogin({ schoolName }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const getGreeting = () => {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) return "Buenos días";
    if (hora >= 12 && hora < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.email) {
      toast.error("Los campos no pueden estar vacios");
      setLoading(false);
      return;
    }

    const data = await login(formData);

    if (data.error) {
      toast.error(data.error);
      setLoading(false);
      return;
    } else if (data.mustChangePassword === true) {
      sessionStorage.setItem("user", JSON.stringify(data));
      toast.loading("La contraseña debe ser cambiada");
      router.push("/force-password-change");
      toast.dismiss();
      toast.success("Por favor, cambie su contraseña");
    } else {
      sessionStorage.setItem("user", JSON.stringify(data));
      const role = data?.user?.role;

      toast.success("Inicio de sesión exitoso");

      if (role === "director" || role === "gestion" || role === "subdirector") {
        router.push(`/dashboard/administrador`);
      } else {
        router.push(`/dashboard/${role}`);
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-full">
      <div className="md:p-10 p-5">
        <div className="mb-10">
          <h1 className="mb-2 text-3xl font-extrabold uppercase text-transparent bg-clip-text bg-linear-to-r from-amber-600 via-orange-600 to-cyan-500 ">
            ¡{getGreeting()}!
          </h1>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 tracking-wide">
            Ingresa al sistema de{" "}
            <span className="font-bold text-xl">
              {schoolName ? schoolName : "ADMIN SUDO"}
            </span>{" "}
            para continuar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            label="Correo Electrónico"
            name="email"
            type="email"
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={handleChange}
          />

          <InputPass
            label="Contraseña"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="flex justify-between mt-8 items-center">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="text-slate-600 dark:text-slate-300 cursor-pointer select-none font-medium"
              >
                Recordar usuario
              </label>
            </div>
            <Links
              icon={faKey}
              direction="/resetpass"
              className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 text-center md:text-left gap-2"
              label={"¿Olvidaste tu contraseña?"}
            ></Links>
          </div>

          <Button
            classNameBtn="w-full mt-8 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-bold transition-all flex justify-center items-center gap-2"
            icon={faKey}
            type="submit"
            disabled={loading}
          >
            {loading ? "Verificando..." : "Iniciar Sesión"}
          </Button>
        </form>
      </div>
    </div>
  );
}
