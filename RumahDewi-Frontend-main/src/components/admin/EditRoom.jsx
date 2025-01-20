import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'; // Tambahkan import axios
import { editRoom } from "../../Functions/API/editRoom"; // Import the editRoom function
import { getRoomById } from "../../Functions/API/fetchRooms"; // Import the editRoom function

const EditRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({
    no_room: '',
    monthly_price: '',
    status: '',
    description: '',
    photo: '',    // Tambahkan field untuk foto
    video: ''     // Tambahkan field untuk video
  });
  const [loading, setLoading] = useState(true); // Tambahkan state loading

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        // const response = await axios.get(`/api/v1/rooms/${id}`);
        const response = await getRoomById(id);

        const room = response.data.data.room
        // const room = response.data.data.room;
        // Set semua data yang di-fetch ke state
        setRoomData({
          no_room: room.no_room || '',
          monthly_price: room.monthly_price || '',
          status: room.status || '',
          description: room.description || '',
          photo: room.photo || '',
          video: room.video || ''
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

    const token = localStorage.getItem("token"); // Get token from localStorage

    try {
      const response = await editRoom(id, roomData, token); // Call the editRoom function
      if (response.status === 200) {
        alert('Kamar berhasil diupdate!');
        navigate("/admin/rooms");
      }
    } catch (error) {
      console.error("Error updating room:", error);
      alert('Gagal mengupdate kamar');
    }
  };

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return (
    <div className="p-4 bg-light min-vh-100">
      <div className="container bg-white p-4 rounded shadow" style={{ maxWidth: '600px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Mengubah Kamar</h2>
          <button 
            className="btn-close" 
            onClick={() => navigate(-1)}
            aria-label="Close"
          />
        </div>

        <Form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h5>Foto</h5>
            <div className="position-relative">
              {roomData.photo ? (
                <img 
                  src={roomData.photo} 
                  alt="Room" 
                  className="rounded" 
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                />
              ) : (
                <div className="bg-success-subtle p-4 text-center rounded" style={{ width: '150px', height: '150px' }}>
                  <div className="text-success" style={{ fontSize: '2rem' }}>+</div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <h5>Video</h5>
            <div className="position-relative">
              {roomData.video ? (
                <video 
                  src={roomData.video} 
                  controls 
                  className="rounded" 
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                />
              ) : (
                <div className="bg-success-subtle p-4 text-center rounded" style={{ width: '150px', height: '150px' }}>
                  <div className="text-success" style={{ fontSize: '2rem' }}>+</div>
                </div>
              )}
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Nomor Kamar</Form.Label>
            <Form.Control
              type="text"
              value={roomData.no_room}
              onChange={(e) => setRoomData({...roomData, no_room: e.target.value})}
              // placeholder={roomData.no_room}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Harga Sewa</Form.Label>
            <Form.Control
              type="number"
              value={roomData.monthly_price}
              onChange={(e) => setRoomData({...roomData, monthly_price: e.target.value})}
              // placeholder={roomData.monthly_price}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ketersediaan</Form.Label>
            <Form.Select
              value={roomData.status}
              onChange={(e) => setRoomData({...roomData, status: e.target.value})}
            >
              <option value="TERSEDIA">TERSEDIA</option>
              <option value="TERISI">TERISI</option>
              <option value="DIPESAN">DIPESAN</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="danger" onClick={() => navigate(-1)}>
              HAPUS
            </Button>
            <Button variant="success" type="submit">
              SIMPAN
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditRoom;