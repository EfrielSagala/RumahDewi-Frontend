// const express = require("express");
// const { middleware, isAdmin, isUser } = require("../middleware/middleware");
// const { getRooms, getUserRoom } = require("../controllers/room.controller");
// const router = express.Router();

// /* GET users listing. */
// router.get("/", getRooms);
// router.get("/my", middleware, isUser, getUserRoom);

// module.exports = router;
const express = require("express");
const { middleware, isAdmin, isUser } = require("../middleware/middleware");
const { getRooms, getUserRoom, addRoom, updateRoomStatus } = require("../controllers/room.controller");
const router = express.Router();

/* GET rooms */
router.get("/", getRooms);  // Mengambil semua kamar

/* GET user room */
router.get("/my", middleware, isUser, getUserRoom);  // Mengambil kamar yang dimiliki oleh pengguna yang terautentikasi

/* POST for adding a new room */
router.post("/", middleware, isAdmin, addRoom);  // Admin hanya yang bisa menambahkan kamar

/* PUT to update room status */
router.put("/:id/status", middleware, isAdmin, updateRoomStatus);  // Admin hanya yang bisa memperbarui status kamar

module.exports = router;

