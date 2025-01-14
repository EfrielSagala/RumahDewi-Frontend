import axios from "axios";

const url = import.meta.env.VITE_BE_URL;

export async function checkoutPayment(data, token) {
  try {
    const response = await axios.post(`${url}/orders/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function getAllOrder(query, token) {
  try {
    const response = await axios.get(`${url}/orders/all${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
export async function getOrder(invoice, token) {
  try {
    const response = await axios.get(`${url}/orders/${invoice}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
// export async function uploadPayment(id, data, token) {
//   try {
//     const response = await axios.put(`${url}/orders/upload/${id}`, data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response;
//   } catch (error) {
//     throw error;
//   }
// }
