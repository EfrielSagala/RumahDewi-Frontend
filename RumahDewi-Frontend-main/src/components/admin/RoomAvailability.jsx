import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import rumah4 from "../../assets/images/rumah4.jpg";
import { getRooms } from "../../Functions/API/fetchRooms";
import { formatRupiah } from "../../Functions/libs/formatRupiah";

const RoomAvailability = () => {
  const [rooms, setRooms] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  // Mengganti button status dengan button edit
  const handleEditClick = (roomId) => {
    navigate(`/admin/edit-room/${roomId}`);
  };

  // Warna button edit (bisa disesuaikan)
  const getButtonClass = (status) => {
    return "btn-primary"; // Menggunakan warna primary untuk semua button edit
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
                  className={`btn ${getButtonClass()} fw-bold`}
                  onClick={() => handleEditClick(room.id)}
                >
                  Edit
                </button>
              </Card.Body>
            </Card>
          ))
        )}

        {/* Card tambahan untuk tambah baru */}
        <Card
          className="shadow mx-4"
          style={{
            minWidth: "18rem",
            backgroundColor: "#2D7D46",
            color: "#fff",
            height: "100%",
            cursor: "pointer",
          }}
          onClick={() => navigate("/add-new-room")}
        >
          <Card.Body
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#fff",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "2rem", color: "#2D7D46" }}>+</span>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default RoomAvailability;