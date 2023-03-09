import express from 'express';
import { getUserByIdController } from './users-controllers.js';

const router = express.Router();

router.route('/:id').get(getUserByIdController);

export default router;
