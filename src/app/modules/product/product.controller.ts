import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { productServices } from "./product.service";

const handleCreateProduct = catchAsync(async (req, res) => {
  const result = await productServices.createProduct(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});
const handleGetAllProducts = catchAsync(async (req, res) => {
  const result = await productServices.getAllProducts(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products retrieved successfully",
    data: result,
  });
});

const handleGetFeaturedProducts = catchAsync(async (req, res) => {
  const result = await productServices.getFeaturedProducts();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Featured products retrieved successfully",
    data: result,
  });
});

const handleGetProductById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await productServices.getProductById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});
const handleGetProductStock = catchAsync(async (req, res) => {
  const result = await productServices.getProductStock(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Products stock retrieved successfully",
    data: result,
  });
});

export const productControllers = {
  handleCreateProduct,
  handleGetAllProducts,
  handleGetFeaturedProducts,
  handleGetProductById,
  handleGetProductStock,
};
