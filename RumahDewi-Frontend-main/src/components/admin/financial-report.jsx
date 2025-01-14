import { useEffect, useState } from "react";
import { getAllPayments } from "../../Functions/API/fetchPayment";
import { formatRupiah } from "../../Functions/libs/formatRupiah";
import { formattingDate } from "../../Functions/libs/formatDate";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import plugin untuk membuat tabel di PDF

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const FinancialReport = ({ user }) => {
  const [data, setData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState();
  const [expenses, setExpenses] = useState({ listrik: "", air: "", perawatan: "" });
  const [netIncome, setNetIncome] = useState(0);

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

  useEffect(() => {
    if (data) {
      const monthlyIncome = Array(12).fill(0);

      data.forEach((item) => {
        const date = new Date(item?.user?.occupied_since || item?.created_at);
        const month = date.getMonth();
        monthlyIncome[month] += item?.total_payment || 0;
      });

      setChartData({
        labels: [
          "January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"
        ],
        datasets: [
          {
            label: "Pendapatan",
            data: monthlyIncome,
            borderColor: "rgba(75,192,192,1)",
            fill: false,
          },
        ],
      });
    }
  }, [data]);

  const totalPendapatan = data ? data.reduce((acc, item) => acc + (item?.total_payment || 0), 0) : 0;

  useEffect(() => {
    const totalExpenses = Object.values(expenses).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
    setNetIncome(totalPendapatan - totalExpenses);
  }, [totalPendapatan, expenses]);

  const handleExpenseChange = (e, field) => {
    setExpenses((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handlePageChange = (e) => {
    setCurrentPage(e.selected + 1);
    setShouldRefetch(true);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text("Laporan Keuangan", 105, 20, null, null, "center");

    // Add total income
    doc.setFontSize(12);
    doc.text(`Total Pemasukan: ${formatRupiah(totalPendapatan)}`, 20, 40);
    
    // Add net income
    doc.text(`Pendapatan Bersih: ${formatRupiah(netIncome)}`, 20, 50);

    // Add table with payment data
    const tableData = data?.map(item => [
      item?.user?.name, item?.user?.email, item?.user?.phone,
      item?.room?.no_room || "-", formattingDate(item?.user?.occupied_since),
      formatRupiah(item?.total_payment), item?.total_month, item?.status
    ]) || [];

    doc.autoTable({
      head: [["Nama", "Email", "Telepon", "No. Kamar", "Tanggal Masuk", "Total Harga", "Jumlah Bulan", "Status"]],
      body: tableData,
      startY: 60,
    });

    // Save PDF
    doc.save("laporan_keuangan.pdf");
  };

  return (
    <div className="financial-report min-vh-100 w-100 d-flex flex-column align-items-center">
      <h1 className="my-5">Laporan Keuangan</h1>
      
      {/* Download Button */}
      <button className="btn btn-success mb-3" onClick={handleDownloadPDF}>
        Unduh Laporan PDF
      </button>

      <div className="w-100 d-flex flex-column align-items-center mb-5">
        <div className="table-res bg-white p-3 border shadow rounded">
          <div className="overflow-x-auto w-100">
            <Table bordered hover className="custom-table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Telepon</th>
                  <th>No. Kamar</th>
                  <th>Tanggal Masuk</th>
                  <th>Total Harga</th>
                  <th>Jumlah Bulan</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={8} className="text-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                )}
                {!isLoading &&
                  data &&
                  data.length > 0 &&
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.user?.name}</td>
                      <td>{item?.user?.email}</td>
                      <td>{item?.user?.phone}</td>
                      <td>{item?.room?.no_room || "-"}</td>
                      <td>{item?.user?.occupied_since ? formattingDate(item?.user?.occupied_since) : ""}</td>
                      <td>{formatRupiah(item?.total_payment)}</td>
                      <td className="text-center">{item?.total_month}</td>
                      <td>{item?.status}</td>
                    </tr>
                  ))}
                {!isLoading && data && data.length === 0 && (
                  <tr>
                    <td colSpan={8}>
                      <div className="alert alert-danger text-center">Belum ada data pembayaran</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <div className="total-pendapatan text-end mt-3">
            <h5 className="fw-bold">Total Pemasukan: {formatRupiah(totalPendapatan)}</h5>
          </div>

          {/* Form Input Pengeluaran */}
          <div className="form-expense mt-4">
            <label htmlFor="expense-listrik" className="form-label">
              Biaya Listrik:
            </label>
            <input
              type="number"
              id="expense-listrik"
              className="form-control mb-3"
              placeholder="Masukkan biaya listrik"
              value={expenses.listrik}
              onChange={(e) => handleExpenseChange(e, "listrik")}
            />

            <label htmlFor="expense-air" className="form-label">
              Biaya Air:
            </label>
            <input
              type="number"
              id="expense-air"
              className="form-control mb-3"
              placeholder="Masukkan biaya air"
              value={expenses.air}
              onChange={(e) => handleExpenseChange(e, "air")}
            />

            <label htmlFor="expense-perawatan" className="form-label">
              Biaya Perawatan:
            </label>
            <input
              type="number"
              id="expense-perawatan"
              className="form-control mb-3"
              placeholder="Masukkan biaya perawatan"
              value={expenses.perawatan}
              onChange={(e) => handleExpenseChange(e, "perawatan")}
            />

            <div className="net-income">
              <h5 className="fw-bold">Pendapatan Bersih: {formatRupiah(netIncome)}</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Grafik */}
      {chartData && (
            <div className="chart-container mt-5" style={{ width: "80%", height: "400px" }}>
              <Line data={chartData} />
            </div>
          )}

      
      {/* Pagination */}
      <div className="mt-5">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={totalPage}
          onPageChange={handlePageChange}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};
