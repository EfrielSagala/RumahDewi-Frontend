// const { PrismaClient } = require("@prisma/client");
// const jsonwebtoken = require("jsonwebtoken");
// const prisma = new PrismaClient();

// module.exports = {
//   // Middleware to authenticate user using JWT
//   middleware: async (req, res, next) => {
//     try {
//       // Check if authorization header is present
//       if (req.headers && req.headers.authorization) {
//         const token = req.headers.authorization.split(" ")[1];
//         try {
//           // Verify JWT token
//           const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
//           req.user_data = decoded;

//           // Fetch user from the database
//           const user = await prisma.user.findUnique({
//             where: {
//               id: req.user_data.id,
//             },
//           });

//           // If user not found, return 401 response
//           if (!user) {
//             return res.status(401).json({
//               status: 401,
//               message: "Authentication failed, user invalid.",
//               data: null,
//             });
//           }
//           // Proceed to the next middleware
//           next();
//         } catch {
//           // If JWT verification fails, return 401 response
//           return res.status(401).json({
//             status: 401,
//             message: "Authentication failed, jwt invalid.",
//             data: null,
//           });
//         }
//       } else {
//         // If authorization header is missing, return 401 response
//         return res.status(401).json({
//           status: 401,
//           message: "Authentication failed, please login.",
//           data: null,
//         });
//       }
//       /* c8 ignore start */
//     } catch (error) {
//       // Pass error to the next middleware
//       next(error);
//     }
//   },
//   // Middleware to check if the user has "USER" role
//   isUser: (req, res, next) => {
//     try {
//       // If user role is not "USER", return 401 response
//       if (req.user_data.role !== "USER") {
//         return res.status(401).json({
//           status: 401,
//           message: "Access denied for User. You don't have permission to the resource",
//           data: null,
//         });
//       }
//       // Proceed to the next middleware
//       next();
//     } catch (error) {
//       // Pass error to the next middleware
//       next(error);
//     }
//   },
//   // Middleware to check if the user has "ADMIN" role
//   isAdmin: (req, res, next) => {
//     try {
//       // If user role is not "ADMIN", return 401 response
//       if (req.user_data.role !== "ADMIN") {
//         return res.status(401).json({
//           status: 401,
//           message: "Access denied for Admin. You don't have permission to the resource",
//           data: null,
//         });
//       }
//       // Proceed to the next middleware
//       next();
//     } catch (error) {
//       // Pass error to the next middleware
//       next(error);
//     }
//   },
// };
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
          const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
          req.user_data = decoded;

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
          next();
        } catch {
          return res.status(401).json({
            status: 401,
            message: "Authentication failed, jwt invalid.",
            data: null,
          });
        }
      } else {
        return res.status(401).json({
          status: 401,
          message: "Authentication failed, please login.",
          data: null,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  // Middleware untuk mengecek apakah user memiliki role "USER"
  isUser: (req, res, next) => {
    try {
      if (req.user_data.role !== "USER") {
        return res.status(401).json({
          status: 401,
          message: "Access denied for User. You don't have permission to the resource",
          data: null,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  },

  // Middleware untuk mengecek apakah user memiliki role "ADMIN"
  isAdmin: (req, res, next) => {
    try {
      if (req.user_data.role !== "ADMIN") {
        return res.status(401).json({
          status: 401,
          message: "Access denied for Admin. You don't have permission to the resource",
          data: null,
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  },

  // Middleware untuk validasi input saat menambah kamar
  validateAddRoomInput: (req, res, next) => {
    const { no_room, monthly_price } = req.body;

    if (!no_room || isNaN(no_room) || no_room <= 0) {
      return res.status(400).json({
        status: 400,
        message: "Nomor kamar harus diisi dan berupa angka yang valid.",
        data: null,
      });
    }

    if (!monthly_price || isNaN(monthly_price) || monthly_price <= 0) {
      return res.status(400).json({
        status: 400,
        message: "Harga per bulan harus diisi dan berupa angka yang valid.",
        data: null,
      });
    }

    // Lanjutkan ke controller jika validasi berhasil
    next();
  },
};
