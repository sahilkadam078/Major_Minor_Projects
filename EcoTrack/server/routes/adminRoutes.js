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

    // Safety fallback
    reports = reports.map(r => ({
      ...r._doc,
      reportedBy: r.reportedBy || { name: "Unknown", email: "N/A" }
    }));

    res.json(reports);
  } catch (error) {
    console.error("ADMIN REPORT ERROR:", error);
    res.status(500).json({ message: "Failed to fetch reports" });
  }
});


/* -------------------- Admin: Update Report Status -------------------- */
router.put("/reports/:id", isLoggedIn, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const allowed = ["pending", "in-progress", "resolved"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.status = status;
    await report.save();

    res.json({ message: "Status updated successfully" });

  } catch (error) {
    console.error("ADMIN UPDATE ERROR:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
});

module.exports = router;