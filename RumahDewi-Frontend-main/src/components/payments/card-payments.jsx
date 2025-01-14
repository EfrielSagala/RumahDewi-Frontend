import { useState } from "react";
import Button from "react-bootstrap/Button";
import qris from "/src/assets/images/qris.jpeg";
import "/src/styles/checkout/card-checkout.css";
import { Modal } from "react-bootstrap";
import { uploadPayment } from "../../Functions/API/fetchPayment";

export function ModalPayment({ id }) {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(undefined);
  const [error, setError] = useState("");
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSuccess(undefined);
  };
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", file);

      const response = await uploadPayment(id, formData, token);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(undefined);
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log(error);
      setSuccess(false);
      setError(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <button className="btn btn-danger" onClick={handleShow}>
        {" "}
        Bayar Sekarang
      </button>

      <Modal show={show} onHide={handleClose} size="xl" backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Upload Bukti Pembayaran</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            {success === true ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-check-circle-fill text-info success-icon" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <div class="my-3 text-center">
                  <h3 className="text-info">Upload Bukti Pembayaran Berhasil !!</h3>
                </div>
              </div>
            ) : success === false ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill text-danger success-icon" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                </svg>
                <div class="my-3 text-center">
                  <h3 className="text-danger">Upload Bukti Pembayaran Gagal</h3>
                  <h4 className="alert alert-danger">{error}</h4>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h3>QRIS</h3>
                <img src={qris} alt="Gambar QRIS" style={{ maxWidth: "100%" }} />
                <div class="my-3 upload-payment text-center">
                  <label htmlFor="inputGroupFile01" className="fs-4 fw-semibold">
                    Upload Bukti Pembayaran disini
                  </label>
                  <input type="file" class="form-control border border-primary shadow" id="inputGroupFile01" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required />
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading || success !== undefined}>
              {isLoading ? "Menunggu..." : "Upload Bukti Pembayaran"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
