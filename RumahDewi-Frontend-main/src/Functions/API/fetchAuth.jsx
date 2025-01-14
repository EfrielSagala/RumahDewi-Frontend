import axios from "axios";

const url = import.meta.env.VITE_BE_URL;

export async function whoami(token) {
  try {
    const response = await axios.get(`${url}/auth/whoami`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function login(data) {
  try {
    const response = await axios.post(`${url}/auth/login`, data);

    return response;
  } catch (error) {
    throw error;
  }
}
export async function register(data) {
  try {
    const response = await axios.post(`${url}/auth/register`, data);

    return response;
  } catch (error) {
    throw error;
  }
}
