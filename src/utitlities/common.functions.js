import Joi from "@hapi/joi";
import _ from 'underscore';
import moment from 'moment';
import CheckAuthentication from "../components/CheckAuthentication/CheckAuthentication";
import { BodyWrapper } from "./styles";
import NavBar from "../components/NavBar/NavBar";

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

export const stFormatDate = (date) =>
  date ? moment(date)
    .format('DD/MM/YYYY') : 'N/A';

export const getDuration = (d1, d2) => {
  if (!d1 || !d2) return 'N/A';
  return `${moment(d2).diff(d1, 'minutes')} minutes`;
}
export const useNavAuthentication = (Component) => (
  <div>
    <CheckAuthentication />
    <BodyWrapper>
      <NavBar />
      <Component />
    </BodyWrapper>
  </div>
);
  