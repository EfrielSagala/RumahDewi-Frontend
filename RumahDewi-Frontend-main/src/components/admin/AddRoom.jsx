import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRoom } from "../../Functions/API/addRoom";

const AddRoom = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    no_room: "",
    monthly_price: "",
    status: "TERSEDIA",  // Default status
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

    try {
      const response = await addRoom(formData);
      alert(response.message || "Kamar baru berhasil ditambahkan.");
      navigate("/admin/rooms"); // Sesuaikan dengan rute
    } catch (error) {
      console.error("Failed to add new room:", error);
      alert(error.message || "Terjadi kesalahan saat menambahkan kamar baru.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Tambah Kamar Baru</h2>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label htmlFor="no_room" className="form-label">
            Nomor Kamar
          </label>
          <input
            type="text"
            id="no_room"
            name="no_room"
            className="form-control"
            value={formData.no_room}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="monthly_price" className="form-label">
            Harga Bulanan
          </label>
          <input
            type="number"
            id="monthly_price"
            name="monthly_price"
            className="form-control"
            value={formData.monthly_price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status Kamar
          </label>
          <select
            id="status"
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="TERSEDIA">TERSEDIA</option>
            <option value="DIPESAN">DIPESAN</option>
            <option value="TERISI">TERISI</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Tambah Kamar
        </button>
      </form>
    </div>
  );
};

export default AddRoom;
