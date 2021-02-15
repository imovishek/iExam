const Joi = require('@hapi/joi')

const schema = Joi.object({
  firstName: Joi.string().required().label('First Name is required'),
  lastName: Joi.string().required().label('Last Name is required'),
  shortName: Joi.string().required().label('ShortName is required'),
  email: Joi.string().required().label('Email is required'),
  designation: Joi.string().required().label('Designation is required')
})

export default schema
