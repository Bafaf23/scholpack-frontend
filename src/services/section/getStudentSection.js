import axios from "axios";

/**
 * Obtener las secciones de los estudiantes
 * @param {number} id_section - El ID de la sección
 * @returns {Promise<Array>} - Las secciones de los estudiantes (retorna [] si está vacía)
 */
export const getStudentSection = async (id_section) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sections/${id_section}/students`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    // Si la sección no tiene estudiantes (status 404), retornamos un arreglo vacío
    // para que la sección SÍ se renderice en la pantalla con 0 alumnos.
    if (error?.response?.status === 404) {
      return [];
    }

    // Si ocurre cualquier otro error, también devolvemos [] para no tumbar la sección
    return [];
  }
};
