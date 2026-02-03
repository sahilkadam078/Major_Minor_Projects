const User = require("../models/User");
const bcrypt = require("bcrypt");

/* -------------------- Signup -------------------- */
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password,
      role: "citizen"
    });

    await user.save();

    // ✅ AUTO LOGIN AFTER SIGNUP
    req.session.user = {
      id: user._id,
      role: user.role,
      name: user.name
    };

    res.status(201).json({
      message: "Signup successful",
      role: user.role
    });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({ message: "Signup failed" });
  }
};

/* -------------------- Login -------------------- */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash("error", "Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Save user in session
    req.session.user = {
      id: user._id,
      role: user.role,
      name: user.name,
    };

    req.flash("success", "Login successful");
    res.json({ message: "Login successful", role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

/* -------------------- Logout -------------------- */
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
};
