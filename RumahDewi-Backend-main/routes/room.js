const express = require("express");
const { middleware, isAdmin } = require("../middleware/middleware");
const {
  getRooms,
  getUserRoom,
  addRoom,
  updateRoomStatus,
  getRoomById,
  editRoom,
} = require("../controllers/room.controller");

const router = express.Router();

// Public routes
router.get("/rooms", getRooms);


// Protected routes
router.get("/rooms/my", middleware, getUserRoom);
router.post("/rooms", middleware, isAdmin, addRoom);
router.put("/rooms/:id/status", middleware, isAdmin, updateRoomStatus);
router.get("/rooms/:id", getRoomById);
router.put("/rooms/:id", editRoom); 

module.exports = router;