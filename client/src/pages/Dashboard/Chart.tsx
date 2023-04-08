import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Biểu đồ doanh thu và chi tiêu',
    }
  },
};

const Chart = () => {
  const labels = ['January', 'February', 'March', 'April'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Chi tiêu (triệu)',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Doanh thu (triệu)',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 50 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="p-5">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart;