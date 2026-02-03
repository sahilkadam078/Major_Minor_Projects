const container = document.getElementById("adminReports");
let allReports = [];

async function loadAllReports() {
  try {
    const res = await fetch("/admin/reports", {
      credentials: "include"
    });

    if (!res.ok) {
      container.innerHTML = "<p>Access denied</p>";
      return;
    }

    allReports = await res.json();
    renderReports(allReports);

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Server error</p>";
  }
}

function renderReports(reports) {
  container.innerHTML = "";

  if (reports.length === 0) {
    container.innerHTML = "<p>No reports found</p>";
    return;
  }

  reports.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
  <h3>${r.title}</h3>
  <p><b>Citizen:</b> ${r.reportedBy?.name || "Unknown"}</p>
  <p><b>Email:</b> ${r.reportedBy?.email || "N/A"}</p>
  <p><b>Location:</b> ${r.location}</p>
  <p><b>Description:</b> ${r.description}</p>

  <label><b>Status:</b></label>
  <select id="status-${r._id}">
    <option value="pending" ${r.status === "pending" ? "selected" : ""}>Pending</option>
    <option value="in-progress" ${r.status === "in-progress" ? "selected" : ""}>In Progress</option>
    <option value="resolved" ${r.status === "resolved" ? "selected" : ""}>Resolved</option>
  </select>

  <button onclick="updateStatus('${r._id}')">Update</button>
`;

    container.appendChild(card);
  });
}

function filterReports(status) {
  const filtered = allReports.filter(r => r.status === status);
  renderReports(filtered);
}

loadAllReports();
async function updateStatus(reportId) {
  const status = document.getElementById(`status-${reportId}`).value;

  try {
    const res = await fetch(`/admin/reports/${reportId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ status })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to update status");
      return;
    }

    alert("Status updated successfully");
    loadAllReports(); // refresh UI

  } catch (err) {
    alert("Server error");
  }
}