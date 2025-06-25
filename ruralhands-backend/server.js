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