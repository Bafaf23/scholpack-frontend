import axios from "axios";

/**
 * Obtiene las notas de un estudiante segun la carga a cademica
 * @param {number} idLoadAcademic - ID de la carga académica
 * @returns {Promise<Array|{error: string}>}
 */
export const getGradeAcrivity = async (idLoadAcademic, idEvaluation) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/grades/${idLoadAcademic}/activity`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.message || "Error al obtener las calificaciones",
    };
  }
};
