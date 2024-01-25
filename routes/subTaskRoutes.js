import express from 'express';

import {
  createSubTask,
  softDeleteSubTask,
  subTasks,
  updateSubTask
} from '../controllers/subTaskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:id', protect, createSubTask);
router.get('/:id', protect, subTasks);
router.put('/:id', protect, updateSubTask);
router.patch('/:id', protect, softDeleteSubTask);

export default router;
