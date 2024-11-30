import { TUser } from "./user.interface";
import { User } from "./user.model";

const getUsers = async () => {
  const result = await User.find();
  return { data: result };
};
const getUserById = async (id: string) => {
  const result = await User.findById(id);
  return { data: result };
};

const updateUser = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(
    id,
    { $set: { ...payload } },
    { new: true }
  );
  return { data: result };
};

const makeAdmin = async (id: string) => {
  const result = await User.findByIdAndUpdate(id, { $set: { role: "admin" } });
  return { data: result };
};

export const userServices = {
  getUsers,
  getUserById,
  updateUser,
  makeAdmin,
};
