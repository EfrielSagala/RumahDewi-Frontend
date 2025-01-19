import axios from "axios";

// Assuming you already have the token available
export const addRoom = async (roomData, token) => {
  try {
    const token = localStorage.getItem("token"); // Mengambil token dari localStorage
    const response = await axios.post(
      "http://localhost:4002/api/v1/rooms", 
      roomData, 
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token here
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};