const form = document.getElementById("loginForm");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // 🔴 VERY IMPORTANT

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", // 🔴 REQUIRED for session
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      result.style.color = "red";
      result.innerText = data.message || "Login failed";
      return;
    }

    result.style.color = "green";
    result.innerText = "Login successful";

    // redirect after login
    setTimeout(() => {
      window.location.href = "report.html";
    }, 800);

  } catch (error) {
    result.style.color = "red";
    result.innerText = "Server not reachable";
    console.error(error);
  }
});
