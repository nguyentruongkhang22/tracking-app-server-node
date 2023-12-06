import createHttpError from "http-errors";
import { getAll, getOne, updateOne } from "../models/user.model";
import { Request, Response } from "express";
import { Device } from "../models/device.model";
import { decodeUser, parseCookie } from "../common/utils";

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
      throw createHttpError(404, "User not found");
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
    //@ts-ignore
    const token = parseCookie("login-token", req);
    const user = await decodeUser(token);

    if (!user) {
      throw createHttpError(404, "User not found");
    }
    const userDevices = await Device.find({ id: { $in: user?.deviceIds } });

    res.status(200).json(userDevices);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

export {
  allUsers,
  getUser,
  updateUser,
  deactivateUser,
  activateUser,
  getUserDevices,
};
