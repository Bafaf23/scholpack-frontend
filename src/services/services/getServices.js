import axios from "axios";

export async function getServices() {
  try {
    const res = await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/service/`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
