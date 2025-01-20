const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { checkRooms } = require("../libs/checkrooms.libs");

// Get all rooms
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
      message: "Success get rooms data",
      data: { rooms },
    });
  } catch (error) {
    next(error);
  }
}

// Get user's room
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
        message: "User not found",
      });
    }

    delete user.password;

    return res.status(200).json({
      status: true,
      message: "Success get user room data",
      data: { user_room: user },
    });
  } catch (error) {
    next(error);
  }
}

// Add new room
async function addRoom(req, res, next) {
  try {
    console.log('Request Body:', req.body); // Debug log

    if (!req.body) {
      return res.status(400).json({
        status: false,
        message: "Request body is required",
      });
    }

    const { no_room, monthly_price, status } = req.body;

    // Validation
    if (!no_room || !monthly_price || !status) {
      return res.status(400).json({
        status: false,
        message: "Room number, monthly price, and status are required",
      });
    }

    if (!["TERSEDIA", "DIPESAN", "TERISI"].includes(status)) {
      return res.status(400).json({
        status: false,
        message: "Invalid room status",
      });
    }

    if (isNaN(no_room) || no_room <= 0 || isNaN(monthly_price) || monthly_price <= 0) {
      return res.status(400).json({
        status: false,
        message: "Room number and monthly price must be positive numbers",
      });
    }

    // Check if room number already exists
    const existingRoom = await prisma.room.findUnique({
      where: { no_room: parseInt(no_room) },
    });

    if (existingRoom) {
      return res.status(400).json({
        status: false,
        message: "Room number already exists",
      });
    }

    // Create new room
    const newRoom = await prisma.room.create({
      data: {
        no_room: parseInt(no_room),
        monthly_price: parseFloat(monthly_price),
        status,
      },
    });

    return res.status(201).json({
      status: true,
      message: "Room successfully added",
      data: newRoom,
    });
  } catch (error) {
    console.error("Error adding room:", error);
    next(error);
  }
}
// Add function to update room status
async function updateRoomStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log('Update Room Status Request:', { id, status }); // Debug log

    if (!status || !["TERSEDIA", "DIPESAN", "TERISI"].includes(status)) {
      return res.status(400).json({
        status: false,
        message: "Status kamar tidak valid",
      });
    }

    const room = await prisma.room.findUnique({
      where: { id: parseInt(id) },
    });

    if (!room) {
      return res.status(404).json({
        status: false,
        message: "Kamar tidak ditemukan",
      });
    }

    const updatedRoom = await prisma.room.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    return res.status(200).json({
      status: true,
      message: "Status kamar berhasil diupdate",
      data: updatedRoom,
    });
  } catch (error) {
    console.error("Error updating room status:", error);
    next(error);
  }
}

const getRoomById = async (req, res, next) => {
  try {
    const { id } = req.params; // Ambil ID dari parameter URL

    console.log("Fetching room by ID:", id); // Debug log

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        status: false,
        message: "Invalid room ID",
      });
    }

    const room = await prisma.room.findUnique({
      where: { id }, // Tidak perlu parseInt karena ID adalah string
    });

    if (!room) {
      return res.status(404).json({
        status: false,
        message: "Room not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Success fetching room data",
      data: { room },
    });
  } catch (error) {
    console.error("Error fetching room by ID:", error);
    next(error); // Forward error ke middleware error handler
  }
};

// Edit Room Data (PUT request)
const ROOM_STATUS = ["TERSEDIA", "TERISI", "DIPESAN"];

async function editRoom(req, res, next) {
  try {
    const { id } = req.params;
    const { no_room, monthly_price, status } = req.body; // Removed description, photo, and video

    // Validate required fields
    // if (!no_room || !monthly_price || !status) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "Room number, monthly price, and status are required",
    //   });
    // }

    // if (![TERSEDIA, DIPESAN, TERISI].includes(status)) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "Invalid room status",
    //   });
    // }
    
    // Validasi status
    if (!ROOM_STATUS.includes(status)) {
      return res.status(400).json({
        status: false,
        message: "Invalid room status",
      });
    }

    // if (isNaN(no_room) || no_room <= 0 || isNaN(monthly_price) || monthly_price <= 0) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "Room number and monthly price must be positive numbers",
    //   });
    // }

    // Find the room by ID
    const existingRoom = await prisma.room.findUnique({
      where: { id },
    });

    if (!existingRoom) {
      return res.status(404).json({
        status: false,
        message: "Room not found",
      });
    }

    // Update the room with new data, excluding description, photo, and video
    const updatedRoom = await prisma.room.update({
      where: { id },
      data: {
        no_room: parseInt(no_room),
        monthly_price: parseFloat(monthly_price),
        status,
      },
    });

    return res.status(200).json({
      status: true,
      message: "Room successfully updated",
      data: updatedRoom,
    });
  } catch (error) {
    console.error("Error updating room:", error);
    next(error);
  }
}

module.exports = {
  getRooms,
  getUserRoom,
  addRoom,
  updateRoomStatus,
  getRoomById,
  editRoom,
};