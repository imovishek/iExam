const { httpStatuses } = require("../constants")

const forbiddenFields = [
  'credential',
  'password',
];
const filterForbiddenFields = (obj) => {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== 'object') return obj;
  try {
    obj = obj.toObject()
  } catch (e) {}
  for (const key of Object.keys(obj)) {
    console.log(key);
    if (forbiddenFields.includes(key)) delete obj[key];
    else  obj[key] = filterForbiddenFields(obj[key]);
  }
  return obj;
}
module.exports = (res, status, payload) => {
  payload = filterForbiddenFields(payload);
  return res.status(status).send(payload);
};