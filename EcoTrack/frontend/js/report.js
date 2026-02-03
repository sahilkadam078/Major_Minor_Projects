const form = document.getElementById("reportForm");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const description = document.getElementById("description").value;
  const location = document.getElementById("location").value;
  const image = document.getElementById("image").files[0];

  const formData = new FormData();
  formData.append("description", description);
  formData.append("location", location);

  if (image) {
    formData.append("image", image);
  }

  try {
    const response = await fetch("http://localhost:5000/reports", {
      method: "POST",
      credentials: "include", // session cookie
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      result.style.color = "red";
      result.innerText = data.message || "Failed to submit report";
      return;
    }

    // ✅ SUCCESS
    result.style.color = "green";
    result.innerText = "Report submitted successfully! Redirecting...";

    // ✅ REDIRECT TO MY REPORTS
    setTimeout(() => {
      window.location.href = "my-reports.html";
    }, 1200);

  } catch (error) {
    console.error(error);
    result.style.color = "red";
    result.innerText = "Server not reachable";
  }
});