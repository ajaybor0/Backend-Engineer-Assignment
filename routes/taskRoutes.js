import express from 'express';

import {
  createTask,
  softDeleteTask,
  tasks,
  updateTask
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTask);
router.get('/', protect, tasks);
router.put('/:id', protect, updateTask);
router.patch('/:id', protect, softDeleteTask);

export default router;
