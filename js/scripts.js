// Validate username input
const validateUsername = () => {
  const username = document.getElementById("username").value;
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&~])[A-Za-z\d@$!%*?&]{8,}$/;
  const borderColor = regex.test(username) ? "green" : "red";
  document.getElementById("username").style.borderColor = borderColor;
};

// Attach username validation event listener
document.getElementById("username").addEventListener("input", validateUsername);

// Initialize chart data
const initializeChartData = () => ({
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Income",
      data: Array(12).fill(0),
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
    {
      label: "Expenses",
      data: Array(12).fill(0),
      backgroundColor: "rgba(255, 99, 132, 0.6)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
});

// Configure chart options
const configureChartOptions = () => ({
  type: "bar",
  options: {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Income vs Expenses" },
    },
  },
});

// Update chart data dynamically
const updateChartData = (data, barChart) => {
  data.labels.forEach((month, i) => {
    const monthLower = month.toLowerCase();
    const incomeInput = document.getElementById(`${monthLower}-income`);
    const expensesInput = document.getElementById(`${monthLower}-expenses`);

    data.datasets[0].data[i] = parseFloat(incomeInput?.value) || 0; // Income
    data.datasets[1].data[i] = parseFloat(expensesInput?.value) || 0; // Expenses
  });

  barChart.update(); // Re-render the chart
};

// Attach input event listeners to update the chart
const attachInputListeners = (data, barChart) => {
  data.labels.forEach((month) => {
    const monthLower = month.toLowerCase();
    const incomeInput = document.getElementById(`${monthLower}-income`);
    const expensesInput = document.getElementById(`${monthLower}-expenses`);

    incomeInput?.addEventListener("input", () =>
      updateChartData(data, barChart)
    );
    expensesInput?.addEventListener("input", () =>
      updateChartData(data, barChart)
    );
  });
};

// Add functionality to download the chart
const attachDownloadChartListener = (barChart) => {
  document.getElementById("download-chart").addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = barChart.toBase64Image(); // Convert chart to Base64 image
    link.download = "chart.png"; // Set the file name
    link.click(); // Trigger the download
  });
};

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("barChart").getContext("2d");
  const data = initializeChartData();
  const config = { ...configureChartOptions(), data };
  const barChart = new Chart(ctx, config);

  attachInputListeners(data, barChart);
  attachDownloadChartListener(barChart);
});
