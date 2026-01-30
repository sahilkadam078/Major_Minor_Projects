const express = require("express");
const router = express.Router();

const announcementController = require("../controllers/announcementController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const isAdmin = require("../middlewares/isAdmin");

/* -------------------- Announcement Routes -------------------- */

// Admin creates announcement
router.post(
  "/",
  isLoggedIn,
  isAdmin,
  announcementController.createAnnouncement
);

// Citizens view announcements
router.get(
  "/",
  announcementController.getAllAnnouncements
);

module.exports = router;
