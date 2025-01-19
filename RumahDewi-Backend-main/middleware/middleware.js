const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jsonwebtoken = require("jsonwebtoken");

module.exports = {
  // Middleware untuk autentikasi menggunakan JWT
  middleware: async (req, res, next) => {
    try {
      if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];

        try {
          // Verifikasi token JWT
          const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
          req.user_data = decoded;

          // Ambil data pengguna dari database
          const user = await prisma.user.findUnique({
            where: { id: req.user_data.id },
          });

          if (!user) {
            return res.status(401).json({
              status: 401,
              message: "Authentication failed, user invalid.",
              data: null,
            });
          }

          // Lanjutkan ke middleware berikutnya
          next();
        } catch (error) {
          return res.status(401).json({
            status: 401,
            message: "Authentication failed, jwt invalid.",
            data: null,
          });
        }
      } else {
        // Jika header Authorization tidak ada
        return res.status(401).json({
          status: 401,
          message: "Authentication failed, token is missing.",
          data: null,
        });
      }
    } catch (error) {
      // Tangani error secara global
      next(error);
    }
  },

  // Middleware untuk mengecek apakah user memiliki role "ADMIN"
  isAdmin: (req, res, next) => {
    try {
      if (!req.user_data || req.user_data.role !== "ADMIN") {
        return res.status(403).json({
          status: 403,
          message: "Access denied for Admin. You don't have permission to access this resource.",
          data: null,
        });
      }
      // Lanjutkan ke middleware berikutnya
      next();
    } catch (error) {
      // Tangani error secara global
      next(error);
    }
  },

  // Middleware untuk validasi input saat menambah kamar
  validateAddRoomInput: (req, res, next) => {
    const { no_room, monthly_price } = req.body;

    if (!no_room || isNaN(no_room) || no_room <= 0) {
      return res.status(400).json({
        status: 400,
        message: "Nomor kamar harus diisi dan berupa angka positif yang valid.",
        data: null,
      });
    }

    if (!monthly_price || isNaN(monthly_price) || monthly_price <= 0) {
      return res.status(400).json({
        status: 400,
        message: "Harga per bulan harus diisi dan berupa angka positif yang valid.",
        data: null,
      });
    }

    // Jika validasi berhasil, lanjutkan ke controller
    next();
  },

  // Route handler untuk menambah kamar (hanya bisa diakses oleh admin)
  addRoom: async (req, res) => {
    try {
      const { no_room, monthly_price } = req.body;

      // Cek apakah nomor kamar sudah ada
      const existingRoom = await prisma.room.findUnique({
        where: { no_room },
      });

      if (existingRoom) {
        return res.status(400).json({
          status: 400,
          message: "Nomor kamar sudah terdaftar.",
          data: null,
        });
      }

      // Tambahkan kamar baru
      const room = await prisma.room.create({
        data: {
          no_room,
          monthly_price,
        },
      });

      res.status(201).json({
        status: 201,
        message: "Room added successfully.",
        data: room,
      });
    } catch (error) {
      // Tangani error saat menambahkan kamar
      res.status(500).json({
        status: 500,
        message: "Error adding room.",
        data: null,
      });
    }
  },
};
