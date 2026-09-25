import axios from "axios";

/**
 * Actualiza/alterna el estado de inscripciones del periodo académico activo.
 * @param {boolean} [isEnrollmentOpen] - Estado deseado (opcional si la API hace toggle automático)
 * @returns {Promise<{ periodActive: object | null } | { error: string }>}
 */
export const enrollmentState = async () => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/periods/enrollment`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message;

    // Sin periodo activo: estado normal de la aplicación
    if (error.response?.status === 400) {
      return { periodActive: null };
    }

    return {
      error: message ?? "Error al actualizar el periodo académico",
    };
  }
};
