import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

function FilterData({ onDataFiltered, initialData }) {
  //const [data, setData] = useState([]);
  const [selectedTimeDimension, setSelectedTimeDimension] = useState('last12Months');
  const [selectedErrorTypes, setSelectedErrorTypes] = useState([]);
  
  //Get time and year from chartdata
  const timestamps = initialData.map((item) => item.timestamp);
  const timeSelectOptions = timestamps.map((timestamp) => {
    const year = timestamp.split('-')[0];
    //console.log(year)
    return(
    <option key={year} value={year}>
      {year}
    </option>
    );
});

  //Get error types from chartdata
  const errorTypesSet = new Set();
  initialData.forEach((item) => {
    const errorTypes = Object.keys(item.all_errors);
    errorTypes.forEach((errorType) => {
      errorTypesSet.add(errorType);
    });
  });

  const errorTypes = Array.from(errorTypesSet);
  //console.log(errorTypes)

   // 根据用户选择的时间维度计算开始时间
   const calculateStartTime = (timeDimension) => {
    const currentDate = DateTime.now();
    let startTime;

    if (timeDimension === 'last12Months') {
        startTime = currentDate.minus({ months: 12 });
    } else {
        // console.log(timeDimension)
        // console.log(typeof timeDimension);
        // const selectedYear = parseInt(timeDimension);
        // console.log(typeof selectedYear);
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

  useEffect(() => {
    const startTime = calculateStartTime(selectedTimeDimension);
    const endTime = calculateEndTime(selectedTimeDimension);

    const filteredData = initialData.filter((item) => {
      return (
        item.timestamp >= startTime &&
        item.timestamp <= endTime &&
        (selectedErrorTypes.includes('All Errors') || errorTypes.includes(selectedErrorTypes)|| selectedErrorTypes.length === 0)
      );
    });

      // 根据选择的条件进行数据筛选
    onDataFiltered(filteredData);
    console.log(filteredData) // 将筛选后的数据传递给父组件或其他组件
  }, [selectedTimeDimension, selectedErrorTypes]);

  return (
    // 用户选择时间维度和错误类型的 UI 元素
    <div>
        <div>
        {/* 添加时间维度选择的下拉菜单 */}
            <select
            value={selectedTimeDimension}
            onChange={(e) => setSelectedTimeDimension(e.target.value)}
            >
            <option value='last12Months'>Last 12 Months</option>
             {timeSelectOptions}
            </select>
        </div>
        <div>
            <select
              multiple
              value={selectedErrorTypes}
              onChange={(e) =>
                setSelectedErrorTypes(
                  Array.from(e.target.selectedOptions, (item) => item.value)
                )
              }
            >
              <option value="All Errors">All Errors</option>
              {errorTypes.map((errorType) => (
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



