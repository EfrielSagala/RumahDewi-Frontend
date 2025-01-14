const { PrismaClient, USER_STATUS, ROOM_STATUS } = require("@prisma/client");
const prisma = new PrismaClient();

exports.checkRooms = async (req) => {
  try {
    // Jika permintaan untuk mengubah status kamar secara manual
    if (req.body && req.body.manualUpdate) {
      const { id, status } = req.body;

      // Validasi input
      if (!id || !status) {
        return {
          status: false,
          message: "ID kamar dan status baru wajib diisi",
        };
      }

      const validStatuses = Object.values(ROOM_STATUS);
      if (!validStatuses.includes(status)) {
        return {
          status: false,
          message: "Status tidak valid",
        };
      }

      // Perbarui status kamar
      const updatedRoom = await prisma.room.update({
        where: { id },
        data: { status },
      });

      return {
        status: true,
        message: "Status kamar berhasil diperbarui",
        data: updatedRoom,
      };
    }

    // Jika tidak ada permintaan manual, jalankan logika otomatis
    const rooms = await prisma.room.findMany({
      include: {
        user: true,
      },
    });

    for await (let room of rooms) {
      if (room.status === ROOM_STATUS.TERSEDIA) {
        continue;
      }

      if (room.status === ROOM_STATUS.DIPESAN) {
        const payment = await prisma.payment.findFirst({
          where: {
            status: "MENUNGGU",
          },
        });

        if (payment.payment_image) {
          continue;
        }

        const paymentDate = new Date(payment.createdAt);
        paymentDate.setDate(paymentDate.getDate() + 1);

        if (paymentDate < new Date()) {
          const [paymentRes, roomRes] = await Promise.all([
            prisma.payment.update({
              where: {
                id: payment.id,
              },
              data: {
                status: "DITOLAK",
              },
            }),
            prisma.room.update({
              where: {
                id: room.id,
              },
              data: {
                status: "TERSEDIA",
                user_id: null,
              },
            }),
          ]);

          continue;
        }

        continue;
      }

      const due_date = new Date(room.user.due_date);
      const extendDays = room.user.status === USER_STATUS.BARU ? 1 : 2;
      due_date.setDate(due_date.getDate() + extendDays);
      if (due_date < new Date()) {
        const [roomRes] = await Promise.all([
          prisma.room.update({
            where: {
              id: room.id,
            },
            data: {
              status: "TERSEDIA",
              user_id: null,
            },
          }),
        ]);
        continue;
      }
      continue;
    }

    return { status: true, message: "Pemeriksaan kamar selesai" };
  } catch (e) {
    console.error("Error in checkRooms:", e);
    return { status: false, message: "Terjadi kesalahan", error: e.message };
  }
};
