import Joi from "@hapi/joi";
import _ from "underscore";
import moment from "moment";
import CheckAuthentication from "../components/CheckAuthentication/CheckAuthentication";
import { BodyWrapper } from "./styles";
import NavBar from "../components/NavBar/NavBar";
import { ENDED, FILLINTHEBLANK, ignoreKeys, MCQ, timeFormat, UPCOMING } from "./constants";
import { CenterNoData } from "../components/styles/tableStyles";

export const joiObjectParser = (object, validator) => {
  const { error } = Joi.validate(object, validator, {
    abortEarly: false,
    stripUnknown: { objects: true },
  });
  if (!error) return {};
  const errors = {};
  _.each(error.details, (detail) => {
    const { key, label } = detail.context;
    errors[key] = label;
  });
  return errors;
};

export const stFormatDate = (date) =>
  date ? moment(date).format("DD/MM/YYYY") : "N/A";

export const getDuration = (d1, d2) => {
  if (!d1 || !d2) return "N/A";
  return `${moment(d2).diff(d1, "minutes")} minutes`;
};

export const splitStartTime = (startTime) => startTime;

export const splitDuration = (duration) => {
  const [hour, minute] = duration.split(":");
  if (hour === "00")
    return `${Number(minute)} minute${minute === "01" ? "" : "s"}`;
  return `${Number(hour)} hour${hour === "01" ? "" : "s"} and ${Number(
    minute
  )} minute${minute === "01" ? "" : "s"}`;
};

export const useNavAuthentication = (Component) => (
  <div>
    <CheckAuthentication />
    <BodyWrapper>
      <NavBar />
      <Component />
    </BodyWrapper>
  </div>
);
const LABEL_CHANGE = {
  [FILLINTHEBLANK]: 'Fill Blank',
  [MCQ]: 'MCQ',
}
export const smartLabel = (s) => {
  if (LABEL_CHANGE[s]) return LABEL_CHANGE[s];
  return s.replace(/^./, (str) => str.toUpperCase());
}
export const getShortName = (teacher) => {
  if (teacher.shortName) return teacher.shortName;
  return (teacher.firstName || "Z")[0] + (teacher.lastName || "Z")[0];
}
export const getObjectByAddingID = (obj = {}) => {
  const newObj = { ...obj };
  _.map(newObj, (v, k) => {
    if (ignoreKeys[k]) delete newObj[k];
    else if (_.isArray(v)) {
      const newVal = _.map(v, (e) => (_.isObject(e) ? e._id || e : e));
      newObj[k] = newVal;
    } else {
      newObj[k] = _.isObject(v) ? v._id || v : v;
    }
  });
  return newObj;
};

export const isValidEmail = (email) => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,63})+$/.test(email)) {
    return true;
  } else return false;
};

export const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

// const combineDateAndTime = function(date, time) {
//   timeString = time.getHours() + ':' + time.getMinutes() + ':00';
//   var year = date.getFullYear(); var month = date.getMonth() + 1;
//   // Jan is 0, dec is 11
//   var day = date.getDate();
//   var dateString = '' + year + '-' + month + '-' + day;
//   var combined = new Date(dateString + ' ' + timeString);
//   return combined;
// };
const getStringFromSeconds = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  let ret = "";
  if (hours > 1.5) {
    return `${Math.round(seconds / 3600)} hours`;
  }
  if (hours >= 0.01) {
    ret = `${ret + hours} hours`;
  }
  if (minutes >= 0.01) {
    ret = `${ret} ${minutes} minutes`;
  }
  seconds = seconds % 60;
  if (seconds >= 0.01) {
    ret = `${ret} ${seconds} seconds`;
  }
  return ret;
};

const getDetailsDuration = (d1, d2, duration, multiply = 1) => {
  let seconds = moment(d2).diff(d1, "seconds");
  const hh = duration.split(":")[0];
  const mm = duration.split(":")[1];
  const durationTime = Number(Number(hh) * 60) + Number(mm);
  if (seconds < 0 && -seconds <= durationTime * 60) {
    seconds = durationTime * 60 + seconds;
    return getStringFromSeconds(seconds);
  }
  if (multiply === -1 && seconds < 0) {
    seconds *= -1;
    seconds -= durationTime * 60;
  }
  if (seconds < 0) return "Ended";
  return getStringFromSeconds(seconds);
};

export const getTimeDifferenceExam = (exam, multiply = 1) => {
  const { startDate = "", startTime = "", duration = "" } = exam;
  const dateString = moment(startDate).format("YYYY-MM-DD");
  const timeString = moment(startTime, timeFormat).format("HH:mm:ss");
  const startDateWithTime = new Date(`${dateString} ${timeString}`);
  return getDetailsDuration(
    moment(),
    moment(startDateWithTime),
    duration,
    multiply
  );
};

export const getExamStatus = (exam = {}) => {
  const { startDate = "", startTime = "", duration = "" } = exam;
  const dateString = moment(startDate).format("YYYY-MM-DD");
  const timeString = moment(startTime, timeFormat).format("HH:mm:ss");
  const startDateWithTime = new Date(`${dateString} ${timeString}`);
  if (moment(new Date()).isAfter(moment(startDateWithTime))) {
    const diffInMinutes = moment(new Date()).diff(startDateWithTime, "minutes");
    const hh = duration.split(":")[0];
    const mm = duration.split(":")[1];
    const durationTime = Number(Number(hh) * 60) + Number(mm);
    if (diffInMinutes < durationTime) return "running";
    return "ended";
  }
  return "upcoming";
};
const removeSeconds = (str = "") => {
  if (!str.includes("seconds")) return str;
  const ret = str.split(" seconds")[0];
  if (!ret.includes("minutes")) return ret;
  return `${ret.split("minutes")[0]} minutes`;
};
export const getExamTimeStatus = (exam) => {
  if (!exam || !exam._id) return "";
  const status = getExamStatus(exam);
  switch (status) {
    case "running":
      return `Remaining ${getTimeDifferenceExam(exam)}`;
    case "ended":
      return `Ended ${removeSeconds(getTimeDifferenceExam(exam, -1))} ago`;
    case "upcoming":
      return `Starts in ${getTimeDifferenceExam(exam)}`;
    default:
      break;
  }
  return "";
};
const getStartEndDate = (exam) => {
  const { startDate = "", startTime = "", duration = "" } = exam;
  const dateString = moment(startDate).format("YYYY-MM-DD");
  const timeString = moment(startTime, timeFormat).format("HH:mm:ss");
  const startDateWithTime = new Date(`${dateString} ${timeString}`);
  const hh = duration.split(":")[0];
  const mm = duration.split(":")[1];
  const durationTime = Number(Number(hh) * 60) + Number(mm);
  const endDate = moment(startDateWithTime).add(durationTime, "minutes");
  return {
    startDate: startDateWithTime,
    endDate,
  };
};
export const getRemainingTimePercentage = (status, timeDifference, duration) => {
  const { timeString } = timeDifference;
  if(!timeString)
    return 0;
  if(status === ENDED){
    return 100;
  }
  else if(status === UPCOMING){
    return 0;
  }
  const hh = Number(timeString.split(":")[0]);
  const mm = Number(timeString.split(":")[1]);
  const ss = Number(timeString.split(":")[2]);

  const remainingTime = (hh*3600) + (mm*60) + ss;

  const dh = Number(duration.split(":")[0]);
  const dm = Number(duration.split(":")[1]);

  const durationTime = (dh*3600) + (dm*60);

  const percentage = ((durationTime-remainingTime)/(durationTime || 1))*100;
  return percentage;
};
export const getExamTimeDiffInFormat = (exam) => {
  const { startDate, endDate } = getStartEndDate(exam);
  let status = "";
  let timeString = "";
  const formatSeconds = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hours = `${hours <= 9 ? 0 : ""}${hours}`;
    minutes = `${minutes <= 9 ? 0 : ""}${minutes}`;
    seconds = `${seconds <= 9 ? 0 : ""}${seconds}`;
    return `${hours} : ${minutes} : ${seconds}`;
  };
  if (moment().isBefore(startDate)) {
    status = "Starts in";
    const seconds = moment(startDate).diff(moment(), "seconds");
    timeString = formatSeconds(seconds);
  } else if (moment().isAfter(endDate)) {
    status = "Ended";
    timeString = `${formatSeconds(0)}`;
  } else {
    status = "Running";
    const seconds = endDate.diff(moment(), "seconds");
    timeString = formatSeconds(seconds);
  }
  return {
    status,
    timeString,
  };
};

export const checkEqualObj = (a, b) => {
  if (!a && b) return false;
  if (!b && a) return false;
  if (!a && !b) return a === b;
  if (typeof a !== typeof b) return false;
  if (typeof a === 'object') {
    if (_.isArray(a)) {
      if (a.length !== b.length) return false;
      return _.all(a, (suba, i) => checkEqualObj(suba, b[i]));
    } else {
      const akeys = Object.keys(a);
      const bkeys = Object.keys(b);
      if (akeys.length !== bkeys.length) return false;
      return _.all(akeys, key => checkEqualObj(a[key], b[key]));
    }
  } else {
    return a === b;
  }
}

export const meGotBanned = (exam, user) =>
  _.any(exam.bannedParticipants, (pt) => pt._id === user._id);

export const getName = (obj) => `${obj.firstName} ${obj.lastName}`;

export const allCap = (str) => (str || "").toUpperCase();

export const NoDataComponent = ({ title = "No Data Found" }) => (
  <CenterNoData>{title}</CenterNoData>
);

export const getQuestionSplitFBlank = (questionBody) => {
  const array = [];
  let str = "";
  for (let i = 0; i < questionBody.length; ) {
    let cnt = 0;
    if (questionBody.slice(i, i+3) === "___") {
      while(questionBody.charAt(i) === '_') {
        cnt++;
        i++;
      }
      const width = `${Math.max(20 * cnt, 35)}px`;
      array.push({
        text: str,
        width,
      })
      str = "";
    } else {
      str += questionBody.charAt(i);
      i += 1;
    }
  }
  array.push({
    text: str
  });
  return array;
}

export const getStatusColor = (status) => {
  switch (status) {
    case 'ended':
      return 'red';
    case 'running':
      return 'green';
    case 'upcoming':
      return 'brown';
  }
}

export const formatDateAndTime = (date, time) => `${moment(date).format('DD/MM/YYYY')} ${time}`;

export const getTimeDiff = (t1, t2) => {
  const seconds = moment(t2).diff(t1, 'seconds');
  const dayInSecond = 24*3600;
  const hourInSecond = 3600;
  const minuteInSecond = 60;

  let days = Math.floor(seconds / dayInSecond); days %= dayInSecond;
  let hours = Math.floor(seconds / hourInSecond); hours %= hourInSecond;
  let minutes = Math.floor(seconds / minuteInSecond); minutes %= minuteInSecond;
  if (days) return `${days}d`;
  if (hours) return `${hours}h ${minutes}m`;
  if (minutes) return `${minutes}m`;
  return 'a few seconds';
}
