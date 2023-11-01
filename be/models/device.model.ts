import mongoose from 'mongoose';

interface TimeVariantData {
  updatedAt: Date;
  latitude: number;
  longitude: number;
  altitude: number;
  speed: number;
  humidity: number;
  temp: number;
}
const device = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  active: { type: Boolean, required: true },
  identifier: { type: String, required: true, unique: true },
  timeVariantData: {
    updatedAt: { type: Date, required: true, default: 0 },
    latitude: { type: Number, required: true, default: 0 },
    longitude: { type: Number, required: true, default: 0 },
    altitude: { type: Number, required: true, default: 0 },
    speed: { type: Number, required: true, default: 0 },
    humidity: { type: Number, required: true, default: 0 },
    temp: { type: Number, required: true, default: 0 },
  },
});

const Device = mongoose.model('Device', device);

async function getAll() {
  return await Device.find();
}

async function getOne(id: number) {
  return await Device.findOne({ id });
}

async function createOne(device: any) {
  return await Device.create(device);
}

async function updateOne(id: number, device: any) {
  return await Device.updateOne({ id }, device);
}

async function deleteOne(id: number) {
  return await Device.deleteOne({ id });
}

async function count() {
  return await Device.countDocuments();
}

export { Device, getAll, getOne, createOne, updateOne, deleteOne, count, TimeVariantData };
