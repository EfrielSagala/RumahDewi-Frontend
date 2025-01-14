import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import ReactPaginate from "react-paginate";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "/src/styles/admin/admin-orders.css";
import { formatRupiah } from "../../Functions/libs/formatRupiah";
import { useEffect, useState } from "react";
import { changeStatus, getAllPayments } from "../../Functions/API/fetchPayment";
import { formattingDate, formattingDateWithHour } from "../../Functions/libs/formatDate";
export const AdminPayments = ({ user }) => {
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItem] = useState();

  const token = localStorage.getItem("token");

  if (!token) {
    window.alert("Anda perlu login terlebih dahulu! ");
    window.location.href = "/login";
  }
  if (user) {
    if (user?.role !== "ADMIN") {
      window.location.href = "/";
    }
  }
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        const response = await getAllPayments(`?page=${currentPage}`, token);
        console.log(response?.data?.data);
        setData(response?.data?.data?.payments);
        setCurrentPage(response?.data?.data?.page);
        setTotalPage(response?.data?.data?.total_pages);
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

  const handleStatusChange = async (value, id) => {
    const confirm = window.confirm("Apakah anda yakin ingin mengubah data pesanan ?");

    if (confirm) {
      try {
        const response = await changeStatus(id, { status: value }, token);
        window.alert(response?.data?.message);
        setShouldRefetch(true);
      } catch (error) {
        console.log(error);
        window.alert(`Gagal, ${error?.response?.data?.message}`);
      }
    }
  };

  return (
    <div className="min-vh-100 w-100 d-flex flex-column align-items-center">
      <h1 className="my-5">Daftar Sewa</h1>
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
          <div className="overflow-x-auto w-100">
            <Table bordered hover>
              <thead>
                <tr>
                  <th className="text-nowrap">Nama</th>
                  <th className="text-nowrap">Email</th>
                  <th className="text-nowrap">Telepon</th>
                  <th className="text-nowrap">No. Kamar</th>
                  <th className="text-nowrap">Tanggal Masuk</th>
                  <th className="text-nowrap">Total Harga</th>
                  <th className="text-nowrap">Jumlah Bulan</th>
                  <th className="text-nowrap">Bukti Bayar</th>
                  <th className="text-nowrap">Status</th>
                  <th className="text-nowrap">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={10} className="text-center">
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
                        <td>{item?.user?.name}</td>
                        <td>{item?.user?.email}</td>
                        <td>{item?.user?.phone}</td>
                        <td>{item?.room?.no_room || "-"}</td>
                        <td>{item?.user?.occupied_since ? formattingDate(item?.user?.occupied_since) : ""}</td>
                        <td>{formatRupiah(item?.total_payment)}</td>
                        <td className="text-center">{item?.total_month}</td>
                        <td className="text-center">
                          {item?.payment_image ? (
                            <a className="btn btn-primary" href={item?.payment_image} target="_blank">
                              Lihat
                            </a>
                          ) : (
                            "Belum dibayar"
                          )}
                        </td>
                        <td>
                          <select
                            class="form-select w-full"
                            aria-label="Default select example"
                            value={item?.status}
                            style={{ minWidth: "160px" }}
                            onChange={(e) => {
                              handleStatusChange(e.target.options[e.target.selectedIndex].value, item?.id);
                            }}
                          >
                            <option value="MENUNGGU">MENUNGGU</option>
                            <option value="DIKONFIRMASI">DIKONFIRMASI</option>
                            <option value="DITOLAK">DITOLAK</option>
                          </select>
                        </td>
                        <td>
                          <button className="btn btn-success" onClick={() => setItem(item)}>
                            Lihat Detail
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                {!isLoading && data && data?.length === 0 && (
                  <tr>
                    <td colSpan={10}>
                      <div className="alert alert-danger text-center w-full">Belum ada data pembayaran</div>
                    </td>
                  </tr>
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

function ShowModal({ item, setItem }) {
  const [show, setShow] = useState(true);

  const handleClose = () => setItem();

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detail Pesanan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center" id="detail-order">
            <div class="card" style={{ width: "60rem" }} className="rounded bg-white">
              <div class="card-body m-md-5 m-3">
                <div className="row m-0 p-0">
                  <div className="row m-0 p-0">
                    <h4>Data User</h4>
                    <div class="mb-3 col-md-6 ">
                      <label for="name" class="form-label">
                        Nama Lengkap
                      </label>
                      <input type="text" class="form-control" id="name" disabled value={item?.user?.name}></input>
                    </div>
                    <div class="mb-3 col-md-6 ">
                      <label for="phone" class="form-label">
                        Nomor Telepon
                      </label>
                      <input type="text" class="form-control" id="phone" disabled value={item?.user?.phone}></input>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div class="mb-3 col-md-6 ">
                      <label for="email" class="form-label">
                        Email
                      </label>
                      <input type="text" class="form-control" id="email" disabled value={item?.user?.email}></input>
                    </div>
                    <div class="mb-3 col-md-6 ">
                      <label for="no-room" class="form-label">
                        Nomor Kamar
                      </label>
                      <input type="text" class="form-control" id="no-room" disabled value={item?.room?.no_room || "BELUM ADA KAMAR"}></input>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div class="mb-3 col-md-6 ">
                      <label for="no-room" class="form-label">
                        Status Penghuni
                      </label>
                      <input type="text" class="form-control" id="no-room" disabled value={item?.user?.status || "BELUM ADA KAMAR"}></input>
                    </div>
                    <div class="mb-3 col-md-6 ">
                      <label for="no-room" class="form-label">
                        Tanggal Masuk
                      </label>
                      <input type="text" class="form-control" id="no-room" disabled value={item?.user?.occupied_since ? formattingDate(item?.user?.occupied_since) : ""}></input>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div class="mb-3 col-md-6 ">
                      <label for="no-room" class="form-label">
                        Jatuh tempo
                      </label>
                      <input type="text" class="form-control" id="no-room" disabled value={item?.user?.due_date ? formattingDate(item?.user?.due_date) : ""}></input>
                    </div>
                    <div class="mb-3 col-md-6 ">
                      <label for="no-room" class="form-label">
                        Foto Identitas
                      </label>
                      <a className="btn btn-success d-block" href={item?.user?.identity} target="_blank">
                        Lihat
                      </a>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <h4>Data Pembayaran</h4>
                    <div class="mb-3 col-md-6 ">
                      <label for="" class="form-label">
                        Nomor Kamar
                      </label>
                      <input type="text" class="form-control" disabled value={item?.room?.no_room}></input>
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="" class="form-label">
                        Jumlah Bulan Sewa
                      </label>
                      <input type="text" class="form-control" disabled value={item?.total_month}></input>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div class="mb-3 col-md-6 ">
                      <label for="" class="form-label">
                        Total Harga
                      </label>
                      <input type="text" class="form-control" disabled value={formatRupiah(item?.total_payment)}></input>
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="" class="form-label">
                        Tanggal Pembayaran
                      </label>
                      <input type="text" class="form-control" disabled value={formattingDateWithHour(item?.createdAt)}></input>
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div class="mb-3 col-md-6">
                      <label for="" class="form-label">
                        Disewa Untuk
                      </label>
                      <input type="text" class="form-control" disabled value={item?.rent_for ? formattingDate(item?.rent_for) : "BAYAR SEWA"}></input>
                    </div>
                    {item?.payment_image && (
                      <div class="mb-3 col-md-6 ">
                        <label for="bukti" class="form-label">
                          Bukti Pembayaran
                        </label>
                        <a className="btn btn-success d-block" href={item?.payment_image} target="_blank">
                          Lihat Bukti
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
