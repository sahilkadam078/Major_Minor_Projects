const Report = require("../models/Report");

/* =========================================================
   CREATE NEW REPORT (Citizen)
   Route: POST /reports
========================================================= */
exports.createReport = async (req, res) => {
  try {
    const { description, location } = req.body;

    if (!description || !location) {
      return res.status(400).json({
        message: "Location and description are required"
      });
    }

    // If image uploaded, save its public path
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/reports/${req.file.filename}`;
    }

    const report = new Report({
      title: "Waste Issue Report",
      description,
      location,
      image: imagePath,                // ✅ local image path
      reportedBy: req.session.user.id
    });

    await report.save();

    res.status(201).json({
      message: "Report submitted successfully"
    });

  } catch (error) {
    console.error("REPORT CREATE ERROR:", error);
    res.status(500).json({
      message: "Failed to submit report"
    });
  }
};


/* =========================================================
   GET LOGGED-IN USER REPORTS (Citizen)
   Route: GET /reports/my
========================================================= */
exports.getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({
      reportedBy: req.session.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json(reports);

  } catch (error) {
    console.error("FETCH MY REPORTS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch reports"
    });
  }
};