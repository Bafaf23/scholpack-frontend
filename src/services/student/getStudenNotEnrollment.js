import axios from "axios";

/**
 * Obtiene los estudiantes que no tienen inscripción.
 * Garantiza retornar siempre un Array para no romper el renderizado en el frontend.
 *
 * @param {object} params
 * @param {string|number} params.id_period - El ID del periodo escolar
 * @returns {Promise<Array>} Lista de estudiantes no inscritos o [] en caso de no haber datos/error
 */
export const getStudenNotEnrollment = async ({ id_period }) => {
  if (!id_period) return [];

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/students/not-enrolled/${id_period}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = response?.data?.data ?? response?.data;

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.warn(
      "⚠️ [SIGACE Services]: No se encontraron estudiantes no inscritos o falló la petición:",
      error.response?.data?.message || error.message,
    );
    return [];
  }
};
