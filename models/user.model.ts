import mongoose from 'mongoose';
import { hash } from '../common/utils';

const user = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  active: { type: Boolean, required: true, default: true },
  deviceIds: [{ type: Number }],
  token: { type: String },
});

const User = mongoose.model('User', user);

async function getAll() {
  return await User.find();
}

async function getOne(id: number) {
  return await User.findOne({ id });
}

async function createOne(user: any) {
  return await User.create(user);
}

async function updateOne(id: number, user: any) {
  return await User.updateOne({ id }, user);
}

async function deleteOne(id: number) {
  return await User.deleteOne({ id });
}

async function count() {
  return await User.countDocuments();
}

export { User, getAll, getOne, createOne, updateOne, deleteOne, count };
