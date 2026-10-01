import axios from "axios";

export async function metricsSudo() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/metrics/sudo`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
}
