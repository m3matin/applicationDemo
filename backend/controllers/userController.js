const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      status: "error",
      message:
        "Please fill in all required fields (name, email, and password).",
    });
  }

  try {
    // Checking if user already exists in DB
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        status: "error",
        message: "User already exists with this email.",
      });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      status: "success",
      message: "User registered successfully!",
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error, please try again later.",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Please provide both email and password.",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        status: "success",
        message: "Login successful!",
        user: {
          _id: user.id,
          name: user.name,
          email: user.email,
        },
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({
        status: "error",
        message: "Invalid email or password.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error, please try again later.",
      error: error.message,
    });
  }
};

const validateToken = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Token is valid, access granted.",
  });
};

module.exports = { registerUser, loginUser, validateToken };
