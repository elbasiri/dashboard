import React, { useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';

Chart.register(LinearScale, CategoryScale, BarController, BarElement);

const CustomerChart = () => {
  const [chartData, setChartData] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [loading, setLoading] = useState(true);

  const customerData = [
    { month: 'January', customers: 100 },
    { month: 'February', customers: 150 },
    { month: 'March', customers: 200 },
    { month: 'April', customers: 180 },
    { month: 'May', customers: 250 },
    { month: 'June', customers: 300 },
    { month: 'July', customers: 280 },
    { month: 'August', customers: 320 },
    { month: 'September', customers: 290 },
    { month: 'October', customers: 350 },
    { month: 'November', customers: 400 },
    { month: 'December', customers: 380 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating fetching data from an API
        // Replace this code with your actual data fetching logic
        // const response = await fetch("https://dummyjson.com/users");
        // const data = await response.json();

        // Extract the customer data from the response
        const customers = customerData.map(item => item.customers);

        setChartData(customers);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData && chartInstance) {
      chartInstance.destroy();
    }

    if (chartData) {
      const ctx = document.getElementById('chart').getContext('2d');
      const newChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: customerData.map(item => item.month),
          datasets: [
            {
              label: 'Number of Customers',
              data: chartData,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Customers',
                color: 'white', 
              },
              ticks: {
                color: 'white', 
              },
            },
            x: {
              title: {
                display: true,
                text: 'Months',
                color: 'yellow', 
              },
              ticks: {
                color: 'yellow', 
              },
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [chartData]);

  return (
    <div className="container" style={{ width: '900px', height: '400px', marginBottom: '150px' }}>
      <div className="main-cm">
        {loading ? (
          <div>Loading chart...</div>
        ) : (
          <canvas id="chart"></canvas>
      )}
      </div>
    </div>
  );
};

export default CustomerChart;
