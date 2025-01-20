import axios from "axios";

// Function to edit room
export const editRoom = async (id, roomData, token) => {
  try {
    // Get token from localStorage if not passed as a parameter
    const token = localStorage.getItem("token") || token;

    // Send PUT request to update room data
    const response = await axios.put(
      `http://localhost:4002/api/v1/rooms/${id}`, // Replace with your API URL
      roomData, // Data to update the room
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token here
        },
      }
    );

    return response.data; // Return the response data
  } catch (error) {
    // Handle any errors during the request
    throw error.response?.data || error.message;
  }
};