const User = require("../models/User");
const ErrorHandler = require("../utils/errorhandler");
const bcrypt = require("bcrypt");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const logger = require("../logger/logger.js");

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  let user = await User.findById(req.user.id);
  if (!user) {
    logger.warn(`User not found with ID: ${req.user.id}`);
    return next(new ErrorHandler("User Not found", 404));
  }
  logger.info(`User updating profile: ${req.user.id}`);
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { name, email },
    { new: true, runValidators: true }
  );
  logger.info(`Profile updated successfully for User ID: ${req.user.id}`);

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
    updatedUser,
  });
});

exports.changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    logger.warn(`User not found with ID: ${req.user.id}`);
    return next(new ErrorHandler("User Not found", 404));
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    logger.warn(`Incorrect old password for User ID: ${req.user.id}`);
    return next(new ErrorHandler("Incorrect old password", 400))
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  logger.info(`Password updated successfully for User ID: ${req.user.id}`);
  res.status(200).json({ message: "Password updated successfully" });
};

exports.getProfileById = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id; // Assuming `req.user.id` contains the user's ID.

  if (!userId) {
    return next(new ErrorHandler("User ID is required", 400));
  }

  const user = await User.findById(userId).select("-password"); // Exclude sensitive fields like `password`.

  logger.info(`Profile fetched successfully for User ID: ${userId}`);
  // Return user details
  res.status(200).json({
    success: true,
    user,
  });
});

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  if (req.user.role !== "Admin") {
    logger.warn(`Access denied for User ID: ${req.user.id} - Insufficient role`);
    return next(new ErrorHandler("Not Allowed for this Role", 400));
  }
  // Fetch all users from the database excluding the password field
  const users = await User.find().select("-password");

  if (!users || users.length === 0) {
    return next(new ErrorHandler("No users found", 404));
  }

  logger.info(`Fetched ${users.length} users`);

  // Return the list of users
  res.status(200).json({
    success: true,
    users,
  });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  // Check if the user making the request is an admin
  if (req.user.role !== "Admin") {
    logger.warn(`Access denied for User ID: ${req.user.id} - Insufficient role`);
    return next(new ErrorHandler("Not Allowed for this Role", 400));
  }

  // Find the user by ID
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Delete the user
  await user.deleteOne(); // Use deleteOne instead of remove()

  logger.info(`Deleting user with ID: ${req.params.id}`);
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

exports.updateRole = catchAsyncError(async (req, res, next) => {
  // Check if the user making the request is an admin
  if (req.user.role === "Supervisor" || req.user.role === "User") {
    logger.warn(`Access denied for User ID: ${req.user.id} - Insufficient role`);
    return next(new ErrorHandler("Not Allowed for this Role", 400));
  }

  // Find the user by ID
  const user = await User.findById(req.params.id);
  if (!user) {
    logger.warn(`User not found with ID: ${req.params.id}`);
    return next(new ErrorHandler("User not found", 404));
  }

  // Update the user's role
  user.role = req.body.role; // Assuming `role` is passed in the body

  await user.save();
  logger.info(`User role updated successfully for User ID: ${req.params.id}`);

  res.status(200).json({
    success: true,
    message: "User role updated successfully",
  });
});
