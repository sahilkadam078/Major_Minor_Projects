/* ============================
   EcoTrack | Smart Waste Portal
   Author: Sahil Kadam
   ============================ */

// --- Navbar Scroll Effect ---
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.style.backgroundColor = "#f1f5f9";
    header.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
  } else {
    header.style.backgroundColor = "#ffffff";
    header.style.boxShadow = "none";
  }
});

// --- Awareness Tips Rotator ---
const tips = [
  "Reduce, Reuse, Recycle – start small, think big!",
  "Composting kitchen waste reduces landfill pressure.",
  "Segregate dry and wet waste daily.",
  "Say no to single-use plastics!",
  "Clean city, green future – let’s make it happen!"
];

let tipIndex = 0;
const tipDisplay = document.createElement("div");
tipDisplay.classList.add("tip-rotator");
tipDisplay.textContent = tips[0];
document.querySelector(".awareness").appendChild(tipDisplay);

setInterval(() => {
  tipIndex = (tipIndex + 1) % tips.length;
  tipDisplay.textContent = tips[tipIndex];
}, 4000);

// --- Chart.js Waste Analytics (Demo Data) ---
const ctx = document.getElementById("wasteChart").getContext("2d");

const wasteChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Recycled Waste", "Organic Waste", "Non-Recycled"],
    datasets: [
      {
        label: "City Waste Data",
        data: [45, 35, 20],
        backgroundColor: ["#16a34a", "#38bdf8", "#f59e0b"],
        borderWidth: 2,
        borderColor: "#ffffff"
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#1e293b" }
      },
      title: {
        display: true,
        text: "Waste Segregation Data (Demo)",
        color: "#1e293b",
        font: { size: 16 }
      }
    }
  }
});

// --- Simulated Report Submission Popup ---
function showPopup() {
  alert("✅ Report Submitted Successfully! Thank you for contributing to a cleaner city.");
}
