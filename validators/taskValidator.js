import { body, param } from 'express-validator';

export const taskValidation = [
  body('title').notEmpty().withMessage('Title cannot be empty'),
  body('description').notEmpty().withMessage('Description cannot be empty'),
  body('dueDate')
    .isISO8601()
    .toDate()
    .withMessage('Due date must be a valid date')
];
export const subTaskStatusValidation = [
  body('status').isInt({ min: 0, max: 1 }).withMessage('Status must be 0 or 1')
];
export const taskIdValidation = [
  param('id').isMongoId().withMessage('Invalid task ID')
];
