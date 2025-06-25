const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const upload = require("../middleware/cloudinaryUpload");

router.post("/", upload.single("image"), productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/seller/:sellerId", productController.getProductsBySeller);
router.delete("/:id", productController.deleteProduct);
router.patch("/:id", upload.single("image"), productController.updateProduct);

module.exports = router;
