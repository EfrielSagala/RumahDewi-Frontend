import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "/src/styles/admin/admin-orders.css";
import { formatRupiah } from "../../Functions/libs/formatRupiah";
import { useEffect, useState } from "react";
import { addPayment, getMyPayment } from "../../Functions/API/fetchPayment";
import { ModalPayment } from "./card-payments";
import { getUserRooms } from "../../Functions/API/fetchRooms";
import { formattingDate } from "../../Functions/libs/formatDate";
export const Payments = ({ user }) => {
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState();
  const [userRoom, setUserRoom] = useState();
  const token = localStorage.getItem("token");

  if (!token) {
    window.alert("Anda perlu login terlebih dahulu! ");
    window.location.href = "/login";
  }
  if (user) {
    if (user?.role !== "USER") {
      window.location.href = "/";
    }
  }
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await getMyPayment(`?page=${currentPage}`, token);
        const fetchUserRooms = await getUserRooms(token);
        console.log(response);
        setData(response?.data?.data?.payments);
        setCurrentPage(response?.data?.data?.page);
        setTotalPage(response?.data?.data?.total_pages);
        setUserRoom(fetchUserRooms?.data?.data?.user_room);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setShouldRefetch(false);
      }
    };
    if (shouldRefetch) {
      fetch();
    }
  }, [shouldRefetch]);

  const handlePageChange = (e) => {
    setCurrentPage(e.selected + 1);
    setShouldRefetch(true);
  };

  return (
    <div className="min-vh-100 w-100 d-flex flex-column align-items-center">
      <h1 className="my-5">Riwayat Pembayaran</h1>
      <div className="w-100 d-flex flex-column align-items-center mb-5">
        <div className="table-res bg-white p-3 border shadow rounded">
          {/* <div className="text-start">
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Masukkan nomor invoice atau nama user..." aria-label="Search" />
              <button class="btn btn-outline-primary fs-5 text-nowrap" type="submit">
                Cari Pesanan
              </button>
            </form>
          </div> */}
          {!isLoading && !userRoom?.room && (
            <div colSpan={5} className="w-full alert alert-danger text-center">
              Belum ada kamar yang disewa saat ini
            </div>
          )}
          <div className="text-end w-full my-3">
            <AddModal userRoom={userRoom} setShouldRefetch={setShouldRefetch} />
          </div>
          <div className="overflow-x-auto w-100">
            <Table bordered hover>
              <thead>
                <tr>
                  <th className="text-nowrap">No. Kamar</th>
                  <th className="text-nowrap">Jumlah Bulan Sewa</th>
                  <th className="text-nowrap">Total Harga</th>
                  <th className="text-nowrap">Status Bayar</th>
                  <th className="text-nowrap">Sewa Untuk</th>
                  <th className="text-nowrap">Bukti Bayar</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={6} className="text-center">
                      <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                )}
                {!isLoading &&
                  data &&
                  data?.length !== 0 &&
                  data?.map((item) => {
                    return (
                      <tr>
                        <td>{item?.room?.no_room}</td>
                        <td>{item?.total_month}</td>
                        <td>{formatRupiah(item?.total_payment)}</td>
                        <td>{item?.payment_image || item?.status == "DITOLAK" ? item?.status : "BELUM DIBAYAR"}</td>
                        <td>{item?.rent_for ? formattingDate(item?.rent_for) : "BAYAR SEWA"}</td>
                        <td>
                          {item?.payment_image ? (
                            <a className="btn btn-success" href={item?.payment_image} target="_blank">
                              Lihat Bukti
                            </a>
                          ) : (
                            <ModalPayment id={item?.id} />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                {!isLoading && data?.length == 0 && (
                  <td colSpan={6} className="w-full alert alert-danger text-center">
                    Tidak ada data yang ditemukan
                  </td>
                )}
              </tbody>
            </Table>
          </div>
          {item && <ShowModal item={item} setItem={setItem} />}
          <div className="overflow-x-auto w-100">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              pageRangeDisplayed={0}
              initialPage={currentPage - 1}
              pageCount={totalPage}
              onPageChange={handlePageChange}
              previousLabel="< previous"
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item text-nowrap"
              previousLinkClassName="page-link"
              nextClassName="page-item text-nowrap"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              activeClassName="active"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function AddModal({ userRoom, setShouldRefetch }) {
  const [show, setShow] = useState(false);
  const [month, setMonth] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const submit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await addPayment(token, { total_month: month });
      setSuccess(response?.data?.message);
      setShouldRefetch(true);
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow} disabled={!userRoom?.room}>
        Tambah Pembayaran
      </button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Tambah Pembayaran</Modal.Title>
        </Modal.Header>
        <form onSubmit={submit}>
          <Modal.Body>
            {success && <div className="alert alert-success text-center">{success}</div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}
            <div className="row m-0 p-0">
              <div className="row m-0 p-0">
                <div class="mb-3 col-md-6 ">
                  <label for="no_room" class="form-label">
                    Nomor Kamar
                  </label>
                  <input type="text" class="form-control" id="no_room" value={userRoom?.room?.no_room} disabled></input>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">
                    Sewa Bulanan
                  </label>
                  <input type="text" class="form-control" id="no_room" value={formatRupiah(userRoom?.room?.monthly_price)} disabled></input>
                </div>
              </div>
              <div className="row m-0 p-0">
                <div class="mb-3">
                  <label for="month" class="form-label">
                    Sewa untuk berapa bulan ?
                  </label>
                  <input
                    type="number"
                    min="1"
                    class="form-control"
                    id="month"
                    value={month}
                    onChange={(e) => {
                      setMonth(e.target.value);
                      setError("");
                      setSuccess("");
                    }}
                    required
                  ></input>
                </div>
              </div>

              <div className="d-flex flex-column align-items-end">
                <p className="fs-4 fw-semibold">Total Bayar</p>
                <p className="fs-4 fw-semibold">{formatRupiah(month * userRoom?.room?.monthly_price)}</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Menunggu..." : "Tambah Pembayaran"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
