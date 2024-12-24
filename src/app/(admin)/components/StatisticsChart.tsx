import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

interface StatisticsChartProps {
  amount: number;
  responseRate: number;
  hiringRate: number;
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ amount, responseRate, hiringRate }) => {
  const data = {
    datasets: [
      {
        label: 'Response Rate',
        data: [responseRate, 100 - responseRate], // Dynamically set response rate
        backgroundColor: ['#7AE071', '#fff'],
        borderWidth: 0,
        cutout: '85%',
        circumference: 360,
        rotation: 0,
      },
      {
        label: 'Hiring Rate',
        data: [hiringRate, 100 - hiringRate], // Dynamically set hiring rate
        backgroundColor: ['#FD5602', '#fff'],
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
      tooltip: { enabled: false },
    },
    layout: {
      padding: 10,
    },
    pluginsOptions: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="relative flex justify-center items-center max-w-[150px] border-solid border-[6px] border-[#5D5FEF] rounded-full">
      <div className="absolute text-center">
        <p className="text-[30px] font-bold text-[#5D5FEF] font-RalewayRegular">{amount}</p>
        <p className="text-[12px] text-[#1C2329] font-RalewaySemiBold">Total Bids</p>
      </div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default StatisticsChart;
