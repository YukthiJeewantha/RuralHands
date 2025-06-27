// routes/orderRoutes.js
const express = require("express");
const router = express.Router();

const {
  updateStockAfterPayment,
  createOrder,
  getOrdersBySeller,
} = require("../controller/orderController");

router.post("/", createOrder);
router.post("/update-stock", updateStockAfterPayment);
router.get("/seller/:sellerId", getOrdersBySeller);

module.exports = router;
