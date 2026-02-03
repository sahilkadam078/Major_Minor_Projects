document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        credentials: "include"
      });

      window.location.href = "index.html";
    } catch (err) {
      alert("Logout failed");
    }
  });
});