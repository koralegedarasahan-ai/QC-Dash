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
const spcChart = new Chart(spcCtx, {
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
    labels: labels80,
    datasets: [
      {
        data: Array.from({ length: 80 }, () => Math.floor(Math.random() * 50)),
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
    labels: labels80,
    datasets: [
      {
        data: Array.from({ length: 80 }, () => +(1 + Math.random()).toFixed(2)),
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
    labels: labels80,
    datasets: [
      {
        data: Array.from(
          { length: 80 },
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
    labels: labels80,
    datasets: [
      {
        data: Array.from({ length: 80 }, () =>
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

// FIX: Prevent focus mode when clicking the SPC dropdown
const spcSelect = document.getElementById("spcType");
if (spcSelect) {
  spcSelect.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

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
const lines = ["Line A (Sample)", "Line B (Sample)", "Line C (Sample)"];
const shifts = ["Day Shift", "Night Shift"];

days.forEach((day) => {
  QC_DATA[day] = {};
  lines.forEach((line) => {
    QC_DATA[day][line] = {};
    shifts.forEach((shift) => {
      QC_DATA[day][line][shift] = {
        spc: Array.from(
          { length: 80 },
          () => +(9.5 + Math.random() * 1.5).toFixed(2)
        ),
        pareto: Array.from({ length: 80 }, () =>
          Math.floor(Math.random() * 50)
        ),
        cpk: Array.from({ length: 80 }, () => +(1 + Math.random()).toFixed(2)),
        defectSplit: [
          Math.floor(70 + Math.random() * 15),
          Math.floor(5 + Math.random() * 15),
          Math.floor(2 + Math.random() * 8),
        ],
        rChart: Array.from(
          { length: 80 },
          () => +(Math.random() * 0.6).toFixed(2)
        ),
        sigma: [
          +(3.5 + Math.random() * 1.5).toFixed(1),
          +(3.5 + Math.random() * 1.5).toFixed(1),
          +(3.5 + Math.random() * 1.5).toFixed(1),
        ],
        production: Array.from({ length: 80 }, () =>
          Math.floor(450 + Math.random() * 400)
        ),
        kpiValues: {
          yield: (95 + Math.random() * 4).toFixed(1) + "%",
          defect: (1 + Math.random() * 2).toFixed(1) + "%",
          oee: Math.floor(80 + Math.random() * 15) + "%",
          availability: Math.floor(85 + Math.random() * 10) + "%",
          performance: Math.floor(85 + Math.random() * 10) + "%",
          mtbf: Math.floor(100 + Math.random() * 50) + "h",
        },
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

  chart3.data.datasets[0].data = data.cpk;
  chart3.update("active");

  chart4.data.datasets[0].data = data.defectSplit;
  chart4.update("active");

  chart5.data.datasets[0].data = data.rChart;
  chart5.update("active");

  chart6.data.datasets[0].data = data.sigma;
  chart6.update("active");

  chart7.data.datasets[0].data = data.production;
  chart7.update("active");

  // Update KPI Cards
  animateKPI("kpi-yield", data.kpiValues.yield);
  animateKPI("kpi-defect", data.kpiValues.defect);
  animateKPI("kpi-oee", data.kpiValues.oee);
  animateKPI("kpi-availability", data.kpiValues.availability);
  animateKPI("kpi-performance", data.kpiValues.performance);
  animateKPI("kpi-mtbf", data.kpiValues.mtbf);
});

// =========================
// Smooth Chart Update Helper
// =========================
function updateChart(chart, newData) {
  chart.data.datasets[0].data = newData;
  chart.update("active");
}

// =========================
// KPI Value Animation Helper
// =========================
function animateKPI(id, endValueString) {
  const element = document.getElementById(id);
  if (!element) return;

  // 1. Parse suffix (%, h, or empty)
  const suffix = endValueString.replace(/[0-9.]/g, "");
  
  // 2. Parse numeric value
  const endValue = parseFloat(endValueString);
  const startValue = parseFloat(element.textContent) || 0; // Fallback to 0 if NaN

  // 3. Animation settings
  const duration = 1000; // ms
  const frameRate = 60; 
  const totalFrames = Math.round((duration / 1000) * frameRate);
  let frame = 0;

  const counter = setInterval(() => {
    frame++;
    // Easing function (easeOutQuad) for smoother effect
    const progress = frame / totalFrames;
    const easeProgress = 1 - (1 - progress) * (1 - progress); 
    
    const currentValue = startValue + (endValue - startValue) * easeProgress;

    // Formatting: keep 1 decimal if originally had decimal, else int
    // Heuristic: check if endValueString has a decimal point
    const hasDecimal = endValueString.includes(".");
    
    element.textContent = hasDecimal 
      ? currentValue.toFixed(1) + suffix 
      : Math.floor(currentValue) + suffix;

    if (frame >= totalFrames) {
      clearInterval(counter);
      element.textContent = endValueString; // Ensure exact final value
    }
  }, 1000 / frameRate);
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
