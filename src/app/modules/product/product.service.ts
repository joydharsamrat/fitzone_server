import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProduct = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProducts = async (query: Record<string, unknown>) => {
  // search
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
  ];
  const queryObj = { ...query };

  excFields.forEach((el) => delete queryObj[el]);

  // filtering based on prise range
  if (query.minPrice && query.maxPrice) {
    searchQuery.find({
      price: { $gte: Number(query.minPrice), $lte: Number(query.maxPrice) },
    });
  }

  // categories filtering

  if (query.categories) {
    const categories: string[] = (query.categories as string).split(",");
    searchQuery.find({
      category: { $in: [...categories] },
    });
  }

  // sorting

  let sort: "asc" | "desc" = "desc";

  if (query.sort === "asc" || query.sort === "desc") {
    sort = query.sort;
  }

  const sortQuery = searchQuery.sort({ price: sort });

  // pagination

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 8;
  const skip = (page - 1) * limit;

  const result = await sortQuery.limit(limit).skip(skip);

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

export const productServices = {
  createProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductById,
};
