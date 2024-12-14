import { Types } from "mongoose";

export type TProduct = {
  name: string;
  price: number;
  quantity: number;
  description: string;
  images: string[];
  category: Types.ObjectId;
  featured?: boolean;
  isDeleted?: boolean;
  discount?: number;
  createdAt?: Date;
  updatedAt?: Date;
};
