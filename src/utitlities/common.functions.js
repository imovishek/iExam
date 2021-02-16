import Joi from '@hapi/joi'
import _ from 'underscore'
import moment from 'moment'
import CheckAuthentication from '../components/CheckAuthentication/CheckAuthentication'
import { BodyWrapper } from './styles'
import NavBar from '../components/NavBar/NavBar'
import { ignoreKeys, timeFormat } from './constants'

export const joiObjectParser = (object, validator) => {
  const { error } = Joi.validate(object, validator, {
    abortEarly: false,
    stripUnknown: { objects: true }
  })
  if (!error) return {}
  const errors = {}
  _.each(error.details, detail => {
    const { key, label } = detail.context
    errors[key] = label
  })
  return errors
}

export const stFormatDate = (date) =>
  date
    ? moment(date)
      .format('DD/MM/YYYY')
    : 'N/A'

export const getDuration = (d1, d2) => {
  if (!d1 || !d2) return 'N/A'
  return `${moment(d2).diff(d1, 'minutes')} minutes`
}

export const splitStartTime = (startTime) => startTime

export const splitDuration = (duration) => {
  const [hour, minute] = duration.split(':')
  if (hour === '00') return `${Number(minute)} minute${minute === '01' ? '' : 's'}`
  return `${Number(hour)} hour${hour === '01' ? '' : 's'} and ${Number(minute)} minute${minute === '01' ? '' : 's'}`
}

export const useNavAuthentication = (Component) => (
  <div>
    <CheckAuthentication />
    <BodyWrapper>
      <NavBar />
      <Component />
    </BodyWrapper>
  </div>
)

export const smartLabel = (s) => s.replace(/^./, str => str.toUpperCase())

export const getObjectByAddingID = (obj = {}) => {
  const newObj = { ...obj }
  _.map(newObj, (v, k) => {
    if (ignoreKeys[k]) delete newObj[k]
    else if (_.isArray(v)) {
      const newVal = _.map(v, e => _.isObject(e) ? (e._id || e) : e)
      newObj[k] = newVal
    } else {
      newObj[k] = _.isObject(v) ? (v._id || v) : v
    }
  })
  return newObj
}

export const isValidEmail = (email) => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,63})+$/.test(email)) { return true } else return false
}

export const deepCopy = obj => JSON.parse(JSON.stringify(obj))

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
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  let ret = ''
  if (hours > 1.5) {
    return `${Math.round(seconds / 3600)} hours`
  }
  if (hours >= 0.01) {
    ret = `${ret + hours} hours`
  }
  if (minutes >= 0.01) {
    ret = `${ret} ${minutes} minutes`
  }
  seconds = seconds % 60
  if (seconds >= 0.01) {
    ret = `${ret} ${seconds} seconds`
  }
  return ret;
}

const getDetailsDuration = (d1, d2, duration, multiply = 1) => {
  let seconds = moment(d2).diff(d1, 'seconds')
  const hh = duration.split(':')[0]; const mm = duration.split(':')[1]
  const durationTime = Number(Number(hh) * 60) + Number(mm)
  if (seconds < 0 && -seconds <= durationTime * 60) {
    seconds = durationTime * 60 + seconds;
    return getStringFromSeconds(seconds);
  }
  if (multiply === -1 && seconds < 0) {
    seconds *= -1
    seconds -= durationTime * 60;
  }
  if (seconds < 0) return 'Ended';
  return getStringFromSeconds(seconds);
}

export const getTimeDifferenceExam = (exam, multiply = 1) => {
  const { startDate = '', startTime = '', duration = '' } = exam
  const dateString = moment(startDate).format('YYYY-MM-DD')
  const timeString = moment(startTime, timeFormat).format('HH:mm:ss')
  const startDateWithTime = new Date(`${dateString} ${timeString}`)
  return getDetailsDuration(moment(), moment(startDateWithTime), duration, multiply)
}

export const getExamStatus = (exam = {}) => {
  const { startDate = '', startTime = '', duration = '' } = exam
  const dateString = moment(startDate).format('YYYY-MM-DD')
  const timeString = moment(startTime, timeFormat).format('HH:mm:ss')
  const startDateWithTime = new Date(`${dateString} ${timeString}`)
  if (moment(new Date()).isAfter(moment(startDateWithTime))) {
    const diffInMinutes = moment(new Date()).diff(startDateWithTime, 'minutes')
    const hh = duration.split(':')[0]; const mm = duration.split(':')[1]
    const durationTime = Number(Number(hh) * 60) + Number(mm);
    if (diffInMinutes < durationTime) return 'running'
    return 'ended'
  }
  return 'upcoming'
}
const removeSeconds = (str = "") => {
  if (!str.includes('seconds')) return str;
  const ret = str.split(' seconds')[0];
  if (!ret.includes('minutes')) return ret;
  return `${ret.split('minutes')[0]} minutes`;

}
export const getExamTimeStatus = (exam) => {
  if (!exam || !exam._id) return '';
  const status = getExamStatus(exam);
  switch (status) {
    case 'running':
      return `Remaining ${getTimeDifferenceExam(exam)}`;
    case 'ended':
      return `Ended ${removeSeconds(getTimeDifferenceExam(exam, -1))} ago`;
    case 'upcoming':
      return `Starts in ${getTimeDifferenceExam(exam)}`;
    default:
      break;
  }
  return '';
}

export const getName = obj => `${obj.firstName} ${obj.lastName}`

export const allCap = str => (str || '').toUpperCase();
