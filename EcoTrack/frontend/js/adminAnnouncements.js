const form = document.getElementById("announcementForm");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  try {
    const response = await fetch("http://localhost:5000/announcements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ title, content })
    });

    const data = await response.json();

    if (!response.ok) {
      result.innerText = data.message || "Error posting announcement";
      return;
    }

    result.innerText = "Announcement posted successfully!";
    form.reset();

  } catch (error) {
    result.innerText = "Server not reachable";
    console.error(error);
  }
});
