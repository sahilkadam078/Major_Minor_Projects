const container = document.getElementById("adminReports");

async function loadAllReports() {
  try {
    const response = await fetch("/admin/reports", {
      credentials: "include"
    });

    if (!response.ok) {
      const err = await response.json();
      container.innerHTML = `<p>${err.message || "Server error"}</p>`;
      return;
    }


    const reports = await response.json();
    container.innerHTML = "";

    reports.forEach(r => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${r.title}</h3>
        <p><b>Citizen:</b> ${r.reportedBy?.name || "Unknown"}</p>
        <p><b>Email:</b> ${r.reportedBy?.email || "N/A"}</p>
        <p><b>Location:</b> ${r.location}</p>
        <p><b>Description:</b> ${r.description}</p>
        <p><b>Status:</b> ${r.status}</p>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Server error</p>";
  }
}

loadAllReports();
