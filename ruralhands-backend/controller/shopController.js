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

