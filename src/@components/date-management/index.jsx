// ** moment
import moment from "moment";

// ** const newDate = new Date();

// ** const tz = (newDate.getTimezoneOffset() / 60) * -1;

// ** current time for check in / check out
const currentTime = (arg) => {
    return moment(arg).format("LLLL");
  },
  // ** date  according to international standard
  dateFunction = (arg) => {
    return arg ? moment(arg).format("MM/DD/YYYY") : "---";
    // moment(new Date()).format("MM/DD/YYYY")
  },
  // ** time according to international standard
  timeFunction = (arg) => {
    return moment(arg).format("h:mm:ss a");
  },
  dateAndTimeFunction = (arg) => {
    return moment(arg).format("MM/DD/YYYY h:mm:ss a");
  },
  // ** hour according to international standard
  hourFunctionUS = (arg) => {
    return moment(arg).format("H");
  },
  // ** from now
  fromNowTime = (arg) => {
    return moment(arg).startOf("minutes").fromNow();
  },
  // ** backend format
  backendFormat = (arg) => {
    return moment(arg).format("YYYY-MM-DD");
  },
  yearFormat = (arg) => {
    return moment(arg).format("YYYY");
  };

// ** export
export {
  currentTime,
  dateFunction,
  timeFunction,
  hourFunctionUS,
  backendFormat,
  dateAndTimeFunction,
  fromNowTime,
  yearFormat,
};
