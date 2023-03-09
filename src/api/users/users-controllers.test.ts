import { Request, Response } from 'express';

import { UserModel } from './user-schema';
import {
  getUserByIdController,
  updateUserByIdController,
} from './users-controllers';

describe('Given a getUserByIdController', () => {
  const mockRequest = {
    params: { id: 'mockId' },
  } as Partial<Request>;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    sendStatus: jest.fn(),
  } as Partial<Response>;

  const mockUser = {
    id: 'mockId',
    firstName: 'Lorena',
    secondName: 'Anaya',
    email: 'lorena.anaya.diaz@gmail.com',
    phone: '626857375',
    pic: 'jrfncjc',
  };

  test('When the user exits, it should return that user with its info', async () => {
    UserModel.findById = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockUser) });

    await getUserByIdController(
      mockRequest as Request,
      mockResponse as Response,
      jest.fn(),
    );

    expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
  });

  test('When the user does not exits then it should respond with status 404', async () => {
    UserModel.findById = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });
    await getUserByIdController(
      mockRequest as Request,
      mockResponse as Response,
      jest.fn(),
    );

    expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
  });

  test('when the database throws an error then it should respond with status 500', async () => {
    UserModel.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockRejectedValue(new Error('Something went wrong')),
    });

    await getUserByIdController(
      mockRequest as Request,
      mockResponse as Response,
      jest.fn(),
    );
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});

describe('Given a updateUserByIdController', () => {
  const mockRequest = {
    params: { id: 'mockId' },
    body: {
      firstName: 'pepa',
      secondName: 'pipo',
      email: 'caca',
      phone: 'jnajsx',
      pic: 'jsdjxka',
    },
  } as Partial<Request>;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    sendStatus: jest.fn(),
  } as Partial<Response>;

  test('When the user does not exist then it should respond with a 404', async () => {
    UserModel.updateOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ matchedCount: 0 }),
    });
    await updateUserByIdController(
      mockRequest as Request,
      mockResponse as Response,
      jest.fn(),
    );

    expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
  });

  test('When the user exits and has been modified then it should respond with a 204', async () => {
    UserModel.updateOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
    });
    await updateUserByIdController(
      mockRequest as Request,
      mockResponse as Response,
      jest.fn(),
    );

    expect(mockResponse.sendStatus).toHaveBeenCalledWith(204);
  });

  test('when the database throws an error then it should respond with status 500', async () => {
    UserModel.updateOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockRejectedValue(new Error('Something went wrong')),
    });

    await updateUserByIdController(
      mockRequest as Request,
      mockResponse as Response,
      jest.fn(),
    );
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});
