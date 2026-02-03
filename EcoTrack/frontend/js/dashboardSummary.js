document.addEventListener("DOMContentLoaded", async () => {
  const totalEl = document.getElementById("totalReports");
  const pendingEl = document.getElementById("pendingReports");
  const resolvedEl = document.getElementById("resolvedReports");

  try {
    const res = await fetch("http://localhost:5000/reports/my", {
      credentials: "include"
    });

    if (!res.ok) {
      console.error("Failed to fetch reports");
      return;
    }

    const reports = await res.json();

    const total = reports.length;
    const pending = reports.filter(r => r.status === "pending").length;
    const resolved = reports.filter(r => r.status === "resolved").length;

    totalEl.innerText = total;
    pendingEl.innerText = pending;
    resolvedEl.innerText = resolved;

  } catch (err) {
    console.error("Dashboard summary error:", err);
  }
});