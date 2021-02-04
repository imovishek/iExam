const Joi = require('@hapi/joi');

const schema = Joi.object({
    title: Joi.string().required().label("Title is required"),
    courseCode: Joi.string().required().label("Course Code is required"),
    // startDate: Joi.date().required().label("Start Date is required"),
    status: Joi.string().required().label("Status is required")
});

export default schema;
