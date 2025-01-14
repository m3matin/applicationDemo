const express = require("express");
const {
  registerUser,
  loginUser,
  validateToken,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/checkTokenValid", authMiddleware, validateToken);

module.exports = router;
