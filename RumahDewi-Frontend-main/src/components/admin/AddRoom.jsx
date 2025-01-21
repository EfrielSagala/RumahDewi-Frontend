import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import { addRoom } from "../../Functions/API/addRoom";
import 'bootstrap/dist/css/bootstrap.min.css';
import bgkos from "../../assets/images/bgkos.jpg"; // Gambar latar belakang

const AddRoom = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    no_room: "",
    monthly_price: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = {
      no_room: parseInt(formData.no_room, 10),
      monthly_price: parseInt(formData.monthly_price, 10),
      status: "TERSEDIA", // Default status
      description: formData.description,
    };

    try {
      const response = await addRoom(formDataToSend);
      if (response.status === 200) {
        setShowSuccessModal(true);
        navigate("admin/rooms");
      } else {
        alert(response.message || "Gagal menambahkan kamar baru.");
      }
    } catch (error) {
      console.error("Failed to add new room:", error);
      alert(error.message || "Terjadi kesalahan saat menambahkan kamar baru.");
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${bgkos})`, // Set background image
        backgroundSize: "cover", // Agar gambar memenuhi seluruh layar
        backgroundPosition: "center", // Posisi gambar di tengah
        backgroundAttachment: "fixed", // Agar gambar tetap saat scroll
      }}
    >
      <div
        className="p-5 rounded-3 shadow-lg"
        style={{
          width: "800px", // Width of the card
          backgroundColor: "#AEE1C8",
          border: "2px solid #2E7D32",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="m-0">Membuat Kamar</h2>
          <button className="btn-close" aria-label="Close" />
        </div>

        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-12"> {/* Set width of form fields to full card width */}
              <Form.Group className="mb-3">
                <Form.Label>Nomor Kamar</Form.Label>
                <Form.Control
                  type="text"
                  name="no_room"
                  value={formData.no_room}
                  onChange={handleChange}
                  className="p-2"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Harga Sewa</Form.Label>
                <Form.Control
                  type="number"
                  name="monthly_price"
                  value={formData.monthly_price}
                  onChange={handleChange}
                  className="p-2"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="p-2"
                />
              </Form.Group>

              <div className="text-end">
                <Button
                  variant="success"
                  type="submit"
                  className="px-4 py-2"
                  onClick={() => navigate(-1)}
                  style={{ backgroundColor: "#2E7D32", border: "none" }}
                >
                  TAMBAH
                </Button>
              </div>
            </div>
          </div>
        </Form>

        {/* Success Modal */}
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
            <p className="mb-0">Kamar berhasil dibuat!</p>
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

export default AddRoom;
  