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

    let data = {};
    try {
      data = await response.json();
    } catch { }


    if (!response.ok) {
      result.style.color = "red";
      result.innerText = data.message || "Login failed";
      return;
    }

    result.style.color = "green";
    result.innerText = "Login successful";

    // redirect after login
    if (data.role === "admin") {
      window.location.href = "admin-dashboard.html";
    } else {
      window.location.href = "dashboard.html";
    }


  } catch (error) {
    result.style.color = "red";
    result.innerText = "Server not reachable";
    console.error(error);
  }
});
