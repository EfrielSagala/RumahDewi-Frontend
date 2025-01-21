import { Carousel, Card, Button } from "react-bootstrap";
import rumah from "../../assets/images/rumah.jpg";
import rumah1 from "../../assets/images/rumah1.jpg";
import rumah2 from "../../assets/images/rumah2.jpg";
import rumah3 from "../../assets/images/rumah3.jpg";
import rumah4 from "../../assets/images/rumah4.jpg";
import "../../styles/home/home.css";
import { useEffect, useState } from "react";
import ModalAturan from "./modal-aturan";
export const Home = ({ user }) => {
  return (
    <div className="bg-success-subtle">
      {/* HEADER SECTION */}
      <div className="w-100 m-0 p-0">
        <div className="row m-0 p-3 p-lg-5 align-items-center">
          <div className="col-lg-6">
            <img src={rumah} alt="Foto kost rumahdewi" className="img-fluid fit-img rounded border border-success" />
          </div>
          <div className="col-lg-6">
            <div className="text-start">
              <h2 className="fw-bold">Kost Rumah Dewi</h2>
              <p className="fw-semibold">Jl. Bukit Dharma Raya No.3, Jimbaran, Bali.</p>

              <hr className="text-success w-50" />
              <p className="aturan text-justify">
                Kost Rumah Dewi merupakan sebuah rumah kos campur (untuk laki-laki dan perempuan) dengan total sebanyak 11 kamar. Kost Rumah Dewi memiliki fasilitas WI-FI, tempat tidur, lemari, kamar mandi dalam, serta tempat parkir untuk
                kendaraan anda. Kost Rumah Dewi berlokasi di Jimbaran, Bali, berdekatan dengan:
              </p>
              <ul className="">
                <li>1 menit menuju Rektorat Universitas Udayana.</li>
                <li>5 menit menuju Bandara Internasional I Gusti Ngurah Rai.</li>
                <li>15 menit menuju Kuta Beach.</li>
                <li>30 menit menuju kota Denpasar.</li>
              </ul>
              <a href="https://maps.app.goo.gl/gEos84YsTZEUzmff9" target="_blank" className="text-decoration-none fw-bold text-right">
                Lihat di GoogleMaps »
              </a>
              <hr className="text-success w-50" />
              <a className="btn btn-success fw-bold fs-4" href={user?.role === "ADMIN" ? "/admin/rooms" : "/rent"}>
                {user?.role === "ADMIN" ? "Ubah Ketersediaan Kamar" : "Pesan Kamar"}
              </a>
              <ModalAturan />
            </div>
          </div>
        </div>
      </div>
      {/* CAROUSEL */}
      <div className="mt-5">
        <h1 className="text-center fs-1 fw-bold">Galeri Kost</h1>
        <div className="p-0 p-lg-5 d-flex justify-content-center">
          <Carousel className="carousel shadow">
            <Carousel.Item>
              <img className="d-block w-100 fit-img carousel-img rounded" src={rumah} alt="First slide" />
              <Carousel.Caption>
                <h3 className="fw-bold text-dark bg-success-subtle rounded">Rumah Kost Bagian Luar</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100 fit-img carousel-img rounded" src={rumah1} alt="Second slide" />
              <Carousel.Caption>
                <h3 className="fw-bold text-dark bg-success-subtle rounded">Kamar Bagian Luar</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100 fit-img carousel-img rounded" src={rumah2} alt="Third slide" />
              <Carousel.Caption>
                <h3 className="fw-bold text-dark bg-success-subtle rounded">Halaman Rumah Kost</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100 fit-img carousel-img rounded" src={rumah3} alt="Third slide" />
              <Carousel.Caption>
                <h3 className="fw-bold text-dark bg-success-subtle rounded">Kamar Mandi Dalam</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-100 fit-img carousel-img rounded" src={rumah4} alt="Third slide" />
              <Carousel.Caption>
                <h3 className="fw-bold text-dark bg-success-subtle rounded">Kamar Bagian Dalam</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <video className="d-block w-100 fit-img carousel-img rounded" controls autoplay muted>
                <source src="/src/assets/videos/sampel1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Carousel.Caption>
                <h3 className="fw-bold text-dark bg-success-subtle rounded">Video Kamar Kost</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      {/* CARD */}
      <h1 className="mt-5 fs-1 fw-bold text-center">Fitur Website</h1>
      <div className="w-100  p-2 p-lg-5">
         <div className={`w-100 text-center d-flex align-items-stretch overflow-x-auto bg-success-subtle pb-3 ${user ? "" : "card-home"}`}>
          {user?.role !== "ADMIN" ? (
            <>
               <Card className="shadow mx-3 card-style d-flex flex-column" style={{ width: '20rem' }}>
                <div className="d-flex justify-content-center align-items-center" style={{ height: "150px" }}>
                  <svg width="120px" height="120px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg">
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
                  <Card.Title className="fs-5 fw-bold text-center">Pelaporan Masalah</Card.Title>
                  <Card.Text className="text-center">Pelaporan untuk penghuni kos jika ada kendala yang perlu disampaikan kepada pemilik rumah kos.</Card.Text>
                  <a href={user ? (user?.role === "USER" ? "https://forms.gle/JEL88wRmr75YEt959" : "") : "/login"} className={`btn btn-success fw-bold ${user?.role === "ADMIN" ? "invisible" : ""}`}>
                    Klik Disini
                  </a>
                </Card.Body>
              </Card>
              <Card className="shadow mx-3 card-style d-flex flex-column" style={{ width: '20rem' }}>
                <div className="d-flex justify-content-center align-items-center" style={{ height: "150px" }}>
                  <svg width="100px" height="100px" viewBox="-1.5 0 33 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" className="mt-4">
                    <title>wallet</title>
                    <desc>Created with Sketch Beta.</desc>
                    <defs></defs>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                      <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-257.000000, -774.000000)" fill="#44b156">
                        <path
                          d="M285,793 L280,793 C279.448,793 279,793.448 279,794 L279,798 C279,798.553 279.448,799 280,799 L285,799 L285,804 C285,804.553 284.552,805 284,805 L260,805 C259.448,805 259,804.553 259,804 L259,785 L284,785 C284.552,785 285,785.447 285,786 L285,793 L285,793 Z M285,796 L285,797 L281,797 L281,796 L281,795 L285,795 L285,796 L285,796 Z M283,777 L283,783 L263.5,783 L283,777 L283,777 Z M285,783 L285,776 C285,775.447 284.764,775.141 284.25,774.938 C283.854,774.781 283.469,774.875 283,775 L257,783 L257,805 C257,806.104 257.896,807 259,807 L285,807 C286.104,807 287,806.104 287,805 L287,785 C287,783.896 286.104,783 285,783 L285,783 Z"
                          id="wallet"
                          sketch:type="MSShapeGroup"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <Card.Body className="d-flex flex-column justify-content-between align-items-center">
                  <Card.Title className="fs-5 fw-bold text-center">Bayar Sewa Bulanan</Card.Title>
                  <Card.Text className="text-center">Untuk penghuni rumah kost, silahkan bayarkan sewa bulanan anda disini.</Card.Text>
                  <a href={user ? (user?.role === "USER" ? "/payments" : "") : "/login"} className={`btn btn-success fw-bold ${user?.role === "ADMIN" ? "invisible" : ""}`}>
                    Klik Disini
                  </a>
                </Card.Body>
              </Card>
              <Card className="shadow mx-3 card-style d-flex flex-column" style={{ width: '20rem' }}>
                <div className="d-flex justify-content-center align-items-center" style={{ height: "150px" }}>
                    <svg width="90px" height="90px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-4">
                    <path
                      d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
                      fill="#44b156"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                      fill="#44b156"
                    />
                  </svg>
                </div>
                <Card.Body className="d-flex flex-column justify-content-between align-items-center">
                  <Card.Title className="fs-5 fw-bold text-center">Nomor CS</Card.Title>
                  <Card.Text className="text-center">Nomor CS Rumah Dewi untuk calon penyewa yang ingin menanyakan informasi lebih lanjut mengenai kos Rumah Dewi.</Card.Text>
                  <button
                    className="btn btn-success fw-bold"
                    onClick={() => {
                      window.location.href = "https://wa.me/+6287759744555";
                    }}
                  >
                    Klik Disini
                  </button>
                </Card.Body>
              </Card>
              <Card className="shadow mx-3 card-style d-flex flex-column" style={{ width: '20rem' }}>
                <div className="d-flex justify-content-center align-items-center" style={{ height: "150px" }}>
                  <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-4">
                    <path d="M2 22H22" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M2 11H22" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M3.5 21.5V11.5" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M20.5 21.5V11.5" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M3.5 11.5V2.5H20.5V11.5" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M7 11V15.5C7 15.5 7 16.5 8 16.5C9 16.5 9 15.5 9 15.5V11" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M15 11V15.5C15 15.5 15 16.5 16 16.5C17 16.5 17 15.5 17 15.5V11" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M8 7H16" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <Card.Body className="d-flex flex-column justify-content-between align-items-center">
                  <Card.Title className="fs-5 fw-bold text-center">Pemesanan Kamar</Card.Title>
                  <Card.Text className="text-center">Fitur ini berisikan kumpulan kamar yang tersedia untuk dipesan.</Card.Text>
                  <a href="/rent" className="btn btn-success fw-bold">
                    Klik Disini
                  </a>
                </Card.Body>
              </Card>
            </>
          ) : (
            <>
               <Card className="shadow mx-3 card-style d-flex flex-column" style={{ width: '20rem' }}>
                <div className="d-flex justify-content-center align-items-center" style={{ height: "150px" }}>
                  <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-4">
                    <path d="M2 22H22" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M2 11H22" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M3.5 21.5V11.5" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M20.5 21.5V11.5" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M3.5 11.5V2.5H20.5V11.5" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M7 11V15.5C7 15.5 7 16.5 8 16.5C9 16.5 9 15.5 9 15.5V11" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M15 11V15.5C15 15.5 15 16.5 16 16.5C17 16.5 17 15.5 17 15.5V11" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M8 7H16" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <Card.Body className="d-flex flex-column justify-content-between align-items-center">
                  <Card.Title className="fs-5 fw-bold text-center">Ketersediaan Kamar</Card.Title>
                  <Card.Text className="text-center">Fitur untuk mengubah status ketersediaan kamar kos.</Card.Text>
                  <a href="/admin/rooms" className="btn btn-success fw-bold">
                    Klik Disini
                  </a>
                </Card.Body>
              </Card>
              <Card className="shadow mx-3 card-style d-flex flex-column" style={{ width: '20rem' }}>
                <div className="d-flex justify-content-center align-items-center" style={{ height: "150px" }}>
                  <svg width="100px" height="100px" viewBox="-1.5 0 33 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" className="mt-4">
                    <title>wallet</title>
                    <desc>Created with Sketch Beta.</desc>
                    <defs></defs>
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                      <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-257.000000, -774.000000)" fill="#44b156">
                        <path
                          d="M285,793 L280,793 C279.448,793 279,793.448 279,794 L279,798 C279,798.553 279.448,799 280,799 L285,799 L285,804 C285,804.553 284.552,805 284,805 L260,805 C259.448,805 259,804.553 259,804 L259,785 L284,785 C284.552,785 285,785.447 285,786 L285,793 L285,793 Z M285,796 L285,797 L281,797 L281,796 L281,795 L285,795 L285,796 L285,796 Z M283,777 L283,783 L263.5,783 L283,777 L283,777 Z M285,783 L285,776 C285,775.447 284.764,775.141 284.25,774.938 C283.854,774.781 283.469,774.875 283,775 L257,783 L257,805 C257,806.104 257.896,807 259,807 L285,807 C286.104,807 287,806.104 287,805 L287,785 C287,783.896 286.104,783 285,783 L285,783 Z"
                          id="wallet"
                          sketch:type="MSShapeGroup"
                        ></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <Card.Body className="d-flex flex-column justify-content-between align-items-center">
                  <Card.Title className="fs-5 fw-bold text-center">Konfirmasi Pembayaran</Card.Title>
                  <Card.Text className="text-center">Untuk Mengkonfirmasi Pembayaran dari User</Card.Text>
                   <a href={user ? (user?.role === "ADMIN" ? "/admin/payments" : "") : "/login"} className={`btn btn-success fw-bold mt-3 ${user?.role === "USER" ? "invisible" : ""}`}>
                    Klik Disini
                  </a>
                </Card.Body>
              </Card>
              <Card className="shadow mx-3 card-style d-flex flex-column" style={{ width: '20rem' }}>
                <div className="d-flex justify-content-center align-items-center" style={{ height: "150px" }}>
                  <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-4">
                    <path d="M2 11H22" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M2 16H22" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M2 21H22" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M2 6H22" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M3.5 3.5H20.5" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M6 8V19" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M18 8V19" stroke="#44b156" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <Card.Body className="d-flex flex-column justify-content-between align-items-center">
                  <Card.Title className="fs-5 fw-bold text-center">Laporan Keuangan</Card.Title>
                  <Card.Text className="text-center">Fitur untuk melihat laporan keuangan dari pembayaran sewa kos.</Card.Text>
                  <a href="/admin/financial" className="btn btn-success fw-bold">
                    Klik Disini
                  </a>
                </Card.Body>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};