import express from 'express';

import {
  loginUser,
  registerUser,
  logoutUser
} from '../controllers/userController.js';
import { runValidation } from '../validators/index.js';
import { phoneNumberValidator } from '../validators/userValidator.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', phoneNumberValidator, runValidation, registerUser);
router.post('/login', phoneNumberValidator, runValidation, loginUser);
router.post('/logout', protect, logoutUser);

export default router;
