import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { getRooms, getUserRooms } from "../../Functions/API/fetchRooms";
import { RentCard } from "./card";
import rumah4 from "../../assets/images/rumah4.jpg";
import "../../styles/rent/rent.css";
import { formatRupiah } from "../../Functions/libs/formatRupiah";
import { formattingDate } from "../../Functions/libs/formatDate";

export const Rent = ({ user }) => {
  const [rooms, setRooms] = useState();
  const [userRoom, setUserRoom] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  if (user) {
    if (user?.role === "ADMIN") {
      window.location.href = "/";
    }
  }

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const fetchRooms = await getRooms();
        setRooms(fetchRooms?.data?.data?.rooms);
        if (token) {
          const fetchUserRooms = await getUserRooms(token);
          setUserRoom(fetchUserRooms?.data?.data?.user_room);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center  m-0 p-0">
      <h1 className="mt-2">{userRoom?.room ? "Informasi Kamar" : "Pilih Kamar"}</h1>
      <div className="w-100  p-2 p-lg-5">
        <div className={`w-100 text-center d-flex align-items-center ${isLoading ? "justify-content-center" : ""} overflow-x-auto bg-success-subtle pb-3`}>
          {rooms && !isLoading && !userRoom?.room ? (
            rooms.map((item) => {
              return <RentCard item={item} />;
            })
          ) : userRoom?.room ? (
            <div className="row w-full  mx-2 mx-lg-5">
              <img className="col-lg-7 w-full bg-black m-0 p-0 img-fluid" src={rumah4} />
              <div className="col-lg-5 w-full bg-white p-3">
                <h3 className="text-center">Detail Kamar</h3>
                <div className="row m-0 p-0">
                  <div className="row m-0 p-0 text-start">
                    <div class="mb-3">
                      <label for="no_room" class="form-label fw-bold">
                        Nomor Kamar
                      </label>
                      <input type="text" class="form-control" id="no_room" value={userRoom?.room?.no_room} disabled></input>
                    </div>
                  </div>
                  <div className="row m-0 p-0 text-start">
                    <div class="mb-3 col-lg-6">
                      <label for="price" class="form-label fw-bold">
                        Sewa Bulanan
                      </label>
                      <input type="text" class="form-control" id="price" value={formatRupiah(userRoom?.room?.monthly_price)} disabled></input>
                    </div>
                  </div>
                  <div className="row m-0 p-0 text-start">
                    <div class="mb-3 col-lg-6">
                      <label for="status" class="form-label fw-bold">
                        Status Sewa Kamar
                      </label>
                      <input type="text" class="form-control" id="status" value={userRoom?.room?.status} disabled></input>
                    </div>
                  </div>
                  <div className="row m-0 p-0 text-start">
                    <div class="mb-3">
                      <label for="status" class="form-label fw-bold">
                        Tanggal mulai sewa
                      </label>
                      <input type="text" class="form-control" id="status" value={userRoom?.occupied_since ? formattingDate(userRoom?.occupied_since) : "MENUNGGU PEMBAYARAN"} disabled></input>
                    </div>
                  </div>
                  <div className="row m-0 p-0 text-start">
                    <div class="mb-3">
                      <label for="status" class="form-label fw-bold">
                        Masa Berlaku Sewa
                      </label>
                      <input type="text" class="form-control" id="status" value={userRoom?.due_date ? formattingDate(userRoom?.due_date) : "MENUNGGU PEMBAYARAN"} disabled></input>
                    </div>
                  </div>
                  {userRoom?.room && !userRoom?.due_date && (
                    <div className="text-danger text-start">Note : Pembayaran harus diselesaikan maksimal 1x24 jam atau kamar yang dipesan akan direset kembali. Mohon selesaikan pembayaran dengan mengupload bukti bayar.</div>
                  )}
                  <a href="/payments" className="btn btn-success mt-3">
                    Bayar Sewa
                  </a>
                </div>
              </div>
            </div>
          ) : (
            new Array(1, 2, 3).map((item) => {
              return <DumpCard />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

const DumpCard = () => {
  return (
    <Card className="shadow mx-4 card-style">
      <div style={{ height: "200px" }}>
        <svg width="200px" height="200px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M589.3 260.9v30H371.4v-30H268.9v513h117.2v-304l109.7-99.1h202.1V260.9z" fill="#e1ffe2" />
          <path d="M516.1 371.1l-122.9 99.8v346.8h370.4V371.1z" fill="#e1ffe2" />
          <path d="M752.7 370.8h21.8v435.8h-21.8z" fill="#44b156" />
          <path d="M495.8 370.8h277.3v21.8H495.8z" fill="#44b156" />
          <path d="M495.8 370.8h21.8v124.3h-21.8z" fill="#44b156" />
          <path d="M397.7 488.7l-15.4-15.4 113.5-102.5 15.4 15.4z" fill="#44b156" />
          <path d="M382.3 473.3h135.3v21.8H382.3z" fill="#44b156" />
          <path d="M382.3 479.7h21.8v348.6h-21.8zM404.1 806.6h370.4v21.8H404.1z" fill="#44b156" />
          <path d="M447.7 545.1h261.5v21.8H447.7zM447.7 610.5h261.5v21.8H447.7zM447.7 675.8h261.5v21.8H447.7z" fill="#6de87b" />
          <path d="M251.6 763h130.7v21.8H251.6z" fill="#44b156" />
          <path d="M251.6 240.1h21.8v544.7h-21.8zM687.3 240.1h21.8v130.7h-21.8zM273.4 240.1h108.9v21.8H273.4z" fill="#44b156" />
          <path d="M578.4 240.1h130.7v21.8H578.4zM360.5 196.5h21.8v108.9h-21.8zM382.3 283.7h196.1v21.8H382.3zM534.8 196.5h65.4v21.8h-65.4z" fill="#44b156" />
          <path d="M360.5 196.5h65.4v21.8h-65.4zM404.1 174.7h152.5v21.8H404.1zM578.4 196.5h21.8v108.9h-21.8z" fill="#44b156" />
        </svg>
      </div>
      <Card.Body className="d-flex flex-column justify-content-between align-items-center">
        <Card.Title className="fs-3 fw-bold">Kamar Nomor.....</Card.Title>
        <Card.Text>Mohon tunggu hingga data dimuat.......</Card.Text>
        <button className="btn btn-success fw-bold" disabled>
          Mohon tunggu....
        </button>
      </Card.Body>
    </Card>
  );
};
