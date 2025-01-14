// Module
require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const roomRouter = require("../routes/room"); // Sesuaikan dengan nama file router Anda
const fs = require("fs");

const indexRouter = require("../routes/index");

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',  // Membatasi hanya ke frontend di localhost:5173
  methods: 'GET, POST, PUT, DELETE',  // Pastikan metode yang sesuai
  allowedHeaders: 'Content-Type, Authorization'  // Pastikan header yang dibutuhkan diizinkan
}));
app.use("/api/v1", roomRouter);
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Route
app.use("/api/v1", indexRouter);

// 500 error handler
app.use((err, req, res, next) => {
  console.error(err); // Log error details for debugging
  res.status(500).json({
    status: false,
    message: err.message || "Terjadi kesalahan pada server.",
    data: null,
  });
});

// 404 error handler
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: `are you lost? ${req.method} ${req.url} is not registered!`,
    data: null,
  });
});

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

module.exports = app;
