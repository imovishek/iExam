import Joi from "@hapi/joi";
import _ from 'underscore';

export const joiObjectParser = (object, validator) => {
  const { error } = Joi.validate(object, validator, {
    abortEarly: false,
    stripUnknown: { objects: true }
  });
  if (!error) return {};
  const errors = {};
  _.each(error.details, detail => {
    const { key, label } = detail.context;
    errors[key] = label;
  })
  return errors;
};

