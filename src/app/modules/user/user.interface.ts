import { Model } from "mongoose";

export interface TUser {
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
  image?: string;
  role: "user" | "admin";
  passwordChangedAt?: Date;
}

export interface TUserModel extends Model<TUser> {
  isJwtIssuedBeforePasswordChanged(
    passwordChangeTimestamp: Date,
    jwtIssuedTimestamp: number
  ): boolean;
}

export type TUserRole = "admin" | "user";
