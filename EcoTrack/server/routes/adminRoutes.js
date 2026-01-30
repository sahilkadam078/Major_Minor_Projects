const express = require("express");
const router = express.Router();

const Report = require("../models/Report");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");

/* -------------------- Admin: Get All Reports -------------------- */
router.get("/reports", isLoggedIn, isAdmin, async (req, res) => {
  try {
    let reports = await Report.find()
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    // SAFETY: handle broken populate
    reports = reports.map(r => ({
      ...r._doc,
      reportedBy: r.reportedBy || { name: "Unknown", email: "N/A" }
    }));

    res.json(reports);

  } catch (error) {
    console.error("ADMIN REPORT ERROR:", error);

    // FALLBACK: return without populate
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  }
});

module.exports = router;
