const { validationResult } = require("express-validator");
const Product = require("../models/Product");
const { v2: cloudinary } = require("cloudinary");
require("dotenv").config();

// Configuration
cloudinary.config({
  cloud_name: "dyhybhxyw",
  api_key: "112533765256748",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    if (!productDoc) {
      return res.status(404).json({
        isSuccess: false,
        message: "Product not found.",
      });
    }

    if (req.userId.toString() !== productDoc.seller.toString()) {
      throw new Error("Unauthorized");
    }

    if (productDoc.images && Array.isArray(productDoc.images)) {
      const deletePromise = productDoc.images.map((img) => {
        const publicId = img.substring(
          img.lastIndexOf("/") + 1,
          img.lastIndexOf(".")
        );
        return new Promise((resolve, reject) => {
          cloudinary.uploader.destroy(publicId, (err, result) => {
            if (err) {
              reject(new Error("Image Deletion Failed."));
            } else {
              resolve(result);
            }
          });
        });
      });

      await Promise.all(deletePromise);
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      isSuccess: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Product deletion error", error);
    return res.status(400).json({ isSuccess: false, message: error.message });
  }
};

// upload product image
exports.uploadProductImage = async (req, res) => {
  const productImages = req.files;
  const { product_id } = req.body;
  let secureUrlArray = [];

  try {
    productImages.forEach((img) => {
      cloudinary.uploader.upload(img.path, async (error, result) => {
        if (error) {
          throw new Error(error.message);
        }
        const url = result.secure_url;
        secureUrlArray.push(url);

        if (productImages.length === secureUrlArray.length) {
          await Product.findByIdAndUpdate(
            product_id,
            { $push: { images: secureUrlArray } },
            { new: true }
          );
          return res.status(200).json({
            isSuccess: true,
            message: "Product images uploaded successfully.",
            secureUrlArray,
          });
        }
      });
    });
  } catch (error) {
    console.log("Product deletion error", error);
    return res.status(400).json({ isSuccess: false, message: error.message });
  }
};
