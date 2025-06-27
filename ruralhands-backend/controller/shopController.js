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

