import httpStatus from "http-status";
import AppError from "../../error/appError";
import { Cart } from "../cart/cart.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

import mongoose from "mongoose";
import { Product } from "../product/product.model";
import { OrderStatus } from "./order.constants";

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

const getOrdersByUserId = async (id: string) => {
  const result = await Order.find({ user: id })
    .populate("user")
    .sort("-createdAt");
  return result;
};
const getAllOrders = async () => {
  const result = await Order.find().sort("-createdAt");
  return result;
};

const updateOrderStatus = async (id: string, newStatus: string) => {
  //  Find the order by ID
  const order = await Order.findById(id);

  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }

  const currentStatus = order.status;

  // Validate status based on the current status
  if (currentStatus === OrderStatus.PENDING) {
    if (
      newStatus !== OrderStatus.SHIPPED &&
      newStatus !== OrderStatus.CANCELED
    ) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        `Order status can only be updated to "shipped" or "canceled" from "pending".`
      );
    }
  } else if (currentStatus === OrderStatus.SHIPPED) {
    if (
      newStatus !== OrderStatus.DELIVERED &&
      newStatus !== OrderStatus.RETURNED
    ) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        `Order status can only be updated to "delivered" or "returned" from "shipped".`
      );
    }
  } else if (
    [
      OrderStatus.DELIVERED,
      OrderStatus.CANCELED,
      OrderStatus.RETURNED,
    ].includes(currentStatus)
  ) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      `Order status cannot be updated from "${currentStatus}".`
    );
  }

  //  update the order status
  const result = await Order.findByIdAndUpdate(
    id,
    { status: newStatus },
    { new: true }
  );

  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to update order status."
    );
  }

  return result;
};

const getOrderById = async (id: string) => {
  const result = await Order.findById(id).populate("user");
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }
  return result;
};

export const orderServices = {
  createOrder,
  getOrdersByUserId,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
};
