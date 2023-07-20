import createHttpError, { Forbidden } from 'http-errors';

import { TimeVariantData, count, createOne, getAll, getOne, updateOne } from '../models/device.model';
import { Request, Response } from 'express';
import { hash } from '../common/utils';

async function newDevice(req: Request, res: Response) {
  try {
    const device = req.body;
    const id = (await count()) + 1;
    const identifier = hash(device.owner + device.name + device.id + device.active + '');
    const result = await createOne({
      id,
      identifier,
      ...device,
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

async function allDevices(req: Request, res: Response) {
  try {
    const result = await getAll();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

async function getDevice(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const result = await getOne(parseInt(id));

    if (!result) {
      throw createHttpError(404, 'Device not found');
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

async function updateDevice(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const device = req.body;
    const result = await updateOne(parseInt(id), { device });

    // if (!result) {
    //   throw new createHttpError.
    // }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

async function updateTimeVariantData(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const timeVariantData: TimeVariantData = req.body;
    timeVariantData.updatedAt = new Date();

    const result = await updateOne(parseInt(id), { timeVariantData });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

async function getTimeVariantData(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const result = await getOne(parseInt(id));

    if (!result) {
      throw createHttpError(404, 'Device not found');
    }

    res.status(200).json(result.timeVariantData);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

async function deviceAuth(req: Request, res: Response, next: any) {
  try {
    const id = req.params.id;
    const deviceIdentifier = req.headers['device-identifier'] as string;

    const device = await getOne(parseInt(id));
    if (!device) {
      throw createHttpError(404, 'Device not found');
    }

    if (deviceIdentifier !== device.identifier) {
      throw new Forbidden('Invalid device identification');
    }

    next();
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

export { newDevice, allDevices, getDevice, updateDevice, updateTimeVariantData, getTimeVariantData, deviceAuth };
