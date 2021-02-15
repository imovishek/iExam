const Joi = require('@hapi/joi')

const schema = Joi.object({
  firstName: Joi.string().required().label('First Name is required'),
  lastName: Joi.string().required().label('Last Name is required')
})

export default schema
