const Joi = require('@hapi/joi')

const schema = (user) => {
  const obj = {
    firstName: Joi.string().required().label('First Name is required'),
    lastName: Joi.string().required().label('Last Name is required')
  };
  if (user.wantedToChangePassword) {
    obj.oldPassword = Joi.string().required().label('Old password required');
    obj.newPassword = Joi.string().min(3).max(20).required().label('Password must be between [3-20] characters');
    if (user.newPassword !== user.confirmPassword) {
      obj.confirmPasswordError = Joi.string().required().label("Password doesn't match");
    }
  }
  return Joi.object(obj);
}

export default schema
