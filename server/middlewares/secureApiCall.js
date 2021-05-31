const { httpStatuses } = require("../constants")

module.exports = (userTypesWhoHasAccess) => (req, res, next) => {
  if (!userTypesWhoHasAccess.includes(req.user.userType)) {
    res.status(httpStatuses.FORBIDDEN).send("You don't have permission to this api");
    next('route');
  } else {
    next();
  }
};