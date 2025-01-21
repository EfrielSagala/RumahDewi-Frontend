import logoHeader from "../../assets/images/logo-header.png";
import logoFooter from "../../assets/images/logo-footer.png";
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
            <img src={logoHeader} alt="Logo Website" className="" width={"140px"} />
          </a>
          <button class="navbar-toggler text-bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item px-2">
                <a class="nav-link rounded px-3 a-btn fw-bold" aria-current="page" href="/">
                  Home
                </a>
              </li>
              {(user && user?.role !== "ADMIN") || !user ? (
                <li class="nav-item px-2">
                  <a class="nav-link rounded px-3 a-btn fw-bold" href="/rent">
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
                      <a class="nav-link rounded px-3 a-btn fw-bold" href="/payments">
                        Bayar Sewa
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li class="nav-item px-2">
                      <a class="nav-link rounded px-3 a-btn fw-bold" href="/admin/payments">
                        Konfirmasi Pembayaran
                      </a>
                    </li>
                    <li class="nav-item px-2">
                      <a class="nav-link rounded px-3 a-btn fw-bold" href="/admin/rooms">
                        Ketersediaan Kamar
                      </a>
                    </li>
                    <li class="nav-item px-2">
                      <a class="nav-link rounded px-3 a-btn fw-bold" href="/admin/financial">
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
                      <button class="dropdown-item fw-bold" onClick={logout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <li class="nav-item px-2">
                  <a class="nav-link rounded px-3 a-btn fw-bold" href="/login">
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
        <div className="row justify-content-center align-content-center m-0 p-0 py-5 mx-3">
          <div className="col-md-6">
            <img
              src={logoFooter}
              alt="Teks Rumah Dewi"
              className="img-fluid text-start"
              style={{ width: "425px" , marginLeft: 0, padding: 0}}
            />
          </div>
          <div className="col-md-3 mt-md-0 mt-3 text-white text-center">
            <h5>KONTAK KAMI:</h5>
            <p>Phone: xxxxxxxxxx</p>
          </div>  
        </div>
        <hr className="text-white m-0 p-0" />
        <p className="m-0 px-0 py-3 text-white text-center">2024@ All rights reserved. Kos Rumah Dewi</p>
      </div>
    </div>
  );
};
