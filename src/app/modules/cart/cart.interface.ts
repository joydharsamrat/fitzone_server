import { Types } from "mongoose";

export type TCart = {
  user: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
};
