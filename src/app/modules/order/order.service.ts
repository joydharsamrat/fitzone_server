import httpStatus from "http-status";
import AppError from "../../error/appError";
import { Cart } from "../cart/cart.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

import mongoose from "mongoose";
import { Product } from "../product/product.model";

const createOrder = async (userId: string, payload: TOrder) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //  Check and update product quantities
    for (const product of payload.products) {
      const productInDb = await Product.findById(product.productId).session(
        session
      );

      if (!productInDb) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Product with ID ${product.productId} not found`
        );
      }

      // Check if the order quantity exceeds the available stock (quantity in product)
      if (product.quantity > productInDb.quantity) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Not enough stock for product ${product.name}`
        );
      }

      // Reduce the product quantity
      productInDb.quantity -= product.quantity;
      await productInDb.save({ session });
    }

    //  Remove all items from the cart matching the userId
    await Cart.deleteMany({ user: userId }).session(session);

    //  Create the Order
    const order = await Order.create([{ ...payload, user: userId }], {
      session,
    });

    // Commit the transaction if all operations succeed
    await session.commitTransaction();
    session.endSession();

    return order[0];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // If any error occurs, rollback the transaction
    await session.abortTransaction();
    session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, "Failed to book order");
  }
};

export const orderServices = {
  createOrder,
};
