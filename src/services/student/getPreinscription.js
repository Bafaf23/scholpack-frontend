import axios from "axios";

/**
 * Obtiene la lista de estudiantes preinscritos para un periodo.
 * Garantiza retornar siempre un Array para evitar fallos de renderizado en la UI.
 *
 * @param {object} params
 * @param {string|number} params.id_period - El ID del periodo escolar
 * @returns {Promise<Array>} Lista de estudiantes preinscritos o [] en caso de no haber datos/error
 */
export const getPreinscription = async ({ id_period }) => {
  if (!id_period) return [];

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/students/${id_period}/pre-inscription`,
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
      "⚠️ [SIGACE Services]: No se encontraron preinscritos o la petición falló:",
      error.response?.data?.message || error.message,
    );

    // Retorno seguro para prevenir crash en componentes React
    return [];
  }
};
