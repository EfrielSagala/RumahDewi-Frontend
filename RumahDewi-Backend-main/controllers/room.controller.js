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
exports.getRooms = async (req, res, next) => {
  try {
    await checkRooms(req);

    let rooms = await prisma.room.findMany({
      orderBy: {
        no_room: "asc",
      },
    });

    return res.status(200).json({
      status: true,
      message: "Berhasil mendapatkan data kamar",
      data: {
        rooms,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Fungsi untuk mendapatkan kamar pengguna
exports.getUserRoom = async (req, res, next) => {
  try {
    await checkRooms(req);

    let user = await prisma.user.findUnique({
      where: {
        id: req.user_data.id,
      },
      include: {
        room: true,
      },
    });

    delete user.password;

    return res.status(200).json({
      status: true,
      message: "Berhasil mendapatkan data kamar",
      data: {
        user_room: user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Fungsi untuk menambahkan kamar
exports.addRoom = async (req, res, next) => {
  const { no_room, monthly_price } = req.body;

  if (!no_room || !monthly_price) {
    return res.status(400).json({ status: false, message: "Nomor kamar dan harga per bulan harus diisi" });
  }

  try {
    // Memastikan nomor kamar belum ada di database
    const existingRoom = await prisma.room.findUnique({
      where: { no_room },
    });

    if (existingRoom) {
      return res.status(400).json({ status: false, message: "Nomor kamar sudah terdaftar" });
    }

    // Menambah kamar baru
    const newRoom = await prisma.room.create({
      data: {
        no_room,
        monthly_price,
      },
    });

    return res.status(201).json({
      status: true,
      message: "Kamar berhasil ditambahkan",
      data: newRoom,
    });
  } catch (error) {
    next(error);
  }
};

// Fungsi untuk memperbarui status kamar
exports.updateRoomStatus = async (req, res, next) => {
  const { id } = req.params; // ID kamar dari parameter URL
  const { status } = req.body; // Status baru dari body request

  const validStatuses = ["TERSEDIA", "TERISI", "DIPESAN"]; // Status yang valid

  try {
    // Validasi status
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: false,
        message: "Status tidak valid.",
      });
    }

    // Cari kamar berdasarkan ID
    const room = await prisma.room.findUnique({
      where: { id: id }, // Gunakan ID langsung, jika menggunakan UUID
    });

    if (!room) {
      return res.status(404).json({
        status: false,
        message: "Kamar tidak ditemukan.",
      });
    }

    // Perbarui status kamar
    const updatedRoom = await prisma.room.update({
      where: { id: id }, // Gunakan ID langsung
      data: { status },
    });

    // Kembalikan response sukses
    return res.status(200).json({
      status: true,
      message: "Status kamar berhasil diubah.",
      data: updatedRoom,
    });
  } catch (error) {
    // Tangani error
    next(error);
  }
};

