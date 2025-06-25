const Product = require("../model/productModel");
const cloudinary = require("../config/cloudinary");

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      artist,
      price,
      badges,
      category,
      description,
      features,
      stockCount,
      sellerId,
    } = req.body;

    if (!sellerId) {
      return res.status(400).json({ message: "Seller ID is required" });
    }

    let imageUrl = "";

    // Upload image to Cloudinary if file exists
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products", // optional folder in Cloudinary
      });
      imageUrl = result.secure_url;
    }

    const newProduct = new Product({
      name,
      artist,
      price,
      imageUrl,
      badges: JSON.parse(badges || "[]"),
      category,
      description,
      features: JSON.parse(features || "[]"),
      stockCount,
      seller: sellerId,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Create Product Error:", error.message);
    res.status(500).json({ message: "Failed to create product." });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Get Products Error:", error.message);
    res.status(500).json({ message: "Failed to fetch products." });
  }
};
exports.getProductsBySeller = async (req, res) => {
  try {
    const { sellerId } = req.params;

    if (!sellerId) {
      return res.status(400).json({ message: "Seller ID is required" });
    }

    const products = await Product.find({ seller: sellerId }).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Get Seller Products Error:", error.message);
    res.status(500).json({ message: "Failed to fetch seller products." });
  }
};

