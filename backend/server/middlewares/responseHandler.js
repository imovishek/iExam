const forbiddenFields = [
  'password',
];
const filterForbiddenFields = (obj, allow) => {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== 'object') return obj;
  try {
    obj = obj.toObject()
  } catch (e) {}
  for (const key of Object.keys(obj)) {
    if (forbiddenFields.includes(key) && !allow[key]) delete obj[key];
    else  obj[key] = filterForbiddenFields(obj[key], allow);
  }
  return obj;
}
module.exports = (res, status, payload, allow = {}) => {
  payload = filterForbiddenFields(payload, allow);
  return res.status(status).send(payload);
};