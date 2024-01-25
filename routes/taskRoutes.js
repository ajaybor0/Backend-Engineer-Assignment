import express from 'express';

import {
  createTask,
  softDeleteTask,
  tasks,
  updateTask
} from '../controllers/taskController.js';
import { runValidation } from '../validators/index.js';
import {
  taskValidation,
  taskIdValidation
} from '../validators/taskValidator.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', taskValidation, runValidation, protect, createTask);
router.get('/', protect, tasks);
router.put(
  '/:id',
  taskValidation,
  taskIdValidation,
  runValidation,
  protect,
  updateTask
);
router.patch('/:id', taskIdValidation, runValidation, protect, softDeleteTask);

export default router;
