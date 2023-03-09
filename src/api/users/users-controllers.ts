import { RequestHandler } from 'express-serve-static-core';
import { UserModel } from './user-schema.js';

export const getUserByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById({ _id: id }).exec();
    if (user === null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
