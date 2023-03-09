import { RequestHandler } from 'express-serve-static-core';

import { User, UserModel } from './user-schema.js';

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

export const updateUserByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { firstName, secondName, email, phone, pic } = req.body;

  const newUser: User = {
    firstName,
    secondName,
    email,
    phone,
    pic,
  };

  try {
    const dbRes = await UserModel.updateOne({ _id: id }, newUser, {
      new: true,
    }).exec();

    if (dbRes.matchedCount === 0) {
      res.sendStatus(404);
    }

    if (dbRes.modifiedCount === 1) {
      res.sendStatus(204);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
