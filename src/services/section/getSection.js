import axios from "axios";

/**
 ** Obtiene todas las secciones
 * @returns {Promise<object>} Las secciones
 */
export async function getSection() {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sections`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return result.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
