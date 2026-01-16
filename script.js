// =========================
// Global Configuration
// =========================
const labels10 = ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10"];

// =========================
// GLOBAL LABELS (40 points)
// =========================
const labels40 = Array.from({ length: 40 }, (_, i) => `B${i + 1}`);

// =========================
// =========================
// =========================
// SPC X-Bar Chart (80 points FIXED)
// =========================
const labels80 = Array.from({ length: 80 }, (_, i) => `B${i + 1}`);

const measurement80 = [
  10.2, 10.5, 9.8, 10.1, 10.9, 10.3, 9.7, 10.2, 10.1, 10.4, 10.3, 10.6, 9.9,
  10.0, 10.8, 10.4, 9.8, 10.3, 10.2, 10.5, 10.1, 10.4, 9.7, 10.2, 10.6, 10.3,
  9.9, 10.1, 10.4, 10.5, 10.2, 10.6, 9.8, 10.0, 10.7, 10.3, 9.9, 10.2, 10.4,
  10.6, 10.3, 10.7, 9.9, 10.1, 10.8, 10.5, 9.8, 10.4, 10.3, 10.6, 10.2, 10.5,
  9.7, 10.0, 10.9, 10.4, 9.8, 10.3, 10.2, 10.5, 10.1, 10.4, 9.9, 10.2, 10.6,
  10.3, 9.8, 10.1, 10.4, 10.6, 10.3, 10.5, 9.9, 10.2, 10.7, 10.4, 9.8, 10.3,
]; // ← EXACTLY 80 values

const spcCtx = document.getElementById("chart1").getContext("2d");
new Chart(spcCtx, {
  type: "line",
  data: {
    labels: labels80,
    datasets: [
      {
        label: "Measurement",
        data: measurement80,
        borderColor: "#3498db",
        tension: 0.1,
      },
      {
        label: "UCL",
        data: Array(80).fill(11),
        borderColor: "white",
        borderDash: [2, 2],
        pointRadius: 0,
      },
      {
        label: "LCL",
        data: Array(80).fill(9),
        borderColor: "white",
        borderDash: [2, 2],
        pointRadius: 0,
      },
    ],
  },
  options: {
    plugins: { legend: { display: false } },
  },
});

// =========================
// 2. Pareto Chart
// =========================
new Chart(document.getElementById("chart2"), {
  type: "bar",
  data: {
    labels: labels40,
    datasets: [
      {
        data: Array.from({ length: 40 }, () => Math.floor(Math.random() * 50)),
        backgroundColor: "#e67e22",
      },
    ],
  },
  options: { plugins: { legend: { display: false } } },
});

// =========================
// 3. CpK Chart
// =========================
new Chart(document.getElementById("chart3"), {
  type: "bar",
  data: {
    labels: labels40,
    datasets: [
      {
        data: Array.from({ length: 40 }, () => +(1 + Math.random()).toFixed(2)),
        backgroundColor: "#27ae60",
      },
    ],
  },
  options: {
    indexAxis: "y",
    scales: { x: { max: 2 } },
    plugins: { legend: { display: false } },
  },
});

// =========================
// 4. Defect Distribution (3 parts ONLY)
// =========================
new Chart(document.getElementById("chart4"), {
  type: "doughnut",
  data: {
    labels: ["Pass", "Rework", "Scrap"],
    datasets: [
      {
        data: [85, 10, 5],
        backgroundColor: ["#2ecc71", "#f1c40f", "#e74c3c"],
      },
    ],
  },
  options: { plugins: { legend: { display: false } } },
});

// =========================
// 5. R-Chart
// =========================
new Chart(document.getElementById("chart5"), {
  type: "line",
  data: {
    labels: labels40,
    datasets: [
      {
        data: Array.from(
          { length: 40 },
          () => +(Math.random() * 0.5).toFixed(2)
        ),
        borderColor: "#9b59b6",
      },
    ],
  },
  options: { plugins: { legend: { display: false } } },
});

// =========================
// 6. Sigma Levels (3 parts ONLY)
// =========================
new Chart(document.getElementById("chart6"), {
  type: "polarArea",
  data: {
    labels: ["Line 1", "Line 2", "Line 3"],
    datasets: [
      {
        data: [4.2, 3.8, 5.1],
        backgroundColor: ["#485e34", "#8a8d7f", "#d7ff68"],
        borderColor: "#2e2e2e",
      },
    ],
  },
  options: { plugins: { legend: { display: false } } },
});

// =========================
// 7. Production Trend
// =========================
new Chart(document.getElementById("chart7"), {
  type: "line",
  data: {
    labels: labels40,
    datasets: [
      {
        data: Array.from({ length: 40 }, () =>
          Math.floor(400 + Math.random() * 500)
        ),
        fill: true,
        borderColor: "#3498db",
        backgroundColor: "rgba(52,152,219,0.1)",
      },
    ],
  },
  options: { plugins: { legend: { display: false } } },
});

// =========================
// Chart Focus Interaction
// =========================
const overlay = document.getElementById("chart-focus-overlay");
const focusMain = document.querySelector(".chart-focus-main");
const focusTitle = document.getElementById("focus-title");
const closeBtn = document.querySelector(".close-focus");

document.querySelectorAll(".chart-container").forEach((chart) => {
  chart.addEventListener("click", () => {
    // Clone chart
    const clone = chart.cloneNode(true);
    focusMain.innerHTML = "";
    focusMain.appendChild(clone);

    // Title
    const title = chart.querySelector("h3");
    focusTitle.textContent = title ? title.textContent : "Chart Details";

    // Blur dashboard (except nav & footer)
    document.querySelector(".main-container").classList.add("blur-dashboard");

    overlay.classList.add("active");
  });
});

closeBtn.addEventListener("click", () => {
  overlay.classList.remove("active");
  document.querySelector(".main-container").classList.remove("blur-dashboard");
});

// =========================
// FIX: Chart rendering in focus mode
// =========================

document.querySelectorAll(".chart-container").forEach((chart) => {
  chart.addEventListener("click", () => {
    focusMain.innerHTML = "";

    const canvas = chart.querySelector("canvas");

    if (canvas) {
      // Convert chart canvas to image
      const img = document.createElement("img");
      img.src = canvas.toDataURL("image/png");
      img.style.maxWidth = "100%";
      img.style.maxHeight = "100%";
      focusMain.appendChild(img);
    }

    // Title
    const title = chart.querySelector("h3");
    focusTitle.textContent = title ? title.textContent : "Chart Details";

    // Blur background
    document.querySelector(".main-container").classList.add("blur-dashboard");

    overlay.classList.add("active");
  });
});

// =========================
// Live "Click to View" Label
// =========================
document.querySelectorAll(".chart-container").forEach((chart) => {
  const liveHint = document.createElement("div");
  liveHint.className = "chart-live-hint";
  liveHint.textContent = "Click to view";

  chart.appendChild(liveHint);
});

// =========================
// Weekday Range Label
// =========================

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Find the Batch Day range input
document
  .querySelectorAll(".filter-group input[type='range']")
  .forEach((range) => {
    const hint = range.parentElement.querySelector(".filter-hint");

    // Only apply to 1–7 weekday slider
    if (range.min === "1" && range.max === "7") {
      // Set initial label
      hint.textContent = `Selected: ${weekDays[range.value - 1]}`;

      range.addEventListener("input", () => {
        hint.textContent = `Selected: ${weekDays[range.value - 1]}`;
      });
    }
  });

// =========================
// QC DATA MODEL
// =========================

const QC_DATA = {};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const lines = ["Line A", "Line B", "Line C"];
const shifts = ["Day Shift", "Night Shift"];

days.forEach((day) => {
  QC_DATA[day] = {};
  lines.forEach((line) => {
    QC_DATA[day][line] = {};
    shifts.forEach((shift) => {
      QC_DATA[day][line][shift] = {
        spc: Array.from(
          { length: 10 },
          () => +(9.5 + Math.random() * 1.5).toFixed(2)
        ),
        pareto: [
          Math.floor(Math.random() * 50),
          Math.floor(Math.random() * 40),
          Math.floor(Math.random() * 30),
          Math.floor(Math.random() * 20),
          Math.floor(Math.random() * 10),
        ],
        cpk: +(1 + Math.random()).toFixed(2),
        defectSplit: [
          Math.floor(70 + Math.random() * 15),
          Math.floor(5 + Math.random() * 15),
          Math.floor(2 + Math.random() * 8),
        ],
        rChart: Array.from(
          { length: 10 },
          () => +(Math.random() * 0.6).toFixed(2)
        ),
        sigma: [
          +(3.5 + Math.random() * 1.5).toFixed(1),
          +(3.5 + Math.random() * 1.5).toFixed(1),
          +(3.5 + Math.random() * 1.5).toFixed(1),
        ],
        production: Array.from({ length: 5 }, () =>
          Math.floor(450 + Math.random() * 400)
        ),
      };
    });
  });
});

// =========================
// APPLY FILTERS TO CHARTS
// =========================

document.querySelector(".apply-btn").addEventListener("click", () => {
  const dayIndex = document.querySelector("input[type='range']").value - 1;
  const day = days[dayIndex];

  const line = document.querySelector(".filter-group select").value;
  const shift = document.querySelectorAll(".filter-group select")[1].value;

  const data = QC_DATA[day][line][shift];

  // Smooth updates
  updateChart(spcChart, data.spc);

  chart2.data.datasets[0].data = data.pareto;
  chart2.update("active");

  chart3.data.datasets[0].data = [data.cpk];
  chart3.update("active");

  chart4.data.datasets[0].data = data.defectSplit;
  chart4.update("active");

  chart5.data.datasets[0].data = data.rChart;
  chart5.update("active");

  chart6.data.datasets[0].data = data.sigma;
  chart6.update("active");

  chart7.data.datasets[0].data = data.production;
  chart7.update("active");
});

// =========================
// Smooth Chart Update Helper
// =========================
function updateChart(chart, newData) {
  chart.data.datasets[0].data = newData;
  chart.update("active");
}

const chart2 = Chart.getChart("chart2");
const chart3 = Chart.getChart("chart3");
const chart4 = Chart.getChart("chart4");
const chart5 = Chart.getChart("chart5");
const chart6 = Chart.getChart("chart6");
const chart7 = Chart.getChart("chart7");

const uploadBox = document.querySelector(".upload-box");
const uploadWarning = document.getElementById("upload-warning-overlay");

// Prevent default file selection and show warning
uploadBox.addEventListener("click", (e) => {
  e.preventDefault(); // prevent opening file dialog

  // Show overlay
  uploadWarning.style.display = "flex";

  // Auto hide after 3 seconds
  setTimeout(() => {
    uploadWarning.style.display = "none";
  }, 3000);
});

// Optional: hide overlay if clicked manually
uploadWarning.addEventListener("click", () => {
  uploadWarning.style.display = "none";
});

// FIX: Force cards to render correctly on browser reload
// Ensure stat cards maintain requested dark theme on hard reload
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".stat-card");
  cards.forEach((card) => {
    card.style.backgroundColor = "#252525";
    card.style.backgroundImage = "linear-gradient(145deg, #242424, #161616)";
  });
});
