const express = require("express");
const cors = require("cors");
const connection = require("./utils/connection.js");
const authRoutes = require("./routes/authRoutes");
const errorMiddleware = require("./middleware/error.js");
const productRoutes = require("./routes/productRoutes");
const roleRoutes = require("./routes/roleRoutes");
const profileRoutes = require("./routes/profileRoutes");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE", 
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

// Make Connection
connection();

//Route
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/roles", roleRoutes);
app.use("/api/v1/profile", profileRoutes);

//Error Handler Middleware
app.use(errorMiddleware);

module.exports = app;
