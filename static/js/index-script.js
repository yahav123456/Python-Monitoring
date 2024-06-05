let cpuChart, memChart;
let countdownInterval;
let data; // Define data variable globally

$(document).ready(function () {
    // Dark mode toggle function
    $(".dark-mode-toggle").on("click", function () {
        $("body").toggleClass("dark-mode");
        const isDarkMode = $("body").hasClass("dark-mode");
        localStorage.setItem("darkMode", isDarkMode);
        $(".fa-sun").toggle(!isDarkMode);
        $(".fa-moon").toggle(isDarkMode);
    });

    const isDarkMode = localStorage.getItem("darkMode") === "true";
    if (isDarkMode) {
        $("body").addClass("dark-mode");
        $(".fa-sun").hide();
    } else {
        $(".fa-moon").hide();
    }
});

// Function to create doughnut chart
function createChart(chartElement, data) {
    let backgroundColor;
    if (data > 80) {
        backgroundColor = '#f04e4e';
    } else if (data > 40) {
        backgroundColor = '#f0ad4e';
    } else {
        backgroundColor = '#5cb85c';
    }

    const ctx = chartElement.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [data, 100 - data],
                backgroundColor: [backgroundColor, '#eaeaea'],
                borderWidth: 0,
            }]
        },
        options: {
            responsive: true,
            cutoutPercentage: 80,
            legend: {
                display: false
            },
            tooltips: {
                enabled: false
            }
        }
    });
    return chart;
}

// Function to update charts with new data
function updateCharts() {
    if (data) {
        if (cpuChart) {
            cpuChart.destroy();
        }
        if (memChart) {
            memChart.destroy();
        }

        cpuChart = createChart(document.getElementById('cpu-chart'), data.cpu_usage);
        memChart = createChart(document.getElementById('mem-chart'), data.mem_usage);
    }
}

// Function to update countdown timer for next data update
function updateNextUpdateTime(nextUpdate) {
    clearInterval(countdownInterval);

    countdownInterval = setInterval(function () {
        const now = new Date();
        const remainingTime = Math.max(Math.floor((nextUpdate - now) / 1000), 0);

        $("#next-update-time").text(remainingTime > 0 ? "" + remainingTime + "s" : " 0s");

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
        }
    }, 1000); 
}

// Function to update data from the server
function updateData() {
    $.ajax({
        url: "/data",
        type: "GET",
        dataType: "json",
        success: function (responseData) {
            data = responseData;
            $("#cpu-usage").text(data.cpu_usage + "%");
            $("#mem-usage").text(data.mem_usage + "%");

            // Display process count
            $('#process-count').text(data.process_count);

            // Display user name and system type
            $('#user-name').text(data.user_name);
            $('#system-type').text(data.system_type);

            $("#msg").text(data.msg);

            if (data.msg === "Warning") {
                $("#msg").removeClass("alert-ok").addClass("alert-warning");
                $("#msg").text("System Status: Warning - CPU, Memory, or Disk usage is above 80%");
            } else {
                $("#msg").removeClass("alert-warning").addClass("alert-ok");
                $("#msg").text("System Status: Everything is running smoothly.");
            }

            var now = new Date();
            var nextUpdate = new Date(now.getTime() + 5000);
            updateNextUpdateTime(nextUpdate);
            updateCharts();
        },
        error: function () {
            console.log("Error fetching data.");
        }
    });
}

// Initial data update
updateData();

// Set interval to update data periodically
setInterval(updateData, 5000);
