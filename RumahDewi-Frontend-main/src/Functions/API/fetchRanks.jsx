import axios from "axios";

const url = import.meta.env.VITE_BE_URL;

export async function getRanks() {
  try {
    const response = await axios.get(`${url}/ranks`);

    return response;
  } catch (error) {
    throw error;
  }
}
