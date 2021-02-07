const Joi = require('@hapi/joi');

const schema = Joi.object({
    firstName: Joi.string().required().label("Title is required"),
    lastName: Joi.string().required().label("Course Code is required"),
});

export default schema;
