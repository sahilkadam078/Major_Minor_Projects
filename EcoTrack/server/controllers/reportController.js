const Report = require("../models/Report");

/* -------------------- Create New Report -------------------- */
exports.createReport = async (req, res) => {
  try {
    const { description, location } = req.body;

    // Temporary title (can be made dynamic later)
    const title = "Waste Issue Report";

    const imageUrl = req.file ? req.file.path : null;

    const report = new Report({
      title,                       // required by schema
      description,
      location,
      image: imageUrl,
      reportedBy: req.session.user.id // required by schema
    });

    await report.save();

    res.status(201).json({
      message: "Report submitted successfully"
    });

  } catch (error) {
    console.error("REPORT ERROR:", error);
    res.status(500).json({
      message: "Failed to submit report"
    });
  }
};


/* -------------------- Get My Reports -------------------- */
exports.getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({
      reportedBy: req.session.user.id
    }).sort({ createdAt: -1 });

    res.status(200).json(reports);

  } catch (error) {
    console.error("FETCH REPORTS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch reports"
    });
  }
};
