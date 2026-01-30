const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const upload = require("../middlewares/upload");

/* -------------------- Report Routes (Citizen) -------------------- */

// Create new waste report (with image)
router.post(
  "/",
  isLoggedIn,
  upload.single("image"),
  reportController.createReport
);

// Get logged-in user's reports
router.get("/my", isLoggedIn, reportController.getMyReports);

module.exports = router;
