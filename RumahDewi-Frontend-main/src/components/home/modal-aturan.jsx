import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalAturan() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-success fw-bold fs-4 mx-3" onClick={handleShow}>
        Aturan Kost
      </button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Rumah Dewi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="text-center fw-semibold fs-4">Aturan Kost Rumah Dewi</div>
            <div className="border rounded border-primary mt-3 p-3 aturan">
              <ul>
                <li className="my-2">Menjaga kebersihan rumah kos.</li>
                <li className="my-2">Menjalin hubungan persaudaraan sesama penghuni rumah kos.</li>
                <li className="my-2">Dilarang keras menyimpan, mengkonsumsi, mengedarkan zat narkotika.</li>
                <li className="my-2">Untuk calon penghuni baru, wajib untuk melakukan pembayaran kamar 1x24 jam setelah melakukan pemesanan kamar untuk pemberian kunci kamar.</li>
                <li className="my-2">Untuk penghuni, pembayaran kamar kos paling lambat 2×24 jam terhitung setelah tanggal tenggat masa sewa.</li>
                <li className="my-2">Dalam hal tertentu, demi keamanan dan keselamatan pengurus rumah kos berhak untuk membuka kamar penghuni.</li>
                <li className="my-2">Tamu/keluarga tidak diperkenankan untik menginap tanpa ijin pengurus rumah kos.</li>
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalAturan;
