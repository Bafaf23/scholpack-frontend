import axios from "axios";
export async function getCDDE() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/schools/cdde/cdde`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Erro al consultar los CDDE", error);
    return [];
  }
}
