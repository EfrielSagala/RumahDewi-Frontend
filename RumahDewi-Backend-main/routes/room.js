// const express = require("express");
// const { middleware, isAdmin, isUser } = require("../middleware/middleware");
// const { getRooms, getUserRoom } = require("../controllers/room.controller");
// const router = express.Router();

// /* GET users listing. */
// router.get("/", getRooms);
// router.get("/my", middleware, isUser, getUserRoom);

// module.exports = router;


const express = require("express");
const { middleware, isAdmin } = require("../middleware/middleware");
const { getRooms, getUserRoom, addRoom } = require("../controllers/room.controller");
const router = express.Router();

router.get("/", getRooms);  
router.get("/my", middleware, getUserRoom);  
router.post("/rooms", middleware, isAdmin, addRoom);
router.put("/:id/status", middleware, isAdmin);  

module.exports = router;
        