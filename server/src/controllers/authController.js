const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ isSuccess: false, message: errors.array()[0].msg });
  }

  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "All fields are required" });
    }

    // Check if user already exists
    const userDoc = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (userDoc) {
      return res
        .status(409)
        .json({ isSuccess: false, message: "User already exists" });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res
      .status(201)
      .json({ isSuccess: true, message: "User registered successfully", user });
  } catch (error) {
    console.log("Registration error", error);
    res.status(500).json({ isSuccess: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ isSuccess: false, message: errors.array()[0].msg });
  }

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "All fields are required" });
    }

    // Check if user exists
    const userDoc = await User.findOne({
      email,
    });

    if (!userDoc) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "User does not exist" });
    }

    // Check if password is correct
    const isMatch = bcrypt.compareSync(password, userDoc.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ isSuccess: false, message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      {
        userId: userDoc._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .status(200)
      .json({ isSuccess: true, message: "Login successful", token });
  } catch (error) {
    console.log("Login error", error);
    res.status(401).json({ isSuccess: false, message: error.message });
  }
};

exports.checkCurrentUser = async (req, res) => {
  try {
    const userDoc = await User.findById(req.userId).select("-password");
    if (!userDoc) {
      throw new Error("Unauthorized User");
    }

    res
      .status(200)
      .json({ isSuccess: true, message: "User is authorized", userDoc });
  } catch (error) {
    console.log("error", error);
    res.status(401).json({ isSuccess: false, message: error.message });
  }
};
