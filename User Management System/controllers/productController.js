const Product = require("../models/Product");
const logger = require("../logger/logger.js");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError.js");

exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = new Product(req.body);
  logger.info(`Creating product: ${req.body.name}`);
  await product.save();
  logger.info(`Product created successfully: ${product.name}`);
  res
    .status(201)
    .json({ success: true, message: "Product Added Successfully", product });
});

exports.getProducts = catchAsyncError(async (req, res, next) => {
  logger.info("Fetching all products");
  const products = await Product.find();
  logger.info(`Fetched ${products.length} products`);
  res.status(200).json(products);
});

exports.getProductById = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    logger.warn(`Product not found with ID: ${req.params.id}`);
    return next(new ErrorHandler("Product Not found", 404));
  }
  logger.info(`Product found with ID: ${req.params.id}`);
  res.status(200).json({ success: true, product });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    logger.warn(`Product not found with ID: ${req.params.id}`);
    return next(new ErrorHandler("Product Not found", 404));
  }
  logger.info(`Updating product with ID: ${req.params.id}`);
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  logger.info(`Product updated successfully: ${product.name}`);
  res
    .status(200)
    .json({ success: true, message: "Product Updated Successfully", product });
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    logger.warn(`Product not found with ID: ${req.params.id}`);
    return next(new ErrorHandler("Product Not found", 404));
  }
  logger.info(`Deleting product with ID: ${req.params.id}`);
  await Product.deleteOne({ _id: req.params.id });
  logger.info(`Product deleted successfully: ${req.params.id}`);
  res
    .status(200)
    .json({ success: true, message: "Product deleted Successfully" });
});
