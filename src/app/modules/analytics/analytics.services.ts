import { OrderStatus } from "../order/order.constants";
import { Order } from "../order/order.model";
import { Product } from "../product/product.model";
import { User } from "../user/user.model";
import { startOfDay, startOfWeek, startOfMonth } from "date-fns";

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

const getRevenueData = async () => {
  const today = startOfDay(new Date());
  const thisWeekStart = startOfWeek(today);
  const thisMonthStart = startOfMonth(today);

  // Aggregate total revenue for today, this week, and this month
  const revenueData = await Order.aggregate([
    {
      $match: {
        status: { $in: ["shipped", "delivered"] },
      },
    },
    {
      $group: {
        _id: {
          day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          week: { $week: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        dailyRevenue: {
          $sum: {
            $cond: [{ $gte: ["$createdAt", today] }, "$totalPrice", 0],
          },
        },
        weeklyRevenue: {
          $sum: {
            $cond: [{ $gte: ["$createdAt", thisWeekStart] }, "$totalPrice", 0],
          },
        },
        monthlyRevenue: {
          $sum: {
            $cond: [{ $gte: ["$createdAt", thisMonthStart] }, "$totalPrice", 0],
          },
        },
      },
    },
  ]);

  return revenueData;
};

const getOrderStatusStats = async () => {
  const statusStats = await Order.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        status: "$_id",
        count: 1,
        _id: 0,
      },
    },
  ]);

  // Create an array of all possible statuses with a count of 0 initially
  const stats = Object.values(OrderStatus).reduce(
    (acc, status) => {
      acc[status] = 0; // Default count for each status is 0
      return acc;
    },
    {} as Record<string, number>
  );

  // Update the stats object with the results from the aggregation
  statusStats.forEach((item) => {
    stats[item.status] = item.count; // Assign the count from the aggregation
  });

  return stats;
};

export const analyticsServices = {
  getStats,
  getRevenueData,
  getOrderStatusStats,
};
