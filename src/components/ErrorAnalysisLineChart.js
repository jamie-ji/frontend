
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Writing Accuracy',
        align: 'start',
        font: {
          size: 40,
          weight: 'bold',
          //lineHeight: 1.2,
        },
        //padding: {top: 20, left: 0, right: 0, bottom: 0}
      },
      subtitle: {
        display: true,
        text: '1,154,902 words',
        align: 'end',
        font: {
          size: 36,
          weight: 'bold',
          lineHeight: 1.2,
        },
        padding: {top: 20, left: 0, right: 0, bottom: 0}
      },
      lenged: {
        labels:{
          boxHeight: 2
        },
      },
    },
  };

const labels = ['2022-2', '2022-3', '2022-4', '2022-5', '2022-6', '2022-7', '2022-8','2022-9','2022-10','2022-11','2022-12','2023-1'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Grammar',
      data: [147,
        115,
        200,
        150,
        150,
        145,
        190,
        175,
        130,
        210,
        190,
        250],
      borderColor: 'rgb(30,144,255)',
      backgroundColor: 'rgb(30,144,255)',
      lineTension: 0.3
    },
    /*
   {
      label: 'Grammar',
      data: [9,6,6,8,3,4,6],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    */
  ],
};
 
export function ErrorAnalysisLineChart() {
    return <Line options={options} data={data} />;
  }