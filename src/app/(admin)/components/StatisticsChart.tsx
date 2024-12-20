// components/StatisticsChart.tsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

const StatisticsChart: React.FC = () => {
  const data = {
    datasets: [
      {
        label: 'Response Rate',
        data: [30, 70], // Response rate (30%) and remaining (70%)
        backgroundColor: ['#7AE071', '#fff'], // Green for 30% and grey for remaining
        borderWidth: 0,
        cutout: '85%', 
        circumference: 360, // Half-circle
        rotation: 0, // Start at the top
      },
      {
        label: 'Hiring Rate',
        data: [80, 20], // Hiring rate (80%) and remaining (20%)
        backgroundColor: ['#FD5602', '#fff'], // Orange for 80% and grey for remaining
        borderWidth: 2,
        cutout: '78%',
        circumference: 360,
        rotation: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: { enabled: false }, // Disable tooltips
    },
    layout: {
      padding: 10,
    },
    pluginsOptions: {
      legend: {
        display: false, // Hide default legend
      },
    },
  };

  return (
    <div className="relative flex justify-center items-center max-w-[150px] border-solid border-[6px] border-[#5D5FEF] rounded-full">
      <div className="absolute text-center">
        <p className="text-[30px] font-bold text-[#5D5FEF] font-RalewayRegular">240</p>
        <p className="text-[12px] text-[#1C2329] font-RalewaySemiBold">Total Bids</p>
      </div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default StatisticsChart;
