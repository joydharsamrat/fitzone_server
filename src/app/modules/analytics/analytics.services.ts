import { Order } from "../order/order.model";
import { Product } from "../product/product.model";
import { User } from "../user/user.model";

const getStats = async () => {
  // Total Users and breakdown of roles
  const totalUsers = await User.aggregate([
    {
      $group: {
        _id: "$role",
        count: { $sum: 1 },
      },
    },
  ]);

  const userStats = totalUsers.reduce(
    (acc, { _id: role, count }) => {
      acc[role] = count;
      acc.total += count;
      return acc;
    },
    { total: 0, admin: 0, user: 0 }
  );

  // Total Products
  const totalProducts = await Product.aggregate([
    { $match: { isDeleted: { $ne: false } } },
    {
      $group: {
        _id: null,
        uniqueProducts: { $sum: 1 },
        totalStockUnits: { $sum: "$quantity" },
      },
    },
  ]);

  const productStats = totalProducts[0] || {
    uniqueProducts: 0,
    totalStockUnits: 0,
  };

  // Pending Shipments
  const pendingShipments = await Order.countDocuments({ status: "pending" });

  // Return combined stats
  return {
    totalUsers: userStats,
    totalProducts: productStats,
    pendingShipments,
  };
};

export default getStats;

export const analyticsServices = { getStats };
