const { validationResult } = require("express-validator");
const Product = require("../models/Product");

// create product
exports.addNewProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ isSuccess: false, message: errors.array()[0].msg });
  }

  const {
    product_name,
    product_description,
    product_price,
    product_category,
    product_used_for,
    product_details,
  } = req.body;

  try {
    const productDoc = await Product.create({
      name: product_name,
      description: product_description,
      price: product_price,
      category: product_category,
      usedFor: product_used_for,
      details: product_details,
      seller: req.userId,
    });

    await productDoc.save();

    res.status(201).json({
      isSuccess: true,
      message: "Product added successfully",
      productDoc,
    });
  } catch (error) {
    console.log("Product creation error", error);
    res.status(400).json({ isSuccess: false, message: error.message });
  }
};

// get all products
exports.getAllProducts = async (req, res) => {
  try {
    const productDocs = await Product.find({ seller: req.userId })
      .populate("seller")
      .sort({ createdAt: -1 });

    res.status(200).json({
      isSuccess: true,
      productDocs,
    });
  } catch (error) {
    console.log("Product creation error", error);
    res.status(400).json({ isSuccess: false, message: error.message });
  }
};

// get old product
exports.getOldProduct = async (req, res) => {
  try {
    const productDoc = await Product.findOne({ _id: req.params.id })
      .populate("seller")
      .sort({ createdAt: -1 });

    if (!productDoc) {
      throw new Error("Product not found");
    }

    res.status(200).json({
      isSuccess: true,
      productDoc,
    });
  } catch (error) {
    console.log("Product creation error", error);
    res.status(400).json({ isSuccess: false, message: error.message });
  }
};

// update product
exports.updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ isSuccess: false, message: errors.array()[0].msg });
  }

  try {
    const {
      product_name,
      product_description,
      product_price,
      product_category,
      product_used_for,
      product_details,
      seller_id,
      product_id,
    } = req.body;

    if (req.userId.toString() !== seller_id) {
      throw new Error("Unauthorized");
    }

    const productDoc = await Product.findOneAndUpdate(
      { _id: product_id },
      {
        name: product_name,
        description: product_description,
        price: product_price,
        category: product_category,
        usedFor: product_used_for,
        details: product_details,
      },
      { new: true }
    );

    res.status(200).json({
      isSuccess: true,
      message: "Product updated successfully",
      productDoc,
    });
  } catch (error) {
    console.log("Product update process error", error);
    res.status(400).json({ isSuccess: false, message: error.message });
  }
};

// delete product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productDoc = await Product.findOne({ _id: id });

    if (req.userId.toString() !== productDoc.seller.toString()) {
      throw new Error("Unauthorized");
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({
      isSuccess: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Product deletion error", error);
    res.status(400).json({ isSuccess: false, message: error.message });
  }
};

// upload product image
exports.uploadProductImage = async (req, res) => {
  try {
    const files = req.files;
    console.log("files", files);

    res.status(200).json({ isSuccess: true, message: "Image uploaded", files });
  } catch (error) {
    console.log("Product deletion error", error);
    res.status(400).json({ isSuccess: false, message: error.message });
  }
};
