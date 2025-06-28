const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { addNewProduct } = require("../controllers/productController");

router.post(
  "/create-product",
  authMiddleware,
  [
    body("product_name")
      .trim()
      .notEmpty()
      .withMessage("Product Name is required"),
    body("product_description")
      .trim()
      .notEmpty()
      .withMessage("Product Description is required"),
    body("product_price")
      .trim()
      .notEmpty()
      .withMessage("Product Price is required"),
    body("product_category")
      .trim()
      .notEmpty()
      .withMessage("Product Category is required"),
    body("product_used_for")
      .trim()
      .notEmpty()
      .withMessage("Product usedFor is required"),
    body("product_details").isArray().withMessage("Product Details must array"),
  ],
  addNewProduct
);

module.exports = router;
