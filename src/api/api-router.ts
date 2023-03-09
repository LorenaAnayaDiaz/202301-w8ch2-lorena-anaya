import express from 'express';
import userRouter from '../api/users/users-router.js';

const router = express.Router();

// Router users
router.use('/users', userRouter);
export default router;
