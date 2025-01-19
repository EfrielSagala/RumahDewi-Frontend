import logo from "../../assets/images/logo.png";
import "../../App.css";
import "../../styles/templates/main.css";
import { useEffect, useState } from "react";
import { whoami } from "../../Functions/API/fetchAuth";
export const MainTemplate = ({ component: Component }) => {
  const [user, setUser] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await whoami(token);

        setUser(response?.data?.data?.user);
      } catch (error) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    };
    if (token) {
      fetch();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <div className="">
      {/* NAVIGATION BAR */}
      <nav class="navbar navbar-expand-lg bg-success bg-gradient sticky-top">
        <div class="container-xl">
          <a class="navbar-brand text-info fw-bold fs-2" href="/">
            <img src={logo} alt="Logo Website" className="" width={"140px"} />
          </a>
          <button class="navbar-toggler text-bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item px-2">
                <a class="nav-link rounded px-3 a-btn" aria-current="page" href="/">
                  Home
                </a>
              </li>
              {(user && user?.role !== "ADMIN") || !user ? (
                <li class="nav-item px-2">
                  <a class="nav-link rounded px-3 a-btn" href="/rent">
                    Tipe Kamar
                  </a>
                </li>
              ) : (
                <></>
              )}
              {user ? (
                user?.role == "USER" ? (
                  <>
                    <li class="nav-item px-2">
                      <a class="nav-link rounded px-3 a-btn" href="/payments">
                        Bayar Sewa
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li class="nav-item px-2">
                      <a class="nav-link rounded px-3 a-btn" href="/admin/payments">
                        Konfirmasi Pembayaran
                      </a>
                    </li>
                    <li class="nav-item px-2">
                      <a class="nav-link rounded px-3 a-btn" href="/admin/rooms">
                        Ketersediaan Kamar
                      </a>
                    </li>
                    <li class="nav-item px-2">
                      <a class="nav-link rounded px-3 a-btn" href="/admin/financial">
                        Laporan Keuangan
                      </a>
                    </li>
                  </>
                )
              ) : (
                <></>
              )}
              {user ? (
                <li class="nav-item px-2 dropdown">
                  <a class="nav-link dropdown-toggle rounded text-center px-3 bg-white pointer" data-bs-toggle="dropdown" aria-expanded="false">
                    {user?.name?.split(" ")[0]}
                  </a>
                  <ul class="dropdown-menu">
                    <li>
                      <button class="dropdown-item" onClick={logout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li class="nav-item px-2">
                  <a class="nav-link rounded px-3 a-btn" href="/login">
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* MAIN COMPONENT */}
      <div className="bg-success-subtle">
        <Component user={user} />
      </div>
      {/* FOOOTER */}
      <div className="w-100 bg-success bg-gradient m-0 p-0">
        <div className="row justify-content-center align-content-center m-0 p-0 text-white py-5 mx-3">
          <div className="col-md-3 mt-md-0 mt-3 footer-contact">
            <h3>Kontak Kami</h3>
            <div className="mt-3 text-center">
              <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z"
                  fill="#FFFFFF"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                  fill="#FFFFFF"
                />
              </svg>
              <span className="d-block mt-3">Phone</span>
              <span className="d-block fw-bold">087759744555</span>
            </div>
          </div>
        </div>
        <hr className="text-white m-0 p-0" />
        <p className="m-0 px-0 py-3 text-white text-center">2024@ All rights reserved. Kos Rumah Dewi</p>
      </div>
    </div>
  );
};
