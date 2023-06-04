import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'chart.js';

const SalesChart = () => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const salesData = [
    { month: 'January', sales: 10000 },
    { month: 'February', sales: 15000 },
    { month: 'March', sales: 20000 },
    { month: 'April', sales: 18000 },
    { month: 'May', sales: 25000 },
    { month: 'June', sales: 30000 },
    { month: 'July', sales: 28000 },
    { month: 'August', sales: 32000 },
    { month: 'September', sales: 29000 },
    { month: 'October', sales: 35000 },
    { month: 'November', sales: 40000 },
    { month: 'December', sales: 38000 },
  ];

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = chartContainer.current.getContext('2d');

    const newChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: salesData.map(item => item.month),
        datasets: [
          {
            label: 'Sales',
            data: salesData.map(item => item.sales),
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
              text: 'Sales',
              color: 'white', // Modify the text color of the y-axis title
            },
            ticks: {
              color: 'white', // Modify the text color of the y-axis ticks
            },
          },
          x: {
            title: {
              display: true,
              text: 'Months',
              color: 'red', // Modify the text color of the x-axis title
            },
            ticks: {
              color: 'red', // Modify the text color of the x-axis ticks
            },
          },
        },
      },
    });

    setChartInstance(newChartInstance);

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="container" style={{ width: '900px', height: '400px' , marginBottom: '50px'}}>
      <div className="main-cm">
        <canvas ref={chartContainer}></canvas>
      </div>
    </div>
  );
};

export default SalesChart;
