const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {
  addNewProduct,
  getAllProducts,
  getOldProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  getProductSavedImages,
  deleteProductImages,
} = require("../controllers/productController");

// create product
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

// get all products
router.get("/get-all-products", authMiddleware, getAllProducts);

// get old product
router.get("/get-old-product/:id", authMiddleware, getOldProduct);

// update product
router.put(
  "/update-product",
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
  updateProduct
);

// delete product
router.delete("/delete-product/:id", authMiddleware, deleteProduct);

// upload product image
router.post("/upload-product-image", authMiddleware, uploadProductImage);

// get product saved images
router.get(
  "/get-product-saved-images/:id",
  authMiddleware,
  getProductSavedImages
);

// delete product images
router.delete(
  "/delete-product-images/:productId/:imgToDelete",
  authMiddleware,
  deleteProductImages
);

module.exports = router;
