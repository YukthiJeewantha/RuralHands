require("dotenv").config();
const Seller = require("../model/Seller");
const Buyer = require("../model/Buyer");
const bcrypt = require("bcrypt");

exports.registerSeller = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Check if email already exists (optional but recommended)
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new Seller({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const savedSeller = await newSeller.save();

    // Respond with saved seller including _id
    res.status(201).json(savedSeller); // make sure this sends _id
  } catch (error) {
    console.error("Seller registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.registerBuyer = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const existingBuyer = await Buyer.findOne({ email });
    if (existingBuyer) {
      return res.status(400).json({ message: "Buyer already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newBuyer = new Buyer({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    await newBuyer.save();
    res.status(201).json({ message: "Buyer registered successfully" });
  } catch (error) {
    console.error("Error registering buyer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
