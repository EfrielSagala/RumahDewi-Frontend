// const { PrismaClient } = require("@prisma/client");
// const { checkRooms } = require("../libs/checkrooms.libs");
// const prisma = new PrismaClient();

// exports.getRooms = async (req, res, next) => {
//   try {
//     await checkRooms(req);

//     let rooms = await prisma.room.findMany({
//       orderBy: {
//         no_room: "asc",
//       },
//     });

//     return res.status(200).json({
//       status: true,
//       message: "Berhasil mendapatkan data kamar",
//       data: {
//         rooms,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// exports.getUserRoom = async (req, res, next) => {
//   try {
//     await checkRooms(req);

//     let user = await prisma.user.findUnique({
//       where: {
//         id: req.user_data.id,
//       },
//       include: {
//         room: true,
//       },
//     });

//     delete user.password;

//     return res.status(200).json({
//       status: true,
//       message: "Berhasil mendapatkan data kamar",
//       data: {
//         user_room: user,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { checkRooms } = require("../libs/checkrooms.libs");

// Fungsi untuk mendapatkan semua kamar
async function getRooms(req, res, next) {
  try {
    await checkRooms(req);

    const rooms = await prisma.room.findMany({
      orderBy: {
        no_room: "asc",
      },
    });

    return res.status(200).json({
      status: true,
      message: "Berhasil mendapatkan data kamar",
      data: { rooms },
    });
  } catch (error) {
    next(error);
  }
}

// Fungsi untuk mendapatkan kamar pengguna
async function getUserRoom(req, res, next) {
  try {
    await checkRooms(req);

    const user = await prisma.user.findUnique({
      where: { id: req.user_data.id },
      include: { room: true },
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Pengguna tidak ditemukan.",
      });
    }

    delete user.password;

    return res.status(200).json({
      status: true,
      message: "Berhasil mendapatkan data kamar",
      data: { user_room: user },
    });
  } catch (error) {
    next(error);
  }
}

// Controller to add a room
async function addRoom(req, res, next) {
  const { no_room, monthly_price, status } = req.body;

  // Check if required fields are provided
  if (!no_room || !monthly_price || !status) {
    return res.status(400).json({
      status: false,
      message: "Nomor kamar, harga per bulan, dan status harus diisi",
    });
  }

  try {
    // Check if the room number already exists in the database
    const existingRoom = await prisma.room.findUnique({ where: { no_room } });

    if (existingRoom) {
      return res.status(400).json({
        status: false,
        message: "Nomor kamar sudah terdaftar",
      });
    }

    // Add the new room
    const newRoom = await prisma.room.create({
      data: {
        no_room,
        monthly_price: parseInt(monthly_price, 10), // Ensure correct data type
        status,
      },
    });

    return res.status(201).json({
      status: true,
      message: "Kamar berhasil ditambahkan",
      data: newRoom,
    });
  } catch (error) {
    console.error("Error adding room:", error);
    next(error);
  }
}

// Export the functions
module.exports = {
  getRooms,
  getUserRoom,
  addRoom,
};
