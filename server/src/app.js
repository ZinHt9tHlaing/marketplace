const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const { connectDB } = require("./config/db");
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const {
  storageConfig,
  fileFilterConfig,
} = require("./middlewares/multer-storage");

const app = express();

// global middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(
  multer({ storage: storageConfig, fileFilter: fileFilterConfig }).array(
    "product_images"
  )
);

// routes
app.use("/auth", authRoutes);
app.use(productRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
