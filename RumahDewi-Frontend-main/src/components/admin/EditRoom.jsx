import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import { editRoom } from "../../Functions/API/editRoom";
import { getRoomById } from "../../Functions/API/fetchRooms";
import "bootstrap/dist/css/bootstrap.min.css";
import bgkos from "../../assets/images/bgkos.jpg";

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [roomData, setRoomData] = useState({
    no_room: "",
    monthly_price: "",
    status: "",
    description: "",
    photo: "",
    video: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await getRoomById(id);
        const room = response.data.data.room;
        setRoomData({
          no_room: room.no_room || "",
          monthly_price: room.monthly_price || "",
          status: room.status || "",
          description: room.description || "",
          photo: room.photo || "",
          video: room.video || "",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room data:", error);
        setLoading(false);
      }
    };
    fetchRoomData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!roomData.no_room || !roomData.monthly_price) {
      alert("Pastikan semua data telah diisi!");
      return;
    }

    try {
      const response = await editRoom(id, roomData, token);
      if (response.status === 200) {
        setShowSuccessModal(true);
      } else {
        alert("Berhasil Mengupdate Data");
      }
    } catch (error) {
      console.error("Error updating room:", error);
      alert("Gagal mengupdate kamar");
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/admin/rooms");
  };

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${bgkos})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="p-5 rounded-3 shadow-lg text-center"
        style={{
          width: "800px",
          backgroundColor: "rgba(174, 225, 200, 0.95)", // Semi-transparan
          border: "2px solid #2E7D32",
        }}
      >
        <h2 className="mb-4 text-center">Mengubah Kamar</h2>

        {/* Form */}
        <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
          {/* Caption Bagian Atas */}
          <div className="mb-4">
            <p className="fw-bold text-start mb-1">Nomor Kamar</p>
            <Form.Control
              type="text"
              value={roomData.no_room}
              onChange={(e) =>
                setRoomData({ ...roomData, no_room: e.target.value })
              }
              className="p-2"
            />
          </div>

          <div className="mb-4">
            <p className="fw-bold text-start mb-1">Harga Sewa</p>
            <Form.Control
              type="number"
              value={roomData.monthly_price}
              onChange={(e) =>
                setRoomData({ ...roomData, monthly_price: e.target.value })
              }
              className="p-2"
            />
          </div>

          <div className="mb-4">
            <p className="fw-bold text-start mb-1">Ketersediaan</p>
            <Form.Select
              value={roomData.status}
              onChange={(e) =>
                setRoomData({ ...roomData, status: e.target.value })
              }
              className="p-2"
            >
              <option value="TERSEDIA">TERSEDIA</option>
              <option value="TERISI">TERISI</option>
              <option value="DIPESAN">DIPESAN</option>
            </Form.Select>
          </div>

          <div className="mb-4">
            <p className="fw-bold text-start mb-1">Deskripsi</p>
            <Form.Control
              as="textarea"
              rows={4}
              value={roomData.description}
              onChange={(e) =>
                setRoomData({ ...roomData, description: e.target.value })
              }
              className="p-2"
            />
          </div>

          <Button
            variant="success"
            type="submit"
            className="px-4 py-2"
            style={{ backgroundColor: "#2E7D32", border: "none" }}
          >
            SIMPAN
          </Button>
        </Form>

        {/* Modal Sukses */}
        <Modal show={showSuccessModal} onHide={handleModalClose} centered>
          <Modal.Header closeButton style={{ border: "none" }}>
            <Modal.Title>Sukses</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center py-4">
            <div className="mb-3">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="32" cy="32" r="32" fill="#E8F5E9" />
                <path
                  d="M20 32L28 40L44 24"
                  stroke="#2E7D32"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="mb-0">Kamar berhasil diupdate!</p>
          </Modal.Body>
          <Modal.Footer style={{ border: "none" }}>
            <Button
              variant="success"
              onClick={handleModalClose}
              style={{ backgroundColor: "#2E7D32", border: "none" }}
              className="px-4"
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default EditRoom;
