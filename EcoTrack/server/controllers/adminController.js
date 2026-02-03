const Report = require("../models/Report");

/* =========================================================
   ADMIN: GET ALL REPORTS
   Route: GET /admin/reports
   Access: Admin only
========================================================= */
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    console.error("ADMIN GET REPORTS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch reports",
    });
  }
};


/* =========================================================
   ADMIN: UPDATE REPORT STATUS
   Route: PUT /admin/reports/:id
   Access: Admin only
========================================================= */
exports.updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // validate status
    const allowedStatus = ["pending", "in-progress", "resolved"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value",
      });
    }

    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    report.status = status;
    await report.save();

    res.status(200).json({
      message: "Report status updated successfully",
      report,
    });

  } catch (error) {
    console.error("ADMIN UPDATE STATUS ERROR:", error);
    res.status(500).json({
      message: "Failed to update report status",
    });
  }
};