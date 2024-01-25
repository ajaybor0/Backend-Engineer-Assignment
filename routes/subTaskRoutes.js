import express from 'express';

import {
  createSubTask,
  softDeleteSubTask,
  subTasks,
  updateSubTask
} from '../controllers/subTaskController.js';
import { runValidation } from '../validators/index.js';
import {
  taskIdValidation,
  subTaskStatusValidation
} from '../validators/taskValidator.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:id', taskIdValidation, runValidation, protect, createSubTask);
router.get('/:id', taskIdValidation, runValidation, protect, subTasks);
router.put(
  '/:id',
  taskIdValidation,
  subTaskStatusValidation,
  runValidation,
  protect,
  updateSubTask
);
router.patch(
  '/:id',
  taskIdValidation,
  runValidation,
  protect,
  softDeleteSubTask
);

export default router;
