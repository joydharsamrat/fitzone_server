import { TCart } from "./cart.interface";
import { Cart } from "./cart.model";

const createCartItem = async (id: string, payload: TCart) => {
  const existingItem = await Cart.findOne({
    user: id,
    product: payload.product,
  });

  if (existingItem) {
    const result = await Cart.findByIdAndUpdate(existingItem._id, {
      quantity: existingItem.quantity + payload.quantity,
    });

    return { data: result };
  }

  const result = await Cart.create(payload);
  return { data: result };
};

const getCartItemsByUser = async (id: string) => {
  const result = await Cart.find({ user: id })
    .populate("user")
    .populate("product");

  return result;
};

const updateCartItemQuantity = async (id: string, quantity: number) => {
  const result = await Cart.findByIdAndUpdate(id, { quantity: quantity });

  return { data: result };
};
const deleteCartItem = async (id: string) => {
  const result = await Cart.findByIdAndDelete(id);

  return { data: result };
};

export const cartServices = {
  createCartItem,
  getCartItemsByUser,
  updateCartItemQuantity,
  deleteCartItem,
};
