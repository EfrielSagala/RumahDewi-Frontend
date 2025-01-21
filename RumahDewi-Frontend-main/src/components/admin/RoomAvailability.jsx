import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import rumah4 from "../../assets/images/rumah4.jpg"; // Path ke gambar dummy
import { getRooms } from "../../Functions/API/fetchRooms"; // Fungsi untuk fetch data kamar
import { formatRupiah } from "../../Functions/libs/formatRupiah"; // Fungsi helper untuk format Rupiah

const RoomAvailability = () => {
  const [rooms, setRooms] = useState([]); // State untuk daftar kamar
  const [isLoading, setIsLoading] = useState(true); // State untuk status loading
  const navigate = useNavigate(); // Hook untuk navigasi

  // Mengambil data kamar dari server
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true); // Tampilkan spinner
      try {
        const fetchRooms = await getRooms(); // Panggil API
        setRooms(fetchRooms?.data?.data?.rooms || []); // Set state kamar
      } catch (error) {
        console.error("Error fetching rooms:", error); // Error handling
      } finally {
        setIsLoading(false); // Sembunyikan spinner
      }
    };
    fetch();
  }, []);

  // Navigasi ke halaman edit kamar
  const handleEditClick = (roomId) => {
    navigate(`/admin/edit-room/${roomId}`);
  };

  // Navigasi ke halaman tambah kamar baru
  const handleAddNewRoom = () => {
    navigate("/add-new-room");
  };

  return (
    <div className="p-4">
      <h2 className="text-center mb-4">Ketersediaan Kamar</h2>
      <div className="d-flex flex-wrap justify-content-center gap-4 bg-light p-3 rounded">
        {isLoading ? (
          <div className="w-100 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          // Menampilkan daftar kamar
          rooms.map((room) => (
            <Card
              key={room.id}
              className="shadow"
              style={{
                minWidth: "18rem",
                maxWidth: "20rem",
                backgroundColor: "#FFF", // Tetap putih tanpa warna latar belakang untuk status
              }}
            >
              <Card.Img
                variant="top"
                src={rumah4} // Gambar dummy
                alt="Gambar kamar"
                className="card-img-top"
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-4 fw-bold text-center mb-3">
                  Kamar Nomor {room.no_room}
                </Card.Title>
                <p className="fs-6 text-center text-secondary" style={{ marginBottom: "1rem" }}>
                  {formatRupiah(room.monthly_price)}/Bulan
                </p>
                {/* Status kamar dengan warna berdasarkan status */}
                <div className="d-flex justify-content-center mt-3">
                  <span
                    className="fs-6 fw-bold"
                    style={{
                      color:
                        room.status === "TERSEDIA"
                          ? "green"
                          : room.status === "DIPESAN"
                          ? "#d39e00" // Kuning yang lebih gelap
                          : "red", // Merah untuk terisi
                    }}
                  >
                    {room.status}
                  </span>
                </div>
                <button
                  className="btn btn-primary w-100 fw-bold mt-auto"
                  onClick={() => handleEditClick(room.id)}
                >
                  Edit
                </button>
              </Card.Body>
            </Card>
          ))
        )}

        {/* Card untuk tambah kamar baru */}
        <Card
          className="shadow"
          style={{
            minWidth: "18rem",
            maxWidth: "20rem",
            backgroundColor: "#2D7D46",
            color: "#FFF",
            cursor: "pointer",
          }}
          onClick={handleAddNewRoom}
        >
          <Card.Body
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#FFF",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: "2.5rem",
                  color: "#2D7D46",
                  fontWeight: "bold",
                }}
              >
                +
              </span>
            </div>
            <p className="mt-3 fs-5 fw-bold text-center">
              Tambah Kamar Baru
            </p>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default RoomAvailability;
