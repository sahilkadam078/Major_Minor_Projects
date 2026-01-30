const Report = require("../models/Report");

/* -------------------- Get All Reports (Admin) -------------------- */
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch reports" });
  }
};

/* -------------------- Update Report Status (Admin) -------------------- */
exports.updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.status = status;
    await report.save();

    res.json({
      message: "Report status updated successfully",
      report,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update report status" });
  }
};
