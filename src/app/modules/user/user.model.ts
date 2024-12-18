import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import { TUser, TUserModel } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<TUser, TUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: 0 },
    passwordChangedAt: {
      type: Date,
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    address: { type: String },
    phone: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salts));
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.static(
  "isJwtIssuedBeforePasswordChanged",
  function (passwordChangeTimestamp: Date, jwtIssuedTimestamp: number) {
    const passwordChangesTime = Math.floor(
      new Date(passwordChangeTimestamp).getTime() / 1000
    );
    return passwordChangesTime > jwtIssuedTimestamp;
  }
);

export const User = model<TUser, TUserModel>("user", userSchema);
