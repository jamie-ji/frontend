
import React, { useEffect, useState } from 'react';
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
    Legend,
  );

function DrawChart({chartData}) {
  if (!chartData || chartData.length === 0) {
    return null;
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const fixedColors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
    'rgb(255, 0, 0)',
    'rgb(0, 255, 0)',
    'rgb(0, 0, 255)',
    'rgb(128, 0, 128)',
  ];


const lineTension = 0.3;
//const labels = chartData.map((item) => item.timestamp);
const labels = [...new Set(chartData.map((item) => item.timestamp))];
const datasets = [];
//const errorTypes = chartData.map((item) => item.errorType);
const errorTypes = [...new Set(chartData.map((item) => item.errorType))];

errorTypes.forEach((errorType, index) => {
  const filteredData = chartData.filter((item) => item.errorType === errorType);
  const dataset = {
    label: errorType,
    data: filteredData.map((item) => item.errorCount),
    borderColor: fixedColors[index],
    backgroundColor: 'rgba(0,0,0,0)',
    lineTension: lineTension,
  };
  datasets.push(dataset);
})

//console.log(labels)
//console.log(datasets)


// const borderColor = ['rgb(30,144,255)'];
// const backgroundColor = ['rgb(30,144,255)'];

const data = {
  labels: labels,
  datasets: datasets,
}

const options = {
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
    legend: {
      labels:{
        boxHeight: 2
      },
    },
  },
  // scales:{
  //   x:{
  //     type: 'time',
  //     time:{
  //       unit: 'month'
  //     },
  //     min: '2022-01',
  //     max: '2023-02',
  //   },
  //   y:{
  //     beginAtZero: true},
  // },
};

  return(
    <div>
     <Line options={options} data={data} />;
    </div>
    )
  }

  export default DrawChart;