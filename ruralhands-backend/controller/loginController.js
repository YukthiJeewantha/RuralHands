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

