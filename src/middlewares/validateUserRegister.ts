import {body} from 'express-validator';
import User from '../models/User';

export const validateUserRegister = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 6 }).withMessage('Username must have at least 6 characters')
    .custom(async (value) => {
      const existingUser = await User.findOne({ username: value });
      if (existingUser) {
        throw new Error('Username already in use');
      }
      return true;
    }),

  body('name')
    .notEmpty().withMessage('Name is required'),

  body('lastName')
    .notEmpty().withMessage('Last name is required'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be valid'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must have at least 6 characters'),

  body('passwordrep')
    .notEmpty().withMessage('Password confirmation is required'),

  body('passwordrep').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords must match');
    }
    return true;
  }),

  body('location.city')
    .notEmpty().withMessage('City is required'),

  body('location.province')
    .notEmpty().withMessage('Province is required'),
];
