// input with id username on change
document.getElementById("username").addEventListener("input", function () {
  const username = document.getElementById("username").value;
  // regex to check if username has at least 1 captial letter, 1 special character, 1 number and is at least 8 characters long
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (regex.test(username)) {
    //set the username input border(thin) to green
    document.getElementById("username").style.borderColor = "green";
  } else {
    document.getElementById("username").style.borderColor = "red";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("barChart").getContext("2d");

  // Initial data for the bar chart
  const data = {
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
        data: Array(12).fill(0), // Start with empty data
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: Array(12).fill(0), // Start with empty data
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Configuration for the bar chart
  const config = {
    type: "bar",
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Monthly Income vs Expenses",
        },
      },
    },
  };

  // Render the chart
  const barChart = new Chart(ctx, config);

  // Function to update chart data dynamically
  const updateChart = () => {
    for (let i = 0; i < 12; i++) {
      const month = data.labels[i].toLowerCase(); // Get month name in lowercase
      const incomeInput = document.getElementById(`${month}-income`);
      const expensesInput = document.getElementById(`${month}-expenses`);

      // Update chart data with input values or default to 0
      data.datasets[0].data[i] = parseFloat(incomeInput.value) || 0; // Income
      data.datasets[1].data[i] = parseFloat(expensesInput.value) || 0; // Expenses
    }

    // Re-render the chart
    barChart.update();
  };

  // Add event listeners to all input fields
  data.labels.forEach((month) => {
    const incomeInput = document.getElementById(
      `${month.toLowerCase()}-income`
    );
    const expensesInput = document.getElementById(
      `${month.toLowerCase()}-expenses`
    );

    incomeInput.addEventListener("input", updateChart);
    expensesInput.addEventListener("input", updateChart);
  });

  // Add functionality to download the chart
  document.getElementById("download-chart").addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = barChart.toBase64Image(); // Convert chart to Base64 image
    link.download = "chart.png"; // Set the file name
    link.click(); // Trigger the download
  });
});
