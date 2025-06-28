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

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found." });
    res.status(200).json(product);
  } catch (error) {
    console.error("Get Product By ID Error:", error.message);
    res.status(500).json({ message: "Failed to fetch product." });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Product not found." });
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Delete Product Error:", error.message);
    res.status(500).json({ message: "Failed to delete product." });
  }
};

exports.updateProduct = async (req, res) => {
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
    } = req.body;

    const productId = req.params.id;
    let updatedFields = {
      name,
      artist,
      price,
      category,
      description,
      stockCount,
    };

    if (badges) {
      updatedFields.badges = JSON.parse(badges);
    }

    if (features) {
      updatedFields.features = JSON.parse(features);
    }

    // Optional: Handle image update via Cloudinary if file sent
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      updatedFields.imageUrl = result.secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedFields,
      { new: true } // return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update Product Error:", error.message);
    res.status(500).json({ message: "Failed to update product." });
  }
};
