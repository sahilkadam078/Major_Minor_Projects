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
      credentials: "include",   // IMPORTANT (session)
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      result.innerText = data.message || "Failed to submit report";
      return;
    }

    result.style.color = "green";
    result.innerText = "Report submitted successfully!";
    form.reset();

  } catch (error) {
    result.style.color = "red";
    result.innerText = "Server not reachable";
    console.error(error);
  }
});
