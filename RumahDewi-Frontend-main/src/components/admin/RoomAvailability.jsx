import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import rumah4 from "../../assets/images/rumah4.jpg";
import { getRooms } from "../../Functions/API/fetchRooms";
import { formatRupiah } from "../../Functions/libs/formatRupiah";
import { updateRoomStatus } from "../../Functions/API/updateRoomStatus";

const RoomAvailability = () => {
  const [rooms, setRooms] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const fetchRooms = await getRooms();
        setRooms(fetchRooms?.data?.data?.rooms);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  const handleStatusChange = async (roomId, currentStatus) => {
    const newStatus = currentStatus === "TERSEDIA" ? "TERISI" : "TERSEDIA";
    const confirmationMessage = `Apakah Anda yakin ingin mengubah status kamar ini menjadi ${newStatus}?`;

    if (window.confirm(confirmationMessage)) {
      try {
        console.log(`Requesting update for room ${roomId} with status ${newStatus}`);
        const response = await updateRoomStatus(roomId, newStatus);
        console.log("Update response:", response);

        setRooms((prevRooms) =>
          prevRooms.map((room) =>
            room.id === roomId ? { ...room, status: newStatus } : room
          )
        );
        alert(`Status kamar berhasil diubah menjadi ${newStatus}.`);
      } catch (error) {
        console.error("Failed to update room status:", error.response?.data || error.message);
        alert("Terjadi kesalahan saat mengubah status kamar.");
      }
    }
  };

  const getButtonClass = (status) => {
    switch (status) {
      case "TERSEDIA":
        return "btn-success";
      case "DIPESAN":
        return "btn-warning";
      case "TERISI":
        return "btn-danger";
      default:
        return "btn-success";
    }
  };

  const getButtonText = (status) => {
    switch (status) {
      case "TERSEDIA":
        return "TERSEDIA";
      case "DIPESAN":
        return "DIPESAN";
      case "TERISI":
        return "TERISI";
      default:
        return "TERSEDIA";
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-center mb-4">Ketersediaan Kamar</h2>
      <div className="w-100 text-center d-flex align-items-center overflow-x-auto bg-success-subtle pb-3">
        {isLoading ? (
          <div className="w-100 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          rooms?.map((room) => (
            <Card key={room.id} className="shadow mx-4" style={{ minWidth: "18rem" }}>
              <Card.Img src={rumah4} className="card-img" />
              <Card.Body className="d-flex flex-column justify-content-between align-items-center">
                <Card.Title className="fs-4 fw-bold">Kamar Nomor {room.no_room}</Card.Title>
                <p className="fs-5 my-4">{formatRupiah(room.monthly_price)}/Bulan</p>
                <button
                  className={`btn ${getButtonClass(room.status)} fw-bold`}
                  onClick={() => handleStatusChange(room.id, room.status)}
                >
                  {getButtonText(room.status)}
                </button>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default RoomAvailability;
