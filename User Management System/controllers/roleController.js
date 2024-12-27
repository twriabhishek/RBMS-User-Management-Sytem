const Role = require("../models/Role");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const logger = require("../logger/logger.js");

exports.createRole = catchAsyncError(async (req, res, next) => {
  const role = new Role(req.body);
  await role.save();
  logger.info(`New role created: ${role.name}, ID: ${role._id}`);
  res.status(201).json(role);
});

exports.getRoles = catchAsyncError(async (req, res, next) => {
  const roles = await Role.find();
  logger.info(`Fetched all roles. Total roles: ${roles.length}`);
  res.status(200).json(roles);
});

exports.getRolesById = catchAsyncError(async (req, res, next) => {
  let roles = await Role.findById(req.params.id);
  if (!roles) {
    return next(new ErrorHandler("Roles Not found", 404));
  }
  logger.info(`Fetched role with ID: ${req.params.id}`);
  res.status(200).json({ success: true, roles });
});

exports.updateRole = catchAsyncError(async (req, res, next) => {
  let role = await Role.findById(req.params.id);
  if (!role) {
    return next(new ErrorHandler("Role Not found", 404));
  }
  role = await Role.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  logger.info(`Role updated: ${role.name}, ID: ${role._id}`);
  res.status(200).json({ success: true, role });
});

exports.deleteRole = catchAsyncError(async (req, res, next) => {
  let role = await Role.findById(req.params.id);
  if (!role) {
    return next(new ErrorHandler("Role Not found", 404));
  }
  await Role.deleteOne({ _id: req.params.id });
  logger.info(`Role deleted: ${role.name}, ID: ${role._id}`);
  res.status(200).json({ success: true, message: "Role deleted Successfully" });
});
