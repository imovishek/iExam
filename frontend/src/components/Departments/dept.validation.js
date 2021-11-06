const Joi = require('@hapi/joi')

const schema = Joi.object({
  departmentName: Joi.string().required().label('First Name is required'),
  departmentCode: Joi.string().required().label('Last Name is required'),
})

export default schema
