async function protectPage(requiredRole = null) {
  try {
    const res = await fetch("http://localhost:5000/auth/me", {
      credentials: "include"
    });

    if (!res.ok) {
      window.location.href = "/login.html";
      return;
    }

    const user = await res.json();

    // Optional role check
    if (requiredRole && user.role !== requiredRole) {
      window.location.href = "/login.html";
    }

  } catch (error) {
    window.location.href = "/login.html";
  }
}
