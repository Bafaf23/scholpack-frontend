import axios from "axios";

export async function updatePrice({ id, price }) {
  try {
    const post = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/service/`,
      {
        id,
        price,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return post.data;
  } catch (error) {
    console.error(error);
  }
}
