const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const shopController = require("../controller/shopController");

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "shopImages",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });
router.post("/", upload.single("image"), shopController.createShop);
router.get("/", shopController.getAllShops);
router.get("/:id", shopController.getShopById);
router.get("/seller/:sellerId", shopController.getShopsBySeller);
router.patch("/:id", upload.single("image"), shopController.updateShop);
router.delete("/:id", shopController.deleteShop);

module.exports = router;
