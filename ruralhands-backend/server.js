// server.js

require("dotenv").config();
const express = require("express");
const shopRouter = require("./router/shopRoutes");
const cors = require("cors");
const mongoose = require("mongoose");

// Import route modules
const Log = require("./router/loginRouter");
const ProductRouter = require("./router/productRoutes");
const orderRoutes = require("./router/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/shopImages", express.static("shopImages"));

// Routes
app.use("/api", Log);
app.use("/api/products", ProductRouter);
app.use("/api/shops", shopRouter);
app.use("/api/orders", orderRoutes);

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
