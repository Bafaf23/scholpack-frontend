import axios from "axios";

/**
 ** Obtiene el récord académico histórico de un estudiante por su ID
 * @param {number} idStudent - id de estudiante
 * @param {number} idPeriod - id del perido escolar
 */
export async function getRecordStudent(idStudent, idPeriod) {
  try {
    const url = idPeriod
      ? `${process.env.NEXT_PUBLIC_API_URL}/students/${idStudent}/record?id_period=${idPeriod}`
      : `${process.env.NEXT_PUBLIC_API_URL}/students/${idStudent}/record`;

    const response = await axios.get(url, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
