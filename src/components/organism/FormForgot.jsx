"use client";
import Button from "@/components/atom/Button";
import axios from "axios";
import Input from "@/components/atom/Input";
import Links from "@/components/atom/Links";
import { faKey, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function FormForgot() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      toast.error("El campo de correo electrónico es obligatorio");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgotPassword`,
        { email: formData.email },
      );

      const data = await response.data;

      if (data.success === false) {
        toast.success(data.message);
        setLoading(false);
        return;
      } else {
        toast.success(data.message);
        setFormData({ email: "" });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="p-10">
        {/* Botón para volver al login */}
        <Links
          direction="/login"
          className="group mb-8 inline-flex items-center gap-2 text-slate-500 transition-colors hover:text-cyan-600 dark:text-slate-400 md:hidden lg:hidden"
          label={"Volver al inicio de sesión"}
          classNameIcon={"transition-transform group-hover:-translate-x-1 "}
          icon={faArrowLeft}
        ></Links>
        <div className="mb-8 space-y-2">
          <h1 className="text-2xl md:text-3xl font-extrabold uppercase text-orange-500 tracking-tight">
            Recupera tu acceso
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-300 leading-relaxed">
            Ingresa tu correo electrónico registrado. Te enviaremos las
            instrucciones necesarias para restablecer tu contraseña de forma
            segura.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Correo Electrónico"
            name="email"
            type="email"
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Button
            classNameBtn="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-200 dark:shadow-orange-500/30 transition-all flex justify-center items-center gap-2"
            icon={faKey}
            type="submit"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar Enlace de Recuperación"}
          </Button>
        </form>
      </div>
    </div>
  );
}
