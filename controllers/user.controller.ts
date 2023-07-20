import createHttpError from 'http-errors';
import { count, createOne, getAll, getOne, updateOne } from '../models/user.model';
import { Request, Response } from 'express';
import { Device } from '../models/device.model';
import { hash } from '../common/utils';

async function newUser(req: Request, res: Response) {
  try {
    const user = req.body;
    user.id = (await count()) + 1;
    const result = await createOne(user);

    if (!result) {
      throw createHttpError(500, 'User not created');
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

async function allUsers(req: Request, res: Response) {
  try {
    const result = await getAll();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

async function getUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const result = await getOne(parseInt(id));

    if (!result) {
      throw createHttpError(404, 'User not found');
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const user = req.body;
    const result = await updateOne(parseInt(id), user);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

async function deactivateUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const result = await updateOne(parseInt(id), { active: false });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

async function activateUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const result = await updateOne(parseInt(id), { active: true });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

async function getUserDevices(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const user = await getOne(parseInt(id));
    console.log(' -- user: ', user);

    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    const userDevices = Device.find({ id: { $in: user?.deviceIds } });

    res.status(200).json(userDevices);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

export { newUser, allUsers, getUser, updateUser, deactivateUser, activateUser, getUserDevices };
