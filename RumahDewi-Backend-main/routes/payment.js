const express = require("express");
const { middleware, isAdmin } = require("../middleware/middleware");
const { rentRoom, addPayment, getPayments, getMyPayments, uploadPayment, changeStatusPayment } = require("../controllers/payment.controller");
const router = express.Router();

/* GET users listing. */
router.post("/", middleware, addPayment);
router.post("/rent", middleware, rentRoom);
router.put("/:id/upload", middleware, uploadPayment);
router.put("/:id/status", middleware, isAdmin, changeStatusPayment);
router.get("/", middleware, isAdmin, getPayments);
router.get("/my", middleware, getMyPayments);

module.exports = router;
