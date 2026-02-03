document.addEventListener("DOMContentLoaded", async () => {
  const reportBtn = document.getElementById("reportBtn");
  if (!reportBtn) return;

  try {
    const res = await fetch("http://localhost:5000/auth/me", {
      credentials: "include"
    });

    if (!res.ok) {
      // not logged in → redirect to login
      reportBtn.href = "login.html";
      return;
    }

    // logged in → allow report page
    reportBtn.href = "report.html";

  } catch (err) {
    // fallback: login
    reportBtn.href = "login.html";
  }
});