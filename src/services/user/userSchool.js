import axios from "axios";

/**
 * Obtiene a todo el personal del colegio, excluyendo a los estudiantes.
 * @returns {Promise<Array<Object>>}
 */

export async function userSchool() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/userSchool`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return [];
  }
}
