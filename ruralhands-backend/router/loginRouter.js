const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController");

router.post("/register/seller", loginController.registerSeller);
router.post("/register/buyer", loginController.registerBuyer);
router.post("/login/seller", loginController.loginSeller);
router.post("/login/buyer", loginController.loginBuyer);
// router.get("/seller", loginController.getSellerProfile);
// router.get("/buyer", loginController.getBuyerProfile);

module.exports = router;