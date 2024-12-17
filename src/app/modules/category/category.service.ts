import httpStatus from "http-status";
import AppError from "../../error/appError";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategory = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};
const getAllCategories = async () => {
  const result = await Category.find({ isDeleted: false });
  return result;
};

const getCategoryById = async (id: string) => {
  const result = await Category.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }
  return result;
};

const updateCategory = async (id: string, payload: Partial<TCategory>) => {
  const result = await Category.findByIdAndUpdate(
    id,
    { $set: { ...payload } },
    { new: true }
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }
  return result;
};
const deleteCategory = async (id: string) => {
  const result = await Category.findByIdAndUpdate(
    id,
    { $set: { isDeleted: true } },
    { new: true }
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }
  return result;
};

export const categoryServices = {
  createCategory,
  getAllCategories,
  updateCategory,
  getCategoryById,
  deleteCategory,
};
