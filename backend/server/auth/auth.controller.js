const authHelper = require('../auth/auth.helper');
const httpStatuses = require('../constants');

exports.authLogin = async (req, res) => {
    const { email, password } = req.body;
    const ret = await authHelper.login(email, password);
    res.send(ret);
};
