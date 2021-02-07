exports.parseQuery = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

exports.parseObject = (obj) => {
  Object.keys(obj).map((key) => {
    obj[key] = this.parseQuery(obj[key]);
  });
  return obj;
};
