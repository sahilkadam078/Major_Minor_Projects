const form = document.getElementById("signupForm");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        password,
        role: "citizen"   // 🔒 fixed role
      })
    });

    const data = await response.json();

    if (!response.ok) {
      result.style.color = "red";
      result.innerText = data.message || "Signup failed";
      return;
    }

    result.style.color = "green";
    result.innerText = "Signup successful. Redirecting to login...";

    setTimeout(() => {
      if (data.role === "admin") {
        window.location.href = "admin-dashboard.html";
      } else {
        window.location.href = "dashboard.html";
      }
    }, 1500);

  } catch (error) {
    console.error(error);
    result.style.color = "red";
    result.innerText = "Server not reachable";
  }
});