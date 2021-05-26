const BaseJoi = require('@hapi/joi')
const Extension = require('joi-date-extensions')
const Joi = BaseJoi.extend(Extension)

const schema = Joi.object({
  title: Joi.string().required().label('Title is required'),
  startTime: Joi.string().required().label('Start Time is required'),
  duration: Joi.string().required().label('Duration is required'),
  totalMarks: Joi.number().required().label('Total Marks is required'),
  startDate: Joi.date().format('DD/MM/YYYY').required().label('Start Date is required'),
  course:Joi.string().required().label('Please create a course first')
})

export default schema
