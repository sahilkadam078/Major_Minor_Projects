const Announcement = require("../models/Announcement");

/* -------------------- Create Announcement (Admin) -------------------- */
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message } = req.body;

    const announcement = await Announcement.create({
      title,
      message,
      createdBy: req.session.user.id,
    });

    res.status(201).json({
      message: "Announcement created successfully",
      announcement,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create announcement" });
  }
};

/* -------------------- Get All Announcements (Citizen) -------------------- */
exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ createdAt: -1 });

    res.json(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch announcements" });
  }
};
