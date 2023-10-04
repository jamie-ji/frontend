
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

function DrawChart({chartData, selectedErrorType}) {
  // if (!chartData || chartData.length === 0) {
  //   return null;
  // }
  //console.log(chartData)
  //console.log(selectedErrorType)

  const colors = [
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
  let labels = [];
  const dataPoints = [];
  let datasets = [];
  console.log(selectedErrorType)

  if(selectedErrorType !== 'All Errors'){
    chartData.forEach((count, month)=>{
      labels.push(month);
      dataPoints.push(count);
      });
      datasets = [
          {
            label: selectedErrorType,
            data: dataPoints,
            borderColor: colors[0],
            backgroundColor: 'rgba(0,0,0,0)',
          }
        ];
    }else{
    const labelsSet = new Set();
    chartData.forEach((errorDetails, errorType) =>{
      const errorTypeDataPoints = [];
      errorDetails.forEach((count,month) =>{
        labelsSet.add(month)
        errorTypeDataPoints.push(count);
      });
      const colorIndex = datasets.length % colors.length;
      datasets.push({
          label: errorType, 
          data: errorTypeDataPoints,
          borderColor: colors[colorIndex], 
          backgroundColor: 'rgba(0,0,0,0)', 
          lineTension: lineTension
        });
      });

      labels = Array.from(labelsSet).sort((a, b) => {
        return a.localeCompare(b);
      });
    }
  
    const chartInfo = {
        labels: labels,
        datasets: datasets,
      }

    console.log(chartInfo)

// const lineTension = 0.3;
// const errorCountsMap = {};

//   // 遍历 chartData 并汇总错误类型计数
//   chartData.forEach((dataItem, index) => {
//     const errorCounts = dataItem.all_errors;

//     for (const errorType in errorCounts) {
//       if (errorCounts.hasOwnProperty(errorType)) {
//         if (!errorCountsMap[errorType]) {
//           errorCountsMap[errorType] = {
//             label: errorType, // 使用错误类型作为标签
//             data: [], // 数据点
//             borderColor: colors[index], // 选择颜色
//             backgroundColor: 'rgba(0,0,0,0)',
//             lineTension: lineTension,
//           };
//         }
//         errorCountsMap[errorType].data.push(errorCounts[errorType]);
//       }
//     }
//   });

//   // 将汇总后的数据转换为 datasets 数组
//   const datasets = Object.values(errorCountsMap);

//   const data = {
//     labels: chartData.map((item) => item.timestamp),
//     datasets: datasets,
//   };

// const filteredData = chartData;
// const datasets = [];


// filteredData.forEach((filteredData) => {
//   const errorCounts = filteredData.all_errors;
//   console.log(errorCounts)
//   for (const errorType in errorCounts) {
//     if (errorCounts.hasOwnProperty(errorType)) {
//       if (!errorCountsMap[errorType]) {
//         errorCountsMap[errorType] = 0;
//       }
//       errorCountsMap[errorType] += errorCounts[errorType];
//     }
//   }
// });

// for (const errorType in errorCountsMap) {
//   if (errorCountsMap.hasOwnProperty(errorType)) {
//     const dataset = {
//       label: errorType,        // 使用错误类型作为标签
//       data: errorCountsMap[errorType], // 使用汇总后的统计数据作为数据
//       borderColor: 'rgb(255, 99, 132)', // 你可以自定义边框颜色
//       backgroundColor: 'rgba(0,0,0,0)',
//       lineTension: lineTension,
//     };
//     datasets.push(dataset);
//   }
// }

//console.log(labels)
//console.log(datasets)


// const borderColor = ['rgb(30,144,255)'];
// const backgroundColor = ['rgb(30,144,255)'];

// const data = {
//   labels: Object.keys(errorCountsMap),
//   datasets: datasets,
// }

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
      },
    },
    legend: {
      labels:{
        boxHeight: 2
      },
    },
  },
};

  return(
    <div>
     <Line options={options} data={chartInfo} />;
    </div>
    )
  }

  export default DrawChart;