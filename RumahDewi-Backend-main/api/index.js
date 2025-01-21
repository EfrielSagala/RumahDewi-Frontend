// Module
require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const roomRouter = require("../routes/room");
const fs = require("fs");

const indexRouter = require("../routes/index");

const app = express();
const PORT = process.env.PORT || 4002;

// Middleware - Urutannya penting!
app.use(logger("dev"));
// Body parser harus di awal, sebelum router
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: ['https://rumah-dewi-frontend.vercel.app'],
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
}));

// File upload middleware
app.use(fileUpload());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes 
app.use("/api/v1", indexRouter);
app.use("/api/v1", roomRouter);

// Error Handlers
// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: `are you lost? ${req.method} ${req.url} is not registered!`,
    data: null,
  });
});

// 500 handler
app.use((err, req, res, next) => {
  console.error(err); // Log error details for debugging
  res.status(500).json({
    status: false,
    message: err.message || "Terjadi kesalahan pada server.",
    data: null,
  });
});

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

module.exports = app;