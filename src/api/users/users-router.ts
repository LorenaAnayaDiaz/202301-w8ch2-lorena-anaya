import express from 'express';
import {
  getUserByIdController,
  updateUserByIdController,
} from './users-controllers.js';

const router = express.Router();

router.route('/:id').get(getUserByIdController).put(updateUserByIdController);

export default router;
