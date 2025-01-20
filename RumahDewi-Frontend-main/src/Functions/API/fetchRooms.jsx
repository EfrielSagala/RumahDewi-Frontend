import axios from "axios";

const url = import.meta.env.VITE_BE_URL;

export async function getRooms() {
  try {
    const response = await axios.get(`${url}/rooms/`);

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getUserRooms(token) {
  try {
    const response = await axios.get(`${url}/rooms/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

// export async function getRoomById(id, token) {
//   try {
//     const response = await axios.get(`${url}/rooms/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// }
export async function getRoomById(id) {
  try {
    const response = await axios.get(`${url}/rooms/${id}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    return response;
  } catch (error) {
    throw error;
  }
}