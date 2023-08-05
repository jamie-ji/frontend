const monthsList = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ],
  monthRange = () => {
    let ans = [];
    for (let i = 0; i <= monthsList.length; i++) {
      ans.push({ value: i, label: monthsList[i] });
    }
    return ans;
  },
  dateRange = () => {
    const max = 31,
      min = 1,
      ans = [];
    for (let i = min; i <= max; i++) {
      ans.push({ value: i, label: i });
    }
    return ans;
  },
  yearRange = () => {
    const max = new Date().getFullYear(),
      min = 2022,
      ans = [];
    for (let i = min; i <= max; i++) {
      ans.push({ value: i, label: i });
    }
    return ans.reverse();
  };

// ** exports
export { yearRange, dateRange, monthsList, monthRange };
