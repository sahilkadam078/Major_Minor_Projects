const container = document.getElementById("reportsContainer");

async function loadMyReports() {
  try {
    const response = await fetch("/reports/my", {
      credentials: "include"
    });

    if (!response.ok) {
      container.innerHTML = "<p>Failed to load reports</p>";
      return;
    }

    const reports = await response.json();

    if (reports.length === 0) {
      container.innerHTML = "<p>No reports submitted yet.</p>";
      return;
    }

    container.innerHTML = "";

    reports.forEach(r => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${r.title}</h3>
        <p><strong>Location:</strong> ${r.location}</p>
        <p><strong>Description:</strong> ${r.description}</p>

        <p>
          <strong>Status:</strong>
          <span class="badge ${r.status}">
            ${r.status.toUpperCase()}
          </span>
        </p>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Server error</p>";
  }
}

loadMyReports();