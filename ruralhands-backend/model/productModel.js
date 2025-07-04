const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    artist: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    badges: [{ type: String }],
    category: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    stockCount: { type: Number, required: true },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
