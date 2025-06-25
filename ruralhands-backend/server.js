// server.js

require("dotenv").config();
const express = require("express");
const shopRouter = require("./router/shopRoutes");
const cors = require("cors");
const mongoose = require("mongoose");