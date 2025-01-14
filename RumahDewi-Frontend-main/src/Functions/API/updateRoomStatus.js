import axios from "axios";

export const updateRoomStatus = async (roomId, newStatus) => {
  try {
    const response = await axios.put(`/api/v1/rooms/${roomId}/status`, { status: newStatus });
    return response.data;
  } catch (error) {
    console.error("Error updating room status:", error);
    throw error;
  }
};
