import { body } from 'express-validator';

export const phoneNumberValidator = [
  body('phoneNumber')
    .isMobilePhone('any', { strictMode: true })
    .withMessage('Please enter a valid phone number')
];
