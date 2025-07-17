import { body } from 'express-validator';

export const validateUserLogin = [
  body('username')
    .notEmpty().withMessage('Username is required'),

  body('password')
    .notEmpty().withMessage('Password is required')
];