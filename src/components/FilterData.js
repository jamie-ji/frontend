import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

function FilterData({ onDataFiltered, onSelectedErrorType, initialData }) {
  //const [data, setData] = useState([]);
  const [selectedTimeDimension, setSelectedTimeDimension] = useState('2023');
  const [selectedErrorType, setSelectedErrorType] = useState('All Errors');

  const yearToErrorMap = new Map();

  initialData.forEach((item) => {
    const yearValue = item.timestamp.split('-')[0];
    const monthValue = item.timestamp;

    //if current year already have information
    if(yearToErrorMap.has(yearValue)){
      //errortypes is an array with specific years all error information
      let errorTypes = yearToErrorMap.get(yearValue);

      //iterate all_errors from current month's information
      for(const error of Object.keys(item.all_errors)) {
        //if this errorType already exsit in this year
        if(errorTypes.has(error)){
          //add this month's count
          const errorType = errorTypes.get(error);
          errorType.set(monthValue,item.all_errors[error]);
        }else{
          //create a new errorType and add it to array
          const errorType = new Map();
          errorType.set(monthValue,item.all_errors[error]);
          errorTypes.set(error,errorType);
        }
      }
      //update year's errors information in map
      yearToErrorMap.set(yearValue,errorTypes)
    }else{
      //create a new errortypes array
      const errorTypes = new Map();
      //iterate all_errors from current month and add it to array
      for(const error of Object.keys(item.all_errors)) {
        const errorType = new Map();
        errorType.set(monthValue, item.all_errors[error]);
        errorTypes.set(error, errorType);
      }
      //add this year's errors information to map
      yearToErrorMap.set(yearValue, errorTypes)
    }
  })

  const sortedYearOptions = Array.from( yearToErrorMap.keys() ).sort((a, b) => b - a);
  const yearErrorOptions = new Map();
  yearToErrorMap.forEach((errorTypes,year) =>{
    //console.log(errorTypes)
    const errorOptions = Array.from( errorTypes.keys() ).sort((a, b) => b - a);
    yearErrorOptions.set(year,errorOptions)
    //console.log(yearErrorOptions)
  })

   
  // const yearToMonthMap = new Map();
  // const yearErrorOptions = new Map();

  // initialData.forEach((item) => {
  //   const yearValue = item.timestamp.split('-')[0];
  //   const monthValue = item.timestamp;

  //   const monthErrorAll = new Map();
  //   const monthErrorDetails = new Map();
  //   for(const error of Object.keys(item.all_errors)) {
  //     monthErrorDetails.set(error,item.all_errors[error])
  //   }
  //   monthErrorAll.set(monthValue,monthErrorDetails);

  //   if(yearToMonthMap.hasOwnProperty(yearValue)){
  //       const monthData = yearToMonthMap.get(yearValue);
  //       const updatedMonthData = monthData.add(monthErrorAll);
  //       yearToMonthMap.set(yearValue,updatedMonthData);
  //   }else{
  //       const monthData = [];
  //       monthData.push(monthErrorAll);
  //       yearToMonthMap.set(yearValue,monthData);
  //     }

  //   if(yearErrorOptions.hasOwnProperty(yearValue)){
  //       const errorOptions = yearToMonthMap.get(yearValue);
  //       const updatedErrorOptions = errorOptions.add(monthErrorDetails.keys());
  //       yearToMonthMap.set(yearValue,updatedErrorOptions);
  //   }else{
  //       const errorOptions = new Set();      
  //       errorOptions.add(monthErrorDetails.keys())
  //       yearErrorOptions.set(yearValue,errorOptions);
  //     }
  // });

  //const sortedYearOptions = Array.from( yearToMonthMap.keys() ).sort((a, b) => b - a);
  //console.log(sortedYearOptions)

  // yearErrorOptions.forEach((year, errorOptions) => {
  //   const sortedErrorOptions = Array.from(errorOptions).sort((a, b) => b - a);
  //   yearErrorOptions.set(year, new Set(sortedErrorOptions));
  // });

/*
   // 根据用户选择的时间维度计算开始时间
   const calculateStartTime = (timeDimension) => {
    const currentDate = DateTime.now();
    let startTime;

    if (timeDimension === 'last12Months') {
        startTime = currentDate.minus({ months: 12 });
    } else {
        startTime = DateTime.fromObject({year: parseInt(timeDimension)-1, month: 12, day: 31});
    }

    return startTime.toISODate();
  };

  const calculateEndTime = (timeDimension) => {
    const currentDate = DateTime.now();
    let endTime = currentDate;

    if (timeDimension !== 'last12Months') {
        // const selectedYear = parseInt(timeDimension);
        endTime = DateTime.fromObject({year: parseInt(timeDimension), month: 12, day: 31});
    }
    return endTime.toISODate();
  };
  */

  useEffect(() => {
    //const startTime = calculateStartTime(selectedTimeDimension);
    //const endTime = calculateEndTime(selectedTimeDimension);
    let yearData = yearToErrorMap.get(selectedTimeDimension)
    console.log(yearToErrorMap)
    console.log(yearData)
    let filteredData = yearData;
    if(selectedErrorType !== 'All Errors'){
      filteredData = yearData.get(selectedErrorType);
      console.log(filteredData)
    }
    if (filteredData) {
      onDataFiltered(filteredData);
      onSelectedErrorType(selectedErrorType);
    } 

  }, [selectedTimeDimension, selectedErrorType]);

return (
  <div>
    <div>
      <select
        value={selectedTimeDimension}
        onChange={(e) => setSelectedTimeDimension(e.target.value)}
      >
        {sortedYearOptions.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
    <div>
    <select
        value={selectedErrorType}
        onChange={(e) => setSelectedErrorType(e.target.value)}
      >
        <option value="All Errors">All Errors</option>
        {yearErrorOptions.has(selectedTimeDimension) &&
          yearErrorOptions.get(selectedTimeDimension).map((errorType) => (
            <option key={errorType} value={errorType}>
              {errorType}
            </option>
          ))}
      </select>
    </div>
  </div>
);

}

export default FilterData;



