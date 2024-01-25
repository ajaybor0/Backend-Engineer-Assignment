import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/generateToken.js';

// @desc     Register user
// @method   POST
// @endpoint /api/v1/users
// @access   Public
const registerUser = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;

    const userExists = await User.findOne({ phoneNumber });

    if (userExists) {
      res.statusCode = 409;
      throw new Error(
        'User already exists. Please choose a different phone number.'
      );
    }

    const user = new User({
      phoneNumber
    });

    await user.save();

    generateToken(req, res, user._id);

    res.status(201).json({
      message: 'Registration successful. Welcome!',
      userId: user._id,
      phoneNumber: user.phoneNumber
    });
  } catch (error) {
    next(error);
  }
};

// @desc     Auth user & get token
// @method   POST
// @endpoint /api/v1/users/login
// @access   Public
const loginUser = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      res.statusCode = 404;
      throw new Error(
        'Invalid phone number. Please check your phone number and try again.'
      );
    }

    generateToken(req, res, user._id);

    res.status(200).json({
      message: 'Login successful.',
      userId: user._id,
      phoneNumber: user.phoneNumber,
      priority: user.priority
    });
  } catch (error) {
    next(error);
  }
};

// @desc     Logout user / clear cookie
// @method   POST
// @endpoint /api/users/logout
// @access   Private
const logoutUser = (req, res) => {
  res.clearCookie('jwt', { httpOnly: true });

  res.status(200).json({ message: 'Logout successful' });
};

export { loginUser, registerUser, logoutUser };
