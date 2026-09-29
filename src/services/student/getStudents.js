import axios from "axios";

/**
 ** Obtiene los estudiantes de la base de datos
 * @returns {Promise<Array>} - Un array de estudiantes
 */
export const getStudents = async ({ page = 1, serchs }) => {
  const params = new URLSearchParams({
    page: page,
    limit: 20,
  });

  const trimmedSearch = serchs ? String(serchs).trim() : "";
  if (trimmedSearch !== "") {
    params.append("tuitionNumber", trimmedSearch);
  }

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/students?${params.toString()}`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};
