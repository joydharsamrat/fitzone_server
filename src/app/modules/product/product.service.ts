import httpStatus from "http-status";
import AppError from "../../error/appError";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async (query: Record<string, unknown>) => {
  // Initialize search
  let searchTerm = "";
  if (query.searchTerm) {
    searchTerm = query.searchTerm as string;
  }

  const searchQuery = Product.find({
    name: { $regex: searchTerm, $options: "i" },
  });

  const excFields = [
    "searchTerm",
    "minPrice",
    "maxPrice",
    "sort",
    "page",
    "limit",
    "new",
    "onSale",
  ];
  const queryObj = { ...query };
  excFields.forEach((el) => delete queryObj[el]);

  // Filter by price range
  if (query.minPrice && query.maxPrice) {
    searchQuery.find({
      price: { $gte: Number(query.minPrice), $lte: Number(query.maxPrice) },
    });
  }

  // Filter by categories
  if (query.categories) {
    const categories: string[] = (query.categories as string).split(",");
    searchQuery.find({
      category: { $in: [...categories] },
    });
  }

  // Filter for new products (created in the last 7 days)
  if (query.new) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 7);
    searchQuery.find({
      createdAt: { $gte: thirtyDaysAgo },
    });
  }

  // Filter for on-sale products
  if (query.onSale) {
    searchQuery.find({
      discount: { $gt: 0 },
    });
  }

  // Sorting
  let sort: "asc" | "desc" = "desc";
  if (query.sort === "asc" || query.sort === "desc") {
    sort = query.sort;
  }
  const sortQuery = searchQuery.sort({ price: sort });

  // Pagination
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 5;
  const skip = (page - 1) * limit;

  const products = await sortQuery
    .find({ isDeleted: { $ne: true } })
    .limit(limit)
    .skip(skip)
    .lean();

  // Add  fields for on-sale products
  const result = products.map((product) => {
    if (product.discount && product.discount > 0) {
      const finalPrice =
        product.price - (product.price * product.discount) / 100;
      return {
        ...product,
        hasDiscount: true,
        finalPrice,
      };
    }
    return {
      ...product,
      hasDiscount: false,
    };
  });

  return result;
};

const getFeaturedProducts = async () => {
  const result = await Product.find({ featured: true });
  return result;
};

const getProductById = async (id: string) => {
  const result = await Product.findById(id).populate("category");
  return result;
};

const getProductStock = async (ids: string[]) => {
  const products = await Product.find({ _id: { $in: ids } }).select(
    "_id quantity"
  );
  const stockData: { [key: string]: number } = {};

  products.forEach((product) => {
    stockData[product._id.toString()] = product.quantity;
  });

  return stockData;
};

const updateProduct = async (id: string, payload: Partial<TProduct>) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(httpStatus.FORBIDDEN, "Data not found");
  } else if (product.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "Product is deleted");
  }

  const result = await Product.findByIdAndUpdate(
    id,
    { $set: { ...payload } },
    { new: true }
  );

  return result;
};

const deleteProduct = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  const result = await Product.findByIdAndUpdate(id, {
    $set: { isDeleted: true },
  });

  return result;
};

export const productServices = {
  createProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  getProductStock,
  updateProduct,
  deleteProduct,
};
