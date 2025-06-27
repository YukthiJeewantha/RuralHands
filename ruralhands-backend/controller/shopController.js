const Shop = require("../model/Shop");

exports.createShop = async (req, res) => {
  try {
    const { name, address, phone, hours, locationUrl, seller } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    if (
      !name ||
      !address ||
      !phone ||
      !hours ||
      !imageUrl ||
      !locationUrl ||
      !seller
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required including seller" });
    }

    const newShop = new Shop({
      name,
      address,
      phone,
      hours,
      imageUrl,
      locationUrl,
      seller,
    });

    await newShop.save();
    res
      .status(201)
      .json({ message: "Shop created successfully", shop: newShop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find().sort({ createdAt: -1 });
    res.json(shops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ message: "Shop not found" });
    res.json(shop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteShop = async (req, res) => {
  try {
    const deletedShop = await Shop.findByIdAndDelete(req.params.id);
    if (!deletedShop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getShopsBySeller = async (req, res) => {
  try {
    const { sellerId } = req.params;

    if (!sellerId) {
      return res.status(400).json({ message: "Seller ID is required" });
    }

    const shops = await Shop.find({ seller: sellerId }).sort({ createdAt: -1 });

    res.status(200).json(shops);
  } catch (error) {
    console.error("Error fetching shops by seller:", error.message);
    res.status(500).json({ message: "Failed to fetch shops." });
  }
};
exports.updateShop = async (req, res) => {
  try {
    const shopId = req.params.id;
    const { name, address, phone, hours, locationUrl, seller } = req.body;

    // prepare update fields
    let updatedFields = {
      name,
      address,
      phone,
      hours,
      locationUrl,
      seller,
    };

    // Optional image update
    if (req.file) {
      updatedFields.imageUrl = req.file.path;
    }

    const updatedShop = await Shop.findByIdAndUpdate(shopId, updatedFields, {
      new: true, // returns updated document
    });

    if (!updatedShop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    res.status(200).json({
      message: "Shop updated successfully",
      shop: updatedShop,
    });
  } catch (error) {
    console.error("Update shop error:", error.message);
    res.status(500).json({ message: "Failed to update shop." });
  }
};
