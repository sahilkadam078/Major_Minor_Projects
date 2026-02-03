const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

/* -------------------- Auth Routes -------------------- */

// Signup (Citizen)
router.post("/signup", authController.signup);

// Login (Citizen / Admin)
router.post("/login", authController.login);

// Logout
router.post("/logout", authController.logout);

router.get("/dev-create-user", async (req, res) => {
  const bcrypt = require("bcrypt");
  const User = require("../models/User");

  const hashedPassword = await bcrypt.hash("123456", 10);

  const user = await User.create({
    name: "Test Citizen",
    email: "citizen@ecotrack.com",
    password: hashedPassword,
    role: "citizen"
  });

  res.json({
    message: "Dev user created",
    email: "citizen@ecotrack.com",
    password: "123456"
  });
});


// Check logged-in user (for frontend)
router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  res.json(req.session.user);
});


module.exports = router;

router.get("/dev-create-user", async (req, res) => {
  const bcrypt = require("bcrypt");
  const User = require("../models/User");

  const hashedPassword = await bcrypt.hash("123456", 10);

  const user = await User.create({
    name: "Test Citizen",
    email: "citizen@ecotrack.com",
    password: hashedPassword,
    role: "citizen"
  });

  res.json({
    message: "Dev user created",
    email: "citizen@ecotrack.com",
    password: "123456"
  });
});
