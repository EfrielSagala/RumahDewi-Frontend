import axios from "axios";

const url = import.meta.env.VITE_BE_URL;

export async function addPayment(token, data) {
  try {
    const response = await axios.post(`${url}/payments/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function rentRoom(token, data) {
  try {
    const response = await axios.post(`${url}/payments/rent`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getMyPayment(query, token) {
  try {
    const response = await axios.get(`${url}/payments/my${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function getAllPayments(query, token) {
  try {
    const response = await axios.get(`${url}/payments/${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function changeStatus(id, data, token) {
  try {
    const response = await axios.put(`${url}/payments/${id}/status`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export async function uploadPayment(id, data, token) {
  try {
    const response = await axios.put(`${url}/payments/${id}/upload`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}
